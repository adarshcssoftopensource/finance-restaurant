import { useState } from "react";
import { MoreHorizontal, Plus, ShieldCheck } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { StatusPill } from "@/components/common/status-pill";
import {
  InviteMemberModal,
  MemberAvatar,
} from "@/features/dashboard/components/invite-member-modal";
import { RolePill } from "@/features/dashboard/components/role-pill";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AUDIT_LOG, MEMBERS, ROLES } from "@/data/team";

export default function Team() {
  const [members, setMembers] = useState(MEMBERS);
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <section>
      <PageHeader
        title="Team"
        subtitle="Who can access this account, and what they can do"
        actions={
          <Button onClick={() => setInviteOpen(true)}>
            <Plus className="size-4" />
            Invite member
          </Button>
        }
      />

      <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-coral-soft bg-coral-tint px-[15px] py-3 text-[13px]">
        <ShieldCheck
          className="size-[17px] shrink-0 text-coral-d"
          strokeWidth={1.9}
        />
        <span>
          You&apos;re signed in as <b>Alex Morgan · Owner</b>. Owners and Admins
          can invite people and manage roles.
        </span>
      </div>

      <div className="mb-[22px] grid grid-cols-1 gap-3 min-[1080px]:grid-cols-4">
        {ROLES.map((role) => (
          <Card key={role.key} className="p-4">
            <div className="flex items-center gap-2 text-[14px] font-bold">
              <i className={`size-2 rounded-full ${role.dot}`} />
              {role.title}
            </div>
            <p className="mt-2 text-[12px] leading-snug text-muted-foreground">
              {role.body}
            </p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <span className="font-mono text-[11px] text-muted-foreground">
            {members.length} people
          </span>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden min-[820px]:table-cell">
                Locations
              </TableHead>
              <TableHead className="hidden min-[820px]:table-cell">
                Last active
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-[11px]">
                    <MemberAvatar
                      initials={member.initials}
                      bg={member.avatarBg}
                      size="sm"
                    />
                    <div>
                      <b className="block text-[13.5px] font-bold">
                        {member.name}
                        {member.isYou ? (
                          <span className="font-medium text-faint"> · you</span>
                        ) : null}
                      </b>
                      <span className="font-mono text-[10.5px] text-muted-foreground">
                        {member.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <RolePill role={member.role} />
                </TableCell>
                <TableCell className="hidden tnum text-muted-foreground min-[820px]:table-cell">
                  {member.locations}
                </TableCell>
                <TableCell className="hidden tnum text-muted-foreground min-[820px]:table-cell">
                  {member.lastActive}
                </TableCell>
                <TableCell>
                  <StatusPill
                    tone={member.status === "Active" ? "success" : "warning"}
                  >
                    {member.status}
                  </StatusPill>
                </TableCell>
                <TableCell className="text-right">
                  {!member.isYou ? (
                    <button
                      type="button"
                      aria-label="Manage"
                      className="grid size-[30px] place-items-center rounded-lg border bg-card text-muted-foreground hover:border-faint hover:text-foreground"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Audit log</CardTitle>
          <span className="font-mono text-[11px] text-muted-foreground">
            every sensitive action, recorded
          </span>
        </CardHeader>
        {AUDIT_LOG.map((entry) => (
          <div
            key={entry.id}
            className="flex items-start gap-3 border-b px-[18px] py-3 text-[13px] last:border-b-0"
          >
            <MemberAvatar initials={entry.initials} bg={entry.avatarBg} />
            <div>
              <span dangerouslySetInnerHTML={{ __html: entry.html }} />
              <time className="mt-0.5 block font-mono text-[10px] text-faint">
                {entry.time}
              </time>
            </div>
          </div>
        ))}
      </Card>

      <InviteMemberModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onInvite={(member) => setMembers((m) => [...m, member])}
      />
    </section>
  );
}
