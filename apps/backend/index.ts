import express from "express";
import pgClient from "db/client";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
const pg = pgClient;


const port = Number(process.env.PORT) || 8080; 

app.post("/createUser", async (req : any, res : any)=>{
    const {name, email, password} = req.body;

    try{
        const create = await pg.user.create({
            data : {
                name,
                email,
                password
            }
        });
        
        res.status(200).json({
            message : "User created",
            data : create
        });
    }
    catch(error: any){
        console.error("Create user error:", error);
        res.status(400).json({
            error: error?.message || String(error),
            message : "error creating the user"
        });
    }
});

app.post("/createTodo", async (req : any, res : any)=>{
    const {title, userId} = req.body;
    try{
        const create = await pg.todo.create({
            data : {
                title,
                userId,
                done : false
            }
        });

        res.status(200).json({
            message : "Todo created",
            data : create
        })
    }
    catch(error){
     
        res.status(400).json({
            error : error,
            message : "error creating the todo"
        });
    }
});


app.get("/getUsers", async (req, res)=>{
    try{
        const fetchUsers = await pg.user.findMany();
        if(fetchUsers){
            res.json({
               users : fetchUsers
            });
        }
        else{
            res.json({
                message : "No users found"
            })
        }
        
    }
    catch(error){
  
        res.status(400).json({
            error : error,
            message : "error finding the users"
        });
    }
});

app.get("/getTodos", async (req, res)=>{
    try{
        const fetchTodos = await pg.todo.findMany({
            include: { user: true }
        });
        res.json({ todos: fetchTodos });
    }
    catch(error){
        res.status(400).json({
            error: error,
            message: "error finding the todos"
        });
    }
});

app.put("/TodoDone/:id", async (req, res)=>{
    const { id } = req.params;
    try{
        const updateTodo = await pg.todo.update({
            where: { id },
            data: { done: true }
        });
        res.json({
            message: "Todo marked as done",
            data: updateTodo
        });
    }
    catch(error){
      
        res.status(400).json({
            error: error,
            message: "error updating the todo"
        });
    }
});

app.get("/", (req, res)=>{
    res.json({ message: "Server is running" });
});


app.listen(port, ()=>{
    console.log("Server running on", port);
});