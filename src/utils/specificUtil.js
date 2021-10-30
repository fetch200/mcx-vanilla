class Color {
  constructor() {}

  rgb2hsl(r, g, b) {
    // 0<=r<=255
    // 0<=g<=255
    // 0<=b<=255
    let h, s, l
    const r2 = r / 255
    const g2 = g / 255
    const b2 = b / 255
    const max = Math.max(r2, g2, b2)
    const min = Math.min(r2, g2, b2)
    const delta = max - min
    l = (max + min) / 2
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
    h = delta === 0 ? 0 :
      max === r2 ? ((g2 < b2 ? 6 : 0) + (g2 - b2) / delta) * 60 :
        max === g2 ? (2 + (b2 - r2) / delta) * 60 :
          max === b2 ? (4 + (r2 - g2) / delta) * 60 : 0
    return {h, s: s * 100, l: l * 100}
  }

  hsl2rgb(h, s, l) {
    // 0<=h< 360
    // 0<=s<=100
    // 0<=l<=100
    let r, g, b
    if (s === 0) {
      r = l * 255
      g = l * 255
      b = l * 255
      return {r, g, b}
    }
    const max = (1 - Math.abs(2 * l - 1)) * s
    const hh = h / 60
    const middle = max * (1 - Math.abs(hh % 2 - 1))
    const delta = l - max / 2
    const maxValue = (max + delta) * 255
    const middleValue = (middle + delta) * 255
    const minValue = delta * 256
    r = ((hh >= 0 && hh < 1) || (hh >= 5 && hh < 6)) ? maxValue :
      ((hh >= 1 && hh < 2) || (hh >= 4 && hh < 5)) ? middleValue : minValue
    g = (hh >= 1 && hh < 3) ? maxValue :
      ((hh >= 0 && hh < 1) || (hh >= 3 && hh < 4)) ? middleValue : minValue
    b = (hh >= 3 && hh < 5) ? maxValue :
      ((hh >= 2 && hh < 3) || (hh >= 5 && hh < 6)) ? middleValue : minValue
    return {r, g, b}
  }

  rgb2hsv(r, g, b) {
    // 0<=r<=255
    // 0<=g<=255
    // 0<=b<=255
    let h, s, v
    const r2 = r / 255
    const g2 = g / 255
    const b2 = b / 255
    const max = Math.max(r2, g2, b2)
    const min = Math.min(r2, g2, b2)
    const delta = max - min
    v = max
    s = max === 0 ? 0 : delta / max
    h = delta === 0 ? 0 :
      max === r2 ? ((g2 < b2 ? 6 : 0) + (g2 - b2) / delta) * 60 :
        max === g2 ? (2 + (b2 - r2) / delta) * 60 :
          max === b2 ? (4 + (r2 - g2) / delta) * 60 : 0
    return {h, s, v}
  }

  hsv2rgb(h, s, v) {

  }
}

const color = new Color()

const specificUtil = {
  color,
}