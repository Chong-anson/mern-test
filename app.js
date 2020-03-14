const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello a");
});

const port = process.env.PORT || 5000; 

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// take in callback 
// run callback when it start listenting 