---
title: Privacy Policy
description: How Alex's Homelab handles Google user data.
---

**Alex's Homelab** ("the app") is a private, self-hosted set of services run by
Alex N'Guessan for personal use. It has one user: Alex N'Guessan. It is not a
product, it is not offered to the public, and it has no other users.

Contact: [pa@marcaureln.com](mailto:pa@marcaureln.com)

## What the app accesses

The app uses Google OAuth to read data from the owner's own Google Account:

- the account identifier, email address, name, and avatar, to sign the owner
  in and confirm the account is his;
- calendar events, read only, to show the owner his own schedule;
- contact names, email addresses, and phone numbers, read only, to put names
  against those events;
- photos and albums, read only, to copy the owner's own library into his own
  archive;
- files in Google Drive that the app itself created, to write and read its own
  backups. It cannot see any other file in the owner's Drive.

The app does not read Gmail and does not have full access to Drive. It never
requests a restricted scope.

## What the app does with the data

Data is fetched from Google, stored on hardware in Alex N'Guessan's home, and
displayed to Alex N'Guessan. That is the whole flow.

The app does **not**:

- transfer Google user data to any other person, company, or service;
- use Google user data for advertising, marketing, or profiling;
- sell Google user data;
- use Google user data to train any machine learning or AI model;
- allow any human other than the account owner to read the data, except where
  required by law.

## Limited Use

The app's use and transfer of information received from Google APIs adheres to
the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy),
including the Limited Use requirements.

## Storage and security

Data is stored on self-hosted servers on a private network in France. Access
requires a password and a second factor. Backups are encrypted at rest.
Credentials, OAuth tokens, and API keys are held in an encrypted secret store.

No system is perfectly secure. Because the only data at risk belongs to the
owner, the owner accepts that risk.

## Retention and deletion

Cached Google data is kept only while it is useful and is deleted when the
service that holds it is removed.

To delete everything, the owner revokes the app's access at
[myaccount.google.com/permissions](https://myaccount.google.com/permissions)
and wipes the local stores. Since there is no other user, there is no data
deletion request to make. If you believe your data reached this app, write to
the contact address above and it will be deleted.

## Cookies and tracking

The app sets a session cookie so the owner stays signed in. There is no
analytics, no tracking, and no third-party script.

## Changes

Changes to this policy are published on this page. The date below is the date
of the last change, taken from the site's version history.
