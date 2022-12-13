import { useCallback, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity, Button, SafeAreaView, Image, Pressable } from 'react-native';
import { useFonts } from 'expo-font';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const Signin = () => {
     return ( 
          <View style={styles.container}>
               <Text> 로그인 세션 </Text>
          </View>
     )
}

export default Signin

const styles = StyleSheet.create({
     container : {
          position: 'absolute',
          top:0,
          left:0,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          justifyContent: 'center',
          alignItems : "center"
     }
})