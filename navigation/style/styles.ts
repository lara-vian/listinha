import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from './colors';

export const style = StyleSheet.create({
  container: {
    width: wp(90),
    height: hp(90),
    borderWidth: 4,
    borderColor: colors.primaria
  } 
})