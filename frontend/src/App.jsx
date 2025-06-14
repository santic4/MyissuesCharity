import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DonatePage from './pages/DonatePage';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import DonationManagement from './pages/DonationManagement';
import InteractionManagement from './pages/InteractionManagement';
import './App.css';
import ProtectedRoute from './utils/ProtectedRoute';
import UserHome from './components/user/UserHome';
import Thanks from './pages/Thanks';
import CampaignManager from './components/campaigns/CreateCampaign';
import Chatbot from './components/chatbot/Chatbot';
import ScheduleSeniorCallForm from './components/seniorInteraction/SeniorInteractionForm';
import AboutUs from './pages/AboutUs';
import LoginFormAdmin from './pages/LoginFormAdmin';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header>
          <Navbar />
        </header>
  
        <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<ProtectedRoute><UserHome/></ProtectedRoute>} />
          <Route path="/donate/:id" element={<ProtectedRoute><DonatePage/></ProtectedRoute>} />
          <Route path="/thanks" element={<ProtectedRoute><Thanks/></ProtectedRoute>} />
          <Route path="/how-to-donate" element={<ProtectedRoute><Chatbot/></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><ScheduleSeniorCallForm/></ProtectedRoute>}></Route>
          <Route path="/about-us" element={<ProtectedRoute><AboutUs/></ProtectedRoute>} /> 
          <Route path="/login-admin" element={ <LoginFormAdmin/> }/>

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
              <Route index element={<Navigate to="users" replace />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="create-campaign" element={<CampaignManager />} />
              <Route path="donations" element={<DonationManagement />} />
              <Route path="interactions" element={<InteractionManagement />} />

            <Route path="*" element={<p>Section not found</p>} />
          </Route>

          <Route path="*" element={<HomePage />} />
        </Routes>
        </main>
        <Chatbot/>

        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}