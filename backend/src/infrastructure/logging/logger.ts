type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogFields {
  [key: string]: unknown;
}

export class Logger {
  constructor(private readonly defaultFields: LogFields = {}) {}

  private log(level: LogLevel, message: string, fields?: LogFields) {
    const payload = {
      level,
      message,
      time: new Date().toISOString(),
      ...this.defaultFields,
      ...fields
    };
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(payload));
  }

  debug(message: string, fields?: LogFields) {
    this.log('debug', message, fields);
  }

  info(message: string, fields?: LogFields) {
    this.log('info', message, fields);
  }

  warn(message: string, fields?: LogFields) {
    this.log('warn', message, fields);
  }

  error(message: string, fields?: LogFields) {
    this.log('error', message, fields);
  }

  with(fields: LogFields): Logger {
    return new Logger({ ...this.defaultFields, ...fields });
  }
}

export const logger = new Logger({ service: 'agenticdev-flutter-backend' });