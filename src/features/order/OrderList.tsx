import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useCartStore } from '@state/cartStore'

const OrderList = () => {
    const cartItems = useCartStore((state)=>state.cart)
  return (
    <View style={styles.container}>
        <View style={styles.flexRow}>
            <View>
                {/* <Image source={require('')} /> */}
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 15,
    },
    flexRow: {

    }
})

export default OrderList