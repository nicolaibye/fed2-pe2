import Header from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

function Layout() {
  return (
    <>
      <Header />
      <main className="p-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
