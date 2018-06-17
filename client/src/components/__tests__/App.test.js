import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { BrowserRouter, Route, MemoryRouter } from 'react-router-dom';
import Header from '../Header';
import Profile from '../Profile';
import PoolDetail from '../PoolDetail';
import AllPools from '../AllPools';
import Create from '../Create';
import Logout from '../Logout';
import SignIn from '../SignIn';
import Signup from '../signup/Signup';
import Landing from '../Landing';
import OAuthSignUp from '../OAuthSignUp';
import OAuthSignIn from '../OAuthSignIn';
import Help from '../Help';
import Settings from '../Settings';
import Footer from '../Footer';
import Dashboard from '../Dashboard';
import Root from '../../Root';

let wrapped;
beforeEach(() => {
  wrapped = mount(
    <Root>
      <App />
    </Root>
  );
});

it('shows 13 Routes', () => {
  expect(wrapped.find(Route).length).toEqual(13);
});

it('shows a Header', () => {
  expect(wrapped.find(Header).length).toEqual(1);
});

it('shows a Footer', () => {
  expect(wrapped.find(Footer).length).toEqual(1);
});

it('shows a BrowserRouter', () => {
  expect(wrapped.find(BrowserRouter).length).toEqual(1);
});

it('renders correct routes', () => {
  const pathMap = wrapped.find(Route).reduce((pathObj, route) => {
    const routeProps = route.props();
    pathObj[routeProps.path] = routeProps.component;
    return pathObj;
  }, {});
  expect(pathMap['/dashboard']).toBe(Dashboard);
  expect(pathMap['/profile/:id']).toBe(Profile);
  expect(pathMap['/pools/:id']).toBe(PoolDetail);
  expect(pathMap['/pools']).toBe(AllPools);
  expect(pathMap['/create']).toBe(Create);
  expect(pathMap['/logout']).toBe(Logout);
  expect(pathMap['/signin']).toBe(SignIn);
  expect(pathMap['/signup']).toBe(Signup);
  expect(pathMap['/oauthsignup']).toBe(OAuthSignUp);
  expect(pathMap['/oauthsignin']).toBe(OAuthSignIn);
  expect(pathMap['/help']).toBe(Help);
  expect(pathMap['/settings']).toBe(Settings);
  expect(pathMap['/']).toBe(Landing);
});
