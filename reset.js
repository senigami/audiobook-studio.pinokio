const isWindows = process.platform === "win32"
const resetCommands = isWindows
  ? [
      "powershell -ExecutionPolicy Bypass -Command \"if (Test-Path 'app') { Remove-Item -Recurse -Force 'app' }\"",
      "powershell -ExecutionPolicy Bypass -Command \"if (Test-Path 'env') { Remove-Item -Recurse -Force 'env' }\"",
    ]
  : [
      "rm -rf app",
      "rm -rf env",
    ]

module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: resetCommands,
      },
    },
  ],
}
