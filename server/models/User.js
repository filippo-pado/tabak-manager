var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    username: { type: String, trim: true, lowercase: true },
    hashedPassword: String
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword);
}

UserSchema.methods.hashPassword = function (password) {
    this.hashedPassword = bcrypt.hashSync(password, 10);
}

module.exports = mongoose.model('User', UserSchema);
