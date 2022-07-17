import { Route, Routes } from 'react-router-dom';
import NoteApp from '@/pages/NoteApp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NoteApp />} />
    </Routes>
  );
}

export default App;
