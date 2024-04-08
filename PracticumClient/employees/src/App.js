
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import EmployeeList from './employee/GetAllEmployees';
import EmployeeForm from './employee/AddOrEdit';
import Login from './user/SignIn';
import axios from 'axios';



function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    }, [token])

    return (
        <BrowserRouter>
            <Routes>
                {token && <Route path="/" element={<EmployeeList />} />}
                {!token && <Route path="/" element={<Login setToken={setToken} />} />}
                {token && <Route path="/employee/list" element={<EmployeeList />} />}
                {token && <Route path="/employee/form" element={<EmployeeForm />} />}
            </Routes>
        </BrowserRouter>
    );
}
export default App;


