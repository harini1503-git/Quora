const express= require("express");
const app= express();
const port= 8080;
const path= require("path");
const { v4: uuidv4 } = require('uuid');
const methodoverride= require("method-override");

app.use(methodoverride('_method'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts= [
    {
        id: uuidv4(),
        username: "Harini",
        content: "Hello everyone!! there's my first post!!"
    },
    {
        id: uuidv4(),
        username:"Mahisha",
        content: "Hey Hi everyone!! Happy Rainy Day"
    },
    {
        id: uuidv4(),
        username:"Sumathy",
        content: "i am in a great travel to Rameshawaram and had a beautiful blessing"
    },
    {
        id: uuidv4(),
        username:"Pradhyun",
        content: "I am had made a new dish for the first time that was a extremely wonderful experience"
    },
    {
        id: uuidv4(),
        username:"Ravi",
        content: "I am happy to share a good news with you all that i had bought a new property for 1 crore.."
    }
]

app.get("/Quora", (req, res)=>{
    res.render("templates.ejs", {posts});
});

app.get("/Quora/posts", (req, res)=>{
    res.render("form.ejs");
})

app.post("/Quora", (req, res)=>{
    let {username, content}= req.body;
    let id= uuidv4();
    posts.push({id, username, content});
    res.redirect("/Quora");
})

app.get("/Quora/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post= posts.find((p)=> id === p.id);
    res.render("details.ejs", {post});
})

app.patch("/Quora/posts/:id", (req, res)=>{
    let {id} = req.params;
    let newcontent= req.body.content;
    let post= posts.find((p)=> id === p.id);
    post.content= newcontent;
    res.redirect("/Quora");
})

app.get("/Quora/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post= posts.find((p)=> id === p.id);
    res.render("edit.ejs", {post});
})

app.delete("/Quora/posts/:id", (req, res)=>{
    let {id} = req.params;
    posts= posts.filter((p)=> id !== p.id);
    res.redirect("/Quora");
})
app.listen(port, ()=>{
    console.log(`Listening to port no...${port}`);
})
