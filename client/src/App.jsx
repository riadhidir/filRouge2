import { useState } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./pages/Singup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import Home from "./layouts/Home";
import RequireAuth from "./components/RequireAuth";
import roles from "./config/roles.js";
import Dashboard from "./layouts/Dashboard";
import Statistics from "./components/Super_Admin/Statistics";
import UniversityStats from './components/University/Statistics';
import University_Dash from "./components/Super_Admin/University_Dash";
import PersistentLogin from "./components/PersistentLogin";
import UniProfile from "./components/Super_Admin/UniProfile";
import Configuration from "./components/University/Configuration";
import Librarians from "./components/University/Librarians";
import Teachers from "./components/University/Teachers";
import UserProfile from "./components/University/UserProfile";
import Teacher from "./components/User/teacher/Teacher";
import Librarian from "./components/User/librarian/Librarian";
import useAuth from "./hooks/useAuth";
import Library from "./layouts/Library";

import Redirector from "./components/Redirector";
import Notauthorized from "./pages/Notauthorized";
// import Tabs from "./components/University/Tabs";
const { SUPER_ADMIN, ADMIN, TEACHER, LIBRARIAN, STUDENT } = roles;
function App() {
    const { auth } = useAuth();
    const navigate = useNavigate();
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/library" element={<Library />} />

            <Route path="/redirector" element={<Redirector />} />
            <Route element={<PersistentLogin />}>

                <Route element={<RequireAuth allowedRoles={[SUPER_ADMIN]}/>}>
                    <Route path="/" element={<Dashboard />}>
                        <Route path="" element={<Statistics />} />
                        <Route path="universities" element={<University_Dash />}/>
                        <Route path="universities/:universityId" element={<UniProfile />}/>
                        {/* <Route
                            path="configuration"
                            element={<Configuration />}
                        /> */}
                        {/* <Route path="teachers" element={<Teachers />} /> */}
                        <Route path="users/:userId" element={<UserProfile />} />
                        {/* <Route path="librarians" element={<Librarians />} /> */}
                        {/* <Route path="teacher" element={<Teacher />} />
                        <Route path="librarian" element={<Librarian />} /> */}
                    </Route>
                </Route>

                <Route element={<RequireAuth allowedRoles={[ADMIN]}/>}>
                    <Route path="/" element={<Dashboard />}>
                        <Route path="statistics" element={<UniversityStats />} />
                        <Route path="configuration" element={<Configuration />}/>
                        <Route path="librarians" element={<Librarians />} />
                        <Route path="teachers" element={<Teachers />} />
                    </Route>
                </Route>

                <Route element={<RequireAuth allowedRoles={[TEACHER, LIBRARIAN]} />}>
                    <Route path="/" element={<Dashboard />}>
                        <Route path="teacher" element={<Teacher />} />
                        <Route path="librarian" element={<Librarian />} />
                    </Route>
                </Route>
            </Route>

            <Route path="/unauthorized" element={<Notauthorized/>} />
        </Routes>
    );
}

export default App;
