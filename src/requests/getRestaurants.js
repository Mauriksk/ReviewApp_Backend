require('dotenv').config(); 

const apiKey = process.env.API_KEY; 

const getRestaurants = async (city, limit) => {
    const searchResponse = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=top+attractions+in+${city}&key=${apiKey}`);
    const searchData = await searchResponse.json();
    
    // Verifica si `limit` está definido y es un número válido, luego aplica el límite
    const limitedResults = limit ? searchData.results.slice(0, limit) : searchData.results;

     // Mapeo para agregar la URL de la imagen a cada atracción
     const enrichedResults = limitedResults.map(restaurant => {
        const photo = restaurant.photos && restaurant.photos.length > 0 ? restaurant.photos[0] : null;
        const imageUrl = photo ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}` : null;

        return {
            ...restaurant,
            imageUrl // Agrega la URL de la imagen al objeto
        };
    });
    
    return enrichedResults;
}

  module.exports = {
    getRestaurants
  }