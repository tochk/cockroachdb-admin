const request = async (url, params, resolve, reject) => {
    return await fetch(`http://localhost:5001/${url}`, {
      method: 'POST',
      cache: 'no-cache',
      mode: 'cors',
      body: JSON.stringify(params)
    }).then(resp => {
      // console.log(resp)
      return resp.json()
    }).then(resp => {
      if (!resp.code) {
        return resolve(resp)
      }
      else {
        const err = [resp.err, resp.code, resp.human]
        throw new Error(resp.human)
      }
    }).catch(err => {
      console.log(err)
      reject(err)
      return err
    })

}
export default request
