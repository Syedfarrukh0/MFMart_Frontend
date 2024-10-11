import {View, StyleSheet, Animated, Image, SafeAreaView, Keyboard, Alert} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import {resetAndNavigate} from '@utils/NavigationUtils';
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts, lightColors} from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { customerLogin } from '@service/authService';


const CustomerLogin: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const keyboardOffsetHeight = useKeyboardOffsetHeight();
  const bottomColors = [...lightColors].reverse(); // Reverse the array to start with the darkest color
  
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(()=>{
    if (keyboardOffsetHeight == 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start()
    }else{
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 1000,
        useNativeDriver: true,
      }).start()
    }
  },[keyboardOffsetHeight])

  const handelAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);

    try {
      const res = await customerLogin(phoneNumber);
      if (!res?.success) {
        Alert.alert(res?.errorResponse?.message);
        resetAndNavigate('CustomerLogin');
        return;
      }
      resetAndNavigate('ProductDashboard');
    } catch (error) {
      Alert.alert('Login Faield');
    } finally{
      setLoading(false);
    }

    // try {
    //   await customerLogin(phoneNumber);
    //   resetAndNavigate('ProductDashboard');
    // } catch (error) {
    //   Alert.alert('Login Failed');
    // }
    // finally {
    //   setLoading(false);
    // }
  }

  const handelGesture = ({nativeEvent}: any) => {
    if (nativeEvent.state === State.END) {
      const {translationX, translationY} = nativeEvent;
      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }

      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);

      if (newSequence.join(' ') === 'up up down left right') {
        setGestureSequence([]);
        resetAndNavigate('DeliveryLogin');
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <CustomSafeAreaView>
        <ProductSlider />
        <PanGestureHandler onHandlerStateChange={handelGesture}>
          <Animated.ScrollView
            bounces={false}
            keyboardDismissMode={'on-drag'}
            keyboardShouldPersistTaps={'handled'}
            contentContainerStyle={styles.subContainer}
            style={{transform: [{translateY: animatedValue}]}}
            >
              <LinearGradient colors={bottomColors} style={styles.gradient} />
            <View style={styles.content}>
              <Image
                source={require('@assets/images/logo.png')}
                style={styles.logo}
              />
              <CustomText variants="h2" fontFamily={Fonts.Bold}>
                India's last minute app
              </CustomText>
              <CustomText
                variants="h5"
                fontFamily={Fonts.SemiBold}
                style={styles.text}>
                Login or Signup
              </CustomText>
              <CustomInput
                onChangeText={text => setPhoneNumber(text.slice(0, 10))}
                onClear={() => setPhoneNumber('')}
                value={phoneNumber}
                left = {<CustomText style={styles.phoneText} variants='h6' fontFamily={Fonts.SemiBold}>
                  +92
                </CustomText>}
                placeholder='Enter mobile number'
                inputMode='numeric'
              />
              <CustomButton title='Continue' disabled={phoneNumber.length !== 10} onPress={handelAuth} loading={loading} />
            </View>
          </Animated.ScrollView>
        </PanGestureHandler>
      </CustomSafeAreaView>

      <View style={styles.footer}>
        <SafeAreaView>
          <CustomText fontSize={RFValue(9)} style={styles.footerText}>
            By continuing, you agree to the MFMart Terms of Service and Privacy Policy.
          </CustomText>
        </SafeAreaView>
      </View>

    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 3,
  },
  phoneText: {
    marginLeft: 10,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingBottom: 10,
    zIndex: 22,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fc',
    width: '100%',
  },
  footerText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  gradient: {
    paddingTop: 60,
    width: '100%',
  }
});

export default CustomerLogin;
