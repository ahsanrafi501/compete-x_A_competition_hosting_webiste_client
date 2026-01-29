import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { join } from "firebase/firestore/pipelines";

const axiosSecure = axios.create({
  baseURL: "https://some-domain.com/api/",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user.accesToken}`;
      return config;
    });

    // inspector response

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const statusCode = error.status;

        if (statusCode == 401 || statusCode == 402) {
          signOutUser().then(() => {
            navigate("/logout");
          });
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [user, signOutUser, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
