import {View, StyleSheet, Animated, Image} from 'react-native';
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
import {Fonts} from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';

const CustomerLogin: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const keyboardOffsetHeight = useKeyboardOffsetHeight();

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
        toValue: -keyboardOffsetHeight / 2,
        duration: 1000,
        useNativeDriver: true,
      }).start()
    }
  },[keyboardOffsetHeight])

  const handelAuth = async () => {

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
              <CustomButton title='Continue' disabled={phoneNumber.length !== 10} onPress={()=>handelAuth()} loading={loading} />
            </View>
          </Animated.ScrollView>
        </PanGestureHandler>
      </CustomSafeAreaView>
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
    marginBottom: 20,
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
    paddingBottom: 20,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
});

export default CustomerLogin;
