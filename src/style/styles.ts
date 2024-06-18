import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import colors from './colors';

export const style = StyleSheet.create({
  background:{
    display: "flex",
    alignItems: "center",
  },
  container: {
    width: wp(90),
    height: hp(88),
    marginTop: hp(2),
    borderWidth: 4,
    borderColor: colors.primaria,
    borderRadius: 12,
  },
  buttonAdd: {
    padding: 16,
    marginTop: hp(2),
    borderWidth: 4,
    borderColor: colors.add,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  textAdd: {
    color: colors.add,
    fontSize: RFPercentage(8)
  }
})