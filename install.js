const isWindows = process.platform === "win32"
const setupCommand = isWindows
  ? 'powershell -ExecutionPolicy Bypass -File .\\run.ps1 -SetupOnly'
  : 'bash ./run.sh --setup-only'
const cloneCommand = isWindows
  ? "powershell -ExecutionPolicy Bypass -Command \"if (Test-Path 'app/.git') { Write-Host 'Audiobook Studio already cloned' } else { git clone https://github.com/senigami/audiobook-studio.git app }\""
  : "if [ -d app/.git ]; then echo 'Audiobook Studio already cloned'; else git clone https://github.com/senigami/audiobook-studio.git app; fi"
const validateLauncherCommand = isWindows
  ? "powershell -ExecutionPolicy Bypass -Command \"if (-not (Test-Path '.\\\\run.ps1')) { throw 'Audiobook Studio install is incomplete: app\\\\run.ps1 was not found. Try Reset, then Install again.' }\""
  : "test -f ./run.sh || { echo 'Audiobook Studio install is incomplete: app/run.sh was not found. Try Reset, then Install again.'; exit 1; }"

module.exports = {
  requires: {
    bundle: "ai",
  },
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          cloneCommand,
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
        message: [
          validateLauncherCommand,
          setupCommand,
        ],
      },
    },
  ],
}
