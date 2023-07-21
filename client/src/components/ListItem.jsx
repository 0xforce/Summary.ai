import React from 'react'
import { useNavigate } from 'react-router-dom'

const ListItem = ({ name, resumen }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        // Navigate to the desired route when the item is clicked
        navigate('/');
      };

  return (
    <div className='w-full border border-1 border-gray-300 rounded-lg mb-3 p-3 cursor-pointer hover:ring-blue-500 hover:border-blue-500 ' onClick={handleClick}>
      <p>{name}</p><br/>
      <p className='line-clamp-2 overflow-hidden text-[13px] text-[#666e75]'>{resumen}</p>
    </div>
  )
}

export default ListItem
