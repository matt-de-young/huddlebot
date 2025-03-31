import { SquareKanban, GitPullRequestArrow, MessagesSquare } from 'lucide-react';

export default function HomePage() {
  return (
    <main>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="lg:grid lg:grid-cols-12 lg:gap-8"> */}
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                Never say
                <span className="block text-orange-500">&ldquo;No updates from me&ldquo;</span>
                ever again
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Use AI to automate your huddle or standup so that you can focus on actually providing value.
              </p>
            {/* </div> */}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <SquareKanban className="h-6 w-6"/>
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Linear
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Keep your issues up to date and there is no need to say outloud what everyone can read.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <GitPullRequestArrow className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  GitHub
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Let your teamates know that there is a PR waiting for review.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <MessagesSquare className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Slack
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Inform your team every morning and follow up about issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
