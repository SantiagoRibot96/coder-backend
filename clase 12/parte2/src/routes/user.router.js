import Router from "./router.js"

export default class userRouter extends Router {
    init() {
        this.get("/", (req, res) => {
            res.send("Get de usuarios");
        });
        //this.post();
    }
}