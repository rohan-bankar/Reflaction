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
      // console.log(result);
      const {accessToken,refreshToken} = result.data.data;
      localStorage.clear()
      localStorage.setItem('accessToken',accessToken)
      // console.log(accessToken);
      localStorage.setItem('refreshToken',refreshToken)
      // console.log(refreshToken);
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

  // const backgroundImage = 'url("/bg-2.jpg")'

  return (
    <div style={{height:'85vh'}}>
        <div className='mx-auto shadow-lg rounded-3xl overflow-hidden relative top-32 p-4 bg-yellow-400 bg-opacity-30' style={{width:'32%'}}>
          <form onSubmit={handleSubmit}>
            <h1 className='text-center font-bold text-xl text-white'>Login</h1>
            <div>
              <label htmlFor='email' className='text-white font-bold'>
                  <strong>Email</strong>
              </label><br />
              <input 
                type="text"
                placeholder='Enter Email'
                name='email'
                className='border-none  rounded p-3 w-full mb-3'
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>

            <div>
                <label htmlFor='password' className='text-white font-bold'>
                  <strong>Password</strong>
              </label><br />
              <input 
                type="password"
                placeholder='Enter password'
                name='password'
                className='border-none  rounded p-3 w-full'
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>
            <button type='submit' className='p-3 my-3 border-none w-full rounded bg-orange-200 text-white font-bold'>Login</button>
              {/* <div className=' mx-2 text-justify text-md font-bold text-black' id='message'></div> */}
              {/* <div className='hover:text-white cursor-pointer mx-2 font-bold' onClick={()=>navigate('/forget-password-email')}>Forget Password?</div> */}
          </form>
        </div>
    </div>
  )
}

export default Login