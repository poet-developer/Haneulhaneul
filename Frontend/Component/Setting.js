import { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Image, Text} from 'react-native';


const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

 
 const Setting = () => {
      return(
           <View style={styles.container}>
                <Text>Setting</Text>
          </View>
     )
}
export default Setting

const styles = StyleSheet.create({
     container:{
          flex: 1,
          alignItems : 'center',
          justifyContent : 'center',
          backgroundColor : 'gold',
          width : SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
        },
})