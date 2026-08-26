import { useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function TestAuthApi() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTestCall = async () => {
    setLoading(true);
    setData(null);
    setError(null);

    try {
      // Replace with your backend's protected endpoint path
      const response = await axiosClient.get('/test-protected');
      setData(response.data);
    } catch (err) {
      setError(
        err.response
          ? `${err.response.status} - ${JSON.stringify(err.response.data)}`
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4 p-4 border-2 border-dashed border-gray-400 rounded-lg bg-gray-50">
      <h4 className="text-lg font-semibold text-gray-800 mb-3">
        Axios Clerk Token Verification
      </h4>

      <button
        onClick={handleTestCall}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Testing...' : 'Send Protected API Request'}
      </button>

      {data && (
        <pre className="mt-4 p-3 bg-green-100 text-green-900 border border-green-300 rounded-md overflow-x-auto text-sm font-mono">
          ✅ Response: {JSON.stringify(data, null, 2)}
        </pre>
      )}

      {error && (
        <pre className="mt-4 p-3 bg-red-100 text-red-900 border border-red-300 rounded-md overflow-x-auto text-sm font-mono">
          ❌ Error: {error}
        </pre>
      )}
    </div>
  );
}
