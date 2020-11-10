const axios = require('axios').default

const delete_rating = async () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjVmYTlkMGUzNDQ4NTBiMWZhMGM1MjFmOSIsImlhdCI6MTYwNDk2NDU4OX0.b6wx8IgyvOs7G5HT6JieFS1dGD8el0bhQlumhV2iCqc'
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      movie: 'tt0079944'
    }
  }

  try {
    const result = await axios.delete(
      'http://localhost:3001/api/ratings',
      config
    )
    console.log(result.status, result.data)
  } catch (e) {
    console.log(e.response.status, e.response.data)
  }
}

/* Example Response
  result.status == 204
*/

delete_rating()