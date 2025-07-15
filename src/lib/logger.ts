type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
}

class Logger {
  private isProduction = process.env.NODE_ENV === 'production';

  private log(level: LogLevel, message: string, context?: Record<string, any>) {
    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };

    if (this.isProduction) {
      // In production, use structured logging
      console.log(JSON.stringify(logEntry));
      
      // TODO: Send to logging service (e.g., Vercel Analytics, Sentry)
      // this.sendToLoggingService(logEntry);
    } else {
      // Development: pretty print
      const emoji = this.getLogEmoji(level);
      console.log(`${emoji} [${level.toUpperCase()}] ${message}`);
      if (context) {
        console.log('Context:', context);
      }
    }
  }

  private getLogEmoji(level: LogLevel): string {
    switch (level) {
      case 'info': return 'ℹ️';
      case 'warn': return '⚠️';
      case 'error': return '❌';
      case 'debug': return '🔍';
      default: return '📝';
    }
  }

  info(message: string, context?: Record<string, any>) {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, any>) {
    this.log('warn', message, context);
  }

  error(message: string, error?: Error, context?: Record<string, any>) {
    this.log('error', message, {
      ...context,
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : undefined,
    });
  }

  debug(message: string, context?: Record<string, any>) {
    if (!this.isProduction) {
      this.log('debug', message, context);
    }
  }
}

export const logger = new Logger(); 