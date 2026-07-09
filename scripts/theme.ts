// Inlined in <head> so it runs before first paint: sets data-theme without a
// flash of the wrong theme and wires the [data-theme-toggle] button.
export const themeScript = `(function () {
	var d = document.documentElement, m = matchMedia("(prefers-color-scheme: dark)");
	function pref() { try { return localStorage.getItem("theme") } catch (e) { return null } }
	d.setAttribute("data-theme", pref() || (m.matches ? "dark" : "light"));
	m.addEventListener("change", function (e) { if (!pref()) d.setAttribute("data-theme", e.matches ? "dark" : "light") });
	document.addEventListener("click", function (e) {
		if (!e.target.closest || !e.target.closest("[data-theme-toggle]")) return;
		var t = d.getAttribute("data-theme") === "dark" ? "light" : "dark";
		d.setAttribute("data-theme", t);
		try { localStorage.setItem("theme", t) } catch (e) {}
	});
})();`;
