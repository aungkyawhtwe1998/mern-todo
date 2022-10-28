import { useEffect, useState } from 'react';
import { readTodos, createTodo, updateTodo, deleteTodo } from './api';
import Preloader from './component/Preloader';

function App() {
  const [todo, setTodo] = useState({ title: '', content: '' })
  const [todos, setTodos] = useState([]);
  const [currentId, setCurrentId] = useState(0)

  useEffect(() => {
    let currentTodo = currentId != 0 ? todos.find(todo => todo._id === currentId) : { title: '', content: '' }
    setTodo(currentTodo)
  }, [currentId]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodos();
      console.log(result)
      setTodos(result.data);
      console.log('todos', todos)
    }
    fetchData();
  }, [currentId]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      console.log(todo)
      const result = await createTodo(todo)
      console.log('result: ', result)
      setTodos([...todos, result.data]);
      clear();
    } else {
      console.log(todo)
      await updateTodo(currentId, todo);
      clear();
    }
  }

  const clear = () => {
    setCurrentId(0);
    setTodo({ title: '', content: '' })
  }

  useEffect(() => {
    const clearField = (e) => {
      if (e.keyCode == 27) {
        clear()
      }
    }
    window.addEventListener('keydown', clearField)
    return () => window.removeEventListener('keydown', clearField)
  }, []);

  const removeTodo = async (id) => {
    console.log(id)

    await deleteTodo(id);
    const result = await readTodos();
    console.log(result)
    setTodos(result.data);
  }

  return (
    <div className="container">
      <div className="row">
        <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            {/* <pre>{JSON.stringify(todo)}</pre> */}
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input id="name" type="text" value={todo.title} onChange={e => setTodo({ ...todo, title: e.target.value })} className="validate" />
              <label htmlFor="name">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input id="description" type="text" value={todo.content} onChange={e => setTodo({ ...todo, content: e.target.value })} className="validate" />
              <label htmlFor="description">content</label>
            </div>

          </div>
          <div className='row right-align'>
            <button type='submit' className='btn waves-effect waves-light'>Submit</button>
          </div>
        </form>
        {
          !todos ? <Preloader /> : todos.length > 0 ? <ul className="collection">
            {todos.map(todo => (
              <li key={todo._id} onClick={() => setCurrentId(todo._id)} className='collection-item'>
                <div>
                  <h5>{todo.title}</h5>
                  <p>
                    {todo.content}
                    <a href='#!' className='secondary-content' onClick={() => removeTodo(todo._id)}>
                      <i className='material-icons' >delete</i>
                    </a>
                  </p>
                </div>

              </li>
            ))}

          </ul> : <div>Nothing todo </div>
        }
      </div>

    </div>
  );
}

export default App;
