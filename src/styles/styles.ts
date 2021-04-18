import { StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const sharedStyles = StyleSheet.create({
  contentContainer: {
    marginLeft: responsiveWidth(8),
    marginRight: responsiveWidth(8),
    flex: 1,
  },
  logo: {
    marginTop: responsiveHeight(10),
    flex: 1,
    alignSelf: 'center',
  },
  instruction: {
    marginTop: responsiveHeight(5),
    fontSize: responsiveFontSize(2.3),
  },
  input: {
    borderRadius: 5,
    marginTop: responsiveHeight(2),
  },
  actionButton: {
    backgroundColor: '#321AC6',
    marginTop: responsiveHeight(2),
    borderRadius: 5,
  },
  explanationText: {
    flex: 1,
    marginTop: responsiveHeight(1),
    color: '#000000',
    textAlign: 'justify',
    fontSize: responsiveFontSize(1.8),
  },
});

export default sharedStyles;
