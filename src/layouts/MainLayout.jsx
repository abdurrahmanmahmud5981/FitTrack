import { Outlet } from "react-router-dom";
import { StickyNavbar } from "../components/shared/StickyNavbar";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (
    <div className=" bg-gradient-to-b from-gray-900 to-gray-800">
      <header className="w-11/12 rounded-xl border border-gray-700 sticky top-1.5 backdrop-blur-xl  backdrop-filter z-[2900]  px-4 py-1  text-white max-w-[1580px] mx-auto bg-orange-50/10">
        <nav className="  px-2 mx-4">
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
