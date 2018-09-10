import React from 'react';
import { HashRouter, BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import Routes from './Routes';
import { AuthProvider } from '../components/auth/AuthContext'

export default props => (
    <AuthProvider>
        <BrowserRouter>
            <Routes/>    
        </BrowserRouter>
    </AuthProvider>
);
