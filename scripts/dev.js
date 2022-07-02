const { spawn } = require("child_process")
const { argv } = require("process")
const { NGROK_SUBDOMAIN, DATABASE_NAME, PORT} = process.env

const main = (argv) => {
  const dbs = argv
    .find((a) => a.startsWith("db="))
    ?.slice(3)
    ?.split(",") ?? ["development:3309", "shadow:3310"]

  startApp()
  startDatabases(dbs)
}

const startApp = () => {
  const serverCommand = spawn("next", ["-p", PORT], {
    cwd: "./",
  })
  serverCommand.stdout.on("data", (data) => {
    console.log(`[web]: ${data}`)
  })
  serverCommand.stderr.on("data", (data) => {
    console.error(`[web]: ${data}`)
  })
  serverCommand.on("close", (code) => {
    console.log(`[web]: child process exited with code ${code}`)
  })

  if (NGROK_SUBDOMAIN) {
    const ngrokCommand = spawn("ngrok", [
      "http",
      "-bind-tls=true",
      "-region=us",
      `-subdomain=${NGROK_SUBDOMAIN}`,
      `localhost:${PORT}`,
    ])
    ngrokCommand.stdout.on("data", (data) => {
      console.log(`[web-ngrok]: ${data}`)
    })
    ngrokCommand.stderr.on("data", (data) => {
      console.error(`[web-ngrok]: ${data}`)
    })
    ngrokCommand.on("close", (code) => {
      console.log(`[web-ngrok]: child process exited with code ${code}`)
    })
  }
}

const startDatabases = (dbs) => {
  dbs.forEach((db) => {
    const split = db.split(":")
    const branch = split[0]
    const port = split[1]

    const databaseCommand = spawn("pscale", ["connect", DATABASE_NAME, branch, "--port", port], {
      cwd: "./",
    })
    databaseCommand.stdout.on("data", (data) => {
      console.log(`[web]: ${data}`)
    })
    databaseCommand.stderr.on("data", (data) => {
      console.error(`[web]: ${data}`)
    })
    databaseCommand.on("close", (code) => {
      console.log(`[web]: child process exited with code ${code}`)
    })
  })
}

main(argv)
