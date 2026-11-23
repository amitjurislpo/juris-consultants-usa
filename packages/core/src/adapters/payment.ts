export type PaymentStatus = "PENDING" | "SUCCEEDED" | "FAILED";

export interface CreatePaymentInput {
  readonly orderId: string;
  readonly amountUsd: number;
  readonly currency: "USD";
  readonly successUrl?: string;
  readonly cancelUrl?: string;
}

export interface PaymentSession {
  readonly id: string;
  readonly status: PaymentStatus;
  readonly amountUsd: number;
  readonly currency: "USD";
}

export interface PaymentProvider {
  createPayment(input: CreatePaymentInput): Promise<PaymentSession>;
  verifyWebhook(
    rawBody: string | Uint8Array,
    signature: string,
  ): Promise<boolean>;
}

export class MockPaymentProvider implements PaymentProvider {
  constructor(private mode: "success" | "fail" = "success") {}

  setMode(mode: "success" | "fail"): void {
    this.mode = mode;
  }

  async createPayment(input: CreatePaymentInput): Promise<PaymentSession> {
    return {
      id: `mock_payment_${input.orderId}`,
      status: this.mode === "success" ? "SUCCEEDED" : "FAILED",
      amountUsd: input.amountUsd,
      currency: "USD",
    };
  }

  async verifyWebhook(
    _rawBody: string | Uint8Array,
    signature: string,
  ): Promise<boolean> {
    return signature === "mock-valid-signature";
  }
}
