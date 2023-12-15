const Group = require ("../models/groupModel");
const Member = require ("../models/memberShipModel");
const User = require ("../models/userModel");
const jwt = require("jsonwebtoken");


exports.inviteUser = async(req,res)=>{
    try{
        const group =  await Group.findById(req.params.group_id)
        if(group){
            try{
                let user = await User.find({email : req.body.email})
                if(user.length === 0){
                    // TODO : enelver un mdp
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
                        id : newMember._id,
                        group_id : newMember.group_id,
                        user_id : newMember.user_id,
                    }
                    const token = jwt.sign(memberData, process.env.JWT_KEY, {expiresIn : "10h"});
                    const member = await newMember.save();
                    res.status(201).json({member : member, token : token});
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
        const member = await Member.findOneAndUpdate({user_id : req.params.user_id, group_id : req.params.group_id}, {group_id : req.params.group_id, user_id : req.params.user_id, accept : req.body.accept})
        res.status(200).json({member})
        
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Error server."})
    }
}

