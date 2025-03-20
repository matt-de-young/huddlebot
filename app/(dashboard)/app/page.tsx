import { redirect } from 'next/navigation';
import { getTeamForUser, getUser } from '@/lib/db/queries';
import { Suspense } from 'react';
import { DashboardContent } from './dashboard-content';
import { DashboardSkeleton } from '@/components/dashboard-skeleton';

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const teamData = await getTeamForUser(user.id);

  if (!teamData) {
    throw new Error('Team not found');
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <main className="flex-1 container py-6 px-4">
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent teamId={teamData.id} />
        </Suspense>
      </main>
    </div>
  );
}
