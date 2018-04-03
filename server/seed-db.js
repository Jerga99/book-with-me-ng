module.exports = (function() {
  const data = {
    "rentals": [{
      "id": "grand-old-mansion-1",
      "title": "Grand Old Mansion-1",
      "city": "San Francisco",
      "street": "Some fake street",
      "category": "Estate",
      "image": "http://via.placeholder.com/350x250",
      "bedrooms": 5,
      "description": "Very nice apartment in center of the city.",
      "daily_rate": 43,
      "created_at": "24/12/2018"
      },
      {
      "id": "grand-old-mansion-2",
      "title": "Grand Old Mansion-2",
      "city": "San Francisco",
      "street": "Some fake street",
      "category": "Estate",
      "image": "http://via.placeholder.com/350x250",
      "bedrooms": 5,
      "description": "Very nice apartment in center of the city.",
      "daily_rate": 43,
      "created_at": "24/12/2018"
      },
      {
      "id": "grand-old-mansion-3",
      "title": "Grand Old Mansion-3",
      "city": "San Francisco",
      "street": "Some fake street",
      "category": "Estate",
      "image": "http://via.placeholder.com/350x250",
      "bedrooms": 5,
      "description": "Very nice apartment in center of the city.",
      "daily_rate": 43,
      "created_at": "24/12/2018"
    }]
  }

  const seedDb = function() {
    return data;
  }

  return seedDb;
})();

