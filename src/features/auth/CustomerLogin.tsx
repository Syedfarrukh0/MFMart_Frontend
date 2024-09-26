import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import ProductSlider from '@components/login/ProductSlider'

const CustomerLogin: FC = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />
        </CustomSafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default CustomerLogin