import { Outlet } from "@tanstack/react-router";

export const App = () => {
  return (
    <div className="p-4 d-flex justify-content-center align-items-center" style={{ width: "100vw", height: "100vh" }}>
      <Outlet />
    </div>
  );
}