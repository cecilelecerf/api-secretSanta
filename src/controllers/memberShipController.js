const Group = require ("../models/groupModel");
const Member = require ("../models/memberShipModel");
const User = require ("../models/userModel");
const jwt = require("jsonwebtoken");


exports.inviteUser = async(req,res)=>{
    try{
        const group =  await Group.findById(req.params.group_id)
        if(group){
            try{
                let user = await User.findOne({email : req.body.email})
                if(!user){
                    // TODO : enelver un mdp
                    user = new User({email : req.body.email, password : "123"})
                    try{
                        await user.save();
                     }catch(error){
                        console.log(error)
                        res.status(500).json({message: "Error server."})
                    }
                }
                else{
                    const verificationPeopleResponse = await Member.findOne({user_id : user.id})
                    // you cannot send an invitation if it has already been responded to
                    if(verificationPeopleResponse !== null && typeof verificationPeopleResponse === 'object' && 'accept' in verificationPeopleResponse){
                        res.status(409).json({message: "The person has already responded to the invitation"});
                        res.end()
                        return
                    }
                }
                const newMember = new Member({group_id : group.id, user_id : user.id});
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


// method for a user to accept an invitation
exports.acceptGroup = async (req,res)=>{
    try{
        const member = await Member.findOneAndUpdate({user_id : req.params.user_id, group_id : req.params.group_id}, {group_id : req.params.group_id, user_id : req.params.user_id, accept : req.body.accept})
        res.status(200).json(member)
        
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Error server."})
    }
}

exports.listenAllMembers = async(req, res)=>{
    try{
        const members = await Member.find({})
        res.status(200).json(members)
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error server."})
    }
}

// list of all users for whom an invitation has been sent by group
exports.listenAllMembersOfGroup = async(req, res)=>{
    try{
        const members = await Member.find({group_id : req.params.group_id})
        res.status(200).json(members)
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error server."})
    }
}

// list of all users who accepted the invitation in each group
exports.listenAllMembersOfGroupAndAccept = async(req, res)=>{
    try{
        const members = await Member.find({group_id : req.params.group_id})
        res.status(200).json(members)
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error server."})
    }
}


// getRandomParticipant(){
//     let beneficiary = this.people.slice();
//     let result = '';

//     // boucle pour chaque personne
//     for(let i = 0; i<this.people.length; i++){
//         let random = 0
//         if (beneficiary.length > 1) {
//             random = Math.floor(Math.random() * (0, beneficiary.length));

//             // éviter d'offrir un cadeau à soi-même
//             while (this.people[i].firstName == beneficiary[random].firstName){  
//                 random = Math.floor(Math.random() * (0, beneficiary.length));
//             }
//         }
//         else{
//             random = 0;
//         }

//         // on ajoute le bénéficiaire à la personne à offrir
//         this.people[i].setOffer(beneficiary[random]);

//         // écriture du résultat
//         result += this.people[i].firstName +' doit donner un cadeau à ' + this.people[i].offer.firstName + random + ', ';

//         // supprimer la personne qui vient d'être concerné
//         beneficiary.splice(random, 1);
//     }

//     // renvoyer le resultat
//     // return result
// }


// method of drawing lots
exports.draw = async (req,res)=>{
    try{
        const group = await Group.findById(req.params.group_id)
        // vérification admin
        if(group.admin == req.params.user_id){
            const members = await Member.find({group_id : group.id, accept : true});
            // vérification nombre
            if(members.length <3){
                res.status(403).json({message : "Not enough users accepted the invitation"});
                res.end()
            }

            let beneficiary = members.slice();
            members.map(async (member)=>{
                let random = 0;
                if (beneficiary.length > 1) {
                    random = Math.floor(Math.random() * (0, beneficiary.length));

                    // éviter d'offrir un cadeau à soi-même
                    while (member._id == beneficiary[random]._id){  
                        random = Math.floor(Math.random() * (0, beneficiary.length));
                    }
                }
                else{
                    random = 0;
                };
                await Member.findByIdAndUpdate(member._id, {user_offer : beneficiary[random]._id})
                beneficiary.splice(random, 1);
            })
            const updateMembers = await Member.find({group_id : group.id, accept : true})
            res.status(200).json(updateMembers)
        }
        else{
            res.status(403).json({message : "You are not an administrator"})
        }
    }catch (error){
        console.log(error);
        res.status(500).json({message : "Error server."})
    }
}

