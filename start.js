const isWindows = process.platform === "win32"
const startCommand = isWindows
  ? 'powershell -ExecutionPolicy Bypass -File .\\run.ps1 -NoReload'
  : 'bash ./run.sh --no-reload'
const validateLauncherCommand = isWindows
  ? "powershell -ExecutionPolicy Bypass -Command \"if (-not (Test-Path '.\\\\run.ps1')) { throw 'Audiobook Studio is not installed correctly: app\\\\run.ps1 was not found. Run Install or Reset first.' }\""
  : "test -f ./run.sh || { echo 'Audiobook Studio is not installed correctly: app/run.sh was not found. Run Install or Reset first.'; exit 1; }"
const uvicornReadyPattern = "/Uvicorn running on http:\\/\\/127\\.0\\.0\\.1:(\\d+)/"

module.exports = {
  requires: {
    bundle: "ai",
  },
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        env: {
          AUDIOBOOK_STUDIO_INSTALL_DEMO: "1",
        },
        message: [
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
        port: "{{input.event[1]}}",
      },
    },
    {
      method: "local.set",
      params: {
        url: "http://127.0.0.1:{{local.port}}",
      },
    },
    {
      method: "process.wait",
      params: {
        uri: "http://127.0.0.1:{{local.port}}/api/home",
      },
    },
    {
      method: "process.wait",
      params: {
        uri: "http://127.0.0.1:{{local.port}}",
      },
    },
  ],
}
