const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

// connect database
mongoose
  .connect(
    "mongodb+srv://crud:crud@cluster0.11dwg.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("database is connected");
  });

// model
const user = mongoose.model("User", { name: String });

// add task
app.post("/add", (req, res) => {
  let { name } = req.body;
  let result = new user({
    name: name,
  });
  result.save();
  res.status(201).send({ success: true, msg: "add successfully" });
});

// alltodos get
app.get("/alltodos", async (req, res) => {
  let alltodos = await user.find({});
  res.send(alltodos);
});

// delete todos
app.delete("/deletetodo/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  let deletetodo = await user.findOneAndDelete({
    _id: id,
  });
  res
    .status(200)
    .send({ success: true, msg: "delete success", data: deletetodo });
});

// update todos
app.patch("/updatetodo/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  let updatetodo = await user.findOneAndUpdate({
    _id: id,
  });
  res
    .status(200)
    .send({ success: true, msg: "update success", data: updatetodo });
});

app.listen(port || 8000, () => {
  console.log(`server runing in this port ${port}`);
});
