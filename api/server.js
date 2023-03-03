const express = require('express'); // used to handle our api
const mongoose = require('mongoose'); // handle our database
const cors = require('cors'); // cross-origin resource sharing (http header, allows server to indicate any originas other than its own)

const app = express();

const connectionString = "mongodb://127.0.0.1:27017/mern-todo"

app.use(express.json());
app.use(cors());

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=> console.log("Connected to DB"))
    .catch(console.error);

const Todo = require('./models/Todo');

// the below function is finding all of our todo's in the mongoose DB and passing them
// back into the json file

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text //anything we pass in the request, we can put it here basically use entered text
    });

    todo.save(); // saves to db

    res.json(todo);
});

// the id is a dynamic piece of data which will be passed in the request body

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);

})

// toggles completing our todo, status turns to complete when we click on something
app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
}
)

app.listen(3001, () => console.log("Served started on port 3001"));