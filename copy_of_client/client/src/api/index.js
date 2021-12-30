import axios from 'axios';
//library that serves to create HTTP requests that are present externally
const url = "http://localhost:5000/todos";
export const readTodos = () => axios.get(url);
export const createTodo = (newTodo) => axios.post(url, 
    {
        title: newTodo.title,
        content: newTodo.content,

        url_one: newTodo.url_one,
        url_one_title: newTodo.url_one_title,
        url_one_thumbnail: newTodo.url_one_thumbnail,

        url_two: newTodo.url_two,
        url_two_title: newTodo.url_two_title,
        url_two_thumbnail: newTodo.url_two_thumbnail,

        url_three: newTodo.url_three,
        url_three_title: newTodo.url_three_title,
        url_three_thumbnail: newTodo.url_three_thumbnail,

    });
//makes a post request to modify the database

export const updateTodo = (id, updatedTodo)=> axios.patch(`${url}/${id}`, updatedTodo);
export const deleteTodo = (id)=> axios.delete(`${url}/${id}`);