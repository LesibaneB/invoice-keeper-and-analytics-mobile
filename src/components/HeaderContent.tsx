import { Icon, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

interface Props {
  onSearch: () => void;
  onOpenMenu: () => void;
}

export function HeaderContent(props: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <Icon
        onPress={props.onSearch}
        name="search"
        style={styles.searchIcon}
        type="MaterialIcons"
      />
      <Icon
        onPress={props.onOpenMenu}
        name="menu"
        style={styles.menuIcon}
        type="MaterialIcons"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    marginRight: responsiveWidth(5),
  },
  searchIcon: {
    fontSize: responsiveFontSize(3.5),
    marginRight: responsiveWidth(4),
  },
  menuIcon: {
    fontSize: responsiveFontSize(3.5),
  },
});
