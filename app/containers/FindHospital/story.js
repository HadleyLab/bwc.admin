import { sendApi } from './api'
import  getUser from '../../utils/getUser'

export const signStory = async ({data}) => {
  try {
    const res = await sendApi({transferId:data._id})
    if (res && res.data && res.data.url) {
      const user = getUser();
      if (user.stepRegistration === 1) {
          user.stepRegistration = 2;
      }
      location.href = res.data.url
    }
  } catch (e) {
    console.log(e)
  }
}
