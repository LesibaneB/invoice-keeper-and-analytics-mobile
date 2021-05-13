import React, { useLayoutEffect } from 'react';
import { Button, Container, Content, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import sharedStyles from '../../styles/styles';
import { HeaderContent } from '../../components/HeaderContent';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface Props {
  navigation: MainScreenNavigationProp;
}

export default function Main({ navigation }: Props): JSX.Element {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderContent onSearch={searchInvoices} onOpenMenu={openMenu} />
      ),
    });
  }, [navigation]);

  function navigateToScanInvoiceScreen(): void {
    navigation.navigate('ScanInvoice');
  }

  function searchInvoices(): void {
    console.log('Pressed on search!');
  }

  function openMenu(): void {
    console.log('Pressed on menu!');
  }

  return (
    <Container
      style={{
        flex: 1,
      }}>
      <Content style={sharedStyles.contentContainer}>
        <Button
          block
          style={styles.scanInvoiceButton}
          onPress={navigateToScanInvoiceScreen}>
          <Text uppercase={false}>Scan New Invoice</Text>
        </Button>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  scanInvoiceButton: {
    marginTop: responsiveHeight(85),
    backgroundColor: '#321AC6',
    borderRadius: 5,
  },
});
