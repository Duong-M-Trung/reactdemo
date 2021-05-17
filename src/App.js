import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import 'antd/dist/antd.css';

const App = () =>{
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTask] = useState([])

  //useEffect

  useEffect(() => {
    const getTask = async () => {
      const tasksFormServer = await fetchTasks()
      setTask(tasksFormServer)
    }
    getTask()
  }, [])

  //fetchTasks
  const fetchTasks = async () =>{
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //fecthTask
  const fetchTask = async (id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //Add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()
    setTask([...tasks,data])
  }

  //Delete task
  const deleteTask = async (id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method:'DELETE',
    })
    setTask(tasks.filter((task) => task.id !== id))
  }

  //Task reminder
  const toggleReminder = async (id) =>{
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTask(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task ))
  }

  return(
    <Router>
    <div className="container">

    {/* header include btn Add */}
      <Header onAdd={() => setShowAddTask(!showAddTask)}
      showAdd={showAddTask}/>
      
      {/* Body include tasks */}
      <Route path='/' exact render={(prods)=>(
        <>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {
            tasks.length > 0? (
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
            ):('No task view')
          }
        </>
      )}/>
      {/* Footer, route to /about */}
     <Route path='/about' component={About} />
      <Footer />
    </div>
    </Router>
  )
}

export default App
