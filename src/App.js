import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Message from  './components/Message.js'

const App = () => {
  
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
  ])
  const [message, setMessage] = useState('')
  //const [uNames, setUnames] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])
  //Send Tasks to msgblaster on Heroku

  //need to add the onSubmit funciton to add the

  //process.env.REACT_APP_SERVER_URL
  const onSubmit = async (e) => {
    e.preventDefault()
    var userNames = []
    Object.keys(tasks).map(key => (
      userNames.push(
      tasks[key].text)))
    const dataSent ={
      userNames:userNames,
      message: message
    }
    const requestOptions = {
      method: 'POST',
      //mode:'cors',
      headers: { 'Content-Type': 'application/json;charset=utf-8',Accept: 'application/json;',},
      body: JSON.stringify(dataSent)
  };
    
    //alert(JSON.stringify(dataSent))
    await fetch('https://a442e74d29f3.ngrok.io/api/items', requestOptions)
        .then(response => response.json()).then(console.log("it works")).catch(err => console.log())
       
    /*
    const res = await fetch('https://msgblasteapi.herokuapp.com/api/items', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(dataSent),
    })
    */
   

     
    
  }
  /*
  const sendTasks = async () => {
    
    const res1 = await fetch('http://localhost:5000/tasks')
    const data1 = await res1.json()
    console.log(data1)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 
      body: JSON.stringify(data1)
  };

  
  fetch('https://msgblaster.herokuapp.com/api/items', requestOptions)
      .then(response => response.json())
      .then(data => this.setState(data1));



/*
    try{
    const res = await fetch('https://msgblaster.herokuapp.com/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data1),
    })

    const data = await res.json()
    console.log(data)
  }
  catch(err) {
    throw err;
    console.log(err);
  }
    //setTasks([...tasks, data])

    }
*/
  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }
  //Add Message
  const sendMessage = async (messageDetails) => {
    console.log(messageDetails);
    setMessage(messageDetails);
    /*
    deleteMessage();
    const res = await fetch('http://localhost:5000/Message', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(messageDetails),
    })
    const data = await res.json()
    alert("Message Has Been Qued")
    setMessage([data])
    sendTasks();
    */
  }
  //Delete Message
  /*
  const deleteMessage = async () => {
    const res = await fetch(`http://localhost:5000/Message/1`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? console.log('')
      : alert('Error Deleting This Task')
  }
  */
  // Add Task
  const addTask = async (task) => {
    console.log(task);
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }
  

  return (
    <Router>
      <div className='container' style={{float:"left", marginLeft:"18%" }}>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Influencers Added'
              )}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
      <div className = 'container' style={{float:"right", marginRight:"15%"}}>
        {/*<Message onSend = {sendMessage} message = {message} />*/}
        <Message onSend = {sendMessage} message = {message} sendMessageReal = {onSubmit}/>
        </div>
    </Router>
  )
}

export default App
