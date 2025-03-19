import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import BookDetails from './components/BookDetails';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import Signup from './components/AdminSignup';
import UserSignup from './components/userSignup';
import UserLogin from './components/userlogin';
import AdminDashboard from './components/AdminDashboard';
import ForgotPassword from './components/forgotpass';
import AdminProfilePage from './components/Adminprofile';
import BookCatalog from './components/BookCatalog';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null); 
  const [admin, setAdmin] = useState(null); // State to store admin information

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Retrieve user or admin from localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('userId');
    const savedAdmin = localStorage.getItem('adminId');
    if (savedUser) {
      setUser(savedUser);
    }
    if (savedAdmin) {
      setAdmin(savedAdmin);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // ProtectedRoute Component to handle authentication
  const ProtectedRoute = ({ element }) => {
    return user || admin ? element : <Navigate to="/userlogin" />; // Redirect to login if not authenticated
  };

  // HomepageRedirect Component for redirection
  const HomepageRedirect = () => {
    if (user) {
      return <Navigate to={`/${user}/home`} />;
    } else if (admin) {
      return <Navigate to={`/${admin}/admin-home`} />; // Redirect to admin homepage if logged in as admin
    } else {
      return <Homepage />;
    }
  };

  // Handle login for user and admin separately
  const handleUserLogin = (userId) => {
    setUser(userId);
    localStorage.setItem('userId', userId);
  };

  const handleAdminLogin = (adminId) => {
    setAdmin(adminId);
    localStorage.setItem('adminId', adminId);
  };

  const handleLogout = () => {
    setUser(null);
    setAdmin(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('adminId');
  };

  return (
    <Router>
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        handleLogout={handleLogout} // Pass handleLogout function to Navbar
      />
      <Routes>
        {/* Redirect to homepage based on login status */}
        <Route path="/" element={<HomepageRedirect />} />

        {/* Book Details Page (Protected) */}
        <Route
          path="/book/:id"
          element={
            user || admin ? <BookDetails /> : <Navigate to="/userlogin" replace />
          }
        />

        {/* Login and Signup Routes */}
        <Route path="/login" element={<LoginPage setAdmin={handleAdminLogin} setUser={handleUserLogin} />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/BookCatalog" element={<BookCatalog />} />
        <Route path="/admin-signup" element={<Signup />} />
        <Route path="/userlogin" element={<UserLogin setUser={handleUserLogin} />} />
        <Route path="/usersignup" element={<UserSignup />} />
        
        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Dynamic Routes for User and Admin Home Page */}
        <Route path="/:userId/home" element={<Homepage />} />
        <Route path="/:adminId/home" element={<Homepage />} /> {/* Admin Home page */}

        {/* Forgot Password Route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin Profile Page */}
        <Route path="/admin-profile" element={<AdminProfilePage />} />

        {/* Redirect if no match */}
       
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
