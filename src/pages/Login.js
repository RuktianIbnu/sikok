import IndonesiaMap from "../static/babel.png";
import ImigrasiLogo from "../static/imigrasi.png";
import LoginForm from "../components/auth/LoginForm";
import ForgotPassword from "../components/auth/ForgotPassword";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ResetPassword from "../components/auth/ResetPassword";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Login() {
  const [showOtp, setShowOtp] = useState(false);
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [tempToken, setTempToken] = useState("");
  const query = useQuery();

  return (
    <div className="h-screen">
      <div className="grid grid-cols-12">
        <div className="col-span-3 h-screen relative">
          <div className="absolute top-1/4 w-full px-6">
              <LoginForm
                setTempToken={(val) => setTempToken(val)}
                setShowOtp={(val) => setShowOtp(val)} //
                setShowForgotPass={(val) => setShowForgotPass(val)}
              />
            {/* {showForgotPass === true ? (
              <ForgotPassword
                setShowForgotPass={(val) => setShowForgotPass(val)}
              />
            ) : query.get("token") !== null ? (
              <ResetPassword />
            ) : (
              <LoginForm
                setTempToken={(val) => setTempToken(val)}
                setShowOtp={(val) => setShowOtp(val)} //
                setShowForgotPass={(val) => setShowForgotPass(val)}
              />
            )} */}
          </div>
        </div>
        <div
          className="h-screen col-span-9 relative px-16"
          style={{ background: "#120078" }}
        >
          <img
            src={IndonesiaMap}
            alt="Peta Indonesia"
            className="object-cover absolute top-0 left-0 px-10 w-full"
          />
          <div className="absolute bottom-10 left-10">
            <div className="flex flex-row">
              <img
                src={ImigrasiLogo}
                alt="Logo Imigrasi"
                style={{ width: "11%" }}
                className="object-contain"
              />
              <div className="ml-8">
                <p className="text-white font-extrabold text-3xl">
                  Direktorat Jenderal Imigrasi
                </p>
                <p className="text-white font-extrabold text-3xl">
                  Kementerian Hukum dan HAM Republik Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
