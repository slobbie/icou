import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {Colors} from '@feature/home/util/colors';
import CardContainer from '@feature/home/components/CardContainer';
import {useSharedValue} from 'react-native-reanimated';

const HomeScreen = () => {
  const firstPriority = useSharedValue(1);
  const secondPriority = useSharedValue(0.9);
  const thirdPriority = useSharedValue(0.8);
  return (
    // <SafeView>
    <RooView>
      <Container>
        <CardContainer
          priority={thirdPriority}
          firstPriority={firstPriority}
          secondPriority={secondPriority}
          thirdPriority={thirdPriority}
          color={Colors.LIGHT_BLUE}
        />
        <CardContainer
          priority={secondPriority}
          firstPriority={firstPriority}
          secondPriority={secondPriority}
          thirdPriority={thirdPriority}
          color={Colors.LIGHT_RED}
        />
        <CardContainer
          priority={firstPriority}
          firstPriority={firstPriority}
          secondPriority={secondPriority}
          thirdPriority={thirdPriority}
          color={Colors.LIGHT_GOLD}
        />
      </Container>
    </RooView>
    // </SafeView>
  );
};

export default HomeScreen;

const RooView = styled(GestureHandlerRootView)`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #333;
`;
