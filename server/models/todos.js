import mongoose from 'mongoose';
const Schema = mongoose.Schema;
/* a schema represents the structure of a documment
 - outlines the expected properties and their types

 we then compile schema's into models which we can use 
 to construct documents

document is like an instance of a schema 
- a unique record, equivalent to a row
*/

const todoSchema = new Schema({
title: {
type: String,
required: true
},
content: String
}, { timestamps: true });
const Todo = mongoose.model('Todo', todoSchema)
export default Todo; 
//used when you want to export only one thing from a module to be used by other programs