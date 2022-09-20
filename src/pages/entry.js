import loadable from "@loadable/component";
import { useSelector, useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { axiosGeneral, errorHandler } from "../components/helpers/global";
import { useState, useEffect } from "react";
// import { accessToken } from "store/reducers";

const MainLayout = loadable(() => import("../components/MainLayout"));

function Entry() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const accessToken = useSelector((state) => state.accessToken);
  const [pnbpPaspor, setPnbpPaspor] = useState([]);
  const [pnbpIntal, setPnbpIntal] = useState([]);
  const [pnbpOther, setPNBPOther] = useState([]);
  const [anakPnbpPaspor, setAnakPNBPPaspor] = useState([]);
  const [anakPnbpIntal, setAnakPNBPIntal] = useState([]);
  const [anakPnbpOther, setAnakPNBPOther] = useState([]);
  const [anaknyaPnbpIntal, setAnaknyaPNBPIntal] = useState([]);
  const [anaknyaPnbpOther, setAnaknyaPNBPOther] = useState([]);
  useEffect(() => {
    fetchPNBP();
  }, []);

  const fetchPNBP = async () => {
    try {
      const headers = {
        Authorization: "Bearer " + accessToken,
      };

      const response = await axiosGeneral.get("/kategoripnbp", {
        headers,
      });
      const { status, data } = response;

      const pnbpPaspor = data[0];
      const pnbpIntal = data[2];
      const pnbpOther = data[3];

      const anakArr = [];
      setPnbpPaspor([]);
      if (status === 200) {
        setPnbpPaspor(pnbpPaspor);
        setPnbpIntal(pnbpIntal);
        setPNBPOther(pnbpOther);

        setAnakPNBPPaspor(pnbpPaspor.children);
        setAnakPNBPIntal(pnbpIntal.children);
        setAnakPNBPOther(pnbpOther.children);

      } else if (status === 500) {
        addToast("Gagal Mengambil Data Instansi", { appearance: "error" });
      }
    } catch (error) {
      addToast(errorHandler(error), { appearance: "error" });
    }
  };

  return (
    <MainLayout>
      <div className="my-10 px-10">
        <div>
          <div className="bg-white shadow w-full rounded px-6 py-10">
            <h1 className="font-bold text-2xl text-black mb-20">
              Entry Data PNBP
            </h1>

            {/* PASPOR */}
            <div className="flex flex-row break-normal py-2 px-0 items-center hover:opacity-80">
              <p className="text-sm mr-0 mb-0 w-full">
                A. {pnbpPaspor.nama_layanan}
              </p>
            </div>
            {anakPnbpPaspor.map((item, index) => (
              <div
                key={index}
                style={{ background: index % 2 === 0 ? "#87CEEB" : "#ADD8E6" }}
                className="flex flex-row break-normal py-2 px-0 items-center hover:opacity-80"
              >
                <p className="text-sm text-right mr-2 mb-0 w-20">{index + 1}.</p>
                <p className="text-sm mr-2 mb-0 w-full">{item.nama_layanan}</p>
                <input className="py-2 px-3 mr-2 bg-gray-100 rounded block w-1/5 focus:outline-none text-base"
                  name="Laki-laki"
                  placeholder="Laki-laki"
                  type="text"
                ></input>
                <input className="py-2 px-3 mr-2 bg-gray-100 rounded block w-1/5 focus:outline-none text-base"
                  name="Perempuan"
                  placeholder="Perempuan"
                  type="text"
                ></input>
                <input className="py-2 px-3 mr-16 bg-gray-100 rounded block w-1/5 focus:outline-none text-base"
                  name="Rupiah"
                  placeholder="Rupiah"
                  type="text"
                ></input>
              </div>
            ))}
            {/*-------------------------------------------------------------------------------------- */}

            {/* INTAL */}
            <div className="flex flex-row break-normal py-2 px-0 items-center hover:opacity-80">
              <p className="text-sm mr-0 mb-0 w-full">
                B. {pnbpIntal.nama_layanan}
              </p>
            </div>
            {anakPnbpIntal.map((item, index) => (
              <div>
                <div
                  key={index}
                  className="flex flex-row break-normal py-2 px-0 items-center hover:opacity-80"
                >
                  <p className="text-sm text-left pl-10 mr-2 mb-0 w-full">
                  {index + 1}. {item.nama_layanan}
                  </p>
                </div>
                {item.children.map((x, z) => (
                  <div
                    key={z}
                    style={{ background: z % 2 === 0 ? "#87CEEB" : "#ADD8E6" }}
                    className="flex flex-row break-normal py-2 px-14 items-center hover:opacity-80"
                  >
                    <p className="text-sm text-right mr-2 mb-0 w-20">
                      {z + 1}.
                    </p>
                    <p className="text-sm mr-2 mb-0 w-11/12">
                      {x.nama_layanan}
                    </p>
                    <input className="py-2 px-3 mr-2 bg-gray-100 rounded block w-1/5 focus:outline-none text-base"
                      name="Laki-laki"
                      placeholder="Laki-laki"
                      type="text"
                    ></input>
                    <input className="py-2 px-3 mr-2 bg-gray-100 rounded block w-1/5 focus:outline-none text-base"
                      name="Perempuan"
                      placeholder="Perempuan"
                      type="text"
                    ></input>
                    <input className="py-2 px-3 bg-gray-100 rounded block w-1/5 focus:outline-none text-base"
                      name="Rupiah"
                      placeholder="Rupiah"
                      type="text"
                    ></input>
                  </div>
                ))}
              </div>
            ))}
            {/*-------------------------------------------------------------------------------------- */}

            {/* Other */}
            {/* <div className="flex flex-row break-normal py-2 px-0 items-center hover:opacity-80">
              <p className="text-sm mr-0 mb-0 w-full">
                C. {pnbpOther.nama_layanan}
              </p>
            </div>
            {anakPnbpOther.map((item, index) => (
              <div>
                <div
                  key={index}
                  style={{
                    background: index % 2 === 0 ? "#ADD8E6" : "#87CEEB",
                  }}
                  className="flex flex-row break-normal py-2 px-0 items-center hover:opacity-80"
                >
                  <p className="text-sm text-left pl-10 mr-2 mb-0 w-full">
                  {index + 1}. {item.nama_layanan}
                  </p>
                </div>
                {item.children.map((x, z) => (
                  <div
                    key={z}
                    style={{ background: z % 2 === 0 ? "#87CEEB" : "#ADD8E6" }}
                    className="flex flex-row break-normal py-2 px-14 items-center hover:opacity-80"
                  >
                    <p className="text-sm text-right mr-2 mb-0 w-20">
                      {z + 1}.
                    </p>
                    <p className="text-sm mr-2 mb-0 w-11/12">
                      {x.nama_layanan}
                    </p><input className="py-2 px-3 mr-2 bg-gray-100 rounded block w-1/5 focus:outline-none text-base"
                      name="Laki-laki"
                      placeholder="Laki-laki"
                      type="text"
                    ></input>
                    <input className="py-2 px-3 mr-2 bg-gray-100 rounded block w-1/5 focus:outline-none text-base"
                      name="Perempuan"
                      placeholder="Perempuan"
                      type="text"
                    ></input>
                    <input className="py-2 px-3 bg-gray-100 rounded block w-1/5 focus:outline-none text-base"
                      name="Rupiah"
                      placeholder="Rupiah"
                      type="text"
                    ></input>
                  </div>
                ))}
              </div>
            ))} */}
            {/*-------------------------------------------------------------------------------------- */}

            {/* Other */}
            <div className="flex flex-row break-normal py-2 px-0 items-center hover:opacity-80">
              <p className="text-sm mr-0 mb-0 w-full">
                C. {pnbpOther.nama_layanan}
              </p>
            </div>
            {anakPnbpOther.map((item, index) => (
              <div>
                {item.children == 0 && (
                  <div
                  key={index}
                  style={{
                    background: index % 2 === 0 ? "#ADD8E6" : "#87CEEB",
                  }}
                  className="flex flex-row break-normal py-2 px-0 items-center hover:opacity-80"
                  >
                    <p className="text-sm text-left pl-10 mr-2 mb-0 w-full">
                      {index + 1}. {item.nama_layanan}
                    </p>
                    <input className="py-2 px-2 mr-2 bg-gray-100 rounded block w-1/5 focus:outline-none text-base"
                      name="Laki-laki"
                      placeholder="Laki-laki"
                      type="text"
                    ></input>
                    <input className="py-2 px-2 mr-3 bg-gray-100 rounded block w-1/5 focus:outline-none text-base"
                      name="Perempuan"
                      placeholder="Perempuan"
                      type="text"
                    ></input>
                    <input className="py-2 px-2 mr-14 bg-gray-100 rounded block w-1/5 focus:outline-none text-base"
                      name="Rupiah"
                      placeholder="Rupiah"
                      type="text"
                    ></input>
                  </div>
                )}
                {item.nama_layanan === "Biaya Beban" && (
                  <div
                  key={index}
                  style={{ background: index % 2 === 0 ? "#87CEEB" : "" }}
                  className="flex flex-row break-normal py-2 px-0 items-center hover:opacity-80"
                >
                  <p className="text-sm text-left pl-10 mr-2 mb-0 w-full">
                  {index + 1}. {item.nama_layanan}
                  </p>
                </div>
                )}
                {item.nama_layanan === "Kartu(KPP APEC) atau APEC Business Travel Card (ABTC)" && (
                  <div
                  key={index}
                  style={{ background: index % 2 === 0 ? "#ADD8E6" : "#87CEEB" }}
                  className="flex flex-row break-normal py-2 px-0 items-center hover:opacity-80"
                >
                  <p className="text-sm text-left pl-10 mr-2 mb-0 w-full">
                  {index + 1}. {item.nama_layanan}
                  </p>
                </div>
                )}
                {item.children.map((x, z) => (
                  <div
                    key={z}
                    style={{ background: z % 2 === 0 ? "#87CEEB" : "#ADD8E6" }}
                    className="flex flex-row break-normal py-2 px-14 items-center hover:opacity-80"
                  >
                    <p className="text-sm text-right mr-2 mb-0 w-20">
                      {z + 1}.
                    </p>
                    <p className="text-sm mr-2 mb-0 w-11/12">
                      {x.nama_layanan}
                    </p>
                    <input className="py-2 px-3 mr-2 bg-gray-100 rounded block w-1/5 focus:outline-none text-base"
                      name="Laki-laki"
                      placeholder="Laki-laki"
                      type="text"
                    ></input>
                    <input className="py-2 px-3 mr-2 bg-gray-100 rounded block w-1/5 focus:outline-none text-base"
                      name="Perempuan"
                      placeholder="Perempuan"
                      type="text"
                    ></input>
                    <input className="py-2 px-3 bg-gray-100 rounded block w-1/5 focus:outline-none text-base"
                      name="Rupiah"
                      placeholder="Rupiah"
                      type="text"
                    ></input>
                  </div>
                ))}
              </div>
            ))}
            {/*-------------------------------------------------------------------------------------- */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Entry;
