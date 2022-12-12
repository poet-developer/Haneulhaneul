import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { loadAsync, useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import ImageList from './lib/ImageList';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const styles = StyleSheet.create({
     page : {
          backgroundColor : 'teal',
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT/9*8.5,

          justifyContent: 'center',
          alignItems : 'center',
        }
})

const ThirdPage = ({}) => {
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
            <ScrollView>
              <ImageList page ={'third'} public= {true}/>
            </ScrollView>
     )

}


export default ThirdPage