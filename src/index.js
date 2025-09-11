import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/db.connect.js";

dotenv.config({
    path: "./.env",
})


const PORT= process.env.PORT || 8000

// async fn that returns Promise --> resolve (.then()) or reject (.catch())
connectDB()
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`server is running on ${PORT} PORT`);
            
        })
    })
    .catch(()=> {
        console.error("monogodb connection failed" , error)

        // to stop nodejs proces, if db not connected
        // dont want server to keep running w/o db
        process.exit(1)
    })