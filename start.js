const isWindows = process.platform === "win32"
const startCommandWindows = `powershell -NoProfile -NoLogo -ExecutionPolicy Bypass -Command "if (-not (Test-Path '.\\app\\run.ps1')) { throw 'Audiobook Studio is not installed correctly: app\\run.ps1 was not found. Run Install or Reset first.' }; & '.\\app\\run.ps1' -NoReload"`
const startCommandLinux = `test -f ./app/run.sh || { echo 'Audiobook Studio is not installed correctly: app/run.sh was not found. Run Install or Reset first.'; exit 1; }; bash ./app/run.sh --no-reload`
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
        path: ".",
        env: {
          AUDIOBOOK_STUDIO_INSTALL_DEMO: "1",
        },
        message: [isWindows ? startCommandWindows : startCommandLinux],
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
