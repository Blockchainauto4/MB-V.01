import React, { useState, useEffect } from 'react';
import { logger, LogEntry, LogLevel } from '../services/logger';
import { Tab } from '../types';

interface LogsDashboardProps {
  onBack: () => void;
}

export const LogsDashboard: React.FC<LogsDashboardProps> = ({ onBack }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<LogLevel | 'all'>('all');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const loadLogs = () => {
    setLogs(logger.getLogs());
  };

  useEffect(() => {
    loadLogs();
    
    let interval: any;
    if (autoRefresh) {
      interval = setInterval(loadLogs, 1000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleClear = () => {
    logger.clear();
    loadLogs();
  };

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.level === filter);

  const getLevelColor = (level: LogLevel) => {
    switch(level) {
      case 'error': return 'text-red-500';
      case 'warn': return 'text-yellow-500';
      case 'success': return 'text-green-500';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-xs font-mono">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-400 hover:text-white uppercase tracking-widest">
            &larr; Back
          </button>
          <h2 className="text-white font-bold uppercase tracking-widest">System Logs</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 mr-4">
            <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></span>
            <span className="text-gray-500">{autoRefresh ? 'Live' : 'Paused'}</span>
          </div>
          <button 
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="px-3 py-1 border border-gray-800 text-gray-400 hover:text-white hover:border-white transition-colors"
          >
            {autoRefresh ? 'Pause' : 'Resume'}
          </button>
          <button 
            onClick={handleClear}
            className="px-3 py-1 border border-red-900 text-red-500 hover:bg-red-900/20 transition-colors"
          >
            Clear Logs
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 p-2 bg-[#111] border-b border-gray-800 overflow-x-auto">
        {(['all', 'info', 'success', 'warn', 'error'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 uppercase tracking-wider rounded-sm transition-colors ${
              filter === f 
                ? 'bg-gray-800 text-white' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Log List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {filteredLogs.length === 0 ? (
          <div className="text-gray-600 text-center mt-20">No logs found.</div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log.id} className="group flex gap-3 hover:bg-[#111] p-1 rounded">
              <span className="text-gray-600 w-20 flex-shrink-0">
                {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}
              </span>
              <span className={`w-16 uppercase font-bold flex-shrink-0 ${getLevelColor(log.level)}`}>
                [{log.level}]
              </span>
              <span className="text-gray-500 w-16 uppercase flex-shrink-0 text-[10px] pt-0.5">
                {log.category}
              </span>
              <div className="flex-1 break-all">
                <span className="text-gray-300">{log.message}</span>
                {log.details && (
                  <pre className="mt-1 text-[10px] text-gray-500 overflow-x-auto">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};