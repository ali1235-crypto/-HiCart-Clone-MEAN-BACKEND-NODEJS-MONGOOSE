const JWT=require('jsonwebtoken')

const jwtkey="dwawa#@w4333!@!"


const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(authHeader){
        JWT.verify(authHeader,jwtkey,(err,user)=>{
            if(err) res.status(401).json("token is not valid !")
            req.user=user
            next()
        })
    }else{
        res.status(401).json("you are not authenticated !")
    }
}

const verifyTokenAndAuthorization=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if((req.params.id&&req.user.id === req.params.id) || req.user.id === req.params.iduser || req.user.isAdmin){
            next()
        }
        else{
            res.status(403).json("you are not allowed to that !")
        }
    })
}

const verifyTokenAndAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }
        else{
            res.status(403).json("you are not allowed to that !")
        }
    })
}

module.exports={verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorization}