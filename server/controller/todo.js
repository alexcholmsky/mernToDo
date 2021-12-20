import mongoose from 'mongoose';
import Todo from '../models/todos.js';
//importing the todo model 
export const readTodos = async (req, res) => {
try {
const Todos = await Todo.find();
/*method that comes with a model:

Creates a find query: 
- gets a list of documents (unique records) that match filter.

*/
res.status(200).json(Todos);
//returns status 200 (ok) and a json object containing a list of all the documents (to-do taks)
} catch (error) {
res.status(404).json({ message: error.message });
    }
}

 
//function to create todo tasks
export const createTodo = async (req, res) => {
//calls constructor to create to-do tasks
    const todo = new Todo(req.body);
/* req.body allows you to access data as a json object from the client
    - used to receive data through post and put requests
    - in this case it will be forms from the client side
*/
try {
    await todo.save();
    res.status(201).json(todo);
} catch (error) {
    res.status(409).json({ message: error.message })
    }
}

export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No todo with id: ${id}`);
    } 
    //don't need else in if-statement
    const updatedTodo = { title,content, _id: id };
        await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });
            res.json(updatedTodo);
    }

    export const deleteTodo = async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`No todo with id: ${id}`);
        } 
        //don't need else in if-statement
            await Todo.findByIdAndRemove(id);
                res.json({message: 'Todo deleted successfully'});
        }