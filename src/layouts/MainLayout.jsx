import { Outlet } from "react-router-dom";
import { StickyNavbar } from "../components/shared/StickyNavbar";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (
    <div className="bg-[#01010f]">
      <header className="sticky top-3 backdrop-blur-3xl  backdrop-filter z-[2900] rounded-full px-4 py-2 lg:px-8 lg:py-4 border text-white w-11/12 mx-auto">
        <nav className="">
          <StickyNavbar />
        </nav>
      </header>
      <main className="min-h-[calc(100vh-478px)] mt-5 w-11/12 mx-auto">
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
