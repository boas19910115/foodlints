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
  isFlexColumn?: boolean
}

const routeMap: Record<string, RouteConfig> = {
  root: {
    path: '/',
    name: 'Home',
    PageComponent: HomePage,
    isFlexLayout: true,
    isFlexColumn: true,
    isPrivate: false,
    isExact: true,
  },
  member: {
    path: '/member',
    name: 'Memeber',
    PageComponent: MemberPage,
    isFlexLayout: true,
    isFlexColumn: true,
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
