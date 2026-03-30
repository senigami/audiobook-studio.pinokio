const isWindows = process.platform === "win32"
const setupCommand = isWindows
  ? 'powershell -ExecutionPolicy Bypass -File .\\run.ps1 -SetupOnly'
  : 'bash ./run.sh --setup-only'
const validateLauncherCommand = isWindows
  ? "powershell -ExecutionPolicy Bypass -Command \"if (-not (Test-Path '.\\\\run.ps1')) { throw 'Audiobook Studio update cannot continue: app\\\\run.ps1 was not found. Run Reset, then Install again.' }\""
  : "test -f ./run.sh || { echo 'Audiobook Studio update cannot continue: app/run.sh was not found. Run Reset, then Install again.'; exit 1; }"

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
          validateLauncherCommand,
          setupCommand,
        ],
      },
    },
  ],
}
