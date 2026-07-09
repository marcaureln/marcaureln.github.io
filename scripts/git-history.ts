import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

export interface ChangelogEntry {
  hash: string;
  date: string;
  message: string;
}

export interface GitHistory {
  createdAt?: string;
  updatedAt: string;
  changelog: ChangelogEntry[];
}

let checkedShallow = false;
let shallow = false;

function git(args: string[], cwd: string): string {
  return execFileSync("git", args, { cwd, encoding: "utf8", timeout: 10_000 }).trim();
}

function ensureFullHistory(cwd: string) {
  if (checkedShallow) return;
  checkedShallow = true;
  try {
    shallow = git(["rev-parse", "--is-shallow-repository"], cwd) === "true";
    if (shallow) {
      git(["fetch", "--quiet", "--unshallow"], cwd);
      shallow = git(["rev-parse", "--is-shallow-repository"], cwd) === "true";
    }
  } catch {
    // offline or no remote, work with what we have
  }
}

export function getGitHistory(relPath: string): GitHistory | null {
  const cwd = process.cwd();
  if (!existsSync(join(cwd, relPath))) return null;
  ensureFullHistory(cwd);
  try {
    const out = git(["log", "--follow", "--format=%h%x09%aI%x09%s", "--", relPath], cwd);
    if (!out) return null;
    const changelog = out.split("\n").map((line) => {
      const [hash = "", date = "", ...msg] = line.split("\t");
      return { hash, date, message: msg.join("\t") };
    });
    return {
      updatedAt: changelog[0]!.date,
      // a shallow history would lie about the first commit, omit rather than mislead
      createdAt: shallow ? undefined : changelog.at(-1)!.date,
      changelog: shallow ? [] : changelog,
    };
  } catch {
    return null;
  }
}
