const isWindows = process.platform === "win32"
const startCommand = isWindows
  ? 'powershell -ExecutionPolicy Bypass -File .\\app\\run.ps1 -NoReload'
  : 'bash ./run.sh --no-reload'
const validateLauncherCommand = isWindows
  ? "powershell -ExecutionPolicy Bypass -Command \"if (-not (Test-Path '.\\\\app\\\\run.ps1')) { throw 'Audiobook Studio is not installed correctly: app\\\\run.ps1 was not found. Run Install or Reset first.' }\""
  : "test -f ./run.sh || { echo 'Audiobook Studio is not installed correctly: app/run.sh was not found. Run Install or Reset first.'; exit 1; }"
const uvicornReadyPattern = "/Uvicorn running on (http:\\/\\/[0-9.:]+)/"

module.exports = {
  requires: {
    bundle: "ai",
  },
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: isWindows ? "." : "app",
        venv: isWindows ? "app/venv" : undefined,
        env: {
          AUDIOBOOK_STUDIO_INSTALL_DEMO: "1",
        },
        message: [
          ...(isWindows
            ? [
                "powershell -ExecutionPolicy Bypass -Command \"if ((Test-Path '.\\\\app\\\\venv\\\\Scripts\\\\python.exe') -and -not (Test-Path '.\\\\app\\\\venv\\\\Scripts\\\\pip.exe')) { Remove-Item -Recurse -Force '.\\\\app\\\\venv' }\"",
                "python -m ensurepip --upgrade",
                "python -m pip --version",
              ]
            : []),
          validateLauncherCommand,
          startCommand,
        ],
        on: [
          {
            event: uvicornReadyPattern,
            done: true,
          },
        ],
      },
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}",
      },
    },
    {
      method: "process.wait",
      params: {
        uri: "{{local.url}}/api/home",
      },
    },
    {
      method: "process.wait",
      params: {
        uri: "{{local.url}}",
      },
    },
  ],
}
