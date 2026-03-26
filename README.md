# Audiobook Studio for Pinokio

A Pinokio launcher for [Audiobook Studio](https://github.com/senigami/audiobook-studio), a local-first audiobook production app for voice cloning, chapter generation, narration workflows, and finished audiobook export.

This repository is the Pinokio wrapper only. The main project lives here:

https://github.com/senigami/audiobook-studio

## What This Launcher Does

This Pinokio app will:

- clone the main Audiobook Studio repository
- run the project’s install/setup flow
- start the local web application
- expose the local URL through Pinokio
- update the install later with a pull + setup pass
- optionally install demo content on first run

## Why Use Pinokio

This launcher is meant to make first-time setup much easier for people who want to try Audiobook Studio without manually walking through the full install process.

It is especially useful for users who want:

- a more guided install flow
- a local web UI they can launch from one place
- a demo library to explore immediately
- a cleaner path to trying Audiobook Studio for the first time

## Main Features of Audiobook Studio

Audiobook Studio is designed for local-first audiobook production and revision.

Core capabilities include:

- voice cloning and reusable narrator profiles
- chapter-based generation workflows
- multi-voice narration and dialogue assignment
- chapter performance and rebuild tools
- audiobook assembly and export
- local ownership of projects, voices, and output files

## Demo Content

On a fresh install, Audiobook Studio can install demo content automatically so new users have something real to explore right away.

The demo library is intended to help users quickly test:

- voice playback
- chapter generation
- rebuild flow
- final audiobook export

## Platform Support

The launcher uses Audiobook Studio’s own startup scripts:

- macOS / Linux: `run.sh`
- Windows: `run.ps1`

Those scripts handle dependency setup and app startup for the main project.

## Notes

- This repository does not contain the full Audiobook Studio source code.
- It is a launcher layer for Pinokio.
- If you want to contribute to the application itself, use the main repo:
  - [https://github.com/senigami/audiobook-studio](https://github.com/senigami/audiobook-studio)

## Links

- Main project: [senigami/audiobook-studio](https://github.com/senigami/audiobook-studio)
- Pinokio: [https://pinokio.co](https://pinokio.co)
