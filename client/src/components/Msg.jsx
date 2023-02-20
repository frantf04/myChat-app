import React from 'react'
import '../App.css'

function Msg({text, bg, align}) {
  return (
    <div style={{background: bg, alignSelf: align}} className='message'>
      {text}
    </div>
  )
}

export default Msg
