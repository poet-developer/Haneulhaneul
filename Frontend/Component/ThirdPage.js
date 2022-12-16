import { useContext } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions, SafeAreaView } from 'react-native';
import AllImageList from './lib/AllImageList';
import { CheckAuth } from './lib/CheckAuth';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const ThirdPage = ({setDisplay, setMode}) => {
  const [me, setMe] = useContext(CheckAuth)

     return(
            <ScrollView>
              <View style={styles.page}>
              {me 
              ?
              <AllImageList page ={'third'} public= {true} currentMode={'people'} setDisplay={setDisplay} setMode = {setMode} />
              :<SafeAreaView style={styles.modal} ><Text style={styles.text}>로그인이 필요해요!</Text></SafeAreaView>
              }
              </View>
            </ScrollView>
     )

}
export default ThirdPage

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

