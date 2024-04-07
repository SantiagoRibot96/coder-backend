import express from "express";
import passport from "passport";

const router = express.Router();

router.post("/", passport.authenticate("register", {
    failureRedirect: "/api/sessions/failedregister"
}), async (req, res) => {
    if(!req.user) return res.status(400).send("Credenciales invalidas");

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        rol: req.user.rol
    }

    req.session.login = true;

    res.redirect("/products");
});

router.get("/failedregister", (req, res) => {
    res.send("Registro fallido");
});

router.post("/login", passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin"
}), async (req, res) => {
    if(!req.user) return res.status(400).send("Credenciales invalidas");

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        rol: req.user.rol
    }

    req.session.login = true;

    res.redirect("/products");
});

router.get("/faillogin", (req, res) => {
    res.send("Fallo al iniciar sesion");
});

router.get("/github", passport.authenticate("github", {
    scope: ["user: email"]
}), async (req, res) => {});

router.get("/githubcallback", passport.authenticate("github", {
    failureRedirect: "/login"
}), async (req, res) => {
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/products");
});

router.get("/logout", (req, res) => {
    if(req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
});

export default router;