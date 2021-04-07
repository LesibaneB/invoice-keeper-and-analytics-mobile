import {Text} from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';

interface Props {
  message: string | undefined;
}

export function InputError({message}: Props): JSX.Element {
  return <Text style={styles.text}>{message}</Text>;
}

const styles = StyleSheet.create({
    text: {
        marginTop: responsiveHeight(1.5),
        color: 'red'
    }
});
