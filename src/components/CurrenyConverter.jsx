import { useState, useEffect } from "react"

const CurrenyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);

  const fetchCurrencies = async ()=>{
    try{
      const res = await fetch('https://api.frankfurter.app/currencies');
      const data = await res.json();
      setCurrencies(data);
    } catch(err){
      console.log('error fetching currencies',err);
    }
  }
  

  useEffect(()=>{
   fetchCurrencies();
  },[]);

  // Currencies -> https://api.frankfurter.app/currencies
  // Latest -> https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
  console.log('currencies', currencies);
  return (
    <div className="max-w-xl my-auto p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">Currency Converter</h2>
      <div className="mt-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <input type='number' value={amount} onChange={e=> setAmount(e.target.value)} className="w-full p-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-1"/>
      </div>
      <div className="flex justify-end mt-6">
        <button className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-7 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Convert
        </button>
      </div>
      <div className="mt-4 text-lg font-medium text-right text-green-500">
        Coverted Value: 59 USD
      </div>
    </div>
  )
}

export default CurrenyConverter