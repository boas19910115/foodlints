import HomePage from 'pages/HomePage'
import RestaurantPage from 'pages/RestaurantPage'
import MemberPage from 'pages/MemberPage'
import LoginPage from 'pages/LoginPage'

interface RouteConfig {
  path: string
  name: string
  PageComponent: React.FunctionComponent
  isFlexLayout: boolean
}

const routeMap: Record<string, RouteConfig> = {
  root: {
    path: '/',
    name: 'Home',
    PageComponent: HomePage,
    isFlexLayout: false,
  },
  home: {
    path: '/home',
    name: 'Home',
    PageComponent: HomePage,
    isFlexLayout: false,
  },
  member: {
    path: '/member',
    name: 'Memeber',
    PageComponent: MemberPage,
    isFlexLayout: false,
  },
  restaurant: {
    path: '/restaurant',
    name: 'Restaurant',
    PageComponent: RestaurantPage,
    isFlexLayout: false,
  },
  login: {
    path: '/login',
    name: 'Login',
    PageComponent: LoginPage,
    isFlexLayout: true,
  },
}

export default routeMap
