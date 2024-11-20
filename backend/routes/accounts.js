const express = require("express")
const router = express.router()
const { AuthMiddleware } = require("../middleware")
const { Account } = require("../db")
const mongoose = require("mongoose")

router.get("/balance", AuthMiddleware, async (req, res) => {
    const userId = req.userId
    const account = await Account.findOne({ userId })
    const balance = account.balance

    res.json({ balance: balance })
})

router.post("/transfer", AuthMiddleware, async (req, res) => {

    // Transactions let you execute multiple operations in isolation and potentially undo all the operations if one of them fails.

   const session = await mongoose.startSession()

    session.startTransaction()   // start the transaction

    const { amount, to } = req.body
    const account = await Account.findOne({ userId: req.userId }).session(session)

    if (!account || account.balance < amount) {
        await session.abortTransaction()
        return res.status(400).json({ message: "insufficient balance" })
    }

    const toAccount = await Account.findOne({ userId: to }).session(session)
    if (!toAccount) {
        await session.abortTransaction()
        return res.status(400).json({ message: "invalid Account" })
    }

    // perform transaction
    await Account.updateOne({ userId: req.userId }, {
        $inc: {
            balance: -amount
        }
    }).session(session)

    await Account.updateOne({ userId: to }, {
        $inc: {
            balance: amount
        }
    }).session(session)

    //commit transaction
    await session.commitTransaction()
    res.json({
        message: "Transfer Successfully"
    })



})


module.exports = router