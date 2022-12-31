import React, { useState, useEffect, createContext, FC } from 'react';
import { auth } from "./../firebase/firebase"


type AuthProvider = {
    currentUser: string
    setCurrentUser: React.Dispatch<React.SetStateAction<string>>
    isSighIn: () => boolean
}

const AuthContext = createContext<AuthProvider>({} as AuthProvider);


//こうすれば全ての子要素に対してcontextを渡せる
const AuthProvider: FC<{ children: any }> = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState("");

    //TODO ロジックは現在テスト用
    function isSighIn() {
        return currentUser === "logout" ? false : true
    }

    //ログイン状態ならログインする。そうでないならば、ログアウト状態にする
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            console.log("excute observer");
            if (user) {
                setCurrentUser(user.uid);
            } else {
                setCurrentUser("logout");
            }
        });
    }, []);

    console.log(currentUser);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, isSighIn }}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext, AuthProvider }