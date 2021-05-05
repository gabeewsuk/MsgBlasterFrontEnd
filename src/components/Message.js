import PropTypes from 'prop-types'
import Button from './Button'
import { useState } from 'react'
//const Message = ({ props }) => {
const Message = ( props ) => {

  
  const [message, setMessage] = useState([''])
  const [ready, setReady]= useState(false)
  const [timeHours, setHours]= useState('')
  const [timeMinutes, setMinutes] = useState('')
  const onType = (e) => {
    //setMessage(e);
    props.onSend(e);
  }
  const onSubmit = (e) => {
    e.preventDefault()

    if (!message) {
      alert('Please add a message to send out')
      return
    }

    //onSend({ message, timeHours, timeMinutes })

    setMessage('')
  }
  return (
     <div>
        
      
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Message To Send</label>
        <textarea rows={10}
        cols={30}
          type='text'
          placeholder='Add Message'
          value={props.message}
          onChange={(e) => onType(e.target.value)}

          //onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className='form-control'>
      <label>Hours From Now</label>
<select
value = {timeHours}

onChange={(e) => setHours(e.target.value)}>
<option value={timeHours}>0</option>
  <option value="1">1</option>
  <option value={timeHours}>2</option>
  <option value={timeHours}>3</option>
  <option value={timeHours}>4</option>
  <option value={timeHours}>5</option>
  <option value={timeHours}>6</option>
  <option value={timeHours}>7</option>
  <option value={timeHours}>8</option>
  <option value={timeHours}>9</option>
  <option value={timeHours}>10</option>
  <option value={timeHours}>11</option>
  <option value={timeHours}>12</option>
  <option value={timeHours}>13</option>
  <option value={timeHours}>14</option>
  <option value={timeHours}>15</option>
  <option value={timeHours}>16</option>
  <option value={timeHours}>17</option>
  <option value={timeHours}>18</option>
  <option value={timeHours}>19</option>
  <option value={timeHours}>20</option>
  <option value={timeHours}>21</option>
  <option value={timeHours}>22</option>
  <option value={timeHours}>23</option>
  <option value={timeHours}>24</option>
</select>
<label>Minutes From Now:</label>
<select
value = {timeMinutes}

onChange={(e) => setMinutes(e.target.value)}>
<option value={timeMinutes}>0</option>
  <option value={timeMinutes}>15</option>
  <option value={timeMinutes}>30</option>
  <option value={timeMinutes}>45</option>
  </select>
      </div>
      {/*
      <div className='form-control form-control-check'>
        <label>Ready To Send</label>
        <input
          type='checkbox'
          checked={ready}
          value={ready}
          onChange={(e) => setReady(e.currentTarget.checked)}
        />
      </div>
      */}

      <input type='submit' value='Send Message' className='btn btn-block' />
    </form>
    </div>
  )}
        export default Message