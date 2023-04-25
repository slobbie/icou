import React, {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';

interface BottomSheetProps {
  children?: React.ReactNode;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

// 바텀 시트
const BottomSheet = (props: BottomSheetProps) => {
  const {modalVisible, setModalVisible} = props;
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
    if (props.modalVisible) {
      resetBottomSheet.start();
    }
  }, [props.modalVisible, resetBottomSheet]);

  const onCloseModalHandle = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  return (
    <>
      <ModalBox
        visible={modalVisible}
        animationType={'fade'}
        transparent
        statusBarTranslucent>
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
              {/* <Title>바텀시트</Title> */}
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
  background-color: #1F2021;
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
