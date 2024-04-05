import { useState, useEffect } from "react";
import CurrencyDropdown from "./DropDown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrenyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(['INR', 'USD'])

  const fetchCurrencies = async ()=>{
    try{
      const res = await fetch('https://api.frankfurter.app/currencies');
      const data = await res.json();
      setCurrencies(Object.keys(data));
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

  const convertCurrency = async ()=> {
    if(!amount) return;
    setLoading(true);
    try{
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency]+ " " +toCurrency);
    } catch(err){
      console.log('error fetching currencies',err);
    }finally{
      setLoading(false)
    }

  }
  const handleFavorite = (currency) =>{
    let updatedFavorites = [...favorites];
    if(favorites.includes(currency)){
      updatedFavorites = updatedFavorites.filter((fav)=> fav!==currency)
    }else{
      updatedFavorites.push(currency);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  const swapCurrenies = ()=> {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }
  return (
    <div className="max-w-xl my-auto p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">Currency Converter</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 items-end">
        <CurrencyDropdown currencies={currencies} currency={fromCurrency} title="From:" favorites={favorites} handleFavourite={handleFavorite} setCurrency={setFromCurrency}/>
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300" onClick={swapCurrenies}>
            <HiArrowsRightLeft/>
          </button>
        </div>
        <CurrencyDropdown currencies={currencies} currency={toCurrency} title="To:" favorites={favorites} handleFavourite={handleFavorite} setCurrency={setToCurrency}/>
      </div>
      <div className="mt-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <input type='number' value={amount} onChange={e=> setAmount(e.target.value)} className="w-full p-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-1"/>
      </div>
      <div className="flex justify-end mt-6">
        <button onClick={convertCurrency} className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-7 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading?'animate-pulse':''}`}>
          Convert
        </button>
      </div>
      {convertedAmount && <div className="mt-4 text-lg font-medium text-right text-green-500">
        Coverted Value: {convertedAmount}
      </div>}
    </div>
  )
}

export default CurrenyConverter