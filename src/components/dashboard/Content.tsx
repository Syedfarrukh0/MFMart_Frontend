import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { adData } from '@utils/dummyData'
import AdCarousal from './AdCarousal'

const Content = () => {
  return (
    <View style={styles.container}>
        <AdCarousal adData={adData} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    }  
})

export default Content