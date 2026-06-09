import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../Pages/Home"
import About from '../Pages/About'
import Help from '../Pages/Help'
import GetEarlyAccess from '../Button/GetEarlyAccess'
import Navbar from "../Component/Navbar"

// Dashboard Layout & Pages
import DashboardLayout from "../WebPages/DashboardLayout"
import Explore from "../WebPages/Explore"
import Nearby from "../WebPages/Nearby"
import Chat from "../WebPages/Chat"
import Notification from "../WebPages/Notification"
import TalkNow from "../WebPages/TalkNow"
import Profile from "../WebPages/Profile"

function AppRoutes() {
  return (
    <BrowserRouter>
    {/* Navbar */}
      <Navbar/>

      <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/help" element={<Help/>}/>
          <Route path="/getearlyaccess" element={<GetEarlyAccess/>}/>
          <Route path="/GetEarlyAccess" element={<GetEarlyAccess/>}/>

          {/* Dashboard nested routing */}
          <Route element={<DashboardLayout />}>
            <Route path="/explore" element={<Explore />} />
            <Route path="/nearby" element={<Nearby />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/talknow" element={<TalkNow />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

      </Routes>
      
    </BrowserRouter>
  )
}

export default AppRoutes