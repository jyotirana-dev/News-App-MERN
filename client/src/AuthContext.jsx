import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

const [isLogin, setIsLogin] = useState(
  localStorage.getItem("isLogin") === "true"
);

const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user")) || null
);


return (
<AuthContext.Provider
value={{
isLogin,
setIsLogin,
user,
setUser
}}
>

{children}

</AuthContext.Provider>
)

}

export default AuthProvider;