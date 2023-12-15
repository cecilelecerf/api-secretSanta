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
        res.status(200).json(group)
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error server."})
    }
}



