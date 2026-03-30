const isWindows = process.platform === "win32"
const startCommand = isWindows
  ? 'powershell -ExecutionPolicy Bypass -File .\\run.ps1 -NoReload'
  : 'bash ./run.sh --no-reload'
const settleCommand = isWindows
  ? 'powershell -Command "Start-Sleep -Seconds 5"'
  : 'sleep 5'
const validateLauncherCommand = isWindows
  ? "powershell -ExecutionPolicy Bypass -Command \"if (-not (Test-Path '.\\\\run.ps1')) { throw 'Audiobook Studio is not installed correctly: app\\\\run.ps1 was not found. Run Install or Reset first.' }\""
  : "test -f ./run.sh || { echo 'Audiobook Studio is not installed correctly: app/run.sh was not found. Run Install or Reset first.'; exit 1; }"

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
            event: "/http:\\/\\/127\\.0\\.0\\.1:(\\d+)/",
            done: true,
          },
          {
            event: "/http:\\/\\/localhost:(\\d+)/",
            done: true,
          },
        ],
      },
    },
    {
      method: "local.set",
      params: {
        url: "http://127.0.0.1:{{input.event[1]}}",
      },
    },
    {
      method: "shell.run",
      params: {
        message: [settleCommand],
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
