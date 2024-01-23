export function accesCookie(cookieKey) {
  const cookies_dom = document.cookie.split(";");

  const cookies = cookies_dom.find((cookie) =>
    cookie.trim().startsWith(cookieKey + "=")
  );

  if (!cookies) {
    return null;
  }

  return cookies.split("=")[1];
}
