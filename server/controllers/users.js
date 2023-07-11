const createUser = require("../models/createUser");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const postMessage = require("../models/postMessage");

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingEmail = await createUser.findOne({ email });
        const existingName = await createUser.findOne({ username });

        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        } else if (existingName) {
            return res.status(400).json({ message: 'UserName already exists' });
        }
        const hashedPasscode = await bcrypt.hash(password, 12);
        const result = await createUser.create({ email, password: hashedPasscode, username });
        const token = jwt.sign({ email: result.email, id: result._id }, 'secretKey007', { expiresIn: '1h' });
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await createUser.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User dosen't exists" });
        }
        const isPasswordRight = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordRight) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, username: existingUser.username }, 'secretKey007', { expiresIn: '1h' });
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });

    }

}

const getAllUsers = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await createUser.findById(id);

        const users = await createUser.find().select({ password: 0 });

        function overwriteMatchingElements(arr1, arr2) {
            for (let i = 0; i < arr1.length; i++) {
                if (arr2.includes(arr1[i]._id)) {
                    arr1[i] = { ...arr1[i]._doc, isFollowed: true };
                }
            }
            return arr1;
        }

        const usersLIsts = overwriteMatchingElements(users, user.following)
        res.status(200).json(usersLIsts);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const followUsers = async (req, res) => {
    const { userId, followingId } = req.body;
    try {
        const user = await createUser.findByIdAndUpdate(userId, { "$push": { "following": followingId } });
        const userFollowed = await createUser.findByIdAndUpdate(followingId, { "$push": { "followers": userId } });
        if (user && userFollowed) {
            return res.status(200).json({ message: "User followed" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}
const unFollowUsers = async (req, res) => {
    const { userId, followingId } = req.body;
    try {
        const user = await createUser.findByIdAndUpdate(userId, { "$pull": { "following": followingId } });
        const userUnFollowed = await createUser.findByIdAndUpdate(followingId, { "$pull": { "followers": userId } });
        if (user && userUnFollowed) {
            return res.status(200).json({ message: "User unFollowed" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const getAllFollowersPosts = async (req, res) => {
    const { id } = req.params;
    console.log("userId ", id)
    try {
        if (id) {

            const user = await createUser.findById(id);
            let following = user.following;
            const posts = await postMessage.find({ "user": { $in: following } }).sort({ createdAt: -1 });

            return res.status(200).json(posts);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' });
    }
}


module.exports = { login, register, getAllUsers, followUsers, unFollowUsers, getAllFollowersPosts };