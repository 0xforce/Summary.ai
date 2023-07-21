import React, { useState, useEffect } from 'react'

import { FormField, Loader, RenderSum } from '../components'


const Home = () => {
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [searchedResults, setSearchedResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)

      try {
        const response = await fetch('https://synthax.onrender.com/api/v1/post', {
          method: "GET",
          headers: { 'Content-Type': 'application/json'},
        })

        if(response.ok) {
          const result = await response.json()

          setAllPosts(result.data.reverse())
        }
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)

    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
  
        setSearchedResults(searchResults)
      }, 500)
    )
  }

  console.log(allPosts)

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Saved courses</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>Browse through a collection of summarized videos or courses and choose what you will be laerning next</p>
      </div>

      <div className='mt-16'>
        <FormField 
          labelName='Search posts'
          type='text'
          name='text'
          placeholder='Search posts'
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
              <Loader />
          </div>
        ) : (
          <>
            {searchText && (
                <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                    Showing results for <span className='text-[#222328]'>{searchText}</span>
                </h2>
            )}
            <div className='gap-3'>
                {searchText ? (
                  <RenderSum 
                      data={searchedResults}
                      title='No search results found'
                  />
                ) : (
                  <RenderSum 
                      data={allPosts}
                      title='No Posts found'
                  />
                )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home
