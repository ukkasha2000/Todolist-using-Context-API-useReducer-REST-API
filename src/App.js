import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Todo from './components/Todolist/Todo';
import { TodoTaskContextProvider } from './Context/TodoTaskContextProvider';

function App() {
  return (
    <TodoTaskContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </TodoTaskContextProvider>
  );
}

export default App;
