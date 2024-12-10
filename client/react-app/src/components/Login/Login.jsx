import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post('/api/v1/users/login',{email,password})
    .then((result)=>{
      const {accessToken,refreshToken} = result.data.data;
      localStorage.clear()
      localStorage.setItem('accessToken',accessToken)
      localStorage.setItem('refreshToken',refreshToken)
      navigate('/home')
    })
    .catch(error=>{console.log(error);
      showMessage("email or password is incorrect")
    })
  }

  function showMessage(message){
    const messageDiv = document.getElementById('message')
    messageDiv.textContent = message
  }

  return (
    <div style={{height:'85vh'}}>
        <div className='mx-auto shadow-lg rounded-3xl overflow-hidden relative top-32 p-4 bg-white border' style={{width:'32%'}}>
          <form onSubmit={handleSubmit}>
            <h1 className='text-center font-bold text-xl text-black'>Login</h1>
            <div>
              <label htmlFor='email' className='text-black font-bold'>
                  <strong>Email</strong>
              </label><br />
              <input 
                type="text"
                placeholder='Enter Email'
                name='email'
                className='border border-gray-300 rounded p-3 w-full mb-3'
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>

            <div>
                <label htmlFor='password' className='text-black font-bold'>
                  <strong>Password</strong>
              </label><br />
              <input 
                type="password"
                placeholder='Enter password'
                name='password'
                className='border border-gray-300 rounded p-3 w-full'
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>
            <button type='submit' className='p-3 my-3 border-none w-full  bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none'>Login</button>
              <div className=' mx-2 text-justify text-md font-bold text-red-600' id='message'></div>
              {/* <div className='hover:text-white cursor-pointer mx-2 font-bold' onClick={()=>navigate('/forget-password-email')}>Forget Password?</div> */}
          </form>
        </div>
    </div>
  )
}

export default Login