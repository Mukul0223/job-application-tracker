import {
  useApplications,
  useApplicationsBoard,
  useCreateApplication,
  useUpdateApplicationStatus,
} from '../hooks/useApplications';

const DashboardPage = () => {
  const { data: list, isLoading, isError, error } = useApplications();
  const { data: board } = useApplicationsBoard();

  // 2. Test Mutations
  const createMutation = useCreateApplication();
  const updateStatusMutation = useUpdateApplicationStatus();

  if (isLoading) return <div>Loading applications...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const handleTestCreate = () => {
    createMutation.mutate({
      companyName: 'Test Company ' + Date.now(),
      jobTitle: 'Frontend Dev',
      status: 'Applied',
    });
  };

  const handleTestStatusUpdate = (id, currentStatus) => {
    const newStatus = currentStatus === 'Applied' ? 'Interview' : 'Applied';
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Step 8.5 Quality Check</h2>

      {/* --- TEST 1: Creation & Auto-Invalidation --- */}
      <section style={{ marginBottom: '20px' }}>
        <h3>1. Cache Invalidation Test</h3>
        <button onClick={handleTestCreate} disabled={createMutation.isPending}>
          {createMutation.isPending
            ? 'Creating...'
            : '+ Create Test Application'}
        </button>
      </section>

      {/* --- TEST 2: Board View & Optimistic Updates --- */}
      <section>
        <h3>2. Optimistic Updates Test (Board View)</h3>
        {board?.map((app) => (
          <div
            key={app._id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              margin: '8px 0',
              borderRadius: '4px',
            }}
          >
            <strong>{app.company}</strong> — Status: <em>{app.status}</em>
            <button
              onClick={() => handleTestStatusUpdate(app._id, app.status)}
              style={{ marginLeft: '10px' }}
            >
              Toggle Status (Optimistic)
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DashboardPage;
