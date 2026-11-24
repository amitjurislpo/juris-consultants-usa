import { prisma } from "@juris/db";
import { Card } from "@juris/ui";
import {
  DEFAULT_TIME_ZONE,
  isSupportedTimeZone,
} from "../../../src/lib/datetime";
import { requireAdmin } from "../../../src/lib/guard";
import { EditableAvatar } from "../editable-avatar";
import { DetailsForm } from "./details-form";

export const metadata = { title: "My details" };

export default async function MyDetailsPage() {
  const admin = await requireAdmin();
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: admin.id },
    select: {
      name: true,
      email: true,
      image: true,
      role: true,
      timezone: true,
    },
  });
  const name = user.name ?? "";

  return (
    <div className="stack">
      <h1>My details</h1>
      <Card solid className="mg-card">
        <h2 className="mg-card-title">Profile photo</h2>
        <div className="profile-photo-row">
          <EditableAvatar
            allowRemove
            image={user.image}
            name={name || user.email}
            size={88}
          />
          <p className="muted">
            Click the pencil to change your photo. Without one, the first letter
            of your name is shown.
          </p>
        </div>
      </Card>
      <Card solid className="mg-card">
        <h2 className="mg-card-title">Basic details</h2>
        <DetailsForm
          email={user.email}
          name={name}
          role={user.role === "SUPER_ADMIN" ? "Super admin" : "Staff"}
          timeZone={
            isSupportedTimeZone(user.timezone)
              ? user.timezone
              : DEFAULT_TIME_ZONE
          }
        />
      </Card>
    </div>
  );
}
