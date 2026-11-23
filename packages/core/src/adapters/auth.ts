export interface AuthenticatedUser {
  readonly id: string;
  readonly email: string;
  readonly role: "CUSTOMER" | "STAFF" | "SUPER_ADMIN";
}

export interface AuthAdapter {
  getSession(): Promise<AuthenticatedUser | null>;
  sendEmailOtp(email: string): Promise<void>;
  verifyEmailOtp(
    email: string,
    code: string,
  ): Promise<AuthenticatedUser | null>;
}

export class MockAuthAdapter implements AuthAdapter {
  private session: AuthenticatedUser | null = null;
  private otp: string | null = null;
  readonly sentOtps: { readonly email: string; readonly code: string }[] = [];

  constructor(private readonly role: AuthenticatedUser["role"] = "CUSTOMER") {}

  async getSession(): Promise<AuthenticatedUser | null> {
    return this.session;
  }

  async sendEmailOtp(email: string): Promise<void> {
    this.otp = "123456";
    this.sentOtps.push({ email, code: this.otp });
  }

  async verifyEmailOtp(
    email: string,
    code: string,
  ): Promise<AuthenticatedUser | null> {
    if (!this.otp || code !== this.otp) return null;
    this.session = {
      id: `mock_${email}`,
      email,
      role: this.role,
    };
    return this.session;
  }
}
