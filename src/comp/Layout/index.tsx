import Header from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="p-5 pb-20 md:p-10 md:pb-0 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
