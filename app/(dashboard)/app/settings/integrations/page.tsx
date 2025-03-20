import { redirect } from 'next/navigation';
import { Integrations } from './integrations';
import { getTeamForUser, getUser } from '@/lib/db/queries';
import { getTeamIntegrations } from './actions';

export default async function IntegrationsPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const teamData = await getTeamForUser(user.id);

  if (!teamData) {
    throw new Error('Team not found');
  }

  const integrations = await getTeamIntegrations(teamData.id);

  return <Integrations teamData={teamData} existingIntegrations={integrations} />;
}
