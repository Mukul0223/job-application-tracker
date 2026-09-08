import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Kanban,
  Calendar,
  BarChart3,
  Settings,
  PanelLeft,
} from 'lucide-react';
import useUiStore from '../../store/uiStore.js';
const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Kanban', path: '/kanban', icon: Kanban },
  { name: 'Calendar', path: '/calendar', icon: Calendar },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings },
];
const Sidebar = () => {
  const isSidebarCollapsed = useUiStore((state) => state.isSidebarCollapsed);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  return (
    <aside
      className={`bg-white border-r border-gray-200 flex flex-col h-full select-none shrink-0 transition-all duration-200 ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div
        className={`h-16 flex items-center border-b border-gray-200 ${isSidebarCollapsed ? 'justify-center' : ''}`}
        style={{
          paddingLeft: isSidebarCollapsed ? '12px' : '16px',
          paddingRight: isSidebarCollapsed ? '12px' : '16px',
        }}
      >
        <button
          type="button"
          onClick={toggleSidebar}
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label="Toggle Sidebar"
          className="flex items-center gap-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
          style={{
            paddingTop: '12px',
            paddingBottom: '12px',
            paddingLeft: isSidebarCollapsed ? 0 : '16px',
            paddingRight: isSidebarCollapsed ? 0 : '16px',
          }}
        >
          <PanelLeft
            className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
              isSidebarCollapsed ? 'rotate-180' : ''
            }`}
          />
          {!isSidebarCollapsed && (
            <span className="font-semibold text-base whitespace-nowrap bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              JobTrackerApp
            </span>
          )}
        </button>
      </div>
      {/* Navigation Links */}
      <nav
        className="flex-1 overflow-y-auto"
        style={{
          paddingLeft: isSidebarCollapsed ? '12px' : '16px',
          paddingRight: isSidebarCollapsed ? '12px' : '16px',
          paddingTop: '16px',
          paddingBottom: '16px',
        }}
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={isSidebarCollapsed ? item.name : undefined}
              style={{
                marginTop: index === 0 ? 0 : '8px',
                paddingTop: '12px',
                paddingBottom: '12px',
                paddingLeft: isSidebarCollapsed ? 0 : '16px',
                paddingRight: isSidebarCollapsed ? 0 : '16px',
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                } ${isSidebarCollapsed ? 'justify-center' : ''}`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!isSidebarCollapsed && (
                <span className="truncate">{item.name}</span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
export default Sidebar;
