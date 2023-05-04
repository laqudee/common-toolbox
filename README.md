# Common-toolbox

专注服务于Vue项目的可复用工具库

| api               | usage                                              | remark                                                 |
| :---------------- | :------------------------------------------------- | :----------------------------------------------------- |
| createEncrypter   | `const setRAS = createEncrypter(publicKey)`        | 目前使用JSEncrypt进行加密                              |
| getDateAndWeek    | `const date = getDateAndWeek()`                    | 返回当前日期与周几                                     |
| setFontSize       | `setFontSize()`                                    | 以1920*1080为基准设置自适应                            |
| settingFullscreen | `settingFullscreen()`                              | 开启与关闭全屏                                         |
| on                | `on(window, 'resize', resize)`                     | 用于Echart图表随窗口大小自适应                         |
| dataURLtoFile     | `const file = dataURLtoFile(url, filename)`        | 将URL转为file                                          |
| blobFile          | `blob(url, name, type)`                            | 下载文件，name: 下载存储的文件名；type: 下载的文件类型 |
| validator         | `validator.validateX1()`, `validator.validateX2()` | 用于Form表单校验                                       |
| ...               | ...                                                | ...                                                    |

- 目前打包成两种格式：
  - ESM
  - CJS

> 进行中...
