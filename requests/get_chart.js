const axios = require('axios').default

const get_chart = async () => {

  try {
    const result = await axios.get(
      'http://localhost:3001/api/charts/'
    )
    console.log(result.status, result.data)
  } catch (e) {
    console.log(e.response.status, e.response.data)
  }
}

get_chart()