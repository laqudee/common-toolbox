import dayjs from 'dayjs'

/**
 * @description 获取当前日期、星期数
 * @returns {Object}
 */
export const getDateAndWeek = () => {
  const date = new Date()
  const year = dayjs(date).format('YYYY年M月D日')
  const time = dayjs(date).format('HH:mm')
  const week = date.getDay()

  const weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

  return {
    date: year,
    week: weekList[week],
    time: time
  }
}
