import { authenticateWithCredentials, searchEstablishment } from "../../lib"

async function main() {
    const client = await authenticateWithCredentials({
        username: "your_email",
        password: "your_password"
    })

    const host = await client.getHost()
    const balance = await host.getBalance()
    console.log(balance)
}

main()