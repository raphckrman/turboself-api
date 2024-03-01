# 🔧 Utilisation
### Connexion par identifiants
```javascript
const TurboSelf = require('turboself-api')

async function main() {
  let client = await TurboSelf.authTurboselfWithCredentials("your_email", "your_password")
  console.log(client)
}

main()
```
### Réserver un déjeuner pour lundi prochain
```javascript
const TurboSelf = require('turboself-api')

async function main() {
  let client = await TurboSelf.authTurboselfWithCredentials("your_email", "your_password")
  client.bookDay(1, await client.getCurrentBookingWeekNumber()+1, 1)
}

main()
```
