const express = require("express");
const connectDB = require("./config/database");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const app = express();

//Database Connection
connectDB();

//MiddleWare
app.use(express.json({ extended: false }));
app.use(fileUpload());
app.use(cors());

// app.use("/", (req, res) => {
//   res.json({ msg: " This is node server" });
// });

//Defined Routes

//----------Principal--------------
app.use("/api/principal", require("./routes/principal/principal"));
app.use("/api/principalBranch", require("./routes/principal/branches"));
app.use("/api/principalSubject", require("./routes/principal/subject"));
app.use("/api/principalStudent", require("./routes/principal/student"));
//------------Both teacher and principle access---------------
app.use("/api/teacher", require("./routes/principal/teacher"));

//-------Super admin-----------
app.use("/api/admin", require("./routes/superAdmin/register"));
app.use("/api/auth", require("./routes/superAdmin/auth"));
app.use("/api/institute", require("./routes/superAdmin/Institute"));

// Serve static assets in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   );
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server Started on 5000"));
