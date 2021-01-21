const aws = require('aws-sdk');
const User = require('../models').User;

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const multer = require("multer");
let storage = multer.memoryStorage();
let upload = multer({storage: storage});

module.exports = function (app) {
    app.put('/user/:userId/avatar', upload.single("file"), async (req, res) => {
        const s3Key = `avatar:${req.params.userId}`;
        const params = {
            Bucket: process.env.AWS_AVATAR_BUCKET,
            Key: s3Key,
            Body: req.file.buffer
        };
        
        s3.upload(params, async (err, data) => {
            if (err) {
                res.status(500).send("Error -> " + err);
            }else{
                await User.updateOne({_id: req.params.userId}, {avatarKey: s3Key})
                res.send({avatarKey: s3Key});
            }
        });
    });

    app.get('/user/:userId/avatar', (req, res) => {
        const s3Key = `avatar:${req.params.userId}`

        const params = {
            Bucket: process.env.AWS_AVATAR_BUCKET,
            Key: s3Key
        };
        res.setHeader('Content-Disposition', 'attachment');
    
        s3.getObject(params)
            .createReadStream()
                .on('error', function(err){
                    res.status(500).json({error:"Error -> " + err});
            }).pipe(res);
    });
};
