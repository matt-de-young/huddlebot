'use server'

import { db } from '@/lib/db/drizzle';
import { integrations } from '@/lib/db/schema';
import { getUser } from '@/lib/db/queries';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type ActionResponse = {
  error?: string;
  success?: string;
};

export async function saveIntegration(formData: FormData): Promise<ActionResponse> {
  const user = await getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  const provider = formData.get('provider') as string;
  const apiKey = formData.get('apiKey') as string;
  const teamId = parseInt(formData.get('teamId') as string);

  if (!provider || !apiKey || !teamId) {
    return { error: 'Missing required fields' };
  }

  try {
    // Check if the integration already exists
    const existingIntegration = await db.query.integrations.findFirst({
      where: and(
        eq(integrations.teamId, teamId),
        eq(integrations.provider, provider)
      ),
    });

    if (existingIntegration) {
      // Update existing integration
      await db
        .update(integrations)
        .set({
          apiKey,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(integrations.teamId, teamId),
            eq(integrations.provider, provider)
          )
        );
    } else {
      // Create new integration
      await db.insert(integrations).values({
        teamId,
        provider,
        apiKey,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    revalidatePath('/app/settings/integrations');
    return { success: 'Integration saved successfully' };
  } catch (error) {
    console.error('Error saving integration:', error);
    return { error: 'Failed to save integration' };
  }
}

export async function getTeamIntegrations(teamId: number) {
  const user = await getUser();

  if (!user) {
    return [];
  }

  try {
    const teamIntegrations = await db.query.integrations.findMany({
      where: eq(integrations.teamId, teamId),
    });

    return teamIntegrations;
  } catch (error) {
    console.error('Error fetching integrations:', error);
    return [];
  }
}
