import React,{useState,useContext}  from 'react';
import axios from 'axios'
import { Route, Redirect,  useHistory } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import '../CSS/Signup.css'
function Signup () {
    
    
     const history=useHistory()
     const {authLog} = useContext(AuthContext)
     console.log(history)

    const [Signup,setSignup] = useState({
        username:'',
        email:'',
        password:''
    })

    const [response, setResponse] = useState({
        
       
        username: '',
        email: '',
        password: '',
        
    });


  
     const handleSubmit=(e)=>{
        e.preventDefault()
         axios.post('http://localhost:2000/apiEndpoint/CREATE/user/signup',  
            {
                username:Signup.username,
                email:Signup.email,
                password:Signup.password
          },{withCredentials:true},{
              headers: {
                    'Content-Type': 'application/json'
        }
            
            
          }

          
        
          )
          .then(function (res) {
            console.log('Response', res.data);
            if(res.data==="SUCCESS"){
                
                 history.push("/user/login")

            }else{
                console.log(res)
                setResponse({...response, username: res.data.username, email: res.data.email, password: res.data.password})
            }
            
            
          })
          

         
            setResponse({...response, username: '', email: '', password: ''})   
            
        
        
    }

    


    const handleChange=(e)=>{
        const {name,value}=e.target
        setSignup({ ...Signup, [name]: value });
        
        console.log("Updating Repsonse", response)     
    }

    
    if(authLog.isAuthenticated){
        return <Redirect to="/blog" />
        
    }else{
        
        return (
            
            <div className='ninetyPer'> 
            <div className='signupDiv'>
            <form onSubmit={handleSubmit}>
                <h1>Sign up</h1>
                <label name='username'>Username:</label>
                <input name='username' onChange={handleChange} value={Signup.username}></input>
                    <h5 className='fail'>{response.username}</h5>
                <label name='email'>Email:</label>
                <input name='email' onChange={handleChange} value={Signup.email}></input>
                    <h5 className='fail'>{response.email}</h5>
                <label name='password'>Password:</label>
                <input name='password' onChange={handleChange} value={Signup.password}></input>
                    <h5 className='fail'>{response.password}</h5>
                <button>Sign up</button>
                <h1></h1>
                
            </form>
            </div>
            </div>
         );
    }
    
}
 
export default Signup;