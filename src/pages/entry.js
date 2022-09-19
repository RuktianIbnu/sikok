import loadable from "@loadable/component";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { axiosGeneral, errorHandler } from "../components/helpers/global";
import { useState, useEffect } from "react";

const MainLayout = loadable(() => import("../components/MainLayout"));

function Entry() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
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
        Authorization: "Bearer 8|yXOoZM8DCFJgeRKyETGfarBrXYFa1x6XINF6hCR7",
      };
      const response = await axiosGeneral.get("/kategoripnbp", {
        headers,
      });
      const { status, data } = response;

      const pnbpPaspor = data[0];
      const pnbpIntal = data[2];
      const pnbpOther = data[3];

      const anakArr = [];
      setPnbpPaspor([])
      if (status === 200) {
        setPnbpPaspor(pnbpPaspor);
        setPnbpIntal(pnbpIntal);
        setPNBPOther(pnbpOther);

        setAnakPNBPPaspor(pnbpPaspor.children);
        setAnakPNBPIntal(pnbpIntal.children);
        setAnakPNBPOther(pnbpOther.children);

        // for (i; i < pnbpIntal.children.lenght; i++){
        //   if(i === 0){
        //     anakArr.push(pnbpIntal.children[i])
        //   }
        //   console.log(i)
        // }
        
        // setAnaknyaPNBPIntal(anakArr)
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
              <div className="flex flex-row break-normal py-2 px-3 items-center hover:opacity-80">
                <p className="text-sm mr-52 mb-0 w-11/12">A. {pnbpPaspor.nama_layanan}</p>
                <p className="text-sm mr-2 mb-0 w-11/12">Laki-laki</p>
                <p className="text-sm mr-2 mb-0 w-11/12">Perempuan</p>
                <p className="text-sm mr-2 mb-0 w-11/12">Rupiah</p>
              </div>
              {anakPnbpPaspor.map((item, index) => (
              <div
              key={index}
              style={{ background: index % 2 === 0 ? "#E7E7E7" : "#F3F3F3" }}
              className="flex flex-row break-normal py-2 px-3 items-center hover:opacity-80"
              >
              <p className="text-sm text-right mr-2 mb-0 w-20">{index + 1}.</p>
              <p className="text-sm mr-2 mb-0 w-11/12">{item.nama_layanan}</p>
              </div>
              ))}
            {/*-------------------------------------------------------------------------------------- */}

            {/* INTAL */}
              <div className="flex flex-row break-normal py-2 px-3 items-center hover:opacity-80">
                <p className="text-sm mr-52 mb-0 w-11/12">B. {pnbpIntal.nama_layanan}</p>
                <p className="text-sm mr-2 mb-0 w-11/12">Laki-laki</p>
                <p className="text-sm mr-2 mb-0 w-11/12">Perempuan</p>
                <p className="text-sm mr-2 mb-0 w-11/12">Rupiah</p>
              </div>
              {anakPnbpIntal.map((item, index) => (
              <div
              key={index}
              style={{ background: index % 2 === 0 ? "#E7E7E7" : "#F3F3F3" }}
              className="flex flex-row break-normal py-2 px-3 items-center hover:opacity-80"
              >
              <p className="text-sm text-right mr-2 mb-0 w-20">{index + 1}.</p>
              <p className="text-sm mr-2 mb-0 w-11/12">{item.nama_layanan}</p>
                {/* <div
                key={index}
                style={{ background: index % 2 === 0 ? "#E7E7E7" : "#F3F3F3" }}
                className="flex flex-row break-normal py-2 px-3 items-center hover:opacity-80">
                {anaknyaPnbpIntal.map((items, indexs) => (
                    <>
                    <p className="text-sm text-right mr-2 mb-0 w-20">{indexs + 1}.</p>
                    <p className="text-sm mr-2 mb-0 w-11/12">{items.nama_layanan}</p>
                    </>
                ))}
                </div> */}
              </div>
              ))}
            {/*-------------------------------------------------------------------------------------- */}

            {/* Other */}
            <div className="flex flex-row break-normal py-2 px-3 items-center hover:opacity-80">
                <p className="text-sm mr-52 mb-0 w-11/12">C. {pnbpOther.nama_layanan}</p>
                <p className="text-sm mr-2 mb-0 w-11/12">Laki-laki</p>
                <p className="text-sm mr-2 mb-0 w-11/12">Perempuan</p>
                <p className="text-sm mr-2 mb-0 w-11/12">Rupiah</p>
              </div>
              {anakPnbpOther.map((item, index) => (
              <div
              key={index}
              style={{ background: index % 2 === 0 ? "#E7E7E7" : "#F3F3F3" }}
              className="flex flex-row break-normal py-2 px-3 items-center hover:opacity-80"
              >
              <p className="text-sm text-right mr-2 mb-0 w-20">{index + 1}.</p>
              <p className="text-sm mr-2 mb-0 w-11/12">{item.nama_layanan}</p>
                {/* <div
                key={index}
                style={{ background: index % 2 === 0 ? "#E7E7E7" : "#F3F3F3" }}
                className="flex flex-row break-normal py-2 px-3 items-center hover:opacity-80">
                {anaknyaPnbpIntal.map((items, indexs) => (
                    <>
                    <p className="text-sm text-right mr-2 mb-0 w-20">{indexs + 1}.</p>
                    <p className="text-sm mr-2 mb-0 w-11/12">{items.nama_layanan}</p>
                    </>
                ))}
                </div> */}
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
