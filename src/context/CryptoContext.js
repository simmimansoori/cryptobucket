

import { useLayoutEffect } from "react";
import { createContext, useState } from "react";


// reate context object

export const CryptoContext  = createContext({});

// Create the provider component

export const CryptoProvider = ({children}) => {
 
    const[cryptoData,setCryptoData] = useState();
    const[searchData,setSearchData] = useState();
    const[coinSearch,setCoinSearch] = useState("");
    const[currency,setCurrency] = useState("usd");
    const[sortBy,setSortBy] = useState("market_cap_desc");
    const[page,setPage] = useState(1);
    const[totalPages,setTotalPages] = useState(250);
    const[coinData,setCoinData] = useState();







    const getCryptoData = async () => {

        try{
            const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`
                
        ).then(res => res.json()).then(json => json);

            // console.log(data);
            setTotalPages(data.length);
        }
            
        catch(error){
            console.log(error);
        }

        try{
            const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=10&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`

            ).then(res => res.json()).then(json => json);

            console.log(data);
            setCryptoData(data);
        }catch(error){
            console.log(error);
        }
    };

    const getCoinData = async (coinId) => {

        try{
            const data = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
   

            ).then(res => res.json()).then(json => json);

            console.log("coindata", data);
            
            setCoinData(data);
        }catch(error){
            console.log(error);
        }
    };

    const getSearchResult = async (query) => {

        try{
            const data = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`

            ).then(res => res.json()).then(json => json);

            console.log(data);
            setSearchData(data.coins);
        }catch(error){
            console.log(error);
        }
    };

    const resetFunction = () => {
        setPage(1);
        setCoinSearch("")
    }

    useLayoutEffect(() => {
        getCryptoData();
    },[coinSearch, currency, sortBy, page])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <CryptoContext.Provider value={{cryptoData, searchData, getSearchResult, 
        setCoinSearch, setSearchData , currency, setCurrency,sortBy,setSortBy, 
        page,setPage, totalPages, resetFunction , coinData, getCoinData}}>
            {children}
        </CryptoContext.Provider>
    )
}

