import React, {createContext, useState} from "react"
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER} from '@env';
//Context 로 전역변수 관리.
export const CheckAuth = createContext();

const settingStorage = async(me) => {
     await AsyncStorage.setItem("sessionId",me.sessionId)
}

const GetStorage = async(me, setMe) => {
     const sessionId = await AsyncStorage.getItem("sessionId")
     if(me){
          settingStorage(me)
     }else if(sessionId){ 
          axios.patch(`${SERVER}/users/me`, {}, {
               headers: {sessionid : sessionId}})
               .then(res => {
                    setMe({
                         name: res.data.name,
                         id : res.data.id,
                         sessionId: res.data.sessionId,
                         nick : res.data.nick
                    })
                    // 로그인이 되어있으면 계속해서 setMe에 user 정보를 세팅 -> 로그인 유지
               }).catch(async(err)=>{
                    console.log(err)
                    await AsyncStorage.removeItem("sessionId")
                    // 로그인 정보에 오류가 있을때, AsyncStorage 정보를 제거해 보안을 유지한다.
               })
     }
}

export const AuthProvider = ({children}) => {
     const [me, setMe] = useState() 
     GetStorage(me, setMe); // 로그인상태 
     return (
     <CheckAuth.Provider value={[me, setMe]}>
          {children}
     </CheckAuth.Provider> 
     )
     // value 값이 자식 컴포넌트에 전부 공유된다.
     // provider를 리턴해줘야한다.
}
