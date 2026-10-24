import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve('./config/.env') });
const port= process.env.PORT 
const mood= process.env.MOOD
const salt= process.env.SALT
const adminSignature= process.env.ADMIN_SIGNATURE
const userSignature= process.env.USER_SIGNATURE
const adminRefreshSignature= process.env.ADMIN_REFRESH_TOKEN
const userRefreshSignature= process.env.USER_REFRESH_TOKEN
export const env={
    port,
    mood,
    salt,
    adminSignature,
    userSignature,
    adminRefreshSignature,
    userRefreshSignature
}