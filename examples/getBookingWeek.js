const TurboSelf = require('turboself-api')

async function main() {
  let client = await TurboSelf.authenticateWithCredentials({ username: "your_email", password: "your_password" })
  let weeksAvailable = await client.getBookingWeek()

  for (let week of weeksAvailable.weeksNumber) {
    const bookings = await client.getBookingWeek(week)
    console.log({ bookings })
  }
}

main()