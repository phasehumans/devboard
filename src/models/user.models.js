import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto"

const UserSchema= new Schema({
    avatar:{
        type:{
            url: String,
            localpath: String,
        },
        default:{
            url: `https://placehold.co/600x400`,
            localpath: "",
        }

    },

    username:{
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },

    email:{
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
    },

    fullname:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },

    isEmailVerified:{
        type: Boolean,
        default: false,
    },

    refreshToken:{
        type: String,
    },

    forgotPasswordToken:{
        type: String,
    },

    forgotPasswordExpiry:{
        type: Date,
    },

    emailVerificationToken:{
        type: String,
    },

    emailVerificationExpiry:{
        type: Date,
    }
},{timestamps: true})

export const User= mongoose.model("User", UserSchema)

UserSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password, 10)
    next();
})

