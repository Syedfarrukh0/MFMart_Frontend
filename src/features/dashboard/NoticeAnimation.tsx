import { View, Text, StyleSheet, Animated as RNAnimated } from 'react-native'
import React, { FC } from 'react'
import { NoticeHeight } from '@utils/Scaling';
import Notice from '@components/dashboard/Notice';

const NoticeAnimation:FC<{noticePosition: any; children: React.ReactElement}> = ({ noticePosition, children }) => {

    const NOTICE_HEIGHT = -(NoticeHeight + 5)

  return (
    <View style={styles.container}>
        <RNAnimated.View style={[styles.noticeContainer, 
            {transform: [{translateY: noticePosition}]}
        ]}>
            <Notice />
        </RNAnimated.View>
        <RNAnimated.View style={[styles.contentContainer, {
            transform: [{
                translateY: noticePosition.interpolate({
                    inputRange: [NOTICE_HEIGHT, 0],
                    outputRange: [0, NoticeHeight + 5],
                }),
            }],
            // marginTop: noticePosition.interpolate({
            //     inputRange: [NOTICE_HEIGHT, 0],
            //     outputRange: [0, NOTICE_HEIGHT + 20]
            // })
        }]}>
            {children}
        </RNAnimated.View>
    </View>
  )
}

const styles = StyleSheet.create({
    noticeContainer: {
        width: '100%',
        zIndex: 999,
        position: 'absolute',
    },
    contentContainer: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})

export default NoticeAnimation