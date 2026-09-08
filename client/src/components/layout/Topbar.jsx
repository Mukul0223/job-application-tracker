import { useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/react';
const routeTitleMap = {
  '/dashboard': 'Dashboard',
  '/kanban': 'Kanban Board',
  '/calendar': 'Calendar',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
};
const getPageTitle = (pathname) => {
  if (routeTitleMap[pathname]) {
    return routeTitleMap[pathname];
  }
  if (pathname.startsWith('/applications/')) {
    return 'Application Details';
  }
  return 'Overview';
};
const Topbar = () => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  return (
    <header
      className="h-16 bg-white border-b border-gray-200 flex items-center justify-between shrink-0"
      style={{ paddingLeft: '24px', paddingRight: '24px' }}
    >
      <h1
        className="text-lg font-semibold text-gray-900"
        style={{ marginLeft: '8px' }}
      >
        {pageTitle}
      </h1>
      <div className="flex items-center gap-4" style={{ marginRight: '8px' }}>
        <UserButton
          afterSignOutUrl="/sign-in"
          appearance={{
            elements: {
              avatarBox: 'w-8 h-8',
            },
          }}
        />
      </div>
    </header>
  );
};
export default Topbar;
