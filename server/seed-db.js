const Rental = require("./models/rental");
const User = require("./models/user");
const Booking = require('./models/booking');

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
    "user1": {username: "Filip", email: "filip@gmail.com", password: "filipfilip"},
    "user2": {username: "Test", email: "test@gmail.com", password: "testtest"},
    "booking1": {startAt: new Date(2018, 4, 27), endAt: new Date(2018, 4, 29), totalPrice: 100, days: 2, guests: 3},
    "booking2": {startAt: new Date(2018, 4, 12), endAt: new Date(2018, 4, 17), totalPrice: 299, days: 5, guests: 1},
  }


  function FakeDB() {
    this.booking1 = new Booking(data['booking1']);
    this.booking2 = new Booking(data['booking2']);
    this.user1 = new User(data['user1']);
    this.user2 = new User(data['user2']);
    this.rental1 = new Rental(data['rentals'][0]);
    this.rental2 = new Rental(data['rentals'][1]);
    this.rental3 = new Rental(data['rentals'][2]);

    this.cleanDB = async function() {
      await User.remove({});
      await Rental.remove({});
      await Booking.remove({});
    }

    this.saveUsers = async function() {
      this.user1.rentals.push(this.rental1);
      this.user1.rentals.push(this.rental2);
      this.user1.rentals.push(this.rental3);

      this.user2.bookings.push(this.booking1);
      this.user2.bookings.push(this.booking2);

      await this.user1.save();
      await this.user2.save();
    }

    this.saveBookings = async function() {
      this.booking1.user = this.user2;
      this.booking2.user = this.user2;
      this.booking1.rental = this.rental1;
      this.booking2.rental = this.rental1;

      await this.booking1.save();
      await this.booking2.save();
    }

    this.saveRentals = async function() {
      data['rentals'].forEach((rental, index) => {
        const newRental = new Rental(rental);

        if (index === 0) {
          this.rental1.user = this.user1;
          this.rental1.bookings.push(this.booking1);
          this.rental1.bookings.push(this.booking2);
          this.rental1.save();
        } else {
          newRental.user = this.user1;
          newRental.save();
        }
      });
    }
  };

  FakeDB.prototype.seed = async function() {
    await this.cleanDB()
    await this.saveUsers();
    await this.saveBookings();
    await this.saveRentals();
  }

  return new FakeDB();
})();

