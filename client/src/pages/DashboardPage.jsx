import { UserButton } from '@clerk/react';
import TestAuthApi from '../components/TestAuthApi';
const DashboardPage = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <UserButton />
      </div>
      <p>Wellcome to the dashboard</p>
      <TestAuthApi />
    </div>
  );
};

export default DashboardPage;
