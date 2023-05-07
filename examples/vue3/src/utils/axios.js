import { createAxios } from 'common-toolbox'
import { getToken } from './cookie'
import router from "../router"
import { ElMessage } from 'element-plus'

const axios = createAxios({
  baseURL: '',
  timeout: 50000,
  tokenName: 'token',
  getToken,
  router,
  messageTip: ElMessage
})

export default axios
