const request = async (url, params, resolve, reject) => {
    return await fetch(`http://localhost:5003/${url}`, {
      method: 'POST',
      cache: 'no-cache',
      mode: 'cors',
      body: JSON.stringify({'token': params})
    }).then(resp => {
      return resp.json()
    }).then(resp => {
      if (!resp.code) {
        return resolve()
      }
      else {
        const err = [resp.err, resp.code, resp.human]
        throw new Error(resp.human)
      }
    }).catch(err => {
      reject(err)
      return false
    })

   // console.log(a)

}
export default request
