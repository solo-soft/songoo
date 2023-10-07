import {verify} from "jsonwebtoken";
import {NextApiRequest} from "next";


export default function verifyToken (req : NextApiRequest) {

    const {appToken} = req.cookies

    if (!appToken) {
        return {message : "user must be logged in" , user : null}
    }

    try {
        const decodeInfoFromToken = verify(appToken , process.env.SECRET_KEY || "")
        return {message : "session information available" , user : decodeInfoFromToken}
    }

    catch (e) {
        return {message : "session token is not valid" , user : null}
    }

}
