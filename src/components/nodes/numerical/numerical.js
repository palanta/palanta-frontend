import PNAverage from './Average'
import PNAddition from './Addition'
import PNSubtraction from './Subtraction'
import PNMultiplication from './Multiplication'
import PNDivision from './Division'
import PNExponentiation from './Exponentiation'
import PNRoot from './Root'
import PNLogarithm from './Logarithm'

export default {
  basic: {
    PNAverage,
    PNAddition,
    PNSubtraction,
    PNMultiplication,
    PNDivision
  },
  advanced: {
    PNExponentiation,
    PNRoot,
    PNLogarithm
  }
}
