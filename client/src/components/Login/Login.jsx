/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from 'react';
import { login, signup } from '../../apis/authAPIs';
import { AppContext } from '../Context/AppContext';
// import { useNavigate } from 'react-router-dom';

import Badges from './Badges';

import "./Login.css";

function Login() {
  const [isContainerActive, setIsContainerActive] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const { setUser } = useContext(AppContext);
  // const navigate = useNavigate();

  const signUpButton = () => {
     setIsContainerActive(prev => !prev);
  };  
  const signInButton = () => {
     setIsContainerActive(prev => !prev);
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    const user = login(email, pwd, setEmail, setPwd, setUser);
    console.log(user);
  }

  const handleSignup = async(e) => {
    e.preventDefault();
    signup(name, email, pwd, setName, setEmail, setPwd);
  }
  return (
    <div>
      <div className={`container ${isContainerActive ? "right-panel-active" : ""}`} id="container">
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <Badges />
            <span>or use your account</span>
            <input 
              type="text" 
              id="email1" 
              placeholder="you@example.com"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required 
            />
            <input 
              type="password" 
              id="password1" 
              placeholder="••••••••"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required 
            />
            <a href="#">Forgot Your Password?</a>
            <button>Sign In</button>
          </form>
        </div>


        <div className="form-container sign-up-container">
          <form onSubmit={handleSignup}>
            <h1>Create Account</h1>
            <Badges />
            <span>or use your email for registration</span>
            <input
              type="text" 
              id="name" 
              placeholder="Your Name"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required 
            />
            <input
              type="text" 
              id="email" 
              placeholder="you@example.com"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              type="password" 
              id="password" 
              placeholder="••••••••"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign Up</button>
          </form>
        </div>

        

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <div style={{marginTop: '20px'}}>New Books Are On The Way</div>
              <div style={{marginBottom: '20px'}}>Log In Now To Check Them Out!</div>
              <button className="ghost" id="signIn" onClick={signInButton}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Don't Have An Account Yet?</h1>
              <p>Sign Up Here To Start Your Book Store Tour</p>
              <button className="ghost" id="signUp" onClick={signUpButton}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
