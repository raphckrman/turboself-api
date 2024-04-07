const TurboSelf = require('turboself-api')

async function main() {
  let client = await TurboSelf.authenticateWithCredentials({ username: "your_email", password: "your_password" })
  let latestPayment = await client.getLatestPayment()
  console.log(latestPayment)
}

main()