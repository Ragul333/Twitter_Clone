const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    const token = req.headers.authorization;
    jwt.verify(token, 'secretKey007', (err, data) => {
        if (err) return res.status(401).json({ message: 'Token expired ! SignIn to continue' });

        req.userId = data.id;
        req.userData = data;
        next();
    })
    console.log("AUTH_SUCCESS")

}

module.exports = auth;