import React from 'react'

function Login() {
  const googleLogin =()=>{
    window.open('http://localhost:5500/api/auth/google','_self')
  }
  const facebookLogin =()=>{
    window.open('http://localhost:5500/api/auth/facebook','_self')
  }
  const gitHubLogin =()=>{
    window.open('http://localhost:5500/api/auth/github','_self')
  }
  return (
    <div className='flex h-[100vh] justify-center items-center text-2xl flex-col'>
        <div className='border-2 p-[0.5rem] rounded-xl m-[1rem] '>
            Login
        </div>
        <div className=' border-2 p-[1rem] flex rounded-xl'>
            <div className='border-2 m-[0.5rem] p-[0.2rem]' onClick={()=>{
              googleLogin()
            }}><i className="fa-brands fa-google"></i></div>
            <div className='border-2 m-[0.5rem] p-[0.2rem]'
            onClick={()=>{
              facebookLogin()
            }}
            ><i className="fa-brands fa-facebook"></i></div>
            <div className='border-2 m-[0.5rem] p-[0.2rem]'><i className="fa-brands fa-github"
            onClick={()=>{
              gitHubLogin()
            }}
            ></i></div>
        </div>
    </div>
  )
}

export default Login