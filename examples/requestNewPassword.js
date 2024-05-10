const TurboSelf = require('turboself-api')

async function main() {
    let newPasswordRequest = await TurboSelf.requestNewPassword("your_email");
    console.log(newPasswordRequest);
}

main()
