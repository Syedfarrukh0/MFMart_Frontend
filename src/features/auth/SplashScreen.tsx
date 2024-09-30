import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Alert,
  BackHandler,
  Linking,
} from 'react-native';
import React, {FC, useEffect} from 'react';
import {Colors} from '@utils/Constants';
import {screenHeight, screenWidth} from '@utils/Scaling';
import Logo from '@assets/images/splash_logo.jpeg';
import Geolocation from '@react-native-community/geolocation';
import {useAuthStore} from '@state/authStore';
import {tokenStorage} from '@state/storage';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {jwtDecode} from 'jwt-decode';
import {refetchUser, refresh_tokens} from '@service/authService';

interface DecodedToken {
  exp: number;
}

const SplashScreen: FC = () => {
  const {user, setUser} = useAuthStore();

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refreshToken = tokenStorage.getString('refreshToken') as string;
    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
      const currentTime = Date.now() / 1000;
      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate('CustomerLogin');
        Alert.alert('Your session has expired. Please login again.');
        return false;
      }
      if (decodedAccessToken?.exp > currentTime) {
        try {
          refresh_tokens();
          await refetchUser(setUser);
        } catch (error) {
          console.log(error);
          Alert.alert('Failed to refresh token. Please login again.');
          return false;
        }
      }
      if (user?.role === 'Customer') {
        resetAndNavigate('ProductDashboard');
      } else {
        resetAndNavigate('DeliveryDashboard');
      }
      return true;
    }
    resetAndNavigate('CustomerLogin');
    return false;
  };

  // location
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (!granted) {
          const permissionResult = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message:
                'This app requires location access to function properly.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Deny',
              buttonPositive: 'OK',
            },
          );

          if (permissionResult === PermissionsAndroid.RESULTS.GRANTED) {
            // Location permission granted, get the location
            getCurrentLocation();
          } else if (permissionResult === PermissionsAndroid.RESULTS.DENIED) {
            // User denied the permission
            Alert.alert(
              'Permission Denied',
              'Location permission is required to use this app. The app will now close.',
              [{text: 'OK', onPress: () => BackHandler.exitApp()}],
              {cancelable: false},
            );
          } else if (
            permissionResult === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
          ) {
            // User denied permission and selected "Don't ask again"
            Alert.alert(
              'Permission Required',
              'Location permission has been permanently denied. Please enable it in the app settings.',
              [
                {
                  text: 'Go to Settings',
                  onPress: () => {
                    // Open app settings
                    Linking.openSettings();
                  },
                },
                {
                  text: 'Cancel',
                  onPress: () => BackHandler.exitApp(),
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
          }
        } else {
          // Permission is already granted, get the location
          getCurrentLocation();
        }
      } catch (err) {
        console.warn('Permission error:', err);
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          console.log('Current Position:', latitude, longitude);
        },
        error => {
          console.log('Location error:', error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );

      setTimeout(() => {
        tokenCheck();
      }, 2000);
    };
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
