

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NasaImageSearch = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);

  useEffect(() => {
    const fetchTrendingImages = async () => {
      try {
        const response = await axios.get(
          'https://images-api.nasa.gov/search?q=trending&media_type=image'
        );

        setImages(response.data.collection.items || []);
      } catch (error) {
        console.error('Error fetching trending images:', error);
      }
    };

    fetchTrendingImages();
  }, []); 

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          `https://images-api.nasa.gov/search?q=${query}&media_type=image`
        );

        const suggestionItems = response.data.collection.items.map(
          (item) => item.data[0].title
        );

        setSuggestions(suggestionItems);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://images-api.nasa.gov/search?q=${query}`
      );

      setImages(response.data.collection.items || []);
      setSuggestions([]);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    handleSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFocus = () => {
    setIsSearchBarActive(true);
  };

  const handleBlur = () => {
    setIsSearchBarActive(false);
    setSuggestions([]); 
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center" style={{ padding: '1rem' }}>
        <input
          type="text"
          placeholder="Enter search term"
          className="border p-2 pr-4 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-500 text-white p-2 ml-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {isSearchBarActive && suggestions.length > 0 && (
        <div className="absolute bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg z-10">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((image, index) => (
          <a
            key={index}
            href={image.links && image.links[0] ? image.links[0].href : ''}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={image.links && image.links[0] ? image.links[0].href : ''}
              alt={image.data && image.data[0] ? image.data[0].title : ''}
              className="w-full h-40 object-cover cursor-pointer"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default NasaImageSearch;
