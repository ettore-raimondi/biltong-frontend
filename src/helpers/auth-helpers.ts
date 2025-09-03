const ACCESS_TOKEN_KEY = "access_token";

export function getAuthToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function clearAuthToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function setAuthToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}
