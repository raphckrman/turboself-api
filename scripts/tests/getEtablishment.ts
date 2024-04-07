import { authenticateWithCredentials, searchEstablishment, getEtablishment } from "../../lib"

async function main() {
    console.log("\x1b[0mFetching etablishments ID 287\x1b[0m")
    const search = await getEtablishment(287)
    console.log("Name\x1b[34m » \x1b[1;32m" + search.name + " \x1b[0m\x1b[0m")
    console.log("Addresse\x1b[34m » \x1b[1;32m" + search.geolocation?.address1 + " " + search.geolocation?.zipCode + " " + search.geolocation?.city + " \x1b[0m\x1b[0m")
    console.log("Version\x1b[34m » \x1b[1;32m" + search.version + " \x1b[0m\x1b[0m")
    console.log("Code UAI\x1b[34m » \x1b[1;32m" + search.uai + " \x1b[0m\x1b[0m")
    console.log("Code 2P5\x1b[34m » \x1b[1;32m" + search.code + " \x1b[0m\x1b[0m")
    console.log("Monnaie\x1b[34m » \x1b[1;32m" + search.currencySymbol + " \x1b[0m\x1b[0m")
    console.log("Crédit minimum\x1b[34m » \x1b[1;32m" + search.minimumCredit + " \x1b[0m\x1b[0m")
    console.log("Repas minimum\x1b[34m » \x1b[1;32m" + search.minimumMeal + " \x1b[0m\x1b[0m")
    console.log("MAC Address\x1b[34m » \x1b[1;32m" + search.macServerAddress + "\x1b[0m\x1b[0m")
    console.log(" ")
    console.log("Élève peuvent utiliser les QRCode ?\x1b[34m » \x1b[1;32m" + search.permissions?.canStudentUseQrCode + "\x1b[0m\x1b[0m")
    console.log("Élève peuvent virer l'historique? \x1b[34m » \x1b[1;32m" + search.permissions?.canStudentSeeHistory + "\x1b[0m\x1b[0m")
    console.log(search)
}

main()