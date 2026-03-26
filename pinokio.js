const isWindows = process.platform === "win32"

module.exports = {
  version: "3.7",
  title: "Audiobook Studio",
  description: "Local-first audiobook production with voice cloning, chapter generation, demo content, and export workflows.",
  icon: "icon.png",
  menu: async (kernel, info) => {
    const installed = info.exists("app/.git")
    const running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js"),
    }

    if (running.install) {
      return [{ default: true, icon: "fa-solid fa-plug", text: "Installing", href: "install.js" }]
    }

    if (running.start) {
      const local = info.local("start.js")
      if (local && local.url) {
        return [
          { default: true, icon: "fa-solid fa-rocket", text: "Open Audiobook Studio", href: local.url },
          { icon: "fa-solid fa-terminal", text: "Terminal", href: "start.js" },
        ]
      }
      return [{ default: true, icon: "fa-solid fa-terminal", text: "Starting", href: "start.js" }]
    }

    if (running.update) {
      return [{ default: true, icon: "fa-solid fa-terminal", text: "Updating", href: "update.js" }]
    }

    if (running.reset) {
      return [{ default: true, icon: "fa-solid fa-terminal", text: "Resetting", href: "reset.js" }]
    }

    if (!installed) {
      return [{ default: true, icon: "fa-solid fa-plug", text: "Install", href: "install.js" }]
    }

    return [
      { default: true, icon: "fa-solid fa-power-off", text: "Start", href: "start.js" },
      { icon: "fa-solid fa-arrows-rotate", text: "Update", href: "update.js" },
      { icon: "fa-solid fa-plug", text: "Re-run install", href: "install.js" },
      {
        icon: "fa-regular fa-circle-xmark",
        text: "Reset",
        href: "reset.js",
        confirm: "Remove the local Audiobook Studio checkout and environments?",
      },
    ]
  },
}
