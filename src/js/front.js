window.onload = () => {
  // save時に React SVGのプロパティ名のハイフンがなくなる問題を修正
  // const svgIcons = document.querySelectorAll('.wpalb-button svg')
  // console.log(svgIcons)
  // svgIcons.forEach(item => {
  //   const strokeWidth = item.getAttribute('strokewidth')
  //   if (strokeWidth !== undefined) item.setAttribute('stroke-width', strokeWidth)

  //   // const fillRule = item.getAttribute('fillrule')
  //   // if (fillRule !== undefined) item.setAttribute('fill-rule', fillRule)
  // })

  const buttons = document.querySelectorAll('.wpalb-button svg')

  buttons.forEach(item => {
    const replacedHtml = item.outerHTML
      .replaceAll('cliprule', 'clip-rule')
      .replaceAll('fillrule', 'fill-rule')
      .replaceAll('strokelinecap', 'stroke-linecap')
      .replaceAll('strokelinejoin', 'stroke-linejoin')
      .replaceAll('strokewidth', 'stroke-width')
    console.log(replacedHtml)
    item.outerHTML = replacedHtml
  })
}
