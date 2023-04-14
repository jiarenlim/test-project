import { useState, useEffect } from 'react';
import metamaskLogo from './metamask-logo.png';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';

function AuthPage() { 
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate()

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second to make sure MetaMask has connected
        navigate('/home');
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error('Metamask not installed');
    }
  };
  

  const handleLogin = () => {
    if (isConnected) {
      // Redirect to home page
      navigate('/home');
    } else {
      connectWallet();
    }
  };


  return (
    <div className="App">
  <title>Durian Track and Trace</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.0.1/dist/tailwind.min.css" rel="stylesheet"></link>
  {/* <link href='' */}
  {/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
// ...
require('@tailwindcss/forms'),
    ],
  }
  ```
*/}
  {/*
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-50">
  <body class="h-full">
  ```
*/}
  <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-8">
      <div>
        <img
          className="mx-auto h-12 w-auto"
          // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          src={metamaskLogo}
          alt="Your Company"
        />
        <div id="logo-container"></div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account using Metamask Wallet 
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {/* Or */}
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {/* start your 14-day free trial */}
          </a>
        </p>
        
      </div>
      
      <div className="flex justify-center">
            {isConnected ? (
              <p className="text-green-500">Connected to Metamask</p>
            ) : (
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleLogin} >
                <img src={metamaskLogo} alt="Metamask logo" className="h-6 w-6" />
                <span>Connect to Metamask</span>
              </button>
            )}
          </div>

    </div>
  </div>
</div>
  );
}
export default AuthPage;