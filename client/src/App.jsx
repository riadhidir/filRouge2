import { useState } from "react";


import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Singup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RequireAuth from "./components/RequireAuth";
import roles from "./config/roles.js";
import Dashboard from "./layouts/Dashboard";
import Statistics from "./components/Super_Admin/Statistics";
import University_Dash from "./components/Super_Admin/University_Dash";
import PersistentLogin from "./components/PersistentLogin";
import UniProfile from "./components/Super_Admin/UniProfile";
import Fields from "./components/University/Fields";
import Branches from "./components/University/Branches";
import Specialties from "./components/University/Specialties";

// import Tabs from "./components/University/Tabs";
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
                        <Route path="" element={<Statistics />} /> {/** add data redirection based on role */}
                        <Route  path="universities" element={ <University_Dash />}/>
                        <Route path="universities/:universityId" element={<UniProfile/>} />

                        <Route path="fields" element={<Fields/>}/>
                        <Route path="branches" element={<Branches/>}/>
                        <Route path="specialties" element={<Specialties/>}/>
                     
                    </Route>

                    <Route path="/dd" element={<Home />} />
                </Route>
            </Route>
            <Route path="/unauthorized" element={<h1>not authorized</h1>} />
        </Routes>
    );
}

export default App;
