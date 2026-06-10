import './Auth.css';
import AppBar from './components/AppBar';
import Home from './components/Home';
import Login from './components/Login';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const {user} = useAuth();
  return(
    <div>
      <AppBar/>
      {user? <Home /> : <Login />}
    </div>
  );
}

export default function App(){
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

