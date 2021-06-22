import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { Button, Container, Content, Text } from 'native-base';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import sharedStyles from '../../styles/styles';
import { HeaderContent } from '../../components/HeaderContent';
import { InvoiceListItem } from '../../components/InvoiceListItem';
import { observer } from 'mobx-react';
import InvoiceStore from '../../store/invoice';
import UserStore from '../../store/user';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface Props {
  navigation: MainScreenNavigationProp;
}

const DATA = [
  {
    id: '1',
    storeName: 'Checkers',
    date: '12 Jun 2021',
    total: 256.99,
  },
  {
    id: '2',
    storeName: 'Shoprite',
    date: '13 May 2021',
    total: 2156.9,
  },
  {
    id: '3',
    storeName: 'Click',
    date: '27 Jul 2021',
    total: 867.25,
  },
  {
    id: '4',
    storeName: 'Total Garage Sandown',
    date: '01 Jan 2021',
    total: 567.95,
  },
  {
    id: '5',
    storeName: 'Burger King Parklands',
    date: '17 Mar 2021',
    total: 235.92,
  },
  {
    id: '6',
    storeName: 'Checker Hyper Sandown',
    date: '19 May 2021',
    total: 240.59,
  },
  {
    id: '7',
    storeName: 'Spar Liquor Observatory',
    date: '13 May 2021',
    total: 1250.25,
  },
  {
    id: '8',
    storeName: 'Spar Liquor TableView',
    date: '13 May 2021',
    total: 1250.25,
  },
  {
    id: '9',
    storeName: 'Spar Liquor Big Bay',
    date: '13 May 2021',
    total: 1250.25,
  },
  {
    id: '10',
    storeName: 'Checkers',
    date: '12 Jun 2021',
    total: 256.99,
  },
  {
    id: '11',
    storeName: 'Shoprite',
    date: '13 May 2021',
    total: 2156.95,
  },
  {
    id: '12',
    storeName: 'Click',
    date: '27 Jul 2021',
    total: 867.25,
  },
  {
    id: '13',
    storeName: 'Total Garage Sandown',
    date: '01 Jan 2021',
    total: 567.99,
  },
  {
    id: '14',
    storeName: 'Burger King Parklands',
    date: '17 Mar 2021',
    total: 235.2,
  },
  {
    id: '15',
    storeName: 'Checker Hyper Sandown',
    date: '19 May 2021',
    total: 240.59,
  },
  {
    id: '16',
    storeName: 'Spar Liquor Observatory',
    date: '13 May 2021',
    total: 1250.25,
  },
  {
    id: '17',
    storeName: 'Spar Liquor TableView',
    date: '13 May 2021',
    total: 1250.25,
  },
  {
    id: '18',
    storeName: 'Spar Liquor Big Bay',
    date: '13 May 2021',
    total: 1250.25,
  },
];

const Main = ({ navigation }: Props): JSX.Element => {
  const invoiceStore = useContext(InvoiceStore);
  const userStore = useContext(UserStore);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderContent onSearch={searchInvoices} onOpenMenu={openMenu} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const loadInvoices = async () => {
      await invoiceStore.getAllInvoice(userStore.token.access_token);
    };

    loadInvoices();
  }, []);

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
        <SafeAreaView style={styles.container}>
          <FlatList
            data={invoiceStore.invoices}
            renderItem={(item) => <InvoiceListItem {...item.item} />}
            keyExtractor={(item) => item._id}
          />
        </SafeAreaView>
        <Button
          block
          style={styles.scanInvoiceButton}
          onPress={navigateToScanInvoiceScreen}>
          <Text uppercase={false}>Scan New Invoice</Text>
        </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  scanInvoiceButton: {
    marginTop: responsiveHeight(1),
    backgroundColor: '#321AC6',
    borderRadius: 5,
  },
  container: {
    flex: 1,
    height: responsiveHeight(84),
    marginTop: responsiveHeight(1),
  },
});

export default observer(Main);
