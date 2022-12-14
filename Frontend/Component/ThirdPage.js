import { StyleSheet, View, Text, Dimensions, ScrollView} from 'react-native';;

import AllImageList from './lib/AllImageList';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const styles = StyleSheet.create({
     page : {
          flexDirection : 'row',
          flexWrap : 'wrap',
          position: 'relative'
        }
})

const ThirdPage = ({setDisplay, setMode}) => {

     return(
            <ScrollView>
              <View style={styles.page}>
              <AllImageList page ={'third'} public= {true} currentMode={'people'} setDisplay={setDisplay} setMode = {setMode} />
              </View>
            </ScrollView>
     )

}


export default ThirdPage

