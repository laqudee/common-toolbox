import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

/**
 * @description 将指定div元素输出为pdf文件或者base64码
 * @param {string} type 1:下载 2:输出
 * @param {string} title 
 * @returns {Promise<string> | void}
 */
export function getPdf(type, title) {
  return new Promise((resolve, reject) => {
    html2Canvas(document.querySelector('#pdfDom'), {
      allowTaint: true,
      useCORS: true,
      dpi: window.devicePixelRatio * 4, // 将分辨率提高到特定的DPI 提高四倍
      scale: 4 // 按比例增加分辨率
    }).then(function (canvas) {
      let contentWidth = canvas.width
      let contentHeight = canvas.height
      let pageHeight = contentWidth / 592.28 * 841.89
      let leftHeight = contentHeight
      let position = 0
      let imgWidth = 595.28
      let imgHeight = 592.28 / contentWidth * contentHeight
      let pageData = canvas.toDataURL('image/jpeg', 1.0)
      let PDF = new JsPDF('', 'pt', 'a4')
      if (leftHeight < pageHeight) {
        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      } else {
        while (leftHeight > 0) {
          PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight
          position -= 841.89
          if (leftHeight > 0) {
            PDF.addPage()
          }
        }
      }
      if (type === '1') {
        // 下载
        PDF.save(title + '.pdf')
      } else {
        // 输出pdf的base64码
        let pdfData = PDF.output('datauristring') // 获取到base64码
        resolve(pdfData)
      }
    })
  })
}
