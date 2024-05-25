# turboself-api

[![npm](https://img.shields.io/npm/l/turboself-api)](https://www.npmjs.com/package/turboself-api)
[![npm version](https://badge.fury.io/js/turboself-api.svg)](https://badge.fury.io/js/turboself-api)
[![npm](https://img.shields.io/npm/dw/turboself-api)](https://www.npmjs.com/package/turboself-api)
[![npm](https://img.shields.io/npm/dt/turboself-api)](https://www.npmjs.com/package/turboself-api)

A simple wrapper to interact with the TurboSelf API.

> [!warning]
> This project is not affiliated with TurboSelf or INCB in any way.

## 📝 Roadmap

- [X] Authentification

  - [x] With credentials
  - [X] With token (with Pronote for example)

- [x] Reset password request (with email)

- [x] Get informations

  - [x] Balance
  - [x] Bookings
  - [x] History
  - [x] Host
  - [x] Last transaction
  - [x] Permissions to book evenings meals
  - [x] Siblings
  - [x] User

- [x] Seaching an etablishment

  - [x] By city
  - [x] With Limit

- [x] Get etablishment informations

- [x] Book a meal (book and cancel)

## 📦 Installation

```bash
npm install turboself-api
```

## 🔧 Usage

### Authentification with credentials

```javascript
const TurboSelf = require("turboself-api");

async function main() {
  let client = await TurboSelf.authenticateWithCredentials({
    username: "your_email",
    password: "your_password",
  });
  console.log(client);
}

main();
```

### Other exemples

To see more examples, check the [examples](https://github.com/raphckrman/turboself-api/tree/dev/examples) folder.

## ௷ Credits

Thanks to the following people for their contributions to this project:

- [Remy Godet](https://github.com/godetremy)
- [Tom Theret](https://github.com/tom-theret)
