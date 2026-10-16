
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import App from './App.jsx'
import AuthContext from './context/AuthContext.jsx'
import UserContext from './context/UserContext.jsx'
import ListingContext from './context/ListingContext.jsx'
import BookinContext from './context/BookinContext.jsx'


createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <AuthContext>
  <ListingContext>
  <UserContext>
    <BookinContext>
    <App /> 
    </BookinContext>
    </UserContext>
    </ListingContext>
  </AuthContext>
 </BrowserRouter>
  
)
