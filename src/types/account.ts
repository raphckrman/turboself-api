export interface rawRequestPasswordResetResult {
    accepted: Array<string>;
    rejected: Array<string>;
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
        to: Array<string>;
    };
    /** Message ID */
    messageId: string;
}
