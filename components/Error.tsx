import httpStatus from "http-status";
export const Error = ({code, log} : {code : number , log : {message : string}}) => {
    return (
        <div>
            <h1>{code} - {httpStatus[code]}</h1>
            <p>{log.message}</p>
        </div>
    );
}

