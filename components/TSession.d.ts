export type TSession = {
    message : string
    user : {
        id : string
        email : string
        exp : number
        iat : number
    }
}
