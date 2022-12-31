import MainMenu from "./pages/MainMenu"
import SightseeingData from "./pages/SightseeingData"
import { AuthProvider } from "./state/LoginProvider";
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'

const main = () => {
    return (
        <AuthProvider>
            < BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<MainMenu />} />
                    <Route exact path='/SightseeingData/*' element={<SightseeingData />} />
                    <Route exact path='*' element={<MainMenu />} />
                </Routes>
            </BrowserRouter >
        </AuthProvider>
    );
}



export default main;