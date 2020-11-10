const axios = require('axios').default

const get_movie = async () => {

  const movie = 'tt0079944'

  try {
    const result = await axios.get(
      `http://localhost:3001/api/movies/${movie}`
    )
    console.log(result.status, result.data)
  } catch (e) {
    console.log(e.response.status, e.response.data)
  }
}

/* Example Response
  result.status == 200
  result.data == {
    numRatings: 1,
    genre: [ 'Drama', 'Sci-Fi' ],
    ratedBy: [ '5fa9d0e344850b1fa0c521f9' ],
    imdbId: 'tt0079944',
    title: 'Stalker',
    releaseDate: '1980-04-17T05:00:00.000Z',
    avgRating: 10
  }
*/

get_movie()