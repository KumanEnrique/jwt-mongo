const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')


router.post('/auth',(req,res)=>{
    User.findOne({
        name:req.body.name
    },(error,user)=>{
        if(error)throw error;
        if(!user){
            res.json({message:"authentificacion fallida. Usuario no encontrado"})
        }
        if(user.password != req.body.password){
            res.json({message:'usuario encontrado. autentificacion fallida contraseña erronea'})
        }else{
            const token = jwt.sign({user},req.app.get('supersecret'))
            res.json({
                message:'disfruta tu token',
                token
            })
        }
    })
})

router.use((req,res,next)=>{
    const token = req.body.token || req.query || req.headers['x-access-token']
    if(token){
        jwt.verify(token,req.app.get('supersecret'),(error,decoded)=>{
            if(error){
                return res.json({message:"autentificacion fallida"})
            }else{
                req.decoded = decoded
                console.log('exito!!!')
                next();
            }
        })
    }else{
        res.json({message:"no existe el token"})
    }
})

router.get('/',async(req,res)=>{
    const user = await User.find()
    res.json(user)
})

module.exports = router
