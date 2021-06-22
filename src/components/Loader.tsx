import React, { createRef, RefObject, useEffect } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

interface Props {
  visible: boolean;
}

export function Loader({ visible }: Props): JSX.Element {
  let animationRef: RefObject<AnimatedLottieView> = createRef();

  useEffect(() => {
    animationRef?.current?.play();
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType={'none'}
      supportedOrientations={['portrait']}
      onRequestClose={() => {}}>
      <View style={styles.container}>
        <View>
          <AnimatedLottieView
            ref={animationRef}
            source={require('../utils/black-animated-dots-loader.json')}
            loop={true}
            speed={1}
            style={[styles.animationStyle]}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.75)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationStyle: {
    height: responsiveHeight(10),
    width: responsiveWidth(10),
  },
});
