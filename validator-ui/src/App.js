import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Logout from "./pages/logout";
import Oauth from "./pages/oauth";
import AppLayout from "./layouts/appLayout";
import ExternalRedirect from "./pages/externalRedirect";

function App() {
  const login_url = process.env.REACT_APP_LOGIN_URL;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        <Route path="/oauth/*" element={<Oauth />} />
        <Route path="/login" element={<ExternalRedirect to={login_url} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
