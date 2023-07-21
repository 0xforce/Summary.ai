import React from 'react'

import ListItem from './ListItem'

const RenderSum = ({ data, title }) => {
  return (
    <div>
      {data?.length > 0 ? (
        <div className=''>
            {data.map((post) => (
                <ListItem key={post._id} {...post} />
            ))}
        </div>
      ) : (
        <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
      )}
    </div>
  )
}

export default RenderSum