const jwt = require('jsonwebtoken')

const auth = (req, res, next)=>{
    const token = req.headers.authorization.split(' ')[1]
    if(token){
        jwt.verify(token, process.env.token_Key, (err, decoded) => {
            if(decoded){
                req.body.userId = decoded.userId
                next()
            } else {
                res.send({'msg': 'You are not authorised'})
            }
        });
    } else {
        res.send({'msg': 'You are not authorised'})
    }
}

module.exports={auth}