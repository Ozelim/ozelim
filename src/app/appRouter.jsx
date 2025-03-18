import { createBrowserRouter } from "react-router-dom";
import { 
  CharityFund, 
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
  Services,
  Tester,
  Fund,
  HealthWorld,
  Tours,
  Dual,
  Rights,
  Home,
  Tourist,
  AgentsProfile,
  Market,
  MarketCart,
  MarketProfile,
  ProductPage,
  Favorites,
  Weare,
  Club,
} from "pages";
import { baseLayout } from "./layouts/baseLayout";
import { ProfileCourse } from "pages/profile/ProfileCourse";
import { profileLayout } from "./layouts/profileLayout";
import { marketLayout } from "./layouts/marketLayout";
import { Catalog } from "pages/market/catalog/catalog";
import { MarketLogin } from "pages/market/login/market-login";

const appRouter = createBrowserRouter([
  {element: baseLayout, children: [
    {path: '/', element: <Home/>},
    {path: '/insurance', element: <CharityFund/>},
    {path: '/profile', element: <Profile/>},
    {path: '/profile-courses', element: <ProfileCourse/>},
    {path: '/our-team', element: <OurTeam/>},
    {path: '/news', element: <News/>},
    {path: '/partners', element: <Partners/>},
    {path: '/price', element: <Price/>},
    {path: '/program', element: <Program/>},
    {path: '/resort/:id', element: <Resort/>},
    {path: '/resorts', element: <Resorts/>},
    {path: '/login', element: <Login/>},
    {path: '*', element: <NotFound/>},
    {path: '/services', element: <Services/>},
    {path: '/fund', element: <Fund/>},
    {path: '/health-world', element: <HealthWorld/>},
    {path: '/tours', element: <Tours/>},
    {path: '/dual', element: <Dual/>},
    {path: '/rights', element: <Rights/>},
    {path: '/tourist', element: <Tourist/>},
    // {path: '/home', element: <Home/>},
    {path: '/test-ozelim-2025', element: <Tester/>},
  ]},

  {element: marketLayout, path: '/duken', children: [
    {index: true, element: <Market/>},
    {path: 'profile', element: <MarketProfile/>},
    {path: 'cart', element: <MarketCart/>},
    {path: 'favorites', element: <Favorites/>},
    {path: 'weare', element: <Weare/>},
    {path: 'catalog', element: <Catalog/>},
    {path: 'join-club', element: <Club/>},
    {path: 'product/:id', element: <ProductPage/>},
    {path: '*', element: <NotFound/>},
    {path: 'login', element: <MarketLogin/>},
  ]},

  {element: profileLayout, children: [
    {path: 'aprofile', element: <AgentsProfile/>},
  ]}
])

export { appRouter }