export interface RequestNewPasswordResult {
  /** List of email addresses that were accepted */
  accepted: string[];
  /** List of email addresses that were rejected */
  rejected: string[];
  /** Time it took to send the envelope */
  envelopeTime: number;
  /** Time it took to send the message */
  messageTime: number;
  /** Size of the message in bytes */
  messageSize: number;
  /** Response from the server */
  response: string;
  /** Envelope information */
  envelope: {
    from: string;
    to: string[];
  };
  /** Message identifier */
  messageId: string;
}

export interface AccountCreationPostBody {
  carte: string;
  token: string | null;
  code2p5: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
}


export interface AccountCreationPostResult {
  carte: string;
  token: string | null;
  code2p5: number;
  nom: string;
  prenom: string;
  email: string;
  id: number
}

export interface AccountCreation {
  card: string;
  token: string | null;
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  code2p5: number;
}
