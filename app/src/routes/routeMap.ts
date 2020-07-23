import HomePage from 'pages/HomePage'
import RestaurantPage from 'pages/RestaurantPage'
import MemberPage from 'pages/MemberPage'
import LoginPage from 'pages/LoginPage'

interface RouteConfig {
  path: string
  name: string
  PageComponent: React.FunctionComponent
  isFlexLayout: boolean
  isPrivate: boolean
  isExact: boolean
}

const routeMap: Record<string, RouteConfig> = {
  root: {
    path: '/',
    name: 'Home',
    PageComponent: HomePage,
    isFlexLayout: false,
    isPrivate: false,
    isExact: true,
  },
  home: {
    path: '/home',
    name: 'Home',
    PageComponent: HomePage,
    isFlexLayout: false,
    isPrivate: false,
    isExact: false,
  },
  member: {
    path: '/member',
    name: 'Memeber',
    PageComponent: MemberPage,
    isFlexLayout: false,
    isPrivate: true,
    isExact: false,
  },
  restaurant: {
    path: '/restaurant',
    name: 'Restaurant',
    PageComponent: RestaurantPage,
    isPrivate: false,
    isFlexLayout: false,
    isExact: false,
  },
  login: {
    path: '/login',
    name: 'Login',
    PageComponent: LoginPage,
    isFlexLayout: true,
    isPrivate: false,
    isExact: false,
  },
}

export default routeMap
