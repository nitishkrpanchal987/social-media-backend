const router = require('express').Router();
const Post = require('../models/post');
const User = require('../models/user');

// create a post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        return res.status(200).send(savePost);
    } catch (error) {
        return res.status(403).send(error);
    }
})

// update a post
router.patch('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            let updatePost = await Post.updateOne({ $set: req.body })
            res.status(200).send(updatePost);
        }
        else {
            return res.status(400).send('you can update your own post only');
        }
    } catch (error) {
        return res.status(403).send(error);
    }
})

// delete post

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            let updatePost = await Post.deleteOne();
            res.status(200).send(updatePost);
        }
        else {
            return res.status(400).send('you can delete your own post only');
        }
    } catch (error) {
        return res.status(403).send(error);
    }
})

// like/dislike a post

router.put('/:id/like', async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        console.log(post);
        if(!post.likes.includes(req.body.userId))
        {
            const gl = await post.updateOne({$push: {likes: req.body.userId}});
            console.log(gl);
            res.status(200).send('the post has been liked');
        }
        else
        {
            await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).send('the post has been disliked');
        }
    } catch (error) {
        return res.status(403).send(error);
    }
})

// get a post

router.get('/:id', async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).send(post);
    } catch (error) {
        return res.status(403).send(error);
    }
})

// timeline

router.get('/timeline/all', async (req, res)=>{
    try {
        const currUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currUser._id});
        const friendPost = await Promise.all(
            currUser.followings.map(friendId=>{
                return Post.find({userId: friendId});
            })
        )
        res.send(userPosts.concat(...friendPost));
    } catch (error) {
        res.status(403).send(error);
    }
})
module.exports = router;