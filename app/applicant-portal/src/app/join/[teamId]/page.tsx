import JoinPage from "./JoinPage";

export default function Page({ params }: { params: { teamId: string } }) {
  const { teamId } = params;
  return <JoinPage teamIdToJoin={teamId} />;
}