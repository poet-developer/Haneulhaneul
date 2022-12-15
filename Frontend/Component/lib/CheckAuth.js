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
          axios.patch(SERVER+`/users/me`, {}, {
               headers: {sessionid : sessionId}})
               .then(res => {
                    setMe({
                         name: res.data.name,
                         id : res.data.id,
                         sessionId: res.data.sessionId,
                         nick : res.data.nick
                    })
               }).catch(async(err)=>{
                    await AsyncStorage.removeItem("sessionId")
                    throw new Error(err)
               })
     }
}

export const AuthProvider = ({children}) => {
     const [me, setMe] = useState() 
     GetStorage(me, setMe);
     return (
     <CheckAuth.Provider value={[me, setMe]}>
          {children}
     </CheckAuth.Provider> 
     )
     // value 값이 자식 컴포넌트에 전부 공유된다.
     // provider를 리턴해줘야한다.
}
