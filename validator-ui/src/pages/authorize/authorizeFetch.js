export async function AuthorizeFetch(email) {
    const login_url = process.env.REACT_APP_LOGIN_URL;


  return fetch(login_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data.access);
      return data.access
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}