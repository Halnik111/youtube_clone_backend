import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) {
        return res.status(401).json("message: " + "Not authenticated!");
    }

    jwt.verify(token, process.env.JWT, (err, data) => {
        if (err) {
            res.status(403).json("message: " + "Invalid token!");
        }
        req.data = data;
        next()
    })
}