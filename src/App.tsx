import { Route, Routes } from "react-router-dom";
import Layout from "./comp/Layout";
import Home from "./pages/Home";
import Venues from "./pages/Venues";
import VenueFocus from "./pages/Venues/VenueFocus";
import Account from "./pages/Account";
import LoginReg from "./pages/LoginReg";
import Error from "./pages/Error";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="venue" element={<Venues />} />
          <Route path="venue/:id" element={<VenueFocus />} />
          <Route path="account" element={<Account />} />
          <Route path="login" element={<LoginReg />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
