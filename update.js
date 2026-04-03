const isWindows = process.platform === "win32"
const updateCommandWindows = `powershell -NoProfile -NoLogo -ExecutionPolicy Bypass -Command "git -C app pull --ff-only; if (-not (Test-Path '.\\app\\run.ps1')) { throw 'Audiobook Studio update cannot continue: app\\run.ps1 was not found. Run Reset, then Install again.' }; & '.\\app\\run.ps1' -SetupOnly"`
const updateCommandLinux = `git -C app pull --ff-only; test -f ./app/run.sh || { echo 'Audiobook Studio update cannot continue: app/run.sh was not found. Run Reset, then Install again.'; exit 1; }; bash ./app/run.sh --setup-only`

module.exports = {
  requires: {
    bundle: "ai",
  },
  run: [
    {
      method: "shell.run",
      params: {
        path: ".",
        message: [isWindows ? updateCommandWindows : updateCommandLinux],
      },
    },
  ],
}
