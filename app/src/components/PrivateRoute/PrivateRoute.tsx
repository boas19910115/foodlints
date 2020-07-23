import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import useAuthManager from 'hooks/useAuthManager'

interface PrivateRouteProps extends RouteProps {
  otherProp: string
}

export default function PrivateRoute(props: PrivateRouteProps) {
  const { isSignedIn } = useAuthManager()
  const { children, ...rest } = props
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isSignedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
