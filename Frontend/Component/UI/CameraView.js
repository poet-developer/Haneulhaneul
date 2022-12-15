import { useEffect, useState, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, SafeAreaView, Image, Pressable } from 'react-native';
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

const CameraView = ({setDisplay, setMode}) => {
     const [cameraOk, setCameraOk] = useState();
     const [libraryOk, setLibraryOk] = useState();
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
          const { status : libraryState } = await MediaLibrary.requestPermissionsAsync();
          setCameraOk(cameraState === 'granted');
          setLibraryOk(libraryState === 'granted')
          if(!cameraState) Toastify('사진 접속 권한이 필요해요.','red');
          if(!libraryState) Toastify('앨범 접속 권한이 필요해요.','red');
        }
      
        const takePic = async () => {
          let options = {
            quality : 1,
            base64 : true,
            exif: false
          };
           let newPhoto = await cameraRef.current.takePictureAsync(options)
           setPhoto(newPhoto);
        }

        const Exit = () => {
          setDisplay(true)
          setMode("home")
        }
      
        if(photo){
          let sharePic = () => {
            shareAsync(photo.uri).then(()=>{
              setPhoto(undefined)
            });
          }
      
          let savePhoto = async () => {
            let uri = photo.base64;
            try {
              await axios.post(SERVER+`/images/create_process`, {uri, author: me.nick})
                .then (Toastify('저장했어요!','teal'))
                .catch(console.log)
                .then(setPhoto(undefined))
              }catch (err) {
              throw new Error(err);
            }
        }; //Create

    
          return (
            <SafeAreaView style={styles.container}>
              <Image style ={styles.preview} source={{url: `data:image/jpg;base64,${photo.base64}`}}/>
              <TouchableOpacity style={{
                alignItems: 'flex-end',
                marginTop: 80,
                marginRight: 30,
              }} onPress={sharePic}>
              <Ionicons name="share-social" size={24} color="snow" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.carmeraBtn} onPress={savePhoto}>
              <Fontisto name="save" size={40} color="snow" style ={{paddingLeft: 5, top: 5}} />
              </TouchableOpacity> 
              <TouchableOpacity style={styles.btn} onPress={()=>{
                setPhoto(undefined); ///SAVE
              }} color = {'snow'}>
              <Fontisto name="close-a" size={20} color="snow"/></TouchableOpacity>
            </SafeAreaView>
          )
        }
     
     return(
         <>
        {me?
          <Camera
            style={{flex: 1,width:"100%"}}
            ref ={cameraRef}
          >
            <View style={styles.container}>
            <Pressable style={styles.btn} onPress={Exit} color = {'snow'}>
          <Fontisto name="close-a" size={20} color="snow"/></Pressable>
            </View>
            <TouchableOpacity style={styles.carmeraBtn} onPress={takePic}>
            <Ionicons name="md-camera" size={50} color="gold" />
            </TouchableOpacity>
          </Camera>
            
          :<View style={styles.modal} ><Text style={styles.text}>{`카메라를 사용하시려면${'\n'}로그인이 필요해요!`}</Text></View>
        }
          </>
     )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems : 'flex-end',
    // justifyContent : 'fle',
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