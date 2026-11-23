# `@juris/core`

Server-side domain logic and vendor adapters. Do not expose adapter credentials to browser code.

## Resend email

Construct `ResendEmailAdapter` with explicit `apiKey` and verified `from` address; `replyTo` is optional. Load the API key from the server's secret configuration (for example `RESEND_API_KEY`) and pass it to the constructor. Missing required configuration fails immediately. Resend API errors are thrown; a successful response means Resend accepted the message, not that it reached the recipient.

`ConsoleEmailAdapter` is for local development only. It writes the message to the server console and returns `status: "logged"` to make clear that no email was delivered.

## Vercel Blob storage

Create a **private** Blob store and pass its `BLOB_READ_WRITE_TOKEN` to `VercelBlobStorageAdapter` as `token`. Keep it server-side. The adapter uploads with private access, and returns the Vercel Blob URL as the opaque storage key; store that value for later download URL generation or deletion. Signed download URLs expire after the requested duration, up to seven days. SDK/network failures are propagated to the caller.
