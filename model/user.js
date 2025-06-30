const {Schema, model} = require('mongoose');
const {createHmac, randomBytes} = require('crypto');
const { type } = require('os');

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    profileImageURL:{
        type:String,
        default: "/images/avatar.png"
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},
{
    timestamps:true 
});

userSchema.pre('save', function(next){
    const user = this;

    if(!user.isModified('password')) return next();
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

const User = model("user", userSchema);
module.exports = User;