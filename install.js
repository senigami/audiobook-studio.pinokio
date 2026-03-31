const isWindows = process.platform === "win32"
const installCommand = isWindows
  ? [
      "if (Test-Path 'app/.git') { Write-Host 'Audiobook Studio already cloned' } else { git clone https://github.com/senigami/audiobook-studio.git app }",
      "Set-Location app",
      "if (-not (Test-Path '.\\run.ps1')) { throw 'Audiobook Studio install is incomplete: app\\run.ps1 was not found. Try Reset, then Install again.' }",
      "powershell -ExecutionPolicy Bypass -File .\\run.ps1 -SetupOnly",
    ].join("; ")
  : [
      "if [ -d app/.git ]; then echo 'Audiobook Studio already cloned'; else git clone https://github.com/senigami/audiobook-studio.git app; fi",
      "cd app",
      "test -f ./run.sh || { echo 'Audiobook Studio install is incomplete: app/run.sh was not found. Try Reset, then Install again.'; exit 1; }",
      "bash ./run.sh --setup-only",
    ].join("; ")

module.exports = {
  requires: {
    bundle: "ai",
  },
  run: [
    {
      method: "shell.run",
      params: {
        env: {
          AUDIOBOOK_STUDIO_INSTALL_DEMO: "1",
        },
        message: [installCommand],
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
