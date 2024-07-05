import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Layout/Home';
import Navbar from './Components/Layout/Navbar';
import Signup from './Components/User/Signup';
import Login from './Components/User/Login';
import { Provider } from 'react-redux';
import store from './store/store';
import Tags from './Components/Pages/Tags';
import AskQuestion from './Components/Question/AskQuestion';
import DisplayAnswer from './Components/Answer/DisplayAnswer';
import UserProfile from './Components/User/UserProfile';
import Questions from './Components/Question/Questions';
import AllUser from './Components/User/AllUser';
import EditProfileForm from './Components/User/EditProfileForm';
import ForgetPassword from './Components/User/ForgetPassword'
import ResetPassword from './Components/User/ResetPassword';
import About from './Components/Layout/About';
import Contact from './Components/Layout/Contact';
function App() {
  return (
    <div>
      <Provider store={store}>
     <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user/signup' element={<Signup/>}/>
        <Route path='/user/About' element={<About/>}/>
        <Route path='/user/login' element={<Login/>}/>
        <Route path='/user/contact' element={<Contact/>}/>
        <Route path='/tags' element={<Tags/>}/>
        <Route path='/askque' element={<AskQuestion/>}/>
        <Route path='/answer/:questionId' element={<DisplayAnswer/>}/>
        <Route path='/user/:userId' element={<UserProfile/>}/>
        <Route path='/question' element={<Questions/>}/>
        <Route path='/user/alluser' element={<AllUser/>}/>
        <Route path='/user/editprofile/:user' element={<EditProfileForm/>}/>
        <Route path='/user/forgotpassword' element={<ForgetPassword/>}/>
        <Route path='/user/resetpassword/:token' element={<ResetPassword/>}/>
      
        </Routes>
        
     
     </Provider>
    </div>
  );
}

export default App;
