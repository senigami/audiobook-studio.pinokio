# Audiobook Studio for Pinokio

A Pinokio launcher for [Audiobook Studio](https://github.com/senigami/audiobook-studio), a local-first web studio for turning long-form text into finished audiobooks with cloned voices, chapter-based production, and final export tools.

Showcase:

https://senigami.github.io/audiobook-studio/

Main project:

https://github.com/senigami/audiobook-studio

## Why Audiobook Studio

Audiobook Studio is built for people who want more control over audiobook production:

- create audiobooks locally instead of relying on a hosted generation workflow
- clone and reuse narrator voices
- work chapter by chapter instead of in one giant monolithic run
- revise text, regenerate only what changed, and keep iterating
- export finished audiobook files from a self-hosted web interface

It is designed to make long-form narration workflows more practical, more private, and easier to own end to end.

## What This Pinokio Launcher Does

This repository is the Pinokio wrapper, not the full application source.

It will:

- clone the main Audiobook Studio repository
- run the project’s setup/install flow
- start the local web app
- expose the local URL through Pinokio
- update the install later with a pull + setup pass
- optionally install demo content on first run

## Main Features

Audiobook Studio includes:

- local voice cloning and reusable narrator profiles
- chapter-based generation workflows
- performance and rebuild tools for fixing only the pieces that need work
- multi-voice narration and dialogue assignment
- audiobook assembly and export
- local ownership of project files, voice assets, and generated output

## Demo Content

On a fresh install, Audiobook Studio can install demo content automatically so new users have something real to explore right away.

The demo library is useful for quickly testing:

- voice playback
- chapter generation
- rebuild flow
- final audiobook export

## Platform Support

The launcher uses Audiobook Studio’s own startup scripts:

- macOS / Linux: `run.sh`
- Windows: `run.ps1`

Those scripts handle dependency setup and app startup for the main project.

## Windows Support Note

`1.8.3` is the first Audiobook Studio release line that works correctly on Windows through this Pinokio launcher.

Earlier versions could still hit Windows-specific startup, XTTS environment, and launcher issues. If you want a Windows install that matches the current launcher flow, start with `1.8.3` or newer.

## Notes

- This repository is the Pinokio launcher layer only.
- The main source code lives in the Audiobook Studio repo:
  - [https://github.com/senigami/audiobook-studio](https://github.com/senigami/audiobook-studio)
- If you want the full project details, docs, and release history, use the main repo and showcase link above.
