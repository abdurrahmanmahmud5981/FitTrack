import { Outlet } from "react-router-dom";
import { StickyNavbar } from "../components/shared/StickyNavbar";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (
    <div className="bg-[#01010f]">
      <header className="sticky top-3 backdrop-blur-3xl  backdrop-filter z-[2900]  px-4 py-2  lg:py-4  text-white max-w-[1580px] mx-auto bg-orange-50/10">
        <nav className=" w-11/12 mx-auto">
          <StickyNavbar />
        </nav>
      </header>
      <main className="min-h-[calc(100vh-418px)] max-w-[1580px] mt-5 w-11/12 mx-auto">
        {/* Page Content */}
        <Outlet />
      </main>
      <footer>
        {/* Footer */}
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
