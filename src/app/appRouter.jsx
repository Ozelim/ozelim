import { createBrowserRouter } from "react-router-dom";
import { About, 
  Bids, 
  CharityFund, 
  Courses, 
  Health, 
  News,
  OurTeam, 
  Partners, 
  Profile, 
  Program, 
  Resort, 
  Resorts, 
  Price,
  NotFound,
  Login,
  Verification,
  Services,
  Tester,
  Fund,
  HealthWorld,
  Tours,
  Dual,
  Rights,
  Home,
  Tourist,
} from "pages";
import { baseLayout } from "./layouts/baseLayout";
import { Test } from "pages/test/Test";
import { ProfileCourse } from "pages/profile/ProfileCourse";

const appRouter = createBrowserRouter([
  {element: baseLayout, children: [
    {path: '/', element: <Home/>},
    {path: '/insurance', element: <CharityFund/>},
    {path: '/profile', element: <Profile/>},
    {path: '/profile-courses', element: <ProfileCourse/>},
    {path: '/bids', element: <Bids/>},
    {path: '/health', element: <Health/>},
    {path: '/our-team', element: <OurTeam/>},
    {path: '/news', element: <News/>},
    {path: '/partners', element: <Partners/>},
    {path: '/price', element: <Price/>},
    {path: '/program', element: <Program/>},
    {path: '/resort/:id', element: <Resort/>},
    {path: '/resorts', element: <Resorts/>},
    {path: '/courses', element: <Courses/>},
    {path: '/about', element: <About/>},
    {path: '/login', element: <Login/>},
    {path: '*', element: <NotFound/>},
    {path: '/test', element: <Test/>},
    {path: '/verification/:id', element: <Verification/>},
    {path: '/services', element: <Services/>},
    {path: '/fund', element: <Fund/>},
    {path: '/health-world', element: <HealthWorld/>},
    {path: '/tours', element: <Tours/>},
    {path: '/dual', element: <Dual/>},
    {path: '/rights', element: <Rights/>},
    {path: '/tourist', element: <Tourist/>},
    // {path: '/home', element: <Home/>},
    {path: '/test-1&7-results', element: <Tester/>},
    
    // {path: '/market', element: <Market/>},
  ]},


])

export { appRouter }