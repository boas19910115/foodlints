import HomePage from 'pages/HomePage'
import RestaurantPage from 'pages/RestaurantPage'
import MemberPage from 'pages/MemberPage'
import LoginPage from 'pages/LoginPage'

interface RouteConfig {
  path: string
  name: string
  PageComponent: React.FunctionComponent
}

const routeMap: Record<string, RouteConfig> = {
  root: {
    path: '/',
    name: 'Home',
    PageComponent: HomePage,
  },
  home: {
    path: '/home',
    name: 'Home',
    PageComponent: HomePage,
  },
  member: {
    path: '/member',
    name: 'Memeber',
    PageComponent: MemberPage,
  },
  restaurant: {
    path: '/restaurant',
    name: 'Restaurant',
    PageComponent: RestaurantPage,
  },
  login: {
    path: '/login',
    name: 'Login',
    PageComponent: LoginPage,
  },
}

export default routeMap
