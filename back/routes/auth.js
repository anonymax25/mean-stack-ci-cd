const bodyParser = require('body-parser');
const User = require('../models').User;
const Task = require('../models').Task;
const SecurityUtil = require('../utils').SecuritryUtils;
const MailerUtil = require('../utils').MailerUtils;

module.exports = function (app) {
    app.post("/sign-up", bodyParser.json(), async (req, res) => {
        if (req.body.email && req.body.password && req.body.firstName && req.body.lastName) {
            try {
                let date_ob = new Date();
                let date = ("0" + date_ob.getDate()).slice(-2);
                let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                let year = date_ob.getFullYear();
                const currentDate = date + "-" + month + "-" + year;
                const code = Math.floor(100000 + Math.random() * 900000);

                const user = new User({
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: SecurityUtil.hashPassword(req.body.password),
                    gender: null,
                    createDate: currentDate,
                    verifiedEmail: false,
                    verificationCode: code,
                    avatarKey: null
                });
                await user.save();
                await MailerUtil.sendMailVerification(req.body.email, code, false);
                res.status(201).json(user)
            } catch (e) {
                res.status(500).end();
            }
        } else {
            res.status(400).end();
        }
    });

    app.post("/sign-in", bodyParser.json(), async (req, res) => {
        if (req.body.email && req.body.password) {
            try {
                const user = await User.findOne({email: req.body.email, password: SecurityUtil.hashPassword(req.body.password)});
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                res.status(500).end();
            }
        } else {
            res.status(400).end();
        }
    });

    app.post("/verification", bodyParser.json(), async (req, res) => {
        if (req.body.email && req.body.verificationCode) {
            try {
                const user = await User.findOne({email: req.body.email, verificationCode: req.body.verificationCode});
                const result = await User.updateOne({email: req.body.email, verificationCode: req.body.verificationCode},
                    {$set: { verifiedEmail: true } });
                if (result.nModified === 1 || user) {
                    res.status(204).end();
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                res.status(500).end();
            }
        } else {
            res.status(400).end();
        }
    });

    app.post("/reset-password", bodyParser.json(), async (req, res) => {
        if (req.body.email && req.body.password && req.body.verificationCode) {
            try {
                const result = await User.updateOne({email: req.body.email, verificationCode: req.body.verificationCode},
                    {$set: { password: SecurityUtil.hashPassword(req.body.password) } });
                if (result.nModified === 1) {
                    res.status(204).end();
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                res.status(500).end();
            }
        } else {
            res.status(400).end();
        }
    });

    app.post( "/send/email", bodyParser.json(), async (req, res) => {
        if (req.body.email) {
            try {
                const code = Math.floor(100000 + Math.random() * 900000);
                const user = await User.updateOne({email: req.body.email},
                    {$set: { verificationCode: code } });
                if (user) {
                    await MailerUtil.sendMailVerification(req.body.email, code, true);
                    res.status(204).end();
                } else {
                    res.status(409).end();
                }
            } catch (e) {
                console.log(e);
                res.status(500).end();
            }
        } else {
            res.status(400).end();
        }
    });

    app.delete("/user/:email/:password", async (req, res) => {

        if (req.params.email && req.params.password) {
            try {
                const user = await User.findOne({email: req.params.email, password: SecurityUtil.hashPassword(req.params.password)});
                if(user) {
                    await Task.deleteMany({user: user._id});
                    const result = await User.deleteOne({
                        email: req.params.email,
                        password: SecurityUtil.hashPassword(req.params.password)
                    });
                    res.status(204).end();
                } else{
                    res.status(404).end();
                }
            } catch (e) {
                res.status(500).end();
            }
        } else {
            res.status(400).end();
        }
    });
};
