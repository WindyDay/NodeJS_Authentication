mongoose = require('mongoose');
md5 = require('md5');

mongoose.connect('mongodb://localhost/loginApp');

var User = mongoose.model('User', { 
    fullName:String,
    email:String,
    password:String,
});

function createNewUser(newUser){
    newUser.password = md5(newUser.password);
    newUser.email = newUser.email.trim().toLowerCase();
    newUser.save().then(() => console.log(newUser));

}
module.exports = {
    User:User,
    createNewUser:createNewUser,
}
// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));