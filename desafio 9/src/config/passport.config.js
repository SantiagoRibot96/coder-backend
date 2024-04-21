import passport from "passport";
import GitHubStrategy from "passport-github2";
import jwt from "passport-jwt";
import jsonwebtoken from "jsonwebtoken";

import UserModel from "../models/user.model.js";
import { newCartList } from "../app.js";

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.00b7af9852391fd4",
        clientSecret: "038d689a497d8329562f2ad044c50ee03527718a",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await UserModel.findOne({email: profile._json.email});
            const cartId = await newCartList.addCart();

            if(!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "unknown",
                    age: 36,
                    email: profile._json.email,
                    password: "imposibleDeHackear",
                    cart: cartId._id
                }
                
                let result = await UserModel.create(newUser);
                
                done(null, result);
            }else{
                done(null, user);
            }
        } catch (error) {
            done(error);
        }
    }));

    passport.use("current", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse",

    }, async (jwt_payload, done) => {
        try {
            const user = await UserModel.findOne({email: jwt_payload.email});

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById({_id: id});
        done(null, user);
    });
}

const cookieExtractor = (req) => {
    let token = null;

    if(req && req.cookies) {
        token = req.cookies["coderCookieToken"];
    }
    
    return token;
}

export default initializePassport;