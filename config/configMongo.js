import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const DBConnect = (cb) =>{
    mongoose.connect (`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}.jwfbeyr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true},
        (err)=> {
            if (err) {
                console.log(err)
            }
            cb();
        })
}

export const Users = mongoose.model("users", {
    name: String,
    address: String,
    age: String,
    phoneBd: String,
    username: String,
    password: String,
    imgUrl: String,
});