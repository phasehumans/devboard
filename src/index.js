import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/db.connect.js";
import app from "./app.js";

dotenv.config({
    path: "./.env",
})


const PORT= process.env.PORT || 8000

connectDB()
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`server is running on ${PORT} PORT`);
            
        })
    })
    .catch(()=> {
        console.error("monogodb connection failed" , error)
        process.exit(1)
    })