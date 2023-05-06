import React, {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import GlobalPopupController from '@common/components/popup/GlobalPopupController';

interface BottomSheetProps {
  children?: React.ReactNode;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

// 바텀 시트
const BottomSheet = (props: BottomSheetProps) => {
  const {visible, setVisible} = props;
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          onCloseModalHandle();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (props.visible) {
      resetBottomSheet.start();
    }
  }, [visible, props.visible, resetBottomSheet]);

  const onCloseModalHandle = () => {
    closeBottomSheet.start(() => {
      setVisible(false);
    });
  };

  return (
    <>
      <ModalBox
        visible={visible}
        animationType={'fade'}
        transparent
        statusBarTranslucent
        onRequestClose={
          () => GlobalPopupController.hideModal()
        }
      >
        <Wrapper>
          <Overlay>
            <TouchableWithoutFeedback onPress={onCloseModalHandle}>
              <BackGroundBox />
            </TouchableWithoutFeedback>
          </Overlay>
          <AnimatedBox
            style={{transform: [{translateY: translateY}]}}
            {...panResponders.panHandlers}>
            <Box>
              {props.children}
            </Box>
          </AnimatedBox>
        </Wrapper>
      </ModalBox>
    </>
  );
};

export default BottomSheet;

const ViewBox = styled.View`
  justify-content: flex-start;
  align-items: center;
  background-color: ${({theme}) => theme.colors.bg_1F2021};
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  overflow: hidden;
`;

const AnimatedBox = Animated.createAnimatedComponent(ViewBox);

const ModalBox = styled.Modal``;

const Overlay = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const BackGroundBox = styled.View`
  flex: 1;
`;

const Wrapper = styled.View`
  flex: 1;
  background-color: 'rgba(0, 0, 0, 0.4)';
`;

const Box = styled.View`
  width: 100%;
  height: 78%;
`
