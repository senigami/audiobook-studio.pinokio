# Audiobook Studio for Pinokio

A Pinokio launcher for [Audiobook Studio](https://github.com/senigami/audiobook-studio).

This repo is intentionally small. It lets Pinokio:

- clone the main Audiobook Studio repo
- run the project's own installer/startup scripts
- launch the local web UI
- update or reset the install later

## What it launches

- macOS / Linux: `./run.sh`
- Windows: `run.ps1`

Those scripts are maintained in the main Audiobook Studio repo, so this launcher stays thin and easier to keep up to date.

## Notes

- On first run, Audiobook Studio may offer to install demo content if the library is empty and a demo bundle is present.
- XTTS dependencies are installed into the default `xtts-env` path unless overridden by the user.
- This launcher expects the main repo to remain the source of truth for install and runtime behavior.
