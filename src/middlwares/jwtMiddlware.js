
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
            res.status(403).json({message: "Accès interdit: token manquant"})
    } catch (error){
        console.log(error);
        res.status(403).json({message : "Accès interdit : token non valide"})
    }
}

exports.verifyTokenGroup = async(req, res, next)=>{
    console.log( req.headers["Group"])
    try{ const token = req.headers["Group"];
        if(token !== undefined){
            const playload = await new Promise ((resolve, reject)=>{
                jwt.verify(token, jwtKey, (error, decoded)=>{
                    if(error)
                        reject(error);
                    else
                        resolve(decoded);
                })  
            });
            console.log(req.group)
            req.group = playload;
            next()
        }
        else
            res.status(403).json({message: "Accès interdit: tmanquant"})
    } catch (error){
        console.log(error);
        res.status(403).json({message : "Accès interdit : token non valide"})
    }
}
