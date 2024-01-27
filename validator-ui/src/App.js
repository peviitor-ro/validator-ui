import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Logout from "./pages/logout";
import Authorize from "./pages/authorize/authorize";
import AppLayout from "./layouts/appLayout";
import Login from "./pages/login";
import Unautorized from "./pages/authorize/unautorized";
import Test from "./pages/test";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/test" element={<Test />} />
        </Route>
        <Route path="/unauthorized" element={<Unautorized />} />
        <Route path="/authorize/*" element={<Authorize />} />

        <Route
          path="/login"
          element={
            <GoogleReCaptchaProvider
              reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}
              scriptProps={{
                async: false,
                defer: false,
                appendTo: "head",
                nonce: undefined,
              }}
            >
              <Login />
            </GoogleReCaptchaProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
