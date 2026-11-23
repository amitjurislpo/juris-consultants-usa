import { randomUUID } from "node:crypto";
import { Resend } from "resend";

export interface EmailMessage {
  readonly to: string;
  readonly subject: string;
  readonly text: string;
  readonly html?: string;
}

export interface EmailSendResult {
  readonly id: string;
  readonly status: "accepted" | "logged";
}

export interface EmailAdapter {
  send(message: EmailMessage): Promise<EmailSendResult>;
}

export interface ResendEmailAdapterConfig {
  readonly apiKey: string;
  readonly from: string;
  readonly replyTo?: string;
}

export class ResendEmailAdapter implements EmailAdapter {
  private readonly client: Resend;

  constructor(private readonly config: ResendEmailAdapterConfig) {
    if (!config.apiKey.trim()) throw new Error("Resend API key is required");
    if (!config.from.trim())
      throw new Error("Resend sender address is required");
    this.client = new Resend(config.apiKey);
  }

  async send(message: EmailMessage): Promise<EmailSendResult> {
    const response = await this.client.emails.send({
      from: this.config.from,
      to: message.to,
      subject: message.subject,
      text: message.text,
      ...(message.html === undefined ? {} : { html: message.html }),
      ...(this.config.replyTo === undefined
        ? {}
        : { replyTo: this.config.replyTo }),
    });

    if (response.error) {
      throw new Error(
        `Resend failed to accept email: ${response.error.message}`,
      );
    }
    if (!response.data?.id) {
      throw new Error("Resend returned no email id");
    }
    return { id: response.data.id, status: "accepted" };
  }
}

export type ConsoleEmailLogger = (message: EmailMessage) => void;

export class ConsoleEmailAdapter implements EmailAdapter {
  constructor(
    private readonly log: ConsoleEmailLogger = (message) => {
      console.info("Email logged to console; no email was delivered.", message);
    },
  ) {}

  async send(message: EmailMessage): Promise<EmailSendResult> {
    this.log(message);
    return { id: `console:${randomUUID()}`, status: "logged" };
  }
}

export class InMemoryEmailAdapter implements EmailAdapter {
  readonly sent: EmailMessage[] = [];

  async send(message: EmailMessage): Promise<EmailSendResult> {
    this.sent.push(message);
    return { id: `mock_email_${this.sent.length}`, status: "logged" };
  }
}
