const isWindows = process.platform === "win32"
const installCommands = isWindows
  ? [
      "powershell -ExecutionPolicy Bypass -Command \"if (Test-Path 'app/.git') { Write-Host 'Audiobook Studio already cloned' } else { git clone https://github.com/senigami/audiobook-studio.git app }\"",
      "powershell -ExecutionPolicy Bypass -Command \"if ((Test-Path '.\\\\app\\\\venv\\\\Scripts\\\\python.exe') -and -not (Test-Path '.\\\\app\\\\venv\\\\Scripts\\\\pip.exe')) { Remove-Item -Recurse -Force '.\\\\app\\\\venv' }\"",
      "python -m ensurepip --upgrade",
      "python -m pip --version",
      "powershell -ExecutionPolicy Bypass -Command \"if (-not (Test-Path '.\\\\app\\\\run.ps1')) { throw 'Audiobook Studio install is incomplete: app\\\\run.ps1 was not found. Try Reset, then Install again.' }\"",
      "powershell -ExecutionPolicy Bypass -File .\\app\\run.ps1 -SetupOnly",
    ]
  : [
      "if [ -d app/.git ]; then echo 'Audiobook Studio already cloned'; else git clone https://github.com/senigami/audiobook-studio.git app; fi",
      "test -f ./app/run.sh || { echo 'Audiobook Studio install is incomplete: app/run.sh was not found. Try Reset, then Install again.'; exit 1; }",
      "bash ./app/run.sh --setup-only",
    ]

module.exports = {
  requires: {
    bundle: "ai",
  },
  run: [
    {
      method: "shell.run",
      params: {
        path: ".",
        venv: isWindows ? "app/venv" : undefined,
        env: {
          AUDIOBOOK_STUDIO_INSTALL_DEMO: "1",
        },
        message: installCommands,
      },
    },
    {
      method: "script.start",
      params: {
        uri: "start.js",
      },
    },
  ],
}
