export interface rawRequestPasswordResetResult {
  accepted: string[];
  rejected: string[];
  envelopeTime: number;
  messageTime: number;
  /** Size of the message in bytes */
  messageSize: number;
  /** SMTP Code */
  response: string;
  envelope: {
    /** Sender email */
    from: string;
    /** Recipient email */
    to: string[];
  };
  /** Message ID */
  messageId: string;
}
