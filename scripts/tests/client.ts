import { authenticateWithCredentials, searchEstablishment } from "../../lib"

async function main() {
    const client = await authenticateWithCredentials({
        username: "your email",
        password: "your password"
    })

    const host = await client.getHost()
    const balance = await host.getBalance()
    console.log(balance)
}

main()