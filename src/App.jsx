import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-emerald-400">Assignment Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">Serverless Backend Health Check</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-sm text-slate-400">Loading data from backend...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm text-center">
            <p className="font-semibold">Connection Error</p>
            <p className="text-xs mt-1 text-red-300">{error}</p>
          </div>
        )}

        {/* Success Data Display */}
        {data && (
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 font-medium">Status</span>
              <span className="flex items-center gap-2 font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {data.status}
              </span>
            </div>

            <div className="flex items-center justify-between bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 font-medium">Faculty</span>
              <span className="font-semibold text-slate-200">{data.faculty}</span>
            </div>

            <div className="flex items-center justify-between bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 font-medium">Batch</span>
              <span className="font-semibold text-slate-200 font-mono text-xs bg-slate-900 px-2 py-1 rounded border border-slate-700">{data.batch}</span>
            </div>

            <div className="flex items-center justify-between bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 font-medium">Runtime</span>
              <span className="font-semibold text-sky-400">{data.runtime}</span>
            </div>

            <div className="pt-2 text-center">
              <span className="text-[10px] text-slate-500 font-mono">
                Timestamp: {data.timestamp}
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;