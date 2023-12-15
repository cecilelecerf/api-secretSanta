const Group = require ("../models/groupModel");
const User = require("../models/userModel")

const { hashPassword } = require("../controllers/userController")
const jwt = require("jsonwebtoken");
const Member = require("../models/memberShipModel");

exports.createGroup= async (req,res)=>{
    try {
        const newGroup = new Group({name : req.body.name, admin : req.body.admin });
        const group = await newGroup.save()
        res.status(201).json({group})
    } catch(error){
        console.log(error);
        res.status(500).json({message : "Une erreur s'est produite lors du traitement du formulaire"})
    }
}
exports.listenAllGroups = async(_req, res) =>{
    try{
        const groups = await Group.find({})
        res.status(200).json({groups})
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Error server."})
    }
}
exports.oneGroup = async(req, res)=>{
    try{
        const group = await Group.findById(req.params.group_id);
        res.status(200).json(group)
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error server."})
    }
}

exports.inviteUser = async(req,res)=>{
    try{
        const group =  await Group.findById(req.params.group_id)
        if(group){
            try{
                let user = await User.find({email : req.body.email})
                if(user.length === 0){
                    // TODO : mettre un mdp
                    user = new User({email : req.body.email, password : "123"})
                    try{
                        await user.save();
                    }catch(error){
                        console.log(error)
                        res.status(500).json({message: "Error server."})
                    }
                }
                const newMember = new Member({group_id : group.id, user_id : user[0].id});
                try{
                    const memberData ={
                        group_id : newMember.group_id,
                        user_id : newMember.user_id,
                    }
                    const token = jwt.sign(memberData, process.env.JWT_KEY, {expiresIn : "10h"});
                    const member = await newMember.save();
                    res.status(201).json({member : member, token : token})
                }catch(error){
                    console.log(error)
                    res.status(500).json({message: "Error server."})
                }
            }catch(error){
                console.log(error)
                res.status(500).json({message: "Error server."})
            }
        }
        else {
            res.status(404).json({message : "Group not found"})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({message : "Error server."})
    }
}

exports.acceptGroup = async (req,res)=>{
    try{
        // TODO : rajouter vérification token
        if(req.body.response === true){
            const member = await Member.findByIdAndUpdate({id : req.params.user_id}, {group_id : req.params.group_id, user_id : req.params.user_id, accept : true})
            res.status(200).json({member})

        }
        else{
            await Member.findByIdAndDelete(req.params.user_id)
            res.status(204)
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Error server."})
    }
}

