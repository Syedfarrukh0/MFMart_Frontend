import { View, Text, StyleSheet, Animated } from 'react-native'
import React, { FC, useState } from 'react'
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import ProductSlider from '@components/login/ProductSlider'
import { resetAndNavigate } from '@utils/NavigationUtils'

const CustomerLogin: FC = () => {
  const [gestureSequence, setGestureSequence] = useState<string[]>([])
  const handelGesture = ({nativeEvent}: any) => {
    if (nativeEvent.state === State.END) {
      const {translationX, translationY} = nativeEvent;
      let direction = '';
      if (Math.abs(translationX)>Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left'
      }
      else{
        direction = translationY > 0 ? 'down' : 'up'
      }

      const newSequence = [...gestureSequence, direction].slice(-5)
      setGestureSequence(newSequence)
      
      console.log(newSequence)

      if (newSequence.join(' ') === 'up up down left right') {
        setGestureSequence([])
        resetAndNavigate('DeliveryLogin')
      }
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handelGesture}>
            <Animated.ScrollView bounces={false} keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.subContainer}>

            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  }
})

export default CustomerLogin