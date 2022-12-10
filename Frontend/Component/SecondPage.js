import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, ScrollView, View, Text, Dimensions} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { loadAsync, useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const styles = StyleSheet.create({
     page : {
       backgroundColor : 'black',
       width: SCREEN_WIDTH,
       height: SCREEN_HEIGHT/9*8.5,
       
       justifyContent: 'center',
       alignItems : 'center',
     },
     photoContainer : {
      backgroundColor : 'gold',
     },
     slider: {
      height: SCREEN_HEIGHT,
      backgroundColor: 'red'
     }
})

const SecondPage = ({rendered}) => {
  const [data, setData] = useState({}) // Object
  
    const ReadContent = async() => {
      try {
        // if (id) {
          await axios
            .get("http://localhost:5000/read")
            .then(setData)
            .catch(console.log)
        // }
      } catch (err) {
        throw new Error(err);
      }
    }; //Read

    useEffect(()=>{
      ReadContent();
    }, [rendered])

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
     <View style={styles.photoContainer}>
       <ScrollView 
      pagingEnabled
      horizontal 
      showsHorizontalScrollIndicator = {false}
      contentContainerStyle={styles.slider}
      >
        <Text style={{color: 'snow', fontSize: 30}}>Second</Text>
      </ScrollView>
     </View>
     </View>
     
     )

}


export default SecondPage