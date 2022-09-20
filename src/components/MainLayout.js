import Sidebar from "./Sidebar";
import Header from "./Header";
const MainLayout = ({ children }) => {
  return (
    <div
      className="h-screen items-start flex"
      style={{ background: "#FAFBFC" }}
    >
      <Sidebar />
      <div className="w-full h-screen overflow-auto">{children}</div>
    </div>
  );
};

export default MainLayout;
