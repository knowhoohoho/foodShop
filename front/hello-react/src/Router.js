import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Main from './pages/home';


export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}