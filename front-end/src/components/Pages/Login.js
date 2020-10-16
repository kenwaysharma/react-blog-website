import React ,{useState, useContext}from 'react';
import {useHistory,Redirect} from 'react-router-dom'
import axios from 'axios'
import '../CSS/Login.css'
import { AuthContext } from '../../contexts/AuthContext';


const Login = () => {

    const history=useHistory()
    const {authLog,dispatch} = useContext(AuthContext)
    const [Login,setLogin] = useState({
        email:'',
        password:'',
        
    })

    const [response, setResponse] = useState({
        email: '',
        password: ''
    });
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:2000/apiEndpoint/CREATE/user/login', {
            
            email:Login.email,
            password:Login.password
          },{withCredentials:true},{
            headers: {
                  'Content-Type': 'application/json'
      }
          
          
        })
          .then((res)=> {
              if(res.data.token){
                  console.log('SUCCESS', res.data)
                  dispatch({type: 'LOGIN', payload: res.data});
                    return <Redirect to='/blog' />
              }else{
                console.log('ERRORS',res.data)
                setResponse({...response, email: res.data.errors.email, password: res.data.errors.password})
              }
            })
        
        setResponse({...response, email: '', password: ''})   

        
        
    }

    


    const handleChange=(e)=>{
        const {name,value}=e.target
        setLogin({ ...Login, [name]: value });
        
            
    } 
    console.log('AUTH LOG',authLog)
if(authLog.isAuthenticated){

    
    return <Redirect to="/blog" />
        
    
}else{
    return(
    
        <div className='ninetyPer'>
            <div className='loginDiv'>
            <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            
                
            <label name='email' >Email:</label>
            <input name='email' onChange={handleChange} value={Login.email}></input>
                <h5 className='fail'>{response.email}</h5>
            <label name='password'>Password:</label>
            <input name='password' type='password' onChange={handleChange} value={Login.password}></input>
                <h5 className='fail'>{response.password}</h5>
            <button>Login</button>
            </form>
        </div>
        </div>
    
        )
}
    
    
};

 
export default Login;