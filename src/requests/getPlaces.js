require('dotenv').config();

const apiKey = process.env.API_KEY;

// Mapeo de categorías
const categoryMapping = {
  restaurant: 'Restaurant',
  museum: 'Museum',
  tourist_attraction: 'Attraction',
  art_gallery: 'Art Gallery',
  bar: 'Bar',
};

const getPlaces = async (city, limit, type = 'tourist_attraction') => {
  const searchResponse = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${type}+in+${city}&key=${apiKey}`
  );
  const searchData = await searchResponse.json();

  // Limitar los resultados si se especifica un límite
  const limitedResults = limit ? searchData.results.slice(0, limit) : searchData.results;

  // Enriquecer los resultados con URL de imágenes y categorías
  const enrichedResults = limitedResults.map((place) => {
    const photo = place.photos && place.photos.length > 0 ? place.photos[0] : null;
    const imageUrl = photo
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`
      : null;

    const category = place.types.find((type) => categoryMapping[type]) || 'Other';
    const isFree = place.price_level === 0; // Determina si es gratuito

    return {
      ...place,
      imageUrl,
      category,
      isFree,
    };
  });

  return enrichedResults;
};

module.exports = {
  getPlaces,
};
