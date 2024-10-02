import {View, Text, Animated as RNAnimated, SafeAreaView, StyleSheet} from 'react-native';
import React, { useEffect, useRef } from 'react';
import {useAuthStore} from '@state/authStore';
import NoticeAnimation from './NoticeAnimation';
import { NoticeHeight } from '@utils/Scaling';
import Visuals from './Visuals';
import { CollapsibleContainer, CollapsibleHeaderContainer, CollapsibleScrollView, withCollapsibleContext } from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickSearchBar from './StickSearchBar';
import Content from '@components/dashboard/Content';

const ProductDashboard = () => {
  // const {user} = useAuthStore();
  // console.log(user);

  const NOTICE_HEIGHT = -(NoticeHeight + 12)
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current
  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }
  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }
  useEffect(()=>{
    slideDown();
    const timeoutId = setTimeout(()=>{
      slideUp();
    }, 3500)
    return () => clearTimeout(timeoutId);
  })

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />
        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader 
              showNotice={()=>{
                slideDown();
                const timeoutId = setTimeout(()=>{ slideUp(); }, 3500);
                return () => clearTimeout(timeoutId);
              }}
            />
            <StickSearchBar />
          </CollapsibleHeaderContainer>
          
          <CollapsibleScrollView nestedScrollEnabled style={styles.panelContainer} showsVerticalScrollIndicator={false}>
          <Content />
          </CollapsibleScrollView>

        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  }
})

export default withCollapsibleContext(ProductDashboard);
