const { default: mongoose } = require("mongoose");
const createUser = require("../models/createUser");
const postMessage = require("../models/postMessage");


const getPosts = async (req, res) => {
    try {
        // console.log("userId ",req.userData);
        const userPosts = await postMessage.find({ user: req.userId }).sort({ createdAt: -1 });
        // console.log(userPosts);
        res.status(200).json(userPosts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const createPost = async (req, res) => {
    const post = req.body;
    console.log("postcreation",req.userData);
    const newPost = new postMessage({ ...post, creator: req.userData.username, user: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No more post with that id');

    const updatedPost = await postMessage.findByIdAndUpdate(_id, post, { new: true });

    res.status(201).json(updatedPost)
}

const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No more post with that id');

    await postMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' })
}


module.exports = { getPosts, createPost, updatePost, deletePost };