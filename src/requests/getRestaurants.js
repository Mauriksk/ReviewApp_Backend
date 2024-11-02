require('dotenv').config(); 

const apiKey = process.env.API_KEY; 

const getRestaurants = async (city, limit) => {
    const searchResponse = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=top+attractions+in+${city}&key=${apiKey}`);
    const searchData = await searchResponse.json();
    
    // Verifica si `limit` está definido y es un número válido, luego aplica el límite
    const limitedResults = limit ? searchData.results.slice(0, limit) : searchData.results;
    
    return limitedResults;
}

  module.exports = {
    getRestaurants
  }