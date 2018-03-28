mongoose = require('mongoose');
md5 = require('md5');
colors = require('colors')
mongoose.connect('mongodb://localhost/loginApp');

var User = mongoose.model('User', {
    fullName: String,
    email: String,
    password: String,
});

function createNewUser(newUser, callback) {
    newUser.password = md5(newUser.password);
    newUser.email = newUser.email.trim().toLowerCase();

    if (callback === undefined) {
        callback = (err, user) => {
            if (err) console.error(err.message.yellow);
            else
                console.log(JSON.stringify(user).green);
        }
    }

    newUser.save(callback);

}

function findUserByEmail(email, callback){
    let query = {email:email};

    User.findOne(query, callback);
}

function findUserById(id, callback){
    User.findById(id, callback)
}

function matchPassword(notHashedPass, hashedPass){
    return md5(notHashedPass)===hashedPass;
}
module.exports = {
    User: User,
    createNewUser: createNewUser,
    matchPassword: matchPassword,
    findUserById:findUserById,
    findUserByEmail:findUserByEmail,
}
// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));