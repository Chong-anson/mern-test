const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const bodyParser = require("body-parser");
const passport = require('passport');
const path = require('path');


if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

mongoose
    .connect(db, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then( () => console.log("Connect to mondoDB"))
    .catch( err => console.log(err))
// connect to database
// pass in the uri and config options 

app.use(bodyParser.urlencoded({
    extended: false
})); 


app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

app.get("/", (req, res) => {
    // debugger;
    // const user = new User({
    //     handle: "test",
    //     email: "aa@aa.io",
    //     password: "password"
    // })

    // user.save();
    res.send("Hello brrrr");
});

app.use("/api/users", users); 
app.use("/api/tweets", tweets); 

const port = process.env.PORT || 5000; 

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// take in callback 
// run callback when it start listenting 
