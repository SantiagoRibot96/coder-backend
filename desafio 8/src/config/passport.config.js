import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import GitHubStrategy from "passport-github2";

import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";

const initializePassport = () => {
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email"
    }, async (req, username, password, done) => {
        const {first_name, last_name, email, age} = req.body;
        
        try {
            let rol = "Usuario";

            if(email === "adminCoder@coder.com") rol = "Administrador";
            
            let user = await UserModel.findOne({email});

            if(user) return done(null, false);
            
            let newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                rol,
            }

            let result = await UserModel.create(newUser);
            return done(null, result);
        } catch (error) {
            return done(error);
        }
    }));

    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {
            const user = await UserModel.findOne({email});

            if(!user){
                console.log("Usuario no existe");
                return done(null, false);
            }

            if(!isValidPassword(password, user)) return done(null, false);

            return done(null, user);
        } catch (error) {
            done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById({_id: id});
        done(null, user);
    });

    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.00b7af9852391fd4",
        clientSecret: "038d689a497d8329562f2ad044c50ee03527718a",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findOne({email: profile._json.email})

            if(!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "unknown",
                    age: 36,
                    email: profile._json.email,
                    password: "imposibleDeHackear",
                    rol: "Usuario"
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
}

export default initializePassport;