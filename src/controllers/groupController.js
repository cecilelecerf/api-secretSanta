const Group = require ("../models/groupModel");

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
        if(!group){
            res.status(404).json({message: "Group not found"})
            res.end()
        }
        res.status(200).json(group)
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error server."})
    }
}

exports.updateGroup = async(req, res)=>{
    try{
        const group = await Group.findById(req.params.group_id);
        if(!group){
            res.status(404).json({message: "Group not found"})
            res.end()
        }
        if(group.admin !== req.body.user_id){
            res.status(403).json({message: "You are not an adminstrator of this group"})
            res.end()
        }
        const updateGroup = await Group.findByIdAndUpdate(req.params.group_id, {name: req.body.name, admin: req.body.admin}, {new : true})
        res.status(200).json(updateGroup)
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error server."})
    }
}

exports.deleteGroup = async(req, res)=>{
    try{
        const group = await Group.findById(req.params.group_id);
        if(!group){
            res.status(404).json({message: "Group not found"})
            res.end()
        }
        if(group.admin !== req.body.user_id){
            res.status(403).json({message: "You are not an adminstrator of this group"})
            res.end()
        }
        await Group.findByIdAndDelete(req.params.group_id)    
        res.status(204)   
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error server."})
    }
}

