require("dotenv").config();
const express = require("express");
const cors = require('cors');
const notFoundMiddleware = require("./middleware/notFound");
const errMiddleware  = require("./middleware/errMiddleware");
const authRoute = require("./routes/auth-route");
const todoRoute = require("./routes/todo-route");
const app = express();

app.use(express.json());
// app.use(cors());
app.use(cors({origin:"http://localhost:5173"}));//ระบุบให้ใช้เฉพาะ port
app.use("/auth",authRoute);
app.use("/todo",todoRoute);

app.use(notFoundMiddleware);
app.use(errMiddleware);

const PORT = process.env.PORT||8888;
app.listen(PORT,()=>console.log("start Server Port:"+PORT));