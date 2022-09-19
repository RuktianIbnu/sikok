import { useFormik } from "formik";
// import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { axiosGeneral, errorHandler } from "../helpers/global";
import { setLoading } from "../../store/actionCreator";
import { useToasts } from "react-toast-notifications";
import axios from "axios";

const FormSchema = Yup.object().shape({
  email: Yup.string().email().required("* Email tidak boleh kosong"),
  password: Yup.string().required("* Password tidak boleh kosong"),
});

function LoginForm({ setShowOtp, setTempToken, setShowForgotPass }) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const doLogin = async (values) => {
    try {
      dispatch(setLoading(true));
      const email = values.email
      const  password = values.password
      axios.defaults.withCredentials = true;
        // const response = axiosGeneral.get('sanctum/csrf-cookie','').then(response => {
        //     return axiosGeneral.post(`/login?email=${email}&password=${password}`),{ 
        //         xsrfHeaderName: "X-XSRF-TOKEN", // change the name of the header to "X-XSRF-TOKEN" and it should works
        //         withCredentials: true
        //       };
        // })
        // console.log(response)
      
      const response = await axiosGeneral.post(`/login?email=${email}&password=${password}`,{
        XSRF: "X-XSRF-TOKEN", // change the name of the header to "X-XSRF-TOKEN" and it should works
        withCredentials: true
      });
      const { status, data } = response;
      console.log(response)
      if (status === 200) {
        setTempToken(data.data.temp_token);
        setShowOtp(true);
        dispatch(setLoading(false));
      }
    } catch (error) {
      addToast(errorHandler(error), { appearance: "error" });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: FormSchema,
    onSubmit: (values) => doLogin(values),
  });
// 
  return (
    <>
      <h1 className="font-bold text-3xl text-black mb-1">Login</h1>
      {/* <p className="font-medium mb-10">Silahkan login</p> */}
      <form onSubmit={formik.handleSubmit} method="POST"> 
        <div className="my-4">
          <label htmlFor="email" className="block font-semibold text-sm">
            Email
          </label>
          <input
            className="py-2 px-4 bg-gray-100 rounded block w-full focus:outline-none text-base"
            name="email"
            placeholder="Email"
            type="email"
            autoComplete="false"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && (
            <span className="text-xs text-red-500">{formik.errors.email}</span>
          )}
        </div>
        <div className="my-4">
          <label htmlFor="password" className="block font-semibold text-sm">
            Password
          </label>
          <input
            className="py-2 px-4 bg-gray-100 rounded block w-full focus:outline-none text-base"
            name="password"
            placeholder="Password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && (
            <span className="text-xs text-red-500">
              {formik.errors.password}
            </span>
          )}
        </div>
        <p
          onClick={() => setShowForgotPass(true)}
          className="text-sm font-semibold text-right inline-block float-right mb-6 cursor-pointer focus:outline-none"
        >
          Lupa Password?
        </p>
        <button
          type="submit"
          // disabled={formik.isSubmitting}
          style={{ background: "#FFCD05" }}
          className="inline-block py-2 px-4 w-full text-center rounded font-bold cursor-pointer focus:outline-none"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default LoginForm;
