const profileModel = require("../models/profileModel");
const jwt = require("jsonwebtoken");
const OTPModel = require("../models/OTPModel");
const SendEmailUtility = require("../utility/SendEmailUtility");

exports.createProfile = async(req, res)=>{
    try {
        const reqBody = req.body;
        const data = await profileModel.create(reqBody);
        res.status(200).json({
            status: "Success",
            data: data
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        })
    }
};

exports.userLogin = async(req, res)=>{
    try {
        let reqBody = req.body;
        let data = await profileModel.find(reqBody).count();
        if(data===1){
            let Payload = {
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                data: reqBody["email"]
            };
            let token = jwt.sign(Payload, "SecretKey466");
            res.status(200).json({
                status: "Success",
                data: token
            });
        } else{
            res.status(404).json({
                status: "Fail",
                data: error.toString()
            })
        }

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        })
    }
};

exports.getProfileData = async(req, res)=>{
    try {
        let email = req.headers["email"]
        let data = await profileModel.find({email:email});
        res.status(200).json({
            status: "Success",
            data: data
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        })
    };
};

exports.updateProfile = async(req, res)=>{
    try {
        let email = req.headers["email"];
        let reqBody = req.body;
        let data = await profileModel.updateOne({email: email}, reqBody);
        res.status(200).json({
            status: "Success",
            data: data
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        })
    }
};

exports.recoverVerifyEmail=async (req,res)=>{
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);
    let EmailText="Your Verification Code is ="+ OTPCode
    let EmailSubject="Task manager verification code"

    let result = await profileModel.find({email:email}).count();
    if(result===1){
        // Verification Email
       await SendEmailUtility(email, EmailText, EmailSubject);
       await OTPModel.create({email: email, otp: OTPCode });
       res.status(200).json({status:"success",data:"6 Digit Verification Code has been send"})
    }
    else{
        res.status(401).json({status:"fail",data:"No User Found"})
    }
};

exports.recoverVerifyOTP=async (req,res)=>{
    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status=0;
    let statusUpdate=1;

    let result= await OTPModel.find({email:email,otp:OTPCode,status:status}).count();
    // Time Validation 2 min
    if(result===1){
        await OTPModel.updateOne({email:email,otp:OTPCode,status:status}, {status:statusUpdate})
        res.status(200).json({status:"success",data:"Verification Completed"})
    }
    else{
        res.status(404).json({status:"fail",data:"Invalid Verification"})
    }
};

exports.recoverResetPass=async (req,res)=>{

    let email = req.body['email'];
    let OTPCode = req.body['OTP'];
    let NewPass =  req.body['password'];
    let statusUpdate=1;

    let result= await OTPModel.find({email:email,otp:OTPCode,status:statusUpdate}).count();
    if(result===1){
        let result=await profileModel.updateOne({email: email}, {password:NewPass})
        res.status(200).json({status:"success",data:"Password Reset Success"})
    }
    else{
        res.status(404).json({status:"fail",data:"Invalid Verification"})
    }
};
