import {
  User,
  City,
  Product
} from '../models/schemas';

export default () => {
  const user = new User({
    firstName: 'Poll',
    lastName: 'Garisson',
    email: 'pol@gmail.com'
  })
  user.save((err) => {
    if (err) return console.log(err);
    console.log("Сохранен объект user", user);
  })

  const city = new City({
    name: 'Samara',
    country: 'Russia',
    capital: false,
    location: {
      lat: 54.56778,
      long: 30.56778
    }
  })
  city.save((err) => {
    if (err) return console.log(err);
    console.log("Сохранен объект city", city);
  })

  const product = new Product({
    title: 'Apple',
    price: 45
  })
  product.save((err) => {
    if (err) return console.log(err);
    console.log("Сохранен объект product", product);
  })
}