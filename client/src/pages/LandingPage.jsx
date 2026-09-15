import { Link } from 'react-router-dom';
import {
  LayoutGrid,
  Calendar,
  BarChart3,
  FileText,
  ArrowRight,
  Kanban,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function LandingPage() {
  const features = [
    {
      icon: Kanban,
      title: 'Kanban Board',
      description:
        'Visualize your applications from submission to offer with custom drag-and-drop pipeline columns.',
    },
    {
      icon: Calendar,
      title: 'Calendar View',
      description:
        'Keep track of upcoming interviews, follow-up deadlines, and assessment due dates seamlessly.',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description:
        'Understand your application velocity, interview conversion rates, and response metrics.',
    },
    {
      icon: FileText,
      title: 'Resume Version History',
      description:
        'Link specific resume versions and cover letters directly to each targeted application.',
    },
  ];

  return (
    <div className="w-full h-screen overflow-y-auto flex flex-col bg-slate-50/50 text-slate-900">
      {/* Navigation Bar Header */}
      <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-full mx-auto w-full px-6! sm:px-10! py-4! flex items-center justify-between">
          <div className="flex items-center gap-3! font-bold text-xl! tracking-tight text-slate-900">
            <div className="p-2! rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <LayoutGrid className="w-5! h-5!" />
            </div>
            <span>JobTracker</span>
          </div>
          <div className="flex items-center gap-4!">
            <Link
              to="/sign-in"
              className={buttonVariants({
                variant: 'ghost',
                className:
                  'px-5! py-2.5! text-slate-700 hover:text-slate-900 hover:bg-slate-100',
              })}
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className={buttonVariants({
                className:
                  'px-6! py-2.5! bg-slate-900 text-white hover:bg-slate-800 shadow-xs',
              })}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col">
        {/* Hero Section */}
        <section className="w-full py-20! sm:py-28! px-6! sm:px-10!">
          <div className="max-w-full mx-auto flex flex-col items-center text-center gap-6!">
            <Badge
              variant="outline"
              className="px-5! py-2! text-sm! font-medium! rounded-full! bg-slate-100! text-slate-800! border-slate-300!"
            >
              Streamline Your Career Search
            </Badge>

            <h1 className="text-4xl! sm:text-5xl! lg:text-6xl! font-extrabold! tracking-tight! leading-tight! text-slate-900!">
              Your job search, organized
            </h1>

            <p className="text-lg! sm:text-xl! text-slate-600! max-w-2xl! leading-relaxed! font-normal">
              Track every application, move it through your pipeline, and see
              how your search is actually performing.
            </p>

            <div className="flex flex-row items-center justify-center gap-4! pt-4!">
              <Link
                to="/sign-up"
                className={buttonVariants({
                  size: 'lg',
                  className:
                    'px-7! py-3.5! h-auto! text-base! font-medium! gap-2.5! bg-slate-900 text-white hover:bg-slate-800 shadow-md',
                })}
              >
                Get Started
                <ArrowRight className="w-5! h-5!" />
              </Link>
              <Link
                to="/sign-in"
                className={buttonVariants({
                  variant: 'outline',
                  size: 'lg',
                  className:
                    'px-7! py-3.5! h-auto! text-base! font-medium! border-slate-300 text-slate-800 hover:bg-slate-100',
                })}
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="w-full py-16! sm:py-24! px-6! sm:px-10! border-t border-slate-200">
          <div className="max-w-full mx-auto w-full">
            <div className="text-center max-w-2xl mx-auto mb-14! flex flex-col gap-3!">
              <h2 className="text-3xl! sm:text-4xl! font-bold! tracking-tight text-slate-900">
                Everything you need in one pipeline
              </h2>
              <p className="text-base! sm:text-lg! text-slate-600">
                Built to reduce the noise of job hunting and give you clear,
                actionable clarity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6! sm:gap-8!">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={feature.title}
                    className="p-6! sm:p-8! flex flex-col justify-start h-full border border-slate-200 bg-white rounded-xl! shadow-xs hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-12! h-12! rounded-xl! bg-slate-900 text-white flex items-center justify-center mb-6! shrink-0">
                      <Icon className="w-6! h-6!" />
                    </div>
                    <h3 className="text-xl! font-bold! text-slate-900 mb-3! tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm! sm:text-base! text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Closing CTA Section */}
        <section className="w-full py-16! sm:py-24! px-6! sm:px-10!">
          <div className="max-w-full mx-auto w-full">
            <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl! p-10! sm:p-16! text-center flex flex-col items-center gap-6! shadow-xl">
              <h2 className="text-3xl! sm:text-4xl! font-bold! tracking-tight text-white">
                Ready to take control of your application process?
              </h2>
              <p className="text-slate-300 text-base! sm:text-lg! max-w-xl! leading-relaxed">
                Start managing your interviews, offers, and strategy today with
                a streamlined workflow.
              </p>
              <Link
                to="/sign-up"
                className={buttonVariants({
                  size: 'lg',
                  className:
                    'px-8! py-4! h-auto! text-base! font-medium! gap-2.5! bg-white text-slate-900 hover:bg-slate-100 mt-2! shadow-sm',
                })}
              >
                Get Started
                <ArrowRight className="w-5! h-5!" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Page Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-8! px-6! text-center text-sm! text-slate-500">
        <p>© {new Date().getFullYear()} JobTracker. All rights reserved.</p>
      </footer>
    </div>
  );
}
