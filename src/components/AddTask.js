import { useState } from 'react'

const AddTask = ({ onAdd, tasks}) => {
  const [text, setText] = useState('')
  const [ID, setId] = useState(Number)
  //const [day, setDay] = useState('')
  //const [reminder, setReminder] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!text) {
      alert('Please add a task')
      return
    }
    console.log(tasks.length)
    const ID = tasks.length + 1

    onAdd({ text, ID })

    setText('')
    
    //setDay('')
    //setReminder(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Influencer Instagram @</label>
        <input
          type='text'
          placeholder='Add Influencer'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {/*
      <div className='form-control'>
        <label>Day & Time</label>
        <input
          type='text'
          placeholder='Add Day & Time'
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      */}

      <input type='submit' value='Add Influencer' className='btn btn-block' />
    </form>
  )
}

export default AddTask
