import {View, Text, Alert, StyleSheet, ScrollView} from 'react-native';
import React, {FC, useState} from 'react';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {deliveryLogin} from '@service/authService';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import {screenHeight} from '@utils/Scaling';
import LottieView from 'lottie-react-native';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '@components/ui/CustomButton';

const DeliveryLogin: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handelLogin = async () => {
    setLoading(true);
    try {
      const res = await deliveryLogin(email, password);
      // console.log('ssaasd: ', res?.errorResponse?.errorData?.message)
      if (!res?.success) {
        Alert.alert(res?.errorResponse?.errorData?.message);
        resetAndNavigate('DeliveryLogin');
        return;
      }
      resetAndNavigate('DeliveryDashboard');
    } catch (error) {
      Alert.alert('Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomSafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              autoPlay
              loop
              style={styles.lottie}
              source={require('@assets/animations/delivery_man.json')}
            />
          </View>
          <CustomText variants="h3" fontFamily={Fonts.Bold}>
            Delivery Partner Portal
          </CustomText>
          <CustomText
            variants="h6"
            style={styles.text}
            fontFamily={Fonts.SemiBold}>
            Faster than flash
          </CustomText>
          <CustomInput
            onChangeText={setEmail}
            value={email}
            left={
              <Icon
                name="mail"
                color={'#f8890e'}
                style={{margin: 10,  marginLeft: -15}}
                size={RFValue(21)}
              />
            }
            placeholder="Email"
            inputMode='email'
            right={false}
          />
          <CustomInput
            onChangeText={setPassword}
            value={password}
            left={
              <Icon
                name="key-sharp"
                color={'#f8890e'}
                style={{margin: 10,  marginLeft: -15}}
                size={RFValue(21)}
              />
            }
            placeholder="Password"
            secureTextEntry
            right={false}
          />
          <CustomButton 
            disabled = {email.length == 0 || password.length < 0}
            title='Login'
            onPress={handelLogin}
            loading={loading}
          />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: '100%',
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
});

export default DeliveryLogin;
