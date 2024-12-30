import { redirect } from 'react-router-dom';
import { isDefinedAndNotNull } from './std-lib';

export function setAuthData(data) {
  localStorage.setItem('authToken', data.authToken);
  localStorage.setItem('authUser', JSON.stringify(data.user));
}

export function getAuthToken() {
  return localStorage.getItem('authToken');
}

export function clearAuthData() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
}

export function getAuthUser() {
  return JSON.parse(localStorage.getItem('authUser'));
}

export function isAuthenticated() {
  const token = getAuthToken();
  return isDefinedAndNotNull(token) ? true : false;
}

/**
 * Protected route loader that checks auth status
 * Redirects to login if not authenticated
 */
export function protectedRouteLoader(args) {
  if (!isAuthenticated()) {
    return redirect('/sign-in');
  }
  return null;
}

export function unprotectedRouteLoader(args) {
  if (isAuthenticated()) {
    return redirect('/dashboard');
  }
  return null;
}
