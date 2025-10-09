import StatusBadge from "@/components/StatusBadge";

export default function MemberPreview() {
  return (
    <div className="flex gap-2 justify-between py-1">
      <div className="flex gap-4">
        <div className="flex gap-2 align-baseline">
          <p className="text-sm">Grace Smith</p>
          <p className="text-muted-foreground text-sm">g.smith@sfsu.edu</p>
        </div>
      </div>
      <StatusBadge status={"WAITLISTED"} />
    </div>
  );
}

