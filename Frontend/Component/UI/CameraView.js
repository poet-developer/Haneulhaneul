import { useEffect, useState, useRef, useContext } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, SafeAreaView, Image, Pressable } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'
import { shareAsync } from 'expo-sharing';
import axios from 'axios';
import {SERVER} from '@env';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { CheckAuth } from '../lib/CheckAuth';
import Toastify from '../lib/Toastify';

const {width : SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

/**
 * 참고 : https://youtu.be/4WPjWK0MYMI 
 * 카메라 사용 여부를 묻는 기능
 * RestAPI : 서버에 데이터 보냄. 이미지는 base64 uri포맷으로 전송
 */
const CameraView = ({setDisplay, setMode, weather}) => {
     const [photo, setPhoto] = useState();
     const [me, setMe] = useContext(CheckAuth)

     let cameraRef = useRef();
     
     useEffect(()=>{
      GetCamera();
      setDisplay(false)
      Toastify(`지금 256명이 같은 하늘을 보고 있어요:)`,'teal');
    // 접속자 수, user.length
     },[])

     const GetCamera = async() =>{
          const { status : cameraState } = await Camera.requestCameraPermissionsAsync();
          // expo 카메라 접근 허가 여부 묻기
          const { status : libraryState } = await MediaLibrary.requestPermissionsAsync();
          // expo 라이브러리 접근 허가 여부 묻기
          if(!cameraState) { Toastify('사진 접속 권한이 필요해요.','red'); setMode('home')} // 접근 거부
          if(!libraryState) { Toastify('앨범 접속 권한이 필요해요.','red'); setMode('home')};
          // 접근 거부
        }
      
        const takePic = async () => {
          let options = {
            quality : 1,
            base64 : true,
            exif: false
          }; //이미지 정보에대한 옵션
           let newPhoto = await cameraRef.current.takePictureAsync(options)
           setPhoto(newPhoto);
        }

        const Exit = () => {
          setDisplay(true)
          setMode("home")
        }
      
        /**
         * 찍은 사진이 있는 경우 미리 보기를 위해 SafeAreaView를 먼저 return
         */
        if(photo){
          //TODO:
          // let sharePic = () => {
          //   shareAsync(photo.uri).then(()=>{
          //     setPhoto(undefined)
          //   });
          // } 
      
            let savePhoto = async () => {
            let uri = photo.base64;
              try {
                await axios.post(`${SERVER}/images/create_process`, {uri, author: me.nick, weather: weather}) // 이미지 정보와 찍은 user, 사진 찍은 날씨 정보 전송
                  .then (Toastify('저장했어요!','teal'))
                  .catch(console.log)
                  .then(setPhoto(undefined))
                }catch (err) {
                throw new Error(err);
              }
              }; //Create

    
          return (
            <SafeAreaView style={styles.container}>
              {/* 찍은 사진 미리보기 */}
              <Image style ={styles.preview} source={{url: `data:image/jpg;base64,${photo.base64}`}}/> 
              
              {/* TODO: 
                <TouchableOpacity style={{
                alignItems: 'flex-end',
                marginTop: 80,
                marginRight: 30,
              }} onPress={sharePic}>
              <Ionicons name="share-social" size={24} color="snow" />
              </TouchableOpacity> */}

              <TouchableOpacity style={styles.carmeraBtn} onPress={savePhoto}>
              <Fontisto name="save" size={40} color="snow" style ={{paddingLeft: 5, top: 5}} />
              </TouchableOpacity> 
              {/* 사진은 앱 내 앨범에 저장  */}
              <TouchableOpacity style={styles.btn} onPress={()=>{
                setPhoto(undefined); ///SAVE
              }} color = {'snow'}>
              <Fontisto name="close-a" size={20} color="snow"/></TouchableOpacity>
              {/* 사진 저장 취소 및 다시 활영으로 돌아간다.  */}
            </SafeAreaView>
          )
        }  /**
            * 찍은 사진이 있는 경우 미리 보기를 위해 SafeAreaView를 먼저 return
            */
     
     return(
       /**
        * 카메라 앵글이 실행될때 떠있는 화면
        */
         <>
          <Camera
            style={{flex: 1,width:"100%"}}
            ref ={cameraRef}
          >
            <View style={styles.container}>
            <Pressable style={styles.btn} onPress={Exit} color = {'snow'}>
              <Fontisto name="close-a" size={20} color="snow"/></Pressable>
            </View> 
            {/* 카메라 모드 닫기  */}
            <TouchableOpacity style={styles.carmeraBtn} onPress={takePic}>
            <Ionicons name="md-camera" size={50} color="gold" />
            </TouchableOpacity>
            {/* 사진 활영 버튼  */}
          </Camera>
          </>
     )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems : 'flex-end',
    width : SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },

  buttonContainer : {
    backgroundColor : 'black',
    alignSelf : 'flex-end'
  },

  preview : {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
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
    textAlign: 'center',
    lineHeight: 40,
  },

  carmeraBtn : {
    position:'absolute', right: 0, bottom: 0, zIndex: 5, backgroundColor:'teal',
      width: 55, height: 55, 
      borderRadius: 20,
      overflow: 'hidden', 
      paddingLeft: 3,
      margin: 10,
  },

  btn : {
    position: 'absolute',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 20
},
})

export default CameraView