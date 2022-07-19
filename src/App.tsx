import { Route, Routes } from 'react-router-dom';
import NoteApp from '@/pages/NoteApp';
import Login from '@/pages/Login';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase.config';
import AuthRoute from '@/components/AuthRoute';

initializeApp(firebaseConfig);

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRoute>
            <NoteApp />
          </AuthRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
