import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen'

interface Props {
  onPress: () => void
}

export function CameraButton({onPress}: Props): JSX.Element {
  return (
    <View style={styles.buttonRing}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.innerCircle} />
      </TouchableOpacity>
    </View>
  )
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
    height: heightPercentageToDP(13),
    width: widthPercentageToDP(26),
    marginTop: heightPercentageToDP(70),
    alignSelf: 'center',
  },
  innerCircle: {
    backgroundColor: 'white',
    height: heightPercentageToDP(10.5),
    width: widthPercentageToDP(21),
    marginTop: 5,
    borderRadius: 50,
    alignSelf: 'center',
  },
})
