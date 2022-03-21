import winston, { Logger, Logform } from 'winston';
import config                       from "./../../config";


const format: Logform.Format = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
        format: 'DD-MM-YYYY HH:mm:ss',
    }),
    winston.format.printf((info: Logform.TransformableInfo) => `${info.timestamp}: ${info.message}`),
);


export const infoLogger: Logger = winston.createLogger({
    
    transports: [
        new winston.transports.File({filename: config.logs.filenameInfo, level: 'info', maxsize: config.logs.maxsize, maxFiles: config.logs.maxFiles}),
    ],

    format: format,
});


export const warnLogger: Logger = winston.createLogger({
    
    transports: [
        new winston.transports.File({filename:  config.logs.filenameWarning, level: 'warn', maxsize: config.logs.maxsize, maxFiles: config.logs.maxFiles}),
    ],

    format: format,
});


export const errorLogger: Logger = winston.createLogger({

    transports: [
        new winston.transports.File({filename: config.logs.filenameError, level: 'error', maxsize: config.logs.maxsize, maxFiles: config.logs.maxFiles}),
    ],

    format: format,
});


export const authLogger: Logger = winston.createLogger({

    transports: [
        new winston.transports.File({filename: config.logs.filenameAuth, level: 'info',  maxsize: config.logs.maxsize, maxFiles: config.logs.maxFiles}),
    ],

    format: format,
});