import { Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

interface Props {
  storeName: string;
  date: string;
  total: number;
}

export function InvoiceListItem({
  storeName,
  date,
  total,
}: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.storeName}>{storeName}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.total}>R {total}</Text>
      </View>
    </View>
  );
}

const storeNameAndDateTextStyle = {
  marginLeft: responsiveWidth(3),
  marginTop: responsiveHeight(1),
  fontSize: responsiveFontSize(2.1),
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    marginBottom: 10,
    height: responsiveHeight(9),
    flex: 1,
    flexDirection: 'row',
  },
  left: {
    flex: 3,
  },
  right: {
    flex: 1.5,
  },
  storeName: {
    ...storeNameAndDateTextStyle,
  },
  date: {
    ...storeNameAndDateTextStyle,
    color: '#6E6E6E',
  },
  total: {
    color: '#321AC6',
    marginTop: responsiveHeight(3),
    fontSize: responsiveFontSize(2.4),
  },
});
