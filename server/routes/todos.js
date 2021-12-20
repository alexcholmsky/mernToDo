import express from 'express';
import {readTodos, createTodo, updateTodo} from '../controller/todo.js';
const router = express.Router(); 
//used to create a new router object to handle requests

router.get('/', readTodos);
router.post('/', createTodo);
// parameters are path, and then the function to be called when the user inputs the aforementioned path

router.patch('/:id', updateTodo)
//used for updating existing objects in database
export default router; 