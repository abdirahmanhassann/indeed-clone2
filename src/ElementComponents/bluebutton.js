import React from 'react'
import './elementcomponents.css'
function BlueButton(props) {
  return (
    <button className='BlueButton' onClick={props.click}>{props.text}</button>
  )
}

export default BlueButton