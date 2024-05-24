import { AccountCreationPostResult, AccountCreation, AccountCreationPostBody } from "../interfaces/Account";
import { CREATE_ACCOUNT } from "../utils/endpoints";
import { TurboselfFetcher } from "../utils/fetcher";

export const createAccount = async (
  /* Number after the 2p5 */
  card: string,
  token: string | null,
  /* First 4 digits of the card */
  code2p5: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<AccountCreation> => {
  const response = await TurboselfFetcher("https://api-rest-prod.incb.fr" + CREATE_ACCOUNT(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      carte: card,
      token: token,
      code2p5: code2p5,
      nom: lastName,
      prenom: firstName,
      email: email,
      password: password
    })
  });

  const raw = await response.json() as AccountCreationPostResult;
  return {
    card: raw.carte,
    token: raw.token,
    code2p5: raw.code2p5,
    firstName: raw.prenom,
    lastName: raw.nom,
    email: raw.email,
    id: raw.id
  } as AccountCreation;
};
