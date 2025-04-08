import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { Login } from './pages/Login.jsx';
import {Carros} from './pages/Carros.jsx';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/carros"
          element={
            <ProtectedRoute>
              <Carros />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
