enum LoggerLevels {
  Error = "error",
  Warn = "warn",
  Info = "info",
  Debug = "debug",
}

export class Logger {
  private logLevel: LoggerLevels;

  private useColors: boolean;

  constructor(
    logLevel: LoggerLevels = LoggerLevels.Info,
    useColors: boolean = true
  ) {
    this.logLevel = logLevel;
    this.useColors = useColors;
  }

  log(message: string, level: LoggerLevels = LoggerLevels.Info): void {
    if (level >= this.logLevel) {
      const timestamp = new Date().toISOString();
      const logMessage = this.formatMessage(timestamp, level, message);
      console.log(logMessage);
    }
  }

  private formatMessage(
    timestamp: string,
    level: LoggerLevels,
    message: string
  ): string {
    const colorCode = this.getColorCode(level);
    const coloredLevel = this.useColors
      ? `\x1b[${colorCode}m${level}\x1b[0m`
      : level;
    return `[${timestamp}] [${coloredLevel}] ${message}`;
  }

  private getColorCode(level: LoggerLevels): string {
    switch (level) {
      case LoggerLevels.Error:
        return this.useColors ? "31" : "";
      case LoggerLevels.Warn:
        return this.useColors ? "33" : "";
      case LoggerLevels.Info:
        return this.useColors ? "36" : "";
      case LoggerLevels.Debug:
        return this.useColors ? "90" : "";
      default:
        return "";
    }
  }
}
