import React from 'react'

const HoverComponent = ({ text, styles }) => {
  return (
    <div className={`absolute z-15 bg-gray-800 text-white p-2 rounded mt-2 ${styles}`}>
      <p>{text}</p>
    </div>
  )
}

export default HoverComponent
