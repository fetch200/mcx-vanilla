class AlgorithmUtil {
  dec2hex(n, length = 2) {
    let string = Number(n).toString(16)
    while (string.length < length) string = '0' + string
    return string.toUpperCase()
  }
}

const algorithm = new AlgorithmUtil()

export default algorithm