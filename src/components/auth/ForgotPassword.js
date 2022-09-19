import * as Yup from "yup";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import { axiosGeneral, errorHandler } from "../helpers/global";

const FormSchema = Yup.object().shape({
  email: Yup.string().required("* Email tidak boleh kosong"),
});

function ForgotPassword({ setShowForgotPass }) {
  const { addToast } = useToasts();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: FormSchema,
    onSubmit: (values) => sendEmailVerification(values),
  });

  const sendEmailVerification = async (values) => {
    try {
      const body = {
        email: values.email,
        app_id: "admin-panel",
      };
      const response = await axiosGeneral.post(`/forget-password`, body);
      const { status, data } = response;
      if (status === 200) {
        addToast("Silahkan cek email anda", {
          appearance: "success",
        });
        setShowForgotPass(false);
      }
    } catch (error) {
      addToast(errorHandler(error), { appearance: "error" });
    }
  };

  return (
    <>
      <div
        onClick={() => setShowForgotPass(false)}
        style={{ color: "#120078" }}
        className="mb-6 cursor-pointer focus:outline-none"
      >
        <span>
          <i className="material-icons">chevron_left</i>
        </span>
        <span className="align-top">Kembali</span>
      </div>
      <h1 className="font-bold text-3xl text-black mb-1">Lupa Password</h1>
      <p className="font-medium mb-10">Masukkan Email terdaftar</p>
      <form onSubmit={formik.handleSubmit} method="POST">
        <div className="mb-8">
          <label htmlFor="email" className="block font-semibold text-sm mb-2">
            Email
          </label>
          <input
            className="py-3 px-4 bg-gray-200 rounded block w-full focus:outline-none text-base"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Email"
          />
          {formik.errors.email && <small>{formik.errors.email}</small>}
        </div>
        <button
          type="submit"
          style={{ background: "#FFCD05" }}
          className="inline-block py-2 px-4 w-full text-center rounded font-bold cursor-pointer focus:outline-none"
        >
          Lupa Password
        </button>
      </form>
    </>
  );
}

export default ForgotPassword;
