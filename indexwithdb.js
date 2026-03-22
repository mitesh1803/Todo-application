const express = require("express");
const app = express();
const connectDB = require("./db");

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/todos", async (req, res) => {
  const response = await connectDB.Todo.find({});
  res.json({ response });
});

app.get("/todos/:id", async (req, res) => {
  try {
    const found = await connectDB.Todo.findById(req.params.id);
    if (!found) return res.status(404).json({ error: "Todo not found" });
    res.json(found);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ mssg: "Title and description required" });
  }
  const newTodo = await connectDB.Todo.create({ title, description });
  res.status(201).json({ mssg: "Todo created successfully", id: newTodo._id });
});

app.put("/todos/:id", async (req, res) => {
  try {
    const updated = await connectDB.Todo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Todo not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const deltodo = await connectDB.Todo.findByIdAndDelete(req.params.id);
    if (!deltodo) return res.status(404).json({ mssg: "Todo not found" });
    res.json({ mssg: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(3000, () => console.log("Server running on port 3000"));