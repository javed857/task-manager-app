import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import TaskListPage from './pages/TaskListPage';
import CreateTaskPage from './pages/CreateTaskPage';
import ViewTaskPage from './pages/ViewTaskPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TaskListPage />} />
        <Route path='/create' element={<CreateTaskPage />} />
        <Route path="/create/:id" element={<CreateTaskPage />} />
        <Route path='/view' element={<ViewTaskPage />} />
        <Route path="/view/:id" element={<ViewTaskPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
