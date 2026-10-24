import { Router } from "express";
import { signup,login,getUserData,getAccessToken } from "./auth.service.js";
import { SuccessResponse } from "../../common/response/success.response.js";
import { auth } from "../../common/middleware/auth/auth.js";
const router = Router();


// router.get('/', (req, res) => {
//     res.json({message: "Auth route"});
// })
router.post('/signup',async (req, res) => {
let addedUser=await signup(req.body)
SuccessResponse({
    res,
    message: "User added successfully", 
    status: 201,
    data: addedUser
})
})

router.post('/login',async (req, res) => {
  let loginUser=await login(req.body,req.get("host"))
    SuccessResponse({
        res,
        message: "User logged in successfully", 
        data: loginUser
    })
})

router.get('/get-user-data',auth, async (req, res) => {
    let userData= await getUserData(req.user)
    SuccessResponse({
        res,
        message: "User data ", 
        data: userData
    })
})

router.get('/get-access-Token', async (req, res) => {

let data= await getAccessToken(req.headers.authorization, req.get("host"))
    SuccessResponse({
        res,
        message: "new access token generated successfully", 
        data
    })


})


export default router;