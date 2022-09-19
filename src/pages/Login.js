import CardBody from "@material-tailwind/react/CardBody";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import H5 from "@material-tailwind/react/Heading5";
import InputIcon from "@material-tailwind/react/InputIcon";
import Page from "components/login/Page";
import Button from "@material-tailwind/react/Button";

export default function Landing() {
  return (
    <>
      <div className="absolute z-20"></div>
      <main>
        <Page>
          <div className="pt-16">
            <Card className="w-96">
              <CardHeader color="lightBlue" className="w-9">
                <H5 color="white" style={{ marginBottom: 0 }}>
                  Login
                </H5>
              </CardHeader>

              <div className="w-1/2">
                <div>
                  <label
                    htmlFor="email"
                    className="block font-semibold text-sm"
                  >
                    Email
                  </label>
                  <input
                    className="py-2 px-2 bg-gray-100 rounded block w-full focus:outline-none text-base"
                    name="email"
                    placeholder="Email"
                    type="email"
                    autoComplete="false"
                    // onChange={formik.handleChange}
                    // value={formik.values.email}
                  />
                </div>
                <div className="py-2">
                  <label
                    htmlFor="password"
                    className="block font-semibold text-sm"
                  >
                    Password
                  </label>
                  <input
                    className="py-2 px-2 bg-gray-100 rounded block w-full focus:outline-none text-base"
                    name="password"
                    placeholder="Password"
                    type="password"
                    // onChange={formik.handleChange}
                    // value={formik.values.password}
                  />
                </div>
                <div class="py-2">
                  <button
                    type="submit"
                    style={{ background: "#FFCD05" }}
                    className="inline-block py-2 px-4 w-full text-center rounded font-bold cursor-pointer focus:outline-none"
                  >
                    Login
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </Page>
      </main>
    </>
  );
}
