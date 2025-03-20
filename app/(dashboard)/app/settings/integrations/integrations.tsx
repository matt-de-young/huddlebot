'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useActionState } from 'react';
import { saveIntegration } from './actions';
import { TeamDataWithMembers, Integration } from '@/lib/db/schema';
import { useUser } from '@/lib/auth';
import { use } from 'react';

// Update ActionState to include provider for tracking which form is being submitted
type ActionState = {
  error?: string;
  success?: string;
  provider?: string;
};

export function Integrations({
  teamData,
  existingIntegrations = [],
}: {
  teamData: TeamDataWithMembers;
  existingIntegrations: Integration[];
}) {
  const { userPromise } = useUser();
  const user = use(userPromise);
  const isOwner = user?.role === 'owner';

  // Track which provider is being saved
  const [activeProvider, setActiveProvider] = useState<string | null>(null);

  const [saveState, saveAction, isSavePending] = useActionState<
    ActionState,
    FormData
  >(
    async (prevState, formData) => {
      // Extract provider before sending to server action
      const provider = formData.get('provider') as string;
      setActiveProvider(provider);

      try {
        const result = await saveIntegration(formData);
        return { ...result, provider };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : 'An error occurred',
          provider
        };
      }
    },
    { error: '', success: '' }
  );

  // Convert existing integrations to a map for easy lookup
  const integrationMap = existingIntegrations.reduce((acc, integration) => {
    acc[integration.provider] = integration.apiKey;
    return acc;
  }, {} as Record<string, string>);

  const integrations = [
    {
      id: 'github',
      name: 'GitHub',
      description: 'Connect to GitHub to sync issues and pull requests.',
      docs: 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token',
    },
    {
      id: 'linear',
      name: 'Linear',
      description: 'Connect to Linear to sync tasks and workflows.',
      docs: 'https://developers.linear.app/docs/graphql/working-with-the-graphql-api#personal-api-keys',
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Connect to Slack to receive notifications and updates.',
      docs: 'https://api.slack.com/authentication/basics',
    },
  ];

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium mb-6">Integrations</h1>
      {integrations.map((integration) => (
        <Card key={integration.id} className="mb-8">
          <CardHeader className="flex flex-row items-center gap-4">
            <div>
              <CardTitle>{integration.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {integration.description}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form action={saveAction} className="space-y-4">
              <input type="hidden" name="teamId" value={teamData.id} />
              <input type="hidden" name="provider" value={integration.id} />
              <div>
                <Label htmlFor={`${integration.id}-api-key`}>API Key</Label>
                <Input
                  id={`${integration.id}-api-key`}
                  name="apiKey"
                  type="password"
                  placeholder={`Enter your ${integration.name} API key`}
                  defaultValue={integrationMap[integration.id] || ''}
                  required
                  disabled={!isOwner || (isSavePending && activeProvider === integration.id)}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                You can find your {integration.name} API key in your{' '}
                <a
                  href={integration.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {integration.name} account settings
                </a>.
              </p>
              {saveState?.error && saveState.provider === integration.id && (
                <p className="text-red-500">{saveState.error}</p>
              )}
              {saveState?.success && saveState.provider === integration.id && (
                <p className="text-green-500">{saveState.success}</p>
              )}
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                disabled={isSavePending || !isOwner}
              >
                {isSavePending && activeProvider === integration.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Integration'
                )}
              </Button>
            </form>
          </CardContent>
          {!isOwner && (
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                You must be a team owner to manage integrations.
              </p>
            </CardFooter>
          )}
        </Card>
      ))}
    </section>
  );
}
