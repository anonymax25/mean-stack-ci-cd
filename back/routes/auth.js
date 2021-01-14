const bodyParser = require('body-parser');
const User = require('../models').User;
const Task = require('../models').Task;
const SecurityUtil = require('../utils').SecuritryUtils;

module.exports = function (app) {
    app.post("/sign-up", bodyParser.json(), async (req, res) => {
        if (req.body.email && req.body.password && req.body.firstName && req.body.lastName) {
            try {
                const user = new User({
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: SecurityUtil.hashPassword(req.body.password),
                    gender: "undefined",
                    avatarKey: null
                });
                await user.save();
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
                const user = await User.findOne({email: req.body.email, password: SecurityUtil.hashPassword(req.body.password)})
                if (user){
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

    app.delete("/delete/user", bodyParser.json(), async (req, res) => {
        if (req.body.email && req.body.password) {
            try {
                const user = await User.findOne({email: req.body.email, password: SecurityUtil.hashPassword(req.body.password)});
                if(user != null) {
                    const result = await User.deleteOne({
                        email: req.body.email,
                        password: SecurityUtil.hashPassword(req.params.password)
                    });

                    await Task.deleteMany({user: user._id});

                    if (result.deletedCount === 1) {
                        res.status(204).end();
                    } else {
                        res.status(404).end();
                    }
                }else{
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
