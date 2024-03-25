import { authenticateWithCredentials, searchEtablishment } from "../../lib"

async function main() {
    console.log("\x1b[0mFetching etablishments in Paris (search results are limited to 20)\x1b[0m")
    const search = await searchEtablishment("Paris", 20)
    for (const etab of search) {
        console.log("\x1b[34m» \x1b[1;32m" + etab.name + " \x1b[0mis running at version \x1b[1;32m" + etab.version + "\x1b[0m")
    }
}

main()