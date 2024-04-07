const TurboSelf = require('turboself-api')

async function main() {
    let client = await TurboSelf.authenticateWithCredentials({ username: "your_email", password: "your_password" })
    let siblings = await client.getSiblings()
    let evening = await client.canBookEvening()
    console.log("Number of siblings\x1b[34m » \x1b[1;32m" + siblings.length + "\x1b[0m")
    console.log("Can book evening\x1b[34m » \x1b[1;32m" + evening)
}

main()