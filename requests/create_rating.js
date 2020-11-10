const axios = require('axios').default

const create_rating = async () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QxIiwiaWQiOiI1ZmE5ZjE1MGJmZDVhODRiMTQzNGI5MzMiLCJpYXQiOjE2MDQ5NzI5MTF9.SPF3hrM7q5-rJ_Q9fwr7782askE7xX8Wt9D_d--9_Qk'
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const bodyParams = {
    movie: 'tt0079944',
    rating: 9,
  }

  try {
    const result = await axios.post(
      'http://localhost:3001/api/ratings',
      bodyParams,
      config
    )
    console.log(result.status, result.data)
  } catch (e) {
    console.log(e.response.status, e.response.data)
  }
}

/* Example Response
  result.status == 200
  result.data == {
    date: '2020-11-09T21:50:49.517Z',
    user: '5fa9b93e6a14306b14114096',
    movie: '5fa9b9b9bd7312370cfd444d',
    rating: 9,
    id: '5fa9b9b9bd7312370cfd444e'
  }
*/

create_rating()