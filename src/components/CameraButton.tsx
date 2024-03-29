import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

interface Props {
  onPress: () => void;
}

export function CameraButton({ onPress }: Props): JSX.Element {
  return (
    <View style={styles.buttonRing}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.innerCircle} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRing: {
    borderRadius: 50,
    borderRightWidth: 5,
    borderLeftWidth: 5,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderRightColor: 'white',
    borderLeftColor: 'white',
    borderTopColor: 'white',
    borderBottomColor: 'white',
    height: responsiveHeight(13),
    width: responsiveWidth(26),
    marginTop: responsiveHeight(70),
    alignSelf: 'center',
  },
  innerCircle: {
    backgroundColor: 'white',
    height: responsiveHeight(10.5),
    width: responsiveWidth(21),
    marginTop: 5,
    borderRadius: 50,
    alignSelf: 'center',
  },
});
