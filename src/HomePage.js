import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar.jsx';
import Web3 from "web3";
import { Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate()
  const [web3, setWeb3] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    async function connectToMetaMask() {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setWeb3(new Web3(window.ethereum));
        setAccount(accounts[0]);
        setIsAuthenticated(true);
        
      } else {
        alert('Please install MetaMask to use this dApp.');
      }
    }

    connectToMetaMask();

    window.ethereum.on('accountsChanged', function (accounts) {
      if (accounts.length === 0) {
        setIsAuthenticated(false);
      } else {
        setAccount(accounts[0]);
        setIsAuthenticated(true);
      }
    });

    // return () => {
    //   window.ethereum.off('accountsChanged');
    // };
  }, []);




  useEffect(() => {
    async function getBalance() {
      if (web3 && account) {
        const weiBalance = await web3.eth.getBalance(account);
        setBalance(web3.utils.fromWei(weiBalance));
      }
    }

    getBalance();
  }, [web3, account]);

  if (!isAuthenticated) {
   navigate('/auth');
  }
  return (
    <div>
       
      <title>Durian Track and Trace</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
     <script src="https://cdn.tailwindcss.com"></script>
     <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.0.1/dist/tailwind.min.css" rel="stylesheet"></link>
     <div>
      <Navbar />
      {/* Other components */}
    </div>
    <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold  text-gray-900">Dashboard - Durian Track and Trace (DTTBA)</h1>
      {balance !== null && (
            <p>Your balance: {balance} ETH</p>
          )}
    </div>
  </header>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* <h1 className="text-3xl font-bold text-gray-800"></h1> */}
        {/* <h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p> */}
        <form className="mt-8">
          <fieldset>
            <legend className="text-lg font-medium text-gray-900">Enter Durian Information</legend>
            {/* <h2 class="text-lg  font-semibold leading-7 text-gray-900">Enter Durian Information</h2> */}
      <p class="mt-1 text-sm leading-6 text-gray-600">This information cannot be altered after submitted so please confirm the details are correct before submitting.</p>
            <div className="mt-4">
              <label htmlFor="durianId" className="block text-sm font-medium leading-6 text-gray-900">Durian ID:</label>
              <input type="text" id="durianId" placeholder='DR001' name="durianId" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div className="mt-4">
              <label htmlFor="farmInfo" className="block text-sm font-medium leading-6 text-gray-900">Durian Farm and Tree Info :</label>
              <input type="text" id="farmInfo" name="farmInfo" placeholder='F001,T001' className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div className="mt-4">
              <label htmlFor="harvestDate" className="block text-sm font-medium leading-6 text-gray-900">Harvest Date:</label>
              <input type="text" id="harvestDate" name="harvestDate" placeholder='YYYY-MM-DD' className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div className="mt-4">
              <label htmlFor="distributionInfo" className="block text-sm font-medium leading-6 text-gray-900">Distribution Info:</label>
              <input type="text" id="distributionInfo" name="distributionInfo" placeholder='DISTR001'  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div className="mt-4">
              <label htmlFor="distributionDate" className="block text-sm font-medium leading-6 text-gray-900">Distribution Date:</label>
              <input type="text" id="distributionDate" name="distributionDate" placeholder='YYYY-MM-DD'  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </fieldset>
          <div className="mt-8">
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
   
  );
}

export default App;
