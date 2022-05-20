import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ResponsiveAppBar from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import CreateBook from './pages/CreateBook';
import EditBook from './pages/EditBook';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignUpConfirmation from './pages/SignUpConfirmation';
import { AuthProvider } from './providers/AuthProvider';
import { BookProvider } from './providers/BookProvider';
function App() {
  return (
    <Router>
      <AuthProvider>
        <BookProvider>
          <div className="App">
            <ResponsiveAppBar />
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/signup-confirmation/:code/:id"
                element={<SignUpConfirmation />}
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/create-book"
                element={
                  <ProtectedRoute>
                    <CreateBook />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/edit-book/:id"
                element={
                  <ProtectedRoute>
                    <EditBook />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </BookProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
