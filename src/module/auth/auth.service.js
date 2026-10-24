import { generateToken,generateAccessToken,auth } from "../../common/middleware/auth/auth.js";
import { hashData,verifyData } from "../../common/middleware/security/encryption.js";
import { ConflictException,NotFoundException,BadRequestException } from "../../common/response/error.response.js";
import userModel from "../../database/model/user.model.js";

export const signup= async (data) => {
//destruct hagat reqiredd

let {name, email, password,uniqueAccName}=data
let existedUser=await userModel.findOne({email})
if(existedUser){
    ConflictException({message: "Email already exists"})
}
let encryptedPassword=await hashData(password)
let addedUser=await userModel.insertOne({name, email, password: encryptedPassword, uniqueAccName})
return addedUser

}

export const login= async (data, host) => {
let {email, password}=data
let userData=await userModel.findOne({email})
if(!userData){
    NotFoundException({message: "User not found"})  
}
let validPassword=await verifyData(password, userData.password)
if(!validPassword){
    BadRequestException({message: "Invalid password"})
}
    let{accessToken, refreshToken} =generateToken({userId: userData._id},host, userData.role)
    return {userData, accessToken, refreshToken}
}


export const getUserData= async (userId) => {

let userData=await userModel.findById(userId)
if(!userData){
    NotFoundException({message: "User not found"})      
}
return userData
}

export const getAccessToken= async (authorization, host) => {

let accessToken=await generateAccessToken(authorization, host)
return accessToken

}