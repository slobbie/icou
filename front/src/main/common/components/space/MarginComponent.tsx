import { useMemo } from "react";
import styled from "styled-components/native";

interface marginsModel {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

// 마진 컴포넌트
const MarginComponent = (props: marginsModel) => {
  const style = useMemo(() => ({
    marginTop: props.top ? props.top : 0,
    marginBottom: props.bottom ? props.bottom : 0,
    marginLeft: props.left ? props.left : 0,
    marginRight: props.right ? props.right : 0,
  }), [props.bottom, props.left, props.right, props.top])
  return (
    <MarginBox style={style}/>
  )
}

export default MarginComponent

const MarginBox = styled.View<marginsModel>`

`
