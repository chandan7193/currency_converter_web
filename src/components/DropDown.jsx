/* eslint-disable react/prop-types */
import {HiOutlineStar, HiStar} from 'react-icons/hi2';

const CurrencyDropdown = ({currencies, currency, setCurrency, favorites, handleFavourite, title = ""}) => {

const isFav = curr =>favorites.includes(curr);
  return (
    <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">{title}</label>
        <div className="mt-1 relative">
            <select value ={currency} onChange={e=>setCurrency(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus ring-2 focuse:ring-indigo-500">
                {favorites && favorites.map(currency =>{
                    return(
                        <option key="currency" className='bg-gray-300'>
                            {currency}
                        </option> 
                        )
                })}
                <hr />
                {currencies && currencies.length && currencies.map(currency=>{
                return(
                    <option key="currency">
                        {currency}
                        </option> 
                    )
                }
            )}
            </select>
            <button onClick={()=> handleFavourite(currency)}
            className='absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5'>
                {isFav(currency)? <HiStar/>: <HiOutlineStar/>}
            </button>
        </div>
    </div>
  )
}

export default CurrencyDropdown;

