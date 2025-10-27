import StatusBadge from '@/components/StatusBadge';

interface MemberPreviewProps {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  status: string | null; // validate in component body (yes ik not optimal)
}

export default function MemberPreview(props: MemberPreviewProps) {
  const firstName = props.firstName ?? 'Unknown';
  const lastName = props.lastName ?? 'Unknown';
  const fullName = firstName + lastName;
  // const email = props.email ?? 'Unknown';
  const status = props.status?.toUpperCase() as 'PENDING' | 'REJECTED' | 'ACCEPTED' | 'WAITLISTED';

  return (
    <div className="flex gap-2 justify-between py-1">
      <div className="flex gap-4">
        <div className="flex gap-2 align-baseline">
          <p className="text-sm">{fullName}</p>
          {/* <p className="text-muted-foreground text-sm">{email}</p> */}
        </div>
      </div>
      <StatusBadge status={status} />
    </div>
  );
}
