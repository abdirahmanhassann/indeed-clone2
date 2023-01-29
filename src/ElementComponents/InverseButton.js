import React from 'react'

function InverseButton(props) {
  return (
    <button className='InverseButton' onClick={props.click}>{props.text}</button>
    )
}

export default InverseButton