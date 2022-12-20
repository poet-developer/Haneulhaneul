import { useContext } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions, SafeAreaView } from 'react-native';
import AllImageList from './lib/AllImageList';
import { CheckAuth } from './lib/CheckAuth';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

 /**
 * ThirdPage = mode : people
 * ./lib/AllImageList 호출
 * 로그인 상태를 확인한다. 로그인되지 않았으면 SafeAreaView를 띄울것.
 * 로드된 이미지들은 스크롤을 내려 확인할 수 있도록 한다  -> ScrollView
 */

const ThirdPage = ({setDisplay, setMode}) => {
  const [me, setMe] = useContext(CheckAuth)

     return(
            <ScrollView>
              <View style={styles.page}>
              {me 
                // 로그인 정보 확인
              ?
              <AllImageList page ={'third'} public= {true} currentMode={'people'} setDisplay={setDisplay} setMode = {setMode} />
                // 로드된 이미지
              :<SafeAreaView style={styles.modal} ><Text style={styles.text}>로그인이 필요해요!</Text></SafeAreaView>
                // 로그인이 필요함을 알림
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

