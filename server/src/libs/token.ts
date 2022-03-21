import jwt    from "jsonwebtoken";
import config from "../config";


export default class JWTProxy {

    public static createAccessToken(): string {
        return jwt.sign({}, config.secret.jwt, {expiresIn: config.auth.accessTime});
    }

    public static createRefreshToken(): string {
        return jwt.sign({}, config.secret.jwt, {expiresIn: config.auth.refreshTime})
    }

    public static verify(token: string) {
        jwt.verify(token, config.secret.jwt);
    }
}