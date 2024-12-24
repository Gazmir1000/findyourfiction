import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import Home from "./pages/home/home";
import Navbar from "./components/navbar/Navbar";


function MainLayout() {
    return (
        <>
            <Navbar />
            <main style={{paddingTop:"64px"}}>
                <Outlet/>
            </main>
        </>
    );
}


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;