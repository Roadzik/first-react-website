import { useState } from 'react'
import './Login.css'
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error ,setError] = useState('')
    const handleUserInput = () =>{
        if(username === '' || username==null || password === '' || password==null) return 0
        return [setError('')]
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!handleUserInput()) return setError('Please fill the data')
        fetch('http://localhost:4000/api/login', {
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password})
        }).then(()=>{
            console.log('data sent')
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div className="container">
            <div className='form-container'>
                <div className="error">{error}</div>
                <form onSubmit={e=>handleSubmit(e)} method='POST'>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" onInput={e=>setUsername(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onInput={e=>setPassword(e.target.value)}/>
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
}
 
export default Login;