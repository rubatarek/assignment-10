import jwt from "jsonwebtoken";
import { env } from "../../../../config/env.service.js";

export const auth = (req, res, next) => {
    let {authorization}= req.headers
//console.log(authorization)
let [flag, token]=authorization.split(" ")
//console.log(flag)

switch (flag) {
    case "Basic":
        const basicData=Buffer.from(token, "base64").toString()
        //console.log(basicData)
        break;

let[email, password]=basicData.split(":")
console.log(email, password)

case "Bearer":
let decodedData=jwt.decode(token)
console.log(decodedData)
let signature=""
switch (decodedData.aud[0]) {
case 0:
    signature=env.userSignature
    break;
case 1:
    signature=env.adminSignature
    break;
    default:
    break;
}
let decoded=jwt.verify(token, signature)
req.user=decoded.userId
next()
break;
default:
    break;

    }
}

export const generateToken = (payload, host, role) => {
let signature=""
let refreshSignature=""
switch (role) {
    case 0:
        signature=env.userSignature
        refreshSignature=env.userRefreshSignature
        break;
    case 1:
        signature=env.adminSignature
        refreshSignature=env.adminRefreshSignature
        break;
    default:
      
        break;
}
let accessToken=jwt.sign(payload, signature,{
    expiresIn: "30mins",// will expire by this time
    //notBefore: "50s"

issuer: "host", // 5arg meny ay domain y3ny msh hydelo access ll api de lw el issue msh mawgood 3ndy 
audience: [role],
//7aga a2dr awsl beha l role user admin manager
//audience heya el role 

})
let refreshToken=jwt.sign(payload, refreshSignature,
    {
    expiresIn: "1y",
    issuer: "host",
    audience: [role],
})
return { accessToken, refreshToken }
}

export const generateAccessToken= (refreshToken, host) => {

let decoded=jwt.decode(refreshToken)
let signature=""

switch (decoded.aud[0]) {
    case 0:
        signature=env.userSignature
       
        break;
    case 1:
        signature=env.adminSignature
       
        break;
    default:
        break;
}

let accessToken=jwt.sign({userId: decoded.userId}, signature,{
    expiresIn: "30mins",
    issuer: "host",
    audience:[ decoded.aud[0] ],
})

return accessToken



}