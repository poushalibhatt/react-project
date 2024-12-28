import React, { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

function SearchComponent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query, 500); // Delay of 500ms

  useEffect(() => {
    // Only make an API call if debouncedQuery is not empty
    if (debouncedQuery) {
      const fetchResults = async () => {
        try {
          const response = await fetch(`https://api.example.com/search?q=${debouncedQuery}`);
          const data = await response.json();
          setResults(data.results);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      fetchResults();
    } else {
      setResults([]); // Clear results if query is empty
    }
  }, [debouncedQuery]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchComponent;
