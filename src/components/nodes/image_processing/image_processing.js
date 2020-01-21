import PNDimensions from './Dimensions'
import PNInfo from './Info'
import PNBinarize from './Binarize'
import PNOtsu from './Otsu'
import PNGreyscale from './Greyscale'
import PNInvert from './Invert'
import PNOCR from './OCR'

export default {
  basic: {
    PNDimensions,
    PNInfo,
    PNBinarize,
    PNGreyscale,
    PNInvert
  },
  advanced: {
    PNOtsu,
    PNOCR
  }
}
