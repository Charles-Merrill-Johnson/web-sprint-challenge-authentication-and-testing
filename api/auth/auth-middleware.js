const User = require('../../api/users/user-model');

const validateUsername = (req, res, next) => {
    if(!req.body.username || !req.body.password){
        next({ 
            status: 422,
            message: "username and password required"
         })
    } else {
        next()
    }
}


const usernameDoesNotExists = async (req, res, next) => {
    try{
        const { user } = await User.findBy({username: req.body.username})
        if(!user) {
            next({ 
                status: 422,
                message: "invalid credentials"
             })
        } else {
            req.user = user
            next()
        }
    } catch (err) {
        next(err)
    }
}


const usernameExists = async (req, res, next) => {
    const { username } = req.body;
    const existingUser = await User.findBy({ username });
  
    if (existingUser != null) {
      next({ status: 401, message: "username taken" });
      return;
    }
  
    next();
  }
  

module.exports = {
    validateUsername,
    usernameDoesNotExists,
    usernameExists
}