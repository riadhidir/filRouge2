import { useState } from "react";


import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Singup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RequireAuth from "./components/RequireAuth";
import roles from "./config/roles.js";
import Dashboard from "./layouts/Dashboard";
import Statistics from "./components/University/Statistics";
import University_Dash from "./components/University/University_Dash";
import PersistentLogin from "./components/PersistentLogin";
import UniProfile from "./components/University/UniProfile";
const { SUPER_ADMIN, ADMIN, TEACHER, LIBRARIAN, STUDENT } = roles;
function App() {
    const [count, setCount] = useState(0);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<PersistentLogin />}>
                <Route
                    element={
                        <RequireAuth allowedRoles={[ADMIN, SUPER_ADMIN]} />
                    }
                >
                    <Route path="/" element={<Dashboard />}>
                        <Route path="" element={<Statistics />} />
                        <Route
                            path="universities"
                            element={
                                <University_Dash />
                                //  element={< h1>universities</h1>
                            }
                        />

                            <Route path="universities/:universityId" element={<UniProfile/>}></Route>

                     
                    </Route>

                    <Route path="/dd" element={<Home />} />
                </Route>
            </Route>
            <Route path="/unauthorized" element={<h1>not authorized</h1>} />
        </Routes>
    );
}

export default App;
