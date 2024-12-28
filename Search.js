import React,{useState, useEffect} from 'react'
import useDebounceHook from './useDebounceHook';
import axios from 'axios';

const Search = () => {

    const [query, setQuery] = useState('');
    const [response, setResponse] = useState([]);

    const debounceSearch = useDebounceHook(query, 500)

    const handleSearch = (e) => {
        setQuery(e.target.value)
    }

    useEffect (() => {
        if(debounceSearch){
            const fetchResult = async() => {
                try{
                    const response = await fetch(`https://api.example.com/search?q=${debounceSearch}`)
                    const data = await response.data
                    setResponse(data.data)

                } catch (e) {
                    console.log(e)
                }
            }
            fetchResult()
        } else {
            setResponse([])
        }
    }, [debounceSearch])
  return (
    <div>
        <input 
            name="search"
            placeholder='Search here...'
            value={query}
            onChange={handleSearch}
        />
        <ul>

            {response.map(res => (
                <li>{res}</li>
            ))}
        </ul>
    </div>
  )
}

export default Search