const axios = require('axios').default

const create_user = async () => {
  const bodyParams = {
    username: 'root1',
    password: 'abc123',
  }
  try{
    const result = await axios.post(
      'http://localhost:3001/api/users',
      bodyParams
    )
    console.log(result.status, result.data)
  } catch (e) {
    console.log(e.response.status, e.response.data)
  }
}

/* Example Response:
  result.status == 200
  result.data == {
    ratings: [],
    backlog: [],
    username: 'root',
    createdOn: '2020-11-09T21:48:46.470Z',
    id: '5fa9b93e6a14306b14114096'
  }
*/

create_user()