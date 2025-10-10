import JoinPage from "./JoinPage";

export default async function Page({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;
  return <JoinPage teamIdToJoin={teamId} />;
}