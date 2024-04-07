const TurboSelf = require('turboself-api')

async function main() {
    let client = await TurboSelf.authenticateWithCredentials({ username: "your_email", password: "your_password" })
    let currentWeek = await client.getBookingWeek();

    await week.terminals[0].days[0].book()
    console.log("Booked the day " + week.terminals[0].days[0].date)
}

main()
