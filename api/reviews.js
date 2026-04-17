export default async function handler(req, res) {
  const PLACE_ID = 'ChIJEXpONE1uK4cRyQd4JggwFPQ';
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyD55N9RfI9ARcs7vONVd0U7DsFfthhJ0oY';

  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=rating,userRatingCount&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    res.status(200).json({
      rating: data.rating,
      reviewCount: data.userRatingCount,
      placeId: PLACE_ID
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}
