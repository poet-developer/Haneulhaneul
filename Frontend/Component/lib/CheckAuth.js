import React, {createContext, useState, useEffect} from "react"
import axios from "axios";
//Context 로 전역변수 관리.
export const CheckAuth = createContext();

export const AuthProvider = ({children}) => {
     const [me, setMe] = useState() 
     return (
     <CheckAuth.Provider value={[me, setMe]}>
          {children}
     </CheckAuth.Provider> 
     )
     // value 값이 자식 컴포넌트에 전부 공유된다.
     // provider를 리턴해줘야한다.
}
