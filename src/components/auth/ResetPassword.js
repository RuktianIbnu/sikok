import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { axiosGeneral, errorHandler } from "../helpers/global";
import { setLoading } from "../../store/actionCreator";
import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const FormSchema = Yup.object().shape({
  password: Yup.string()
    .required("* Password tidak boleh kosong")
    .min(6, "* Password Minimal 6 karakter"),
  ulangi_password: Yup.string()
    .required("* Password tidak boleh kosong")
    .oneOf([Yup.ref("password"), null], "* Password tidak sama")
    .min(6, "* Ulangi Password Minimal 6 karakter"),
});

function ResetPassword({ setShowOtp, setTempToken, setShowForgotPass }) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const history = useHistory();
  const query = useQuery();

  const formik = useFormik({
    initialValues: {
      password: "",
      ulangi_password: "",
    },
    validationSchema: FormSchema,
    onSubmit: (values) => doChangePassword(values),
  });

  const doChangePassword = async (values) => {
    try {
      if (!values) return;
      const body = {
        new_password: values.password,
        temp_token: query.get("token"),
      };

      dispatch(setLoading(true));
      const response = await axiosGeneral.post(`/verify-forget-password`, body);
      const { status } = response;

      if (status === 200) {
        addToast("Password berhasil di ganti", {
          appearance: "success",
        });
        history.replace("/");
        dispatch(setLoading(false));
      } else {
        addToast("Password Gagal di ganti", {
          appearance: "warning",
        });
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      addToast("Password gagal di ganti", { appearance: "error" });
      addToast(errorHandler(error), { appearance: "error" });
    }
  };

  return (
    <>
      <h1 className="font-bold text-3xl text-black mb-1">Reset Password</h1>
      {/* <p className="font-medium mb-10">Silahkan login untuk melanjutkan</p> */}
      <form onSubmit={formik.handleSubmit} method="POST">
        <div className="my-4">
          <label htmlFor="email" className="block font-semibold text-sm">
            Password
          </label>
          <input
            className="py-2 px-4 bg-gray-100 rounded block w-full focus:outline-none text-base"
            name="password"
            placeholder="Password"
            type="password"
            autoComplete="false"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && (
            <span className="text-xs text-red-500">
              {formik.errors.password}
            </span>
          )}
        </div>
        <div className="my-4">
          <label htmlFor="password" className="block font-semibold text-sm">
            Ulangi Password
          </label>
          <input
            className="py-2 px-4 bg-gray-100 rounded block w-full focus:outline-none text-base"
            name="ulangi_password"
            placeholder="Ulangi Password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.ulangi_password}
          />
          {formik.errors.ulangi_password && (
            <span className="text-xs text-red-500">
              {formik.errors.ulangi_password}
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
          disabled={formik.isSubmitting}
          style={{ background: "#FFCD05" }}
          className="inline-block py-2 px-4 w-full text-center rounded font-bold cursor-pointer focus:outline-none"
        >
          Reset Password
        </button>
      </form>
    </>
  );
}

export default ResetPassword;
