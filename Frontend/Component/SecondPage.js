import { useContext, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions, SafeAreaView } from 'react-native';
import MyImageList from './lib/MyImageList';
import { CheckAuth } from './lib/CheckAuth';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const SecondPage = ({setDisplay, setMode, currentMode}) => {
  const [me, setMe] = useContext(CheckAuth)

     return(
       <ScrollView>
        <View style={styles.page}>
          {me 
          ? <MyImageList page={'second'} setDisplay={setDisplay} setMode = {setMode} currentMode = {currentMode}/>
          : <SafeAreaView style={styles.modal} ><Text style={styles.text}>로그인이 필요해요!</Text></SafeAreaView>
          }
        </View>
      </ScrollView>   
     )

}

export default SecondPage

const styles = StyleSheet.create({
  page : {
    flexDirection : 'row',
    flexWrap : 'wrap',
    position: 'relative'
  },

  modal : {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'teal',
  },

  text:{
    fontSize: 20,
    color: 'snow',
    fontFamily: 'sub',
  }
})