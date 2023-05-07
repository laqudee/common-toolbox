# Common-toolbox

专注服务于Vue项目的可复用工具库

> 目前仅支持前端项目，不支持纯Node.js项目【后续会修复这个问题】

## Axios相关API

### Usage

```js
import { createAxios } from 'common-toolbox'
import { getToken } from './token.js'
import router from '../router/index.js'
import { ElMessage } from 'element-plus'

// example
const axios = createAxios({
  baseURL: '',
  timeout: 50000,
  tokenName: 'token',
  getToken: getToken,
  router,
  messageTip: ElMessage
})

export default axios

// use axios
import axios form './utils/axios.js'

export const getList = (params) => {
  return axios.post(url, params, config)
}
// config可选可配置
```

### API

| API         | USAGE                                | REMARK        |
| :---------- | :----------------------------------- | :------------ |
| createAxios | `const axios = createAxios(options)` | 生成axios实例 |
| ...         | ...                                  | ...           |

## DOM处理相关API

### Usage

```js
import { domHandler } from 'common-box'

// vue main.js
domHandler.setFontSize()

// some page need setting fullscreen
const play = () => {
  domHandler.settingFullscreen()
}

// more ...
```

### API

| API               | USAGE                           | REMARK                         |
| :---------------- | :------------------------------ | :----------------------------- |
| setFontSize       | `setFontSize()`                 | 以1920*1080为基准设置自适应    |
| settingFullscreen | `settingFullscreen()`           | 开启与关闭全屏                 |
| on                | `on(window, 'resize', resize)`  | 用于Echart图表随窗口大小自适应 |
| off               | `off(window, 'resize', resize)` | 用于Echart图表随窗口大小自适应 |
| ...               | ...                             | ...                            |

## Form表单校验相关API

### Usage

```js
import { validator } from 'common-toolbox'

//example
const trueOrFalseOfMobile = validator.isMobile(userPhone)

const trueOrFalseOfIdCard = validator.isIdCard(userIdCard)

// more ...
```

### 说明

- 邮箱、手机号、身份证号、中文姓名、密码复杂度等的校验函数返回均为Boolean类型，并没有专门去适配`Element-ui`、`Element-plus`、`Vant`等UI框架，使用时应根据个人需求通过包装下面这些函数实现适配UI框架的校验函数

### API

| API                        | USAGE                                                     | REMARK                                                                      |
| :------------------------- | :-------------------------------------------------------- | :-------------------------------------------------------------------------- |
| isMobile                   | `isMobile(value): boolean`                                | 用于校验手机号                                                              |
| isEmail                    | `isEmail(value): boolean`                                 | 用于校验邮箱号                                                              |
| isName                     | `isName(value): boolean`                                  | 用于校验中文姓名                                                            |
| isIdCard                   | `isIdCard(value): boolean`                                | 用于校验身份证号                                                            |
| passwordComplexityValidate | `passwordComplexityValidate(value, messageTool): boolean` | 用于校验密码的复杂程度是否符合，messageTool参数是个消息提示弹窗实例或者函数 |
| isDate                     | `isDate(value): boolean`                                  | 用于校验日期                                                                |
| isNumeric                  | `isNumeric(value): boolean`                               | 判断值是否为数字                                                            |
| isNaN                      | `isNaN(value): boolean`                                   | 判断值是否为NaN                                                             |
| inBrowser                  | `inBrowser(): boolean`                                    | 判断是否为浏览器                                                            |
| isAndroid                  | `isAndroid(): boolean`                                    | 判断是否为安卓                                                              |
| isIOS                      | `isIOS(): boolean`                                        | 判断是否为IOS                                                               |
| ...                        | ...                                                       | ...                                                                         |

## File处理相关API

### `fileHandler`

#### Usage

```js
import { fileHandler } from 'common-toolbox'

// example
const downloadWord = async () => {
  const res = await axios.get('/api/download/file?id')
  if (res.success) {
    fileHandler.blobFile(res, 'example.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' )
  }
}
```

### API

| API           | USAGE                                       | REMARK                                                 |
| :------------ | :------------------------------------------ | :----------------------------------------------------- |
| dataURLtoFile | `const file = dataURLtoFile(url, filename)` | 将URL转为file                                          |
| blobFile      | `blob(url, name, type)`                     | 下载文件，name: 下载存储的文件名；type: 下载的文件类型 |
| ...           | ...                                         | ...                                                    |

### `nodeFileHandler`

#### Usage

```js
import { nodeFileHandler } from 'common-toolbox'

// example
nodeFileHandler.isFileExist('/path')

nodeFileHandler.getFolderExcludeSome('parentPath', /^example/)
```

### API

