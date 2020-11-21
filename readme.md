# Api Documentation

## /charts

`https://jeffwatch.herokuapp.com/api/charts`

Retrieves a list of the 50 highest rated movies by JeffWatch users.

### Example Request

```const result = await axios.get('http://jeffwatch.herokuapp.com/api/charts/')```

### Example Response

`200 OK`
```
[
  {
    numRatings: 1,
    genre: [ 'Drama', 'Sci-Fi' ],
    ratings: [ '5fad96d4a66e0f0017fbe380' ],
    imdbId: 'tt0079944',
    title: 'Stalker',
    releaseDate: '1980-04-17T00:00:00.000Z',
    poster: 'https://m.media-amazon.com/images/M/MV5BMDgwODNmMGItMDcwYi00OWZjLTgyZjAtMGYwMmI4N2Q0NmJmXkEyXkFqcGdeQXVyNzY1MTU0Njk@._V1_SX300.jpg',
    avgRating: 5
  },
  {
    numRatings: 1,
    genre: [ 'Drama', 'Fantasy', 'Mystery' ],
    ratings: [ '5fad9d93a66e0f0017fbe3ca' ],
    imdbId: 'tt2699128',
    title: 'The Leftovers',
    releaseDate: '2014-06-29T00:00:00.000Z',
    poster: 'https://m.media-amazon.com/images/M/MV5BNTE3MDc1MjY4NV5BMl5BanBnXkFtZTgwMDg4MjQ4MTE@._V1_SX300.jpg',
    avgRating: 4.5
  },
  ...
]
```

## /login

`https://jeffwatch.herokuapp.com/api/login`

*POST*

logs a user in. Returns a JWT.

### Example Request

```
const bodyParams = {
    username: 'username',
    password: 'password',
  }
  const result = await axios.post(
    'http://jeffwatch.herokuapp.com/api/login',
    bodyParams
  )
```

### Example Resonse

`200 OK`
```
{
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp ...',
    username: 'username'
  }
```

## /users

`https://jeffwatch.herokuapp.com/api/users`

*POST*

Create a new user

### Example Request

```
const bodyParams = {
    username: 'username',
    password: 'password',
  }
  const result = await axios.post(
    'http://jeffwatch.herokuapp.com/api/users',
    bodyParams
  )
```

### Example Response

`200 OK`
```
{
  ratings: [],
  backlog: [],
  username: 'username',
  createdOn: '2020-11-09T21:48:46.470Z',
  id: '5fa9b93e6a14306b14114096'
}
```

---

`https://jeffwatch.herokuapp.com/api/users/:username`

*GET*

Get a user by their username

### Example Request

```
const result = await axios.get(
  `http://jeffwatch.herokuapp.com/api/users/${username}`
)
```

### Example Response

`200 OK`
```
{
  ratings: [
    {
      date: '2020-11-09T23:34:18.931Z',
      movie: [Object],
      rating: 10,
      id: '5fa9d1fa98c8b52b789cb6da'
    },
    ...
  ],
  backlog: [],
  username: 'username',
  createdOn: '2020-11-09T23:29:39.259Z',
  id: '5fa9d0e344850b1fa0c521f9'
}
```

## /movies

`https://jeffwatch.herokuapp.com/api/movies/:movieId`

*GET*

Get a movie by it's IMDB id

### Example Request

```
const result = await axios.get(
  `http://jeffwatch.herokuapp.com/api/movies/${movie}`
)
```

### Example Response

`200 OK`
```
{
  numRatings: 1,
  genre: [ 'Drama', 'Sci-Fi' ],
  ratedBy: [ '5fa9d0e344850b1fa0c521f9' ],
  imdbId: 'tt0079944',
  title: 'Stalker',
  releaseDate: '1980-04-17T05:00:00.000Z',
  avgRating: 10
}
```

## /ratings

*All /ratings endpoints require a JWT token to identify the user*

`https://jeffwatch.herokuapp.com/api/movies/:movieId`

*POST*

Create a rating

### Example Request

```
const token = 'eyJhbGciOiJIUzI1NiIsInR5c ...'
const config = {
  headers: { Authorization: `Bearer ${token}` }
}

const bodyParams = {
  movie: 'tt0079944',
  rating: 10,
}

const result = await axios.post(
  'http://jeffwatch.herokuapp.com/api/ratings',
  bodyParams,
  config
)
```

### Example Response

`200 OK`
```
{
  date: '2020-11-09T21:50:49.517Z',
  user: '5fa9b93e6a14306b14114096',
  movie: '5fa9b9b9bd7312370cfd444d',
  rating: 9,
  id: '5fa9b9b9bd7312370cfd444e'
}
```

---

`https://jeffwatch.herokuapp.com/api/movies/:movieId`

*DELETE*

delete a rating

### Example Request

```
  const token = 'eyJhbGciOiJIUzI1NiIsInR ...'
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      movie: 'tt0079944'
    }
  }

  const result = await axios.delete(
    'http://jeffwatch.herokuapp.com/api/ratings',
    config
  )
```

### Example Response

`204 No Content`

---

`https://jeffwatch.herokuapp.com/api/movies/:movieId`

*PUT*

Update a rating

### Example Request

```
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cC ...'
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const bodyParams = {
    movie: 'tt0079944',
    rating: 9,
  }

  const result = await axios.put(
    'http://jeffwatch.herokuapp.com/api/ratings',
    bodyParams,
    config
  )
```

### Example Response

`200 OK`
```
{
  date: '2020-11-09T21:50:49.517Z',
  user: '5fa9b93e6a14306b14114096',
  movie: '5fa9b9b9bd7312370cfd444d',
  rating: 9,
  id: '5fa9b9b9bd7312370cfd444e'
}
```

---

`https://jeffwatch.herokuapp.com/api/movies/:movieId`

*GET*

Get a rating

### Example Request

```
  const token = 'eyJhbGciOiJIUzI1NiIsInR ...'
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const result = await axios.get(
    'http://jeffwatch.herokuapp.com/api/ratings/'+'tt0079944',
    config
  )
```

### Example Response

`200 OK`
```
{
  date: '2020-11-09T21:50:49.517Z',
  user: '5fa9b93e6a14306b14114096',
  movie: '5fa9b9b9bd7312370cfd444d',
  rating: 9,
  id: '5fa9b9b9bd7312370cfd444e'
}
```