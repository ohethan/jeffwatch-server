const axios = require('axios').default

const login = async () => {
  const bodyParams = {
    username: 'root',
    password: 'abc123',
  }
  try {
    const result = await axios.post(
      'http://localhost:3001/api/login',
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
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjVmYTliNWE2ZWM1MDEyNjcyNDAzMGNjOCIsImlhdCI6MTYwNDk1ODA3NH0.et0VuuBQl18eYpiTPqNbsU3zVeeJnSthf_sH_6fHoA0',
    username: 'root'
  }
*/
login()