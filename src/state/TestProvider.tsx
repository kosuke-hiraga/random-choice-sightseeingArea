import React, { useState, useEffect, createContext, FC, useContext } from 'react';


type TestProvider = {
    // currentUser: string
    // // setCurrentUser: (str: string) => void
    // setCurrentUser: React.Dispatch<React.SetStateAction<string>>
    // isSighIn: () => boolean
    checkTest: () => string
}

const TestContext = createContext<TestProvider>({} as TestProvider);


//こうすれば全ての子要素に対してcontextを渡せる
const TestProvider: FC<{ children: any }> = ({ children }: any) => {
    // const [currentUser, setCurrentUser] = useState("");

    function checkTest() {
        return "test";
    }

    return (
        // <TestContext.Provider value={{ currentUser, setCurrentUser, isSighIn }}>
        <TestContext.Provider value={{ checkTest }}>
            {children}
        </TestContext.Provider>
    )
}


export { TestContext, TestProvider }