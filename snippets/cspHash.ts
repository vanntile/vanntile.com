import crypto from 'crypto'

const cspHashOf = (text: string) => {
  const hash = crypto.createHash('sha256')
  hash.update(text)
  return `'sha256-${hash.digest('base64')}'`
}

// ${cspHashOf(
//       NextScript.getInlineScriptSource(this.props),
//     )}
