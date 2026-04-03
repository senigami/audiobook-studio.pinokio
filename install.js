const isWindows = process.platform === "win32"
const installCommandWindows = `powershell -NoProfile -NoLogo -ExecutionPolicy Bypass -Command "if (Test-Path 'app/.git') { Write-Host 'Audiobook Studio already cloned' } else { if (Test-Path 'app') { Remove-Item -Recurse -Force 'app' -ErrorAction SilentlyContinue }; git clone https://github.com/senigami/audiobook-studio.git app }; if (-not (Test-Path '.\\app\\run.ps1')) { throw 'Audiobook Studio install is incomplete: app\\run.ps1 was not found. Try Reset, then Install again.' }; & '.\\app\\run.ps1' -SetupOnly"`
const installCommandLinux = `if [ -d app/.git ]; then echo 'Audiobook Studio already cloned'; else rm -rf app; git clone https://github.com/senigami/audiobook-studio.git app; fi; test -f ./app/run.sh || { echo 'Audiobook Studio install is incomplete: app/run.sh was not found. Try Reset, then Install again.'; exit 1; }; bash ./app/run.sh --setup-only`

module.exports = {
  requires: {
    bundle: "ai",
  },
  run: [
    {
      method: "shell.run",
      params: {
        path: ".",
        env: {
          AUDIOBOOK_STUDIO_INSTALL_DEMO: "1",
        },
        message: [isWindows ? installCommandWindows : installCommandLinux],
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
