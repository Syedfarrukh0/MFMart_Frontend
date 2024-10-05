import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { FC } from 'react'
import { useCartStore } from '@state/cartStore'
import { Colors, Fonts } from '@utils/Constants';
import CustomText from './CustomText';

const UniversalAdd:FC <{item: any}> = ({item}) => {

    const count = useCartStore((state)=>state.getItemCount(item._id));
    const {addItem, removeItem} = useCartStore()

  return (
    <View style={[styles.container, {backgroundColor: count === 0 ? '#fff' : Colors.secondary}]}>
        {count === 0 ?
            <Pressable onPress={(item)=>addItem(item)} style={styles.add}>
                <CustomText variants='h9' fontFamily={Fonts.SemiBold} style={styles.addText}>Add</CustomText>
            </Pressable>
            :
            <View>

            </View>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.secondary,
        width: 65,
        borderRadius: 8,
    },
    add: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
        paddingVertical: 6,
    },
    addText: {
        
    }
})

export default UniversalAdd