import useLoader from "@/app/store/LoaderService";
import React, { ReactNode } from "react";
import { Slide, ToastContainer } from "react-toastify";
import LoadingBar from "react-top-loading-bar";

interface Props {
  children: ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  const { isLoading, progress, setProgress } = useLoader();
  return (
    <main className="login-page">
      {isLoading && (
        <div className="w-full">
          <LoadingBar
            height={3}
            color="#362ba8"
            progress={progress}
            onLoaderFinished={() => setProgress(100)}
          />
        </div>
      )}
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </main>
  );
};

export default AuthLayout;
