const TurboSelf = require('turboself-api')

async function main() {
  let client = await TurboSelf.authTurboselfWithCredentials("your_email", "your_password")
  let weeksAvailable = await client.getBooksWeeksAvailable()
  
  for (let week of weeksAvailable) {
    const bookings = await client.getBookings(week)
    console.log(bookings[0].jours)
  }
}

main()