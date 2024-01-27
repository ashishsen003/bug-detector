const express = require('express')
const { auth } = require("../middleware/auth.middleware")
const { BugModel } = require("../models/bug.schema")

const bugRouter = express.Router()

bugRouter.get('/', auth, async(req, res)=>{
    try {
        const bugs = await BugModel.find({userId: req.body.userId})
        res.status(200).send(bugs)
    } catch (error) {
        res.status(400).send({error: error})
    }
})

bugRouter.get('/:id', auth, async(req, res)=>{
    const {id} = req.params
    try {
        const bug = await BugModel.findById({_id: id})
        if(!bug){
            return res.status(200).send('Product not found')
        }
        res.status(200).send(bug)
    } catch (error) {
        res.status(400).send({error: error})
    }
})

bugRouter.post('/', auth, async(req, res)=>{
    try {
        const user = new BugModel(req.body)
        await user.save()
        res.status(200).send('Bug reported')
    } catch (error) {
        res.status(400).send({error: error})
    }
})

bugRouter.patch('/:id', auth, async(req, res)=>{
    const {id} = req.params
    try {
        const bug = await BugModel.findById({_id: id})
        if(req.body.userId == bug.userId){
            console.log(req.body.userId, bug.userId);
            await BugModel.findByIdAndUpdate({_id: id}, req.body)
            res.status(200).send('Reported bug updated')
        } else {
            res.status(204).send({ msg: "You are not authorised" });
        }
    } catch (error) {
        res.status(400).send({error: error})
    }
})

bugRouter.delete('/:id', auth, async(req, res)=>{
    const {id} = req.params
    console.log(id);
    try {
        const bug = await BugModel.findById({_id: id})
        console.log(bug);
        if(req.body.userId == bug.userId){
            console.log(req.body.userId, bug.userId);
            await BugModel.findByIdAndDelete({_id: id})
            res.status(200).send('Reported bug deleted')
        } else {
            res.status(204).send({ msg: "You are not authorised" });
        }
    } catch (error) {
        res.status(400).send({error: error})
    }
})

module.exports={bugRouter}