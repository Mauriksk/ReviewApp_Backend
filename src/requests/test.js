
const fetchPlaceDetails = async (city) => {
    
    
    // 1. Realizar la búsqueda de lugares en la ciudad
    
    
    // 2. Obtener el primer lugar de la lista
    const firstPlace = searchData.results[0];
    const placeId = firstPlace.place_id;
    const photoReference = firstPlace.photos[0]?.photo_reference;
    
    // 3. Obtener los detalles del lugar usando place_id
    const detailsResponse = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`);
    const detailsData = await detailsResponse.json();
    
    const placeName = detailsData.result.name;
    const description = detailsData.result.editorial_summary?.overview || "No description available";
    
    // 4. Obtener la imagen del lugar
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
    
    // Mostrar los resultados
    console.log(`Place: ${placeName}`);
    console.log(`Description: ${description}`);
    console.log(`Image URL: ${photoUrl}`);
  };