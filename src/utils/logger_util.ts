import winston, { Logger, format, transports } from 'winston';
// Level
// error: 0,
// warn: 1,
// info: 2,
// http: 3,
// verbose: 4,
// debug: 5,
// silly: 6

export const winstonLogger = (name: string, level: string): Logger => {
  const options = {
    console: {
      level,
      handleExceptions: true,
      json: false,
      colorize: true
    },
    file: {
      level: 'error', // Log file untuk error saja
      filename: `logs/${name}-error.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }
  };

  const logger: Logger = winston.createLogger({
    // Agar tidak exit saat error
    exitOnError: false,
    // Agar dapat mengetahui nama service yang Error
    defaultMeta: { service: name },
    // Tambahkan format dengan timestamp dan printf
    format: format.combine(
      format.timestamp(),
      format.colorize(),
      format.printf(({ timestamp, level, message, service }) => {
        return `[${timestamp}] [${service}] ${level}: ${message}`;
      })
    ),
    // Transports untuk console dan file
    transports: [new transports.Console(options.console), new transports.File(options.file)]
  });

  // Menangani unhandled promise rejections
  process.on('unhandledRejection', (error) => {
    logger.error(`Unhandled Rejection: ${error}`);
  });

  return logger;
};
