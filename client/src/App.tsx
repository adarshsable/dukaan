import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
// components
import Options from "@/components/options";
import Navbar from "@/components/header/navbar";
// routes
import Router from "./routes/Router";
import FullScreenLoader from "./components/common/FullScreenLoader";
import Stocks from "./components/stocks";

function App() {
  /**
   * TSX
   */
  return (
    <div>
      <Navbar />

      <Toaster position="top-center" reverseOrder={false} />

      {/* main */}
      <div className="px-6 w-full flex gap-6">
        {/* ===== routes ===== */}
        <Suspense fallback={<FullScreenLoader />}>
          <Router />
        </Suspense>
      </div>

      {/* ===== modals ===== */}
      <Stocks />
      <Options />
    </div>
  );
}

export default App;
