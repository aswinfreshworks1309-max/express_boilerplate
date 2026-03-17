// generate token for login
// verify token

import jwt from 'jsonwebtoken'


function genToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn: 60 * 60,
    });
}


function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET_KEY);
}



const jwtHelper = {
    genToken,
    verifyToken,

}

export default jwtHelper;