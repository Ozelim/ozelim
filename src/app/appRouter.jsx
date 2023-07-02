
import { createBrowserRouter } from "react-router-dom";

import { About, Bids, CharityFund, Courses, Health, Home, News, OurTeam, Partners, Profile, Program, Resort, Resorts, Price, Signup, NotFound } from "pages";
import { baseLayout } from "./layouts/baseLayout";

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
    {path: '/signup/:id', element: <Signup/>},
    {path: '*', element: <NotFound/>},
  ]}
])


export { appRouter }