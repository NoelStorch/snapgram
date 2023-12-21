import DarkModeButton from "@/components/DarkMode";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <div className="flex flex-row flex-1">
      <DarkModeButton className="absolute left-1 top-2" />
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <img
            src="/assets/images/side-img.svg"
            alt="log"
            className="hidden xl:block h-screen W-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </div>
  );
};

export default AuthLayout;
