import setUser from './setUser'
import setToken from './setToken'

export default (d) => {
  if (d && d.status === 200 && d.data && d.data.token) {
    setUser(d.data.user)
    setToken(d.data.token)
    location.href = '/hospitals'
  }
}