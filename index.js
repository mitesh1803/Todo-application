const express = require("express")
const app =express()
app.use(express.json())

let todo =[]

app.get("/todos",(req,res)=>{
    res.json(todo);
})
app.get("/todos/:id",(req,res)=>{
    const id =parseInt(req.params.id);
    const found=todo.find((t) => t.id===id);
    //Why .find() is better than loop?
// Because:
// stops immediately when match is found ⚡
// cleaner code
// less chance of bugs (like multiple responses)
    if(!found){
        return res.status(404).json({error:"Todo not found"})
    }
    res.json(found)
})
app.post("/todos",(req,res)=>{
    if(!req.body.title||!req.body.description){
        return res.status(400).json({mssg:"Title and description required"})
    }
    const newTodo={
        id:Date.now(),
        title:req.body.title,
        description:req.body.description,
    };

    todo.push(newTodo);
    res.status(201).json({
        mssg:"Todo created successfully",
        id: newTodo.id })
})
app.put("/todos/:id",(req,res)=> {
    const id =parseInt(req.params.id);
    const todoItem =todo.find((t) => t.id===id);
    if(!todoItem){
        return res.status(404).json({error:"Todo not found"})
    }
    if (req.body.title !== undefined) {
        todoItem.title = req.body.title
      }
      
      if (req.body.description !== undefined) {
        todoItem.description = req.body.description
      }
      
      res.json({mssg:"Updated"})
})

app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id)
  
    const initialLength = todo.length
  
    const found = todo.find(t => t.id === id)

    if (!found) {
      return res.status(404).json({ error: "Todo not found" })
    }
    
    todo = todo.filter(t => t.id !== id)
  
    res.json({ message: "Todo deleted" })
  })

  app.use((req, res) => {
    res.status(404).json({ error: "Route not found" })
  })

  app.use((err, req, res, next) => {
    console.error(err) // log full error internally
  
    res.status(500).json({
      error: "Something went wrong"
    })
  })
app.listen(3000)