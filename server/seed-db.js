const Rental = require("./models/rental");
const User = require("./models/user");

module.exports = (function() {
  const data = {
    "rentals": [{
      "title": "Grand Old Mansion-1",
      "city": "San Francisco",
      "street": "Main street",
      "category": "condo",
      "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      "bedrooms": 4,
      "description": "Very nice apartment in center of the city.",
      "dailyRate": 43
      },
      {
      "title": "Grand Old Mansion-2",
      "city": "New York",
      "street": "Time Square",
      "category": "apartment",
      "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      "bedrooms": 1,
      "description": "Very nice apartment in center of the city.",
      "dailyRate": 11
      },
      {
      "title": "Grand Old Mansion-3",
      "city": "Spisska Nova Ves",
      "street": "Banicka 1",
      "category": "house",
      "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      "bedrooms": 5,
      "description": "Very nice apartment in center of the city.",
      "dailyRate": 23
    }],
    "user": {username: "Filip99", email: "test@gmail.com", password: "testtest"}
  }

  function FakeDB() {};

  FakeDB.prototype.seed = async function() {
    await User.remove({});
    await Rental.remove({});
    const user = new User(data['user']);
    await user.save();

    data['rentals'].forEach(rental => {
      const newRental = new Rental(rental);
      newRental.user = user;
      newRental.save();
    });
  }

  return new FakeDB();
})();

