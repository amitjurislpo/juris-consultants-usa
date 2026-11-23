export type DomainEventName =
  | "order.paid"
  | "order.status_changed"
  | "kyc.document_rejected"
  | "kyc.document_approved"
  | "deliverable.ready"
  | "consultation.booked";

export interface DomainEvent {
  readonly name: DomainEventName;
  readonly occurredAt: string;
  readonly payload: Readonly<Record<string, unknown>>;
}

export function createDomainEvent(
  name: DomainEventName,
  payload: Readonly<Record<string, unknown>>,
  occurredAt = new Date().toISOString(),
): DomainEvent {
  return { name, occurredAt, payload };
}

export interface DomainEventBus {
  publish(event: DomainEvent): void | Promise<void>;
}

export class InMemoryDomainEventBus implements DomainEventBus {
  private readonly handlers = new Map<
    DomainEventName,
    readonly ((event: DomainEvent) => void | Promise<void>)[]
  >();

  subscribe(
    name: DomainEventName,
    handler: (event: DomainEvent) => void | Promise<void>,
  ): () => void {
    const existing = this.handlers.get(name) ?? [];
    this.handlers.set(name, [...existing, handler]);
    return () => {
      this.handlers.set(
        name,
        (this.handlers.get(name) ?? []).filter(
          (candidate) => candidate !== handler,
        ),
      );
    };
  }

  async publish(event: DomainEvent): Promise<void> {
    for (const handler of this.handlers.get(event.name) ?? []) {
      await handler(event);
    }
  }
}
