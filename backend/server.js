const express = require("express");
const cors = require("cors");
const routes = require("./routes");   // import routes

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Library Catalog Backend Running");
});

/* CONNECT ROUTES */
app.use("/api", routes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});