const isWindows = process.platform === "win32"
const setupCommand = isWindows
  ? 'powershell -ExecutionPolicy Bypass -File .\\app\\run.ps1 -SetupOnly'
  : 'bash ./run.sh --setup-only'
const validateLauncherCommand = isWindows
  ? "powershell -ExecutionPolicy Bypass -Command \"if (-not (Test-Path '.\\\\app\\\\run.ps1')) { throw 'Audiobook Studio update cannot continue: app\\\\run.ps1 was not found. Run Reset, then Install again.' }\""
  : "test -f ./run.sh || { echo 'Audiobook Studio update cannot continue: app/run.sh was not found. Run Reset, then Install again.'; exit 1; }"

module.exports = {
  requires: {
    bundle: "ai",
  },
  run: [
    {
      method: "shell.run",
      params: {
        path: isWindows ? "." : "app",
        venv: isWindows ? "app/venv" : undefined,
        message: [
          ...(isWindows
            ? [
                "powershell -ExecutionPolicy Bypass -Command \"if ((Test-Path '.\\\\app\\\\venv\\\\Scripts\\\\python.exe') -and -not (Test-Path '.\\\\app\\\\venv\\\\Scripts\\\\pip.exe')) { Remove-Item -Recurse -Force '.\\\\app\\\\venv' }\"",
                "python -m ensurepip --upgrade",
                "python -m pip --version",
              ]
            : []),
          isWindows ? "git -C app pull --ff-only" : "git pull --ff-only",
          validateLauncherCommand,
          setupCommand,
        ],
      },
    },
  ],
}
