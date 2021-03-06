var express = require('express');
var router = express.Router();
var regUser = require('../models/register');




router.post('/', function (req, res) {
    if (req.body.email &&
        req.body.fullName &&
        req.body.password
      ) {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const picture = 'none';
    const publicId = 'none';
    const password = req.body.password;
    const role = "user";


    const newUser = new regUser({
        fullName,
        email,
        picture,
        publicId,
        password,
        role,
        createDate: Date.now()
    });

    regUser.getUserByEmail(email, (err, user) => {
        if (!user) {
            regUser.createUser(newUser, function (error, user) {
                if (error) {
                    res.status(422).json({
                        message: 'Something went wrong!'
                    })
                }
                res.json({ status: true, message: 'ok', user });
            });
        } else {
            res.json({status: false, message: "This email is already used"});
        }
    });


} else {
    res.json({status: false, message: 'Your input details are not complete.'});
}

});



module.exports = router;
