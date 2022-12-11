import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, ScrollView, View, Text, Dimensions, Image} from 'react-native';
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
     },
     intro : {
      height: SCREEN_HEIGHT/9*8.5,
      width: SCREEN_WIDTH,
      position: 'absolute',
    },
})

const SecondPage = ({rendered}) => {
  const [data, setData] = useState() // Object
  
    const ReadContent = async() => {
      try {
          await axios
          //TODO: .env 처리
            .get("http://192.168.0.26:5000/read")
            .then(res => {
              setData(res.data)
              console.log(data);
            })
            .catch(console.log)
      } catch (err) {
        throw new Error(err);
      }
    }; //Read

    useEffect(()=>{
      ReadContent();
      console.log(data)
    }, [rendered, data])

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
        <View style={styles.page}>
        <Image style={styles.intro} source ={{uri : `http://192.168.0.26:5000/uploads/${data}`}}/>
        <Text>{data}</Text>
        </View>
      </ScrollView>
     </View>
     </View>
     
     )

}


export default SecondPage