const axios = require('axios').default

const get_user = async () => {

  const user = 'root'

  try {
    const result = await axios.get(
      `http://localhost:3001/api/users/${user}`
    )
    console.log(result.status, result.data.ratings)
  } catch (e) {
    console.log(e.response.status, e.response.data)
  }
}

/* Example Response
  result.status == 200
  result.data = {
  ratings: [
    {
      date: '2020-11-09T23:34:18.931Z',
      movie: [Object],
      rating: 10,
      id: '5fa9d1fa98c8b52b789cb6da'
    }
  ],
  backlog: [],
  username: 'root',
  createdOn: '2020-11-09T23:29:39.259Z',
  id: '5fa9d0e344850b1fa0c521f9'
}
*/

get_user()