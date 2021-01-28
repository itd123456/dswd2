const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require('body-parser');


// express

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

//mongoose

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
},(err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
});

// routes

app.use("/users", require("./routes/userRouter"));
app.use("/enc", require("./routes/encRouter"));
app.use("/setdata", require("./routes/admin/setData"));
