import {StyleSheet, TouchableOpacity, View} from 'react-native'
import React from 'react'

interface Props {
  onPress: () => void
}

export function CameraButton(props: Props): JSX.Element {
  return (
    <View style={styles.buttonRing}>
      <TouchableOpacity onPress={props.onPress}>
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
    height: 100,
    width: 100,
    marginTop: 480,
    alignSelf: 'center',
  },
  innerCircle: {
    backgroundColor: 'white',
    height: 80,
    width: 80,
    marginTop: 5,
    borderRadius: 50,
    alignSelf: 'center',
  },
})
