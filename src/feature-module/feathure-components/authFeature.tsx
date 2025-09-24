<<<<<<< HEAD
import { Outlet } from "react-router-dom";
=======
import { Outlet } from "react-router";
>>>>>>> parent of 2b06b8d (replace)

const AuthFeature = () => {

  return (
   <div className="main-wrapper auth-bg auth-bg-custom position-relative overflow-hidden">
     <Outlet />
   </div>
  );
};

export default AuthFeature;
