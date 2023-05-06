import React from 'react'
import { SvgProps } from 'react-native-svg'
import * as Icons from '@components/svgIcon/index'

export type IconProps = SvgProps & {
  name: keyof typeof Icons
  size?: number
}
function SvgIcon ({
  name,
  fill = 'black',
  stroke = 'none',
  width: _width,
  height: _height,
  size,
  ...props
}: IconProps) {

  const Comp = Icons[name]

  const width = _width ?? size
  const height = _height ?? size
  const sizeProps = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  }

  return (
    <Comp
      {...props}
      fill={fill}
      style={{fill: fill}}
      stroke={stroke}
      {...sizeProps}
    />
  )
}

export default SvgIcon
