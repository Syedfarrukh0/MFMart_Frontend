import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '@utils/Constants'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import { goBack } from '@utils/NavigationUtils'
import CustomText from './CustomText'

const CustomHeader:FC<{title: string, search?: boolean}> = ({title, search}) => {
  return (
    <SafeAreaView style={styles.flexRow}>
        <Pressable onPress={()=>goBack()}>
            <Icon name='chevron-back' color={Colors.text} size={RFValue(16)} />
        </Pressable>
        <CustomText style={styles.text} variants='h5' fontFamily={Fonts.SemiBold}>{title}</CustomText>
        <View>{search && <Icon name='search' color={Colors.text} size={RFValue(16)} />}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    flexRow: {
        justifyContent: 'space-between',
        padding: 10,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 0.6,
        borderColor: Colors.border
    },
    text: {
        textAlign: 'center',
    }
})

export default CustomHeader