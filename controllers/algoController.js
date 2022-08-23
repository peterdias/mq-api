const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')

const StrategyModel = require('../models/strategy')
const BotModel = require('../models/bot')

const saveStrategy = asyncHandler(async (req, res) => {
    const { data,uid } = req.body
    let st = JSON.parse(data)    
    if(st.title.substring(0,2) == 'n-') //New Strategy
    {
        const strategy = await StrategyModel.create({
            title: st.title,    
            description: st.description,       
            uid: mongoose.Types.ObjectId(uid)
        })

        if (strategy) {
            res.status(201).json({ id: st._id })
        } else {
            res.status(400)
            throw new Error('Strategy coundnt be created')
        }
    }
    else //Update Existing Strategy
    {

    }
})

module.exports = {
    saveStrategy,
}