| API                  | USAGE                                                               | REMARK                                                 |
| :------------------- | :------------------------------------------------------------------ | :----------------------------------------------------- |
| isFileExist          | `isFileExist(path): boolean`                                        | 判断文件是否存在                                       |
| getFolderExcludeSome | `getFolderExcludeSome(parentPath, excludeRegex): Promise<string[]>` | 获取parentPath下的除了excludeRegex正则表达式包含的目录 |
| hasFolder            | `hasFolder(parentPath, excludeRegex, name): boolean`                | 判断参数name的目录是否存在                             |
| ...                  | ...                                                                 | ...                                                    |

## Cookie与LocalStorage相关API

### Usage

```js
import { cookieAndStorage } from 'common'

// example
const cs = cookieAndStorage

cs.getLocalStorage('userInfo')
cs.setLocalStorage('userInfo', info)
cs.clearAllLocalStorage()

cs.getCookie('token')
cs.setCookie('token', token)
cs.clearAllCookies()

cs.clearAllStorage()
```

### API

| API                  | USAGE                            | REMARK |
| :------------------- | :------------------------------- | :----- |
| getLocalStorage      | `getLocalStorage(key)`           |        |
| setLocalStorage      | `setLocalStorage(key, data)`     |        |
| removeLocalStorage   | `removeLocalStorage(key)`        |        |
| clearAllLocalStorage | `clearAllLocalStorage()`         |        |
| getCookie            | `getCookie(key)`                 |        |
| setCookie            | `setCookie(key, value, expires)` |        |
| removeCookie         | `removeCookie(key)`              |        |
| clearAllCookies      | `clearAllCookies()`              |        |
| clearAllStorage      | `clearAllStorage()`              |        |
| ...                  | ...                              | ...    |

## Browser处理相关API

### Usage

```js
import { browserHandler } from 'common-toolbox'
import { ElMessage } from 'element-plus'

// example
browserHandler.getPositionByGeolocation(ElMessage)
```

### API

| API                      | USAGE                                                     | REMARK                                                    |
| :----------------------- | :-------------------------------------------------------- | :-------------------------------------------------------- |
| getPositionByGeolocation | `getPositionByGeolocation(messageTool): {Promise<Object>` | 获取定位坐标；messageTool参数应传入一个消息弹窗实例或函数 |
| ...                      | ...                                                       | ...                                                       |

## Date相关接口

### Usage

```js
import { dateHandler } from 'common-toolbox'

// example
const date = dateHandler.getDateAndWeek()
console.log(date)
/**
 * date: '2023年5月1日'
 * week: '周一'
 * time: '12:45'
 */
```

### API

| API            | USAGE                           | REMARK             |
| :------------- | :------------------------------ | :----------------- |
| getDateAndWeek | `const date = getDateAndWeek()` | 返回当前日期与周几 |
| ...            | ...                             | ...                |

## Encrypt加密相关API

### Usage

```js
import { createEncrypter, encryptHandler } from 'common-toolbox'

// example
const PUBLIC_KEY = 'PUBLIC_KEY'

export const setRas = createEncrypter(PUBLIC_KEY)

// 通过*加密文本，例如手机号、邮箱
const encodeMobile = encryptHandler.encryptText('13356789900', 'mobile', '请绑定手机号')

const encodeEmail = encryptHandler.encryptEmail('example@mail.com', '请绑定邮箱')
```

### API

| API             | USAGE                                           | REMARK                      |
| :-------------- | :---------------------------------------------- | :-------------------------- |
| createEncrypter | `const setRAS = createEncrypter(publicKey)`     | 目前使用JSEncrypt进行加密   |
| encryptText     | `encodeText = encryptText(text, flag, tipText)` | 通过*对指定文本进行加密     |
| encryptName     | `encodeName = encryptName(name, tipText)`       | 通过*对指定中文姓名进行加密 |
| encryptMobile   | `encodeMobile = encryptMobile(mobile, tipText)` | 通过*对指定手机号进行加密   |
| encryptEmail    | `encodeEmail = encryptEmail(email, tipText)`    | 通过*对指定邮箱进行加密     |
| ...             | ...                                             | ...                         |

## 其他API

### Usage

```js
import { getPdf, sleep } from 'common-toolbox'

// example
// type: file: 表示下载pdf
// type: base64: 表示生成base64码
const pdfBase64 = getPdf('#container', 'base64', 'example-pdf')

const sleepPromise = sleep(50000)

// more ...
```

### API

| API     | USAGE                      | REMARK                    |
| :------ | :------------------------- | :------------------------ |
| getPdf  | `getPdf(ref, type, title)` | 将指定div元素转为pdf      |
| sleep   | `sleep(timeout)`           | 设置休眠时间，返回promise |
| getType | `getType(value)`           | 返回value的类型           |
| ...     | ...                        | ...                       |

## 打包方式
- 目前打包成两种格式：
  - ESM
  - CJS

## Examples

```sh
- examples/vue3-example

# dev
pnpm dev
```

## 补充
> 进行中...
