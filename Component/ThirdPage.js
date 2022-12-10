import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { loadAsync, useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const styles = StyleSheet.create({
     page : {
          backgroundColor : 'teal',
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT/9*8.5,
        }
})

const FirstPage = ({}) => {
        const [fontsLoaded] = useFonts({
          'title' : require('../assets/Fonts/Pak_Yong_jun.ttf'),
        })
      
        const onLayoutRootView = useCallback(async () => {
          if (fontsLoaded) {
            await SplashScreen.hideAsync();
          } // 글꼴 파일을 미리 렌더
        }, [fontsLoaded]); 
      
        if (!fontsLoaded) return null;

     return(
     <View style={styles.page} onLayout = {onLayoutRootView}>
            
     </View>
     )

}


export default FirstPage