import ip from '../ip';

export default {

    app: {
        port         : 3000,
        database     : "whitehack",
        startMessage : `Server has started on port: `,
        jsonDataLimit: '60mb', 
    },

    db: {
        name    : 'whitehack',
        user    : 'root',
        password: '1234',
        port    : 3306,
        host    : '127.0.0.1',
    },

    // ! change data here
    secret: {
        password: '~1;3JklN,<az09T',
        session : 'mtq[}$TyE4fg9)1',
        jwt     : '!jfGHkl324FgKekl0L23^fdg#$',
    },

    file: {
        scaleWidthSmall: 570,
        scaleWidthLarge: 720,
    },

    cors: {
        origin : ["http://localhost:8080", `http://${ip}:8080`],
        methods: ["GET", "POST", "PUT", "DELETE"]
    },
    
    auth: {
        refreshTime  : "4h",
        accessTime   : "5m", 
        maxCookieAge : 1000 * 60 * 60 * 4,
        accessTimeNum: 1000 * 60 * 5,
    },

    filePath: {
        img: 'public/img/'
    },

    logs: {
        maxsize        : 17000, //bytes
        maxFiles       : 3,
        filenameInfo   : 'logs/info.log',
        filenameWarning: 'logs/warning.log',
        filenameError  : 'logs/error.log',
        filenameAuth   : 'logs/auth.log'
    },
}