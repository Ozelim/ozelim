import { createBrowserRouter } from "react-router-dom";
import { About, 
  Bids, 
  CharityFund, 
  Courses, 
  Health, 
  Home, 
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
  Tester
} from "pages";
import { baseLayout } from "./layouts/baseLayout";
import { Test } from "pages/test/Test";

const appRouter = createBrowserRouter([
  {element: baseLayout, children: [
    {path: '/', element: <Home/>},
    {path: '/charity-fund', element: <CharityFund/>},
    {path: '/profile', element: <Profile/>},
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
    {path: '/test-1&7-results-nonrefv3noOdl3_swePVrule34b1qle5-1KSh4m5ter7397ndjk', element: <Tester/>},
  ]}
])

export { appRouter }