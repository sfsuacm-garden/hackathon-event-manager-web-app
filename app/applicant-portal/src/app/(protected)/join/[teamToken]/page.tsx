import JoinPage from './JoinPage';

export default async function Page({ params }: { params: Promise<{ teamToken: string }> }) {
  const { teamToken } = await params;
  return <JoinPage joinTeamToken={teamToken} />;
}
