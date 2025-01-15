import { Outlet } from "react-router-dom";
import { StickyNavbar } from "../components/shared/Navber";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (
    <div className="">
      <header>
        <nav>
            <StickyNavbar/>
        </nav>
      </header>
      <main className="min-h-[calc(100vh-478px)] mt-20">
        {/* Page Content */}
        <Outlet/>
      </main>
      <footer>
        {/* Footer */}
        <Footer/>
      </footer>
    </div>
  );
};

export default MainLayout;
