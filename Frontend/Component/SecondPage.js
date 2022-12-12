import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, ScrollView, View, Text, Dimensions, Image} from 'react-native';
import { loadAsync, useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import ImageList from './lib/ImageList';
import { AutoFocus } from 'expo-camera';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const styles = StyleSheet.create({
     page : {
       position: 'relative',
       flexDirection : 'row',
       flexWrap : 'wrap',
      //  height : 'auto',
      flex : 1,
     },
     photoContainer : {
      flex: 1,
     },
     slider: {
      flexGrow: 1,
     },
     intro : {
      height: SCREEN_HEIGHT/9*8.5,
      width: SCREEN_WIDTH,
      position: 'absolute',
    },
})

const SecondPage = () => {
  const [images, setImages] = useState([]) // Array
  let imageList;
    useEffect(()=>{
    }, [])

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
      // <View style={styles.page} onLayout = {onLayoutRootView}>
       <ScrollView>
        <View style={styles.page}>
        <ImageList/>
        </View>
      </ScrollView>
      // </View>
     
     )

}


export default SecondPage