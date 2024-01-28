export async function IsAuthorized(token) {
  const url = process.env.REACT_APP_AUTHORIZE_URL;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ token: token }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch(() => {
      return false;
    });
}
