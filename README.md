# turboself-api

[![npm](https://img.shields.io/npm/l/turboself-api)](https://www.npmjs.com/package/turboself-api)
[![npm version](https://badge.fury.io/js/turboself-api.svg)](https://badge.fury.io/js/turboself-api)
[![npm](https://img.shields.io/npm/dw/turboself-api)](https://www.npmjs.com/package/turboself-api)
[![npm](https://img.shields.io/npm/dt/turboself-api)](https://www.npmjs.com/package/turboself-api)

A powerful and user-friendly wrapper for interacting with the TurboSelf API.

> [!warning]
> This project is not affiliated with TurboSelf or INCB in any way.

## 🚀 What's New in v2.0
- **Complete Code Refactoring**: Improved project structure for better maintainability and performance.
- **New Endpoints**: Added new endpoints to provide more comprehensive coverage of TurboSelf API functionalities.
- **Bug Fixes**: Corrected type errors that were due to missing documentation in version 1.0.
- **Performance Enhancements**: Optimized code for faster response times and better overall performance.

## 📦 Installation
```
npm install turboself-api
```

## 📚 Exemple
```ts
import { authenticateWithCredentials } from "turboself-api";

async function main() {
  let client = await authenticateWithCredentials(
    "your_email", 
    "your_password"
  )

  console.log(client)
}

main();
```

## 💡 Credits
Thanks to the following people for their contributions to this project:
- [Remy Godet](https://github.com/godetremy)
- [Tom Theret](https://github.com/tom-theret)
- [TouchGuild](https://github.com/DinographicPixels/TouchGuild/) for the ESLint rules
