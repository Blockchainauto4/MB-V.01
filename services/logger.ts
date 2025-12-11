export type LogLevel = 'info' | 'warn' | 'error' | 'success';
export type LogCategory = 'system' | 'api' | 'ui' | 'auth';

export interface LogEntry {
  id: string;
  timestamp: number;
  level: LogLevel;
  category: LogCategory;
  message: string;
  details?: any;
}

const STORAGE_KEY = 'bb_app_logs';
const MAX_LOGS = 200;

class LoggerService {
  private logs: LogEntry[] = [];

  constructor() {
    this.loadLogs();
  }

  private loadLogs() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.logs = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load logs', e);
    }
  }

  private saveLogs() {
    try {
      // Keep only last MAX_LOGS
      if (this.logs.length > MAX_LOGS) {
        this.logs = this.logs.slice(this.logs.length - MAX_LOGS);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.logs));
    } catch (e) {
      console.error('Failed to save logs', e);
    }
  }

  public log(level: LogLevel, category: LogCategory, message: string, details?: any) {
    const entry: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      level,
      category,
      message,
      details
    };

    this.logs.push(entry);
    this.saveLogs();
    
    // Also output to browser console for immediate dev feedback
    const style = level === 'error' ? 'color: red' : level === 'success' ? 'color: green' : 'color: blue';
    console.log(`%c[${category.toUpperCase()}] ${message}`, style, details || '');
  }

  public info(category: LogCategory, message: string, details?: any) {
    this.log('info', category, message, details);
  }

  public success(category: LogCategory, message: string, details?: any) {
    this.log('success', category, message, details);
  }

  public warn(category: LogCategory, message: string, details?: any) {
    this.log('warn', category, message, details);
  }

  public error(category: LogCategory, message: string, details?: any) {
    this.log('error', category, message, details);
  }

  public getLogs(): LogEntry[] {
    // Return copy reversed (newest first)
    return [...this.logs].reverse();
  }

  public clear() {
    this.logs = [];
    localStorage.removeItem(STORAGE_KEY);
  }
}

export const logger = new LoggerService();