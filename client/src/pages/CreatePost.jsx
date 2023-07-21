import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getRandomPrompt } from '../utils'
import { FormField, Loader, HoverComponent } from '../components'


const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    text: '',
    resumen: '',
  })
  const [generatingTxt, setGeneratingTxt] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tokens, setTokens] = useState({ tokens: 0, price: 0})

  const [ isHoveringPrice, setIsHoveringPrice] = useState(false);

  const handleMouseEnter = () => {
    setIsHoveringPrice(true);
  };

  const handleMouseLeave = () => {
    setIsHoveringPrice(false);
  };

  const generateTxt = async () => {
    if(form.text) {
      try {
        setGeneratingTxt(true)
        const response = await fetch('http://localhost:8080/api/v1/gpt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: form.text })
        })

        const data = await response.json()
        console.log("data", data);

        setForm({...form, resumen: data.resumen })
      } catch (error) {
        alert(error)
      } finally {
        setGeneratingTxt(false)
      }
    } else {
      alert('Please enter a text')
    }
  }

  const tokenData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/gpt/tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: form.text })
      })

      const data = await response.json()
      console.log("data", data);

      setTokens({ tokens: data.tokens, price: data.price })
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    tokenData()
  }, [form.text])
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(form.text && form.resumen) {
      setLoading(true)

      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(form)
        })

        await response.json()
        navigate('/profile')
      } catch (err) {
        alert(err)
      } finally {
        setLoading(false)
      }
    } else {
      alert('Please enter a text to generate a summary')
    }
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.text)
    setForm({ ...form, text: randomPrompt })
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Summarize</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>Learn new skills much faster by summarizing large texts or courses! </p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField 
            labelName='Summary name'
            type='text'
            name='name'
            placeholder='How to become a Billionaire in two weeks'
            value={form.name}
            handleChange={handleChange}
          />
          <FormField 
            labelName='Text'
            type='text'
            name='text'
            placeholder='Lorem ipsum....'
            value={form.text}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className='relative flex -mt-[15px] ml-1 text-[#666e75] text-[13px] flex-row'>
            <p className='mr-3 p-1'>
              Tokens: {tokens.tokens}
            </p>
            <p className='p-1' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              Price: ${tokens.price > 0 ? tokens.price.toFixed(5) : 0}
            </p>
            {isHoveringPrice && <HoverComponent text='This model has an input price of $0.003/1k tokens and an output price of $0.004/1k tokens. This is only an estimate price as we can not know how long the output text will be.' styles='top-[-125px] left-[30px] max-w-[260px]' />}
          </div>

          <div 
            className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-640 p-3 h-fit flex justify-start items-center'
          >
            {form.resumen ? (
              <textarea className='mt-2 text-[#666e75] text-[14px] w-full h-[900px] bg-transparent p-5 border-none focus:outline-none focus:ring-0' value={form.resumen} readOnly />
            ) : (
              <p className='mt-2 text-[#666e75] text-[14px] max-w-[600px]'>
                Your summary will appear here...
              </p>
            )}

            {generatingTxt && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            onClick={generateTxt}
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5'
          >
            {generatingTxt ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>Once you have the summary you want, you can store it for later</p>
          <button
            type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {loading ? 'Saving...' : 'Save summary'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
