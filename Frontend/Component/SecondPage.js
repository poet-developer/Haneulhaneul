import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions, Image} from 'react-native';
import { loadAsync, useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import ImageList from './lib/ImageList';
import { AutoFocus } from 'expo-camera';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const styles = StyleSheet.create({
     page : {
      //  position: 'relative',
       flexDirection : 'row',
       flexWrap : 'wrap',
      //  height : 'auto',
      // flex : 1,
     },
     photoContainer : {
      flex: 1,
     },
     slider: {
      flexGrow: 1,
     },
})

const SecondPage = ({setDisplay, setMode}) => {
  const [images, setImages] = useState([]) // Array
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
       <ScrollView>
        <View style={styles.page}>
        <ImageList page={'second'} setDisplay={setDisplay} setMode = {setMode}/>
        </View>
      </ScrollView>   
     )

}


export default SecondPage