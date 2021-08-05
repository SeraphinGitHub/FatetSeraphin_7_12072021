
const generic = require("../generic-functions");
const db = require("../models");
const Publish = db.Publish;
const Likes = db.Likes;
const Dislikes = db.Dislikes;


// ==================================================================================
// "GET" ==> Get all publications by ID in DataBase
// ==================================================================================
exports.showAllPublication = (req, res, next) => generic.getAllItem(Publish, {}, req, res, next);


// ==================================================================================
// "POST" ==> Create one publication in DataBase
// ==================================================================================
exports.createPublication = (req, res, next) => {
    const userIdTok = generic.verifyToken(req, res, next, "userId");

    if(req.file) {
        const post = new Publish({
            ...req.body,
            userId: userIdTok,
            imageUrl: `${req.protocol}://${req.get("host")}/pictures/${req.file.filename}`,
        });

        post.save()
        .then(() => res.status(202).json({ message: "Publication with file created successfully !" }))
        .catch(() => res.status(503).json({ message: "Publication with file NOT created !" }));
    }

    else {
        const post = new Publish({
            ...req.body,
            userId: userIdTok,
        });

        post.save()
        .then(() => res.status(200).json({ message: "Publication created successfully !" }))
        .catch(() => res.status(501).json({ message: "Publication NOT created !" }));
    }
}


// ==================================================================================
// "POST" ==> Like Dislike Publication
// ==================================================================================
exports.likePublication = (req, res, next) => {
    const userIdTok = generic.verifyToken(req, res, next, "userId");

    Publish.findOne({ where: { id: req.body.id } })
    .then(post => {
        
        const likes = new Likes({
            userId: userIdTok,
            postId: post.id,
        });

        const dislikes = new Dislikes({
            userId: userIdTok,
            postId: post.id,
        });


        if(req.body.like === "1") {

            console.log({ e: "azeazeazeazeaez" });
            
            Likes.findOne({ where: { userId: userIdTok } })
            .then(() => { return })
            .catch(() => {

                Dislikes.findAll({ where: { postId: post.id } })
                .then(() => {
    
                    Dislikes.findOne({ where: { userId: userIdTok } })
                    .then(user => {
    
                        Dislikes.destroy({ where: { userId: user.id } });
    
                    }).catch(() => { return });
                }).catch(() => { return });
    
                likes.save();
            });
        }

        
        if(req.body.like === "-1") {

            Dislikes.findOne({ where: { userId: userIdTok } })
            .then(() => { return })
            .catch(() => {

                Likes.findAll({ where: { postId: post.id } })
                .then(() => {

                    Likes.findOne({ where: { userId: userIdTok } })
                    .then(user => {

                        Likes.destroy({ where: { userId: user.id } });

                    }).catch(() => { return });
                }).catch(() => { return });
                
                dislikes.save();
            });
        }
        
        
        // Likes.findAll({ where: { postId: post.id } })
        // .then(likes => {
            
        //     Dislikes.findAll({ where: { postId: post.id } })
        //     .then(dislikes => {

        //         let postLikes = [];
        //         let postDislikes = [];
                
        //         likes.forEach(like => postLikes.push(like));
        //         dislikes.forEach(dislike => postDislikes.push(dislike));

        //         let likesNumber = postLikes.length;
        //         let dislikesNumber = postDislikes.length;

        //         res.status(200).json({ likesNumber, dislikesNumber, message: "Like modifiée !" });

        //     }).catch(() => res.status(402).json({ message: "Dislikes NOT found !" }));
        // }).catch(() => res.status(401).json({ message: "Likes NOT found !" }));
    
    }).catch(error => res.status(400).json({ error }));
}


// ==================================================================================
// "PUT" ==> Modify one publication by ID in DataBase
// ==================================================================================
exports.modifyPublication = (req, res, next) =>
generic.verifyPostOwner(Publish, "modifyItem", req, res, next);


// ==================================================================================
// "DELETE" ==> Delete one publication by ID in DataBase
// ==================================================================================
exports.deletePublication = (req, res, next) => 
generic.verifyPostOwner(Publish, "deleteItem", req, res, next);