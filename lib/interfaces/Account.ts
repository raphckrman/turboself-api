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
