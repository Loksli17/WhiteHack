import { Logger }                                          from "winston";
import { authLogger, errorLogger, infoLogger, warnLogger } from "./winston";
import LogMessage, { LogMessageOptions }                   from "./LogMessage";


export default class LoggerProxy {

    private static infoLogger : Logger = infoLogger;
    private static warnLogger : Logger = warnLogger;
    private static errorLogger: Logger = errorLogger;
    private static authLogger : Logger = authLogger;

    
    public static warn(obj: LogMessageOptions) :void { 
        this.warnLogger.warn(LogMessage.create(obj));
    }

    public static error(obj: LogMessageOptions) :void {
        this.errorLogger.error(LogMessage.create(obj));
    }

    public static info(obj: LogMessageOptions) :void {
        this.infoLogger.info(LogMessage.create(obj));
    }

    public static auth(obj: LogMessageOptions) :void {
        this.authLogger.info(LogMessage.create(obj));
    }
}
