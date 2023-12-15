const User = require ("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};

exports.userRegister = async(req, res)=>{
    try{
        let newUser = new User(req.body);
        newUser.password = await this.hashPassword(newUser.password);
        const user = await newUser.save();
        res.status(201).json({message: `User crée ${user.email}`})
    } catch (error){
        console.log(error);
        res.status(401).json({message: "Requete invalide"})
    }
}

exports.userLogin= async (req,res)=>{
    try {
        const user = await User.findOne({email : req.body.email});
        if(!user){
            res.status(500).json({message : "User not found"});
            return;
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if(user.email === req.body.email && passwordMatch){
            const userData = {
                id : user._id,
                email : user.email,
                role : user.role
            };
            const token = await jwt.sign(userData, process.env.JWT_KEY, {expiresIn : "10h"});
            res.status(200).json({token})
        }
        else {
            res.status(401).json({message: "Email or password incorrect"});
        }                
    } catch(error){
        console.log(error);
        res.status(500).json({message : "Une erreur s'est produite lors du traitement du formulaire"})
    }
}

exports.listenAllUsers = async(_req, res) =>{
    try{
        const users = await User.find({})
        res.status(200).json({users})
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Error server."})
    }
}

exports.listenSingleUser = async (req,res) => {
    try{
        const user = await User.findById(req.params.user_id);
        if(user===null){
            res.status(404);
            res.json({message: "User not found"});
            res.end();
        }
        res.status(200).json(user);
    } catch(error){
        console.log(error);
        res.status(500).json({message : "Error server."})
    }
}

exports.updateUser = async(req, res)=>{
    try{
        const user = await User.findById(req.params.user_id);
        if(user===null){
            res.status(404);
            res.json({message: "User not found"});
            res.end();
        }
        user.email = req.body.email
        user.password = await this.hashPassword(user.password);
        const updateUser =  await User.findByIdAndUpdate(req.params.user_id, user, {new: true});
        res.status(200).json({updateUser})
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Error server."})
    }
}

exports.deleteUser = async(req, res)=>{
    try{
        await User.findByIdAndDelete(req.params.user_id);
        res.status(204)
    } catch (error){
        console.log(error);
        res.status(500).json({message : "Error server."})
    }
}

