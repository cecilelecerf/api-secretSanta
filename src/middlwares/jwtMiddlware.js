
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY

exports.verifyTokenUser = async(req, res, next)=>{
    try{ const token = req.headers["authorization"];
        if(token !== undefined){
            const playload = await new Promise ((resolve, reject)=>{
                jwt.verify(token, jwtKey, (error, decoded)=>{
                    if(error)
                        reject(error);
                    else
                        resolve(decoded);
                })  
            });
            req.user = playload;
            next()
        }
        else
            res.status(401).json({message: "Access prohibited missing token"})
    } catch (error){
        console.log(error);
        res.status(401).json({message : "Access prohibited invalid token"})
    }
}

exports.verifyTokenGroup = async(req, res, next)=>{
    try{ const token = req.body.tokenGroup;
        if(token !== undefined){
            const playload = await new Promise ((resolve, reject)=>{
                jwt.verify(token, jwtKey, (error, decoded)=>{
                    if(error)
                        reject(error);
                    else{
                        resolve(decoded);
                    }
                })  
            });
            req.group = playload;
            next()
        }
        else
            res.status(401).json({message: "Access prohibited missing token"})
    } catch (error){
        console.log(error);
        res.status(401).json({message : "Access prohibited invalid token"})
    }
}
