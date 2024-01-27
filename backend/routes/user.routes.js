const express = require('express')
const { UserModel } = require('../models/user.schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRouter = express.Router()

userRouter.post('/register', async(req, res)=>{
    const {name, avatar, email, password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            res.status(200).send('email already registered')
        } else {
            bcrypt.hash(password, 5, async(err, hash)=> {
                if(err){
                    res.status(400).send({error: err})
                } else {    
                    const user = new UserModel({
                        name, avatar, email, password:hash
                    })
                    await user.save()
                    res.status(200).send('User registered successfully')
                    
                }
            });
        }
    } catch (error) {
        res.status(400).send({error: error})
    }
})

userRouter.post('/login', async(req, res)=>{
    const {email, password} = req.body
    try {
        console.log('try');
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
                if(result){
                    let token = jwt.sign({userId: user._id}, process.env.token_Key , {expiresIn: 60*100})
                    res.status(200).send({msg: 'Login successfull', token: token})
                } else {
                    res.status(200).send('Wrong credentials')
                }
            })
        } else {
            res.status(200).send('User is not registered')
        }
    } catch (error) {
        console.log('catch');
        res.status(400).send(error)
    }
})

module.exports={userRouter}
