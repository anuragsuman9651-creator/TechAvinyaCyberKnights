import {HashRouter,Routes,Route,Navigate} from 'react-router-dom';
import {me,useData} from './store';
import Home from './pages/Home.jsx';import Auth from './pages/Auth.jsx';import Buyer from './pages/Buyer.jsx';import Seller from './pages/Seller.jsx';
// Route protection: wrong role or logged-out users are redirected (not just hidden buttons).
const Guard=({role,children})=>{useData();const u=me();return !u?<Navigate to={`/auth?role=${role}`} replace/>:u.role!==role?<Navigate to={`/${u.role}`} replace/>:children};
export default function App(){return <HashRouter><Routes>
 <Route path="/" element={<Home/>}/><Route path="/auth" element={<Auth/>}/>
 <Route path="/buyer/*" element={<Guard role="buyer"><Buyer/></Guard>}/>
 <Route path="/seller/*" element={<Guard role="seller"><Seller/></Guard>}/>
 <Route path="*" element={<Navigate to="/"/>}/></Routes></HashRouter>}
