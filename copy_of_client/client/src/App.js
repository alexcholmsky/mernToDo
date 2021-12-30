// issue with submitting blank todo field
import Preloader from "./components/preloader";
import {readTodos, createTodo, updateTodo, deleteTodo} from "./functions";
import { useEffect, useState, useRef } from "react";
import './statics/index.css';

// import * as Toggle from "./toggle.js"
// import {isDeepEqual} from 'fast-deep-equal';
// import {  } from "../../server/controller/todo";
// import { createTodo } from "../../server/controller/todo";

function App() {

  const url1 = "https://www.youtube.com/watch?v=UR0hOmjaHp0";
  const url1Title = "PID Control";
  const url1Thumbnail = "A";

  const url2 = "https://www.youtube.com/watch?v=_VvaJMflqt4.com/watch?v=UR0hOmjaHp0";
  const url2Title = "Ahsoka and Rex";
  const url2Thumbnail = "B";

  const url3 = "https://www.youtube.com/watch?v=TnNYTMExApI.com/watch?v=UR0hOmjaHp0";
  const url3Title = "BroScienceLife";
  const url3Thumbnail = "C";

  const [todo, setTodo] = useState({title: '', 
  content: '', url_one: '', url_one_title: '', url_one_thumbnail: '', url_two: '', url_two_title: '', url_two_thumbnail: '', url_three: '', url_three_title: '', url_three_thumbnail: ''});

  const [todos, setTodos] = useState(null);

    /* 
  with useState, you pass the initial value 
  of the state variable as an argument (null, true etc.)

  useState returns an array, where 
  the first element is the state variable (todo) 
  and the second element is a setter function to update the value of the variable (setTodo)
   - this function takes a value from an input field to update the state
   - onChange function should create a new object each time the state is changed
   link: https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/
  */

  const [currentId, setCurrentId] = useState(0);

  const prevTodo = useRef(todo);

  const prevTodos = useRef(todos);

  const[show, setShow] = useState(false);

  const fetchData = async () => {
    const result = await readTodos();
    console.log(result);
    setTodos(result)
    }

  /*below are a series of hooks. hooks let us abstract functional components (functions that take properties and return jsx)
  - useEffect encaps. code that has side effects:
      - accepts 2 arguments, no return
      - first par. is function that holds the code you want to run 
      - second tells react when you want the hook to be called 
        - if not specified, function will be called on mount and every rendered update.
      - this second par. is an array of dependencies, and if any of these dependencies have changed since last render, it runs the function
*/

  useEffect(() => {
    
    let currentTodo = currentId!==0? todos.find(todo => 
      todo._id===currentId):{title: '', content: '', url_one: '', url_one_title: '', url_one_thumbnail: '', url_two: '', url_two_title: '', url_two_thumbnail: '', url_three: '', url_three_title: '', url_three_thumbnail: ''};
    if ( JSON.stringify(prevTodo) === JSON.stringify(todo)  && JSON.stringify(prevTodos) === JSON.stringify(todos)) {
      setTodo(currentTodo); 
      console.log('set todos');
    }
  }, [currentId, todo, todos])



  //gets todos from database and displays them to the front-end
  useEffect(() => {
      console.log('displaying todos');
    // const fetchData = async () => {
    //   const result = await readTodos();
    //   setTodos(result)
    //   }
    fetchData()
  }, [currentId])

  //resets inputs
  const clear = ()=>{
    setCurrentId(0);
    setTodo({title: '', content: '', url_one_title: '', url_one_thumbnail: '', url_two: '', url_two_title: '', url_two_thumbnail: '', url_three: '', url_three_title: '', url_three_thumbnail: ''})
    console.log('clear: ', currentId)
    };

    //resetting input when you press the esc key
  useEffect(() => {
    const clearField = (e) => {
    if(e.keyCode === 27){
      clear(); 
      }
    }
    
    window.addEventListener('keydown', clearField)
      return () => window.removeEventListener('keydown', clearField)
      //used for "clean up" aka to unbind the event listener 
      }, [])

      


/*
note that the aync prefix allows a function to 
have the await keyword inside it
- async functions always return a promise
*/
  

/*event handler attached to the form submission event <form onSubmit={onSubmit}>. 
React invokes onSubmit() handler when the form is submitted, 
i.e. the user clicks Submit button.
*/

//stops the page from refreshing when the user presses submit, and displays all todos after submit
const onSubmitHandler = async(e)=>{
  e.preventDefault();
  //if we are making a new todo item 
  if (currentId === 0) {
  //creates todo
  setTodo({...todo, 
    title: 'new'})
    console.log("this is the result: ", todo)
    const result = await createTodo(todo)
    setTodos([...todos, result]);
    
  }else
  //if we have selected a new todo element to update
  {
    await updateTodo(currentId, todo)
    console.log('else')
    clear();
  }

}

const removeTodo = async(id)=>{
  await deleteTodo(id);
  const todosCopy = [...todos];
  todosCopy.filter(todo=>todo._id!==id);
  fetchData();
  clear();
  console.log('post delete'); 
}



  
  return (
    <div className="container">
      <div className="row">
        <pre>{JSON.stringify(todo) }</pre>
        {/* the pre tag is esentially used for testing purposes, to display current todo selected*/}
        <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
                <input id="title_input" type="text" 
                className="validate"
                value={todo.title}
                onChange={e=>setTodo({...todo, 
                  title: e.target.value})}
                />
                  {/*... is the spread operator, which expands an iterable(such as an obj.) into its elements
                */}
              <label htmlFor="icon_prefix">Title</label>
            </div>
              <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <label htmlFor="content-input">content</label>
                <input id="content_input" type="text" 
                  className="validate"
                  value={todo.content}
                  onChange={e=>setTodo({...todo, 
                  content: e.target.value, url_one: url1, url_one_title: url1Title, url_one_thumbnail: url1Thumbnail, url_two: url2, url_two_title: url2Title, url_two_thumbnail: url2Thumbnail, url_three: url3, url_three_title: url3Title, url_three_thumbnail: url3Thumbnail })}
                />
            </div>
          </div>
          <div className="row right-align">
              <button className ="waves-effect.waves-light btn"> 
                Submit
              </button>
          </div>
        </form>
          { 
            (!todos? <Preloader /> : todos.length > 0 ? 
            <ul className="collection">
            {todos.map(todo=> (    
              <li key={todo._id} 
              onClick={()=>setCurrentId(todo._id)}
              className="collection-item">
                <div>
                <h5>{todo.title}</h5>
                <a href="#!"  
                    onClick={()=>removeTodo(todo._id)}
                    className="secondary-content">
                    <i className="material-icons">delete
                    </i></a>
                  <p>{todo.content} </p>
                  <button onClick={()=>setShow(!show)}> View Videos </button>
                  <br />
                  <br />
                  { show && currentId === todo._id?
                  <>
                  <div id="videos">
                    <div className=' item1 gridcontainer videoEle'> 
                      <div className=" grid-container">
                        <img className= 'boxed thumbnail' src='https://www.saskatoonprogressclub.com/wp-content/uploads/2021/05/free-youtube-logo-icon-2431-thumb.png'/>
                          <div className='center boxed'>
                            <a className='title' href={todo.url_one} target="_blank" > {todo.url_one_title}</a>
                          </div>
                      </div>
                    </div>

                    <br />

                    <div className=' item1 gridcontainer videoEle'> 
                      <div className=" grid-container">
                        <img className= 'boxed thumbnail' src='https://www.saskatoonprogressclub.com/wp-content/uploads/2021/05/free-youtube-logo-icon-2431-thumb.png'/>
                          <div className='center boxed'>
                            <a className='title' href={todo.url_two} target="_blank" > {todo.url_two_title}</a>
                          </div>
                      </div>
                    </div>

                    <br />

                    <div className=' item1  videoEle'> 
                      <div className=" grid-container">
                        <img className= 'boxed thumbnail' src='https://www.saskatoonprogressclub.com/wp-content/uploads/2021/05/free-youtube-logo-icon-2431-thumb.png'/>
                          <div className='center boxed'>
                            <a className='title' href={todo.url_three} target="_blank" > {todo.url_three_title}</a>
                          </div>
                      </div>
                    </div>
                  </div> 

                  </>: null
                    }
                  </div></li>))}
            </ul>
            :<div><h5> nothing in do </h5></div>)}
           {/* this is the conditional operator (ternary)
          //   - takes a condition to evaluate 
          //   - followed by a ?
          //   - then an expression to execute if the condition is truthy
          //   - a colon : to seperate the two expressions 
          //   - finally expression if the condition is false 
          //   essentially an if else statement
          //   */}
      </div>
    </div>
  );
}



export default App;

