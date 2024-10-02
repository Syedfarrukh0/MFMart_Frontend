import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAuthStore} from '@state/authStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header: FC<{showNotice: () => void}> = ({showNotice}) => {
  const {setUser, user} = useAuthStore();
  return (
    <View style={styles.subContainer}>
      <TouchableOpacity activeOpacity={0.8}>
        <CustomText fontFamily={Fonts.Bold} variants="h7" style={styles.text}>
          Delivery in
        </CustomText>
        <View style={styles.flexRowGap}>
          <CustomText
            fontFamily={Fonts.SemiBold}
            variants="h1"
            style={styles.text}>
            10 minutes
          </CustomText>
          <TouchableOpacity style={styles.noticeBtn} onPress={showNotice}>
            <CustomText
              fontSize={RFValue(10)}
              fontFamily={Fonts.SemiBold}
              style={{color: '#3b4886'}}>
              🌧️ Rain
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.flexRow}>
          <CustomText
            variants="h7"
            numberOfLines={1}
            fontFamily={Fonts.Medium}
            style={styles.text2}>
            {user?.address || 'Knowhere, Somewhere 😅'}
          </CustomText>
          <Icon
            name="menu-down"
            color={'#fff'}
            size={RFValue(20)}
            style={{bottom: -1}}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <Icon name="account-circle-outline" size={RFValue(36)} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? 30 : 15,
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
  },
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  noticeBtn: {
    backgroundColor: '#e8eaf5',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    bottom: -2,
  },
  text2: {
    color: '#fff',
    // width: '90%',
    textAlign: 'center',
  },
  flexRow: {
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    width: '60%',
  },
});

export default Header;
