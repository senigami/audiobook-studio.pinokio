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
        path: "app",
        message: [
          "git pull --ff-only",
          setupCommand,
        ],
      },
    },
  ],
}
