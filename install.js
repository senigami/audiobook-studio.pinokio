const isWindows = process.platform === "win32"
const setupCommand = isWindows
  ? 'powershell -ExecutionPolicy Bypass -File .\\run.ps1 -SetupOnly'
  : 'bash ./run.sh --setup-only'

module.exports = {
  requires: {
    bundle: "ai",
  },
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "if [ -d app/.git ]; then echo 'Audiobook Studio already cloned'; else git clone https://github.com/senigami/audiobook-studio.git app; fi",
        ],
      },
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        env: {
          AUDIOBOOK_STUDIO_INSTALL_DEMO: "1",
        },
        message: [setupCommand],
      },
    },
  ],
}
