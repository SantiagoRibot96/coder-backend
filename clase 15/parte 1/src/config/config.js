import dotenv from "dotenv";

dotenv.config();

const config = {
    persistence: process.env.PERSISTENCE || "mongo"
}

export default config;