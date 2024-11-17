require('dotenv').config(); 

const apiKey = process.env.API_KEY; 

const getPlaces = async (city, limit, type = 'tourist_attraction') => {
  const searchResponse = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${type}+in+${city}&key=${apiKey}`);
  const searchData = await searchResponse.json();

  const limitedResults = limit ? searchData.results.slice(0, limit) : searchData.results;

  const enrichedResults = limitedResults.map(place => {
      const photo = place.photos && place.photos.length > 0 ? place.photos[0] : null;
      const imageUrl = photo ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}` : null;
      const category = place.types.includes('restaurant') ? 'Restaurant' :
                       place.types.includes('museum') ? 'Museum' :
                       place.types.includes('tourist_attraction') ? 'Attraction' :
                       'Other';
      const isFree = place.price_level === 0;

      return {
          ...place,
          imageUrl,
          category,
          isFree
      };
  });

  return enrichedResults;
};

  module.exports = {
    getPlaces
  }