const isWindows = process.platform === "win32"
const startCommand = isWindows
  ? 'powershell -ExecutionPolicy Bypass -File .\\run.ps1 -NoReload'
  : 'bash ./run.sh --no-reload'

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
        message: [startCommand],
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
      method: "process.wait",
      params: {
        uri: "{{local.url}}",
      },
    },
  ],
}
