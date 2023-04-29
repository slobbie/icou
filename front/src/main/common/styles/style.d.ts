import 'styled-components'
import {colorsType} from '@common/styles/colors"'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: colorsType
  }
}
