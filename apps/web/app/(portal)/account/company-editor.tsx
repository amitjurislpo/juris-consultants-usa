"use client";

import { useRouter } from "next/navigation";
import { useActionState, useState, useTransition } from "react";
import {
  removeMemberAction,
  saveMemberAction,
  updateCompanyAddressAction,
  type PortalResult,
} from "./portal-actions";

const initial: PortalResult = { error: null, notice: null };

export interface EditableMember {
  id: string;
  name: string;
  role: string;
  ownership: string;
  country: string;
}

export interface EditableAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

function Message({ state }: { state: PortalResult }) {
  return (
    <>
      {state.error ? (
        <p className="pt-error" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.notice ? (
        <p className="pt-ok" role="status">
          {state.notice}
        </p>
      ) : null}
    </>
  );
}

function AddressForm({
  companyId,
  address,
}: {
  companyId: string;
  address: EditableAddress;
}) {
  const [state, action, pending] = useActionState(
    updateCompanyAddressAction,
    initial,
  );
  const field = (name: keyof EditableAddress, label: string, wide = false) => (
    <div className={`pt-field${wide ? " pt-wide" : ""}`}>
      <label htmlFor={`${companyId}-${name}`}>{label}</label>
      <input
        defaultValue={address[name]}
        id={`${companyId}-${name}`}
        maxLength={120}
        name={name}
      />
    </div>
  );
  return (
    <form action={action} className="pt-form" noValidate>
      <input name="companyId" type="hidden" value={companyId} />
      <div className="pt-fields">
        {field("line1", "Address line 1", true)}
        {field("line2", "Address line 2", true)}
        {field("city", "City")}
        {field("state", "State / region")}
        {field("zip", "ZIP / postal code")}
        {field("country", "Country")}
      </div>
      <Message state={state} />
      <div>
        <button className="pt-btn pt-btn-sm" disabled={pending} type="submit">
          {pending ? "Saving..." : "Save address"}
        </button>
      </div>
    </form>
  );
}

function MemberForm({
  companyId,
  member,
  onDone,
}: {
  companyId: string;
  member: EditableMember | null;
  onDone?: () => void;
}) {
  const router = useRouter();
  const [removing, startRemoving] = useTransition();
  const [removeState, setRemoveState] = useState<PortalResult>(initial);
  const [state, action, pending] = useActionState(
    async (previous: PortalResult, formData: FormData) => {
      const result = await saveMemberAction(previous, formData);
      if (!result.error) {
        router.refresh();
        onDone?.();
      }
      return result;
    },
    initial,
  );
  const id = member?.id ?? "new";
  return (
    <form action={action} className="pt-member" noValidate>
      <input name="companyId" type="hidden" value={companyId} />
      {member ? (
        <input name="memberId" type="hidden" value={member.id} />
      ) : null}
      <div className="pt-member-fields">
        <div className="pt-field">
          <label htmlFor={`${id}-name`}>Name</label>
          <input
            defaultValue={member?.name}
            id={`${id}-name`}
            maxLength={100}
            name="name"
            required
          />
        </div>
        <div className="pt-field">
          <label htmlFor={`${id}-role`}>Role</label>
          <input
            defaultValue={member?.role ?? "Owner"}
            id={`${id}-role`}
            maxLength={60}
            name="role"
            required
          />
        </div>
        <div className="pt-field">
          <label htmlFor={`${id}-own`}>Ownership %</label>
          <input
            defaultValue={member?.ownership}
            id={`${id}-own`}
            inputMode="decimal"
            name="ownership"
            required
          />
        </div>
        <div className="pt-field">
          <label htmlFor={`${id}-country`}>Country</label>
          <input
            defaultValue={member?.country}
            id={`${id}-country`}
            maxLength={60}
            name="country"
            required
          />
        </div>
      </div>
      <Message state={state} />
      <Message state={removeState} />
      <div className="pt-member-actions">
        <button
          className="pt-btn pt-btn-sm"
          disabled={pending || removing}
          type="submit"
        >
          {pending ? "Saving..." : member ? "Save member" : "Add member"}
        </button>
        {member ? (
          <button
            className="pt-link-button pt-danger"
            disabled={pending || removing}
            onClick={() =>
              startRemoving(async () => {
                const result = await removeMemberAction(companyId, member.id);
                setRemoveState(result);
                if (!result.error) router.refresh();
              })
            }
            type="button"
          >
            Remove
          </button>
        ) : null}
      </div>
    </form>
  );
}

/** Edit the address and the owners of one company (only while it is not yet filed). */
export function CompanyEditor({
  companyId,
  address,
  members,
}: {
  companyId: string;
  address: EditableAddress;
  members: EditableMember[];
}) {
  const [adding, setAdding] = useState(false);
  return (
    <div className="pt-editor">
      <h4 className="pt-h4">Edit address</h4>
      <AddressForm address={address} companyId={companyId} />
      <h4 className="pt-h4">Edit owners and members</h4>
      <div className="pt-members">
        {members.map((member) => (
          <MemberForm companyId={companyId} key={member.id} member={member} />
        ))}
        {adding ? (
          <MemberForm
            companyId={companyId}
            member={null}
            onDone={() => setAdding(false)}
          />
        ) : (
          <button
            className="pt-btn pt-btn-outline pt-btn-sm"
            onClick={() => setAdding(true)}
            type="button"
          >
            + Add a member
          </button>
        )}
      </div>
    </div>
  );
}
