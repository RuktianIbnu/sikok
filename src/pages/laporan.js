import loadable from "@loadable/component";
import { useSelector, useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { axiosGeneral, errorHandler } from "../components/helpers/global";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useFormik } from "formik";
import { setLoading } from "../store/actionCreator";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import "./laporan.css";

const MainLayout = loadable(() => import("../components/MainLayout"));

function Laporan() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const accessToken = useSelector((state) => state.accessToken);
  const [listKantor, setListKantor] = useState([]);
  const [id_kantor, setIdKantor] = useState();
  const [listPnbp, setListPnbp] = useState([]);
  const [id, setId] = useState();

  const [startDate, setStartDate] = useState(new Date());
  
  useEffect(() => {
    ListKantor()
    ListPnbp()
  }, []);

  const formik = useFormik({
    initialValues: {
      id_kantor: "",
      id_pnbp:"",
    },
    // validationSchema: FormSchema,
    // onSubmit: (values) => {
    //   // alert(JSON.stringify(values, null, 2));
    //   if (
    //     window.confirm(
    //       `Pastikan satuan kerja dan jabatan sudah sesuai, karena tidak dapat di ubah apabila penugasan sudah di submit !`
    //     )
    //   )
    //     createPertanyaan(values);
    // },
  });

  const customStyles = {
    control: base => ({
      ...base,
      height: 48,
      minHeight: 48
    })
  };  

  const ListKantor = async () => {
    try {
      const headers = {
        Authorization: "Bearer " + accessToken,
      };
      dispatch(setLoading(true));
      const response = await axiosGeneral.get(`/kantor`, {
        headers,
      });

      setListKantor([]);
      const { status, data } = response;
      if (status === 200) {
        const kantorArr = [];
        const kantor = data;
        for (const iterator of kantor) {
          let val = {
            value: iterator.id_kantor,
            label: iterator.nama_kantor,
          };
          kantorArr.push(val);
        }
        setListKantor(kantorArr);
      }
      dispatch(setLoading(false));
    } catch (error) {
      addToast(errorHandler(error), { appearance: "error" });
    }
  };

  const ListPnbp = async () => {
    try {
      const headers = {
        Authorization: "Bearer " + accessToken,
      };
      dispatch(setLoading(true));
      const response = await axiosGeneral.get(`/kategoripnbp`, {
        headers,
      });

      setListPnbp([]);
      const { status, data } = response;
      if (status === 200) {
        const pnbpArr = [];
        const dataPnbp = [data];
        for (const iterator of dataPnbp) {
          if(iterator[0]) {
            let val = {
                value: iterator[0].id,
                label: iterator[0].nama_layanan,
              };
              pnbpArr.push(val);
          }
          if(iterator[2]) {
            let val = {
                value: iterator[0].id,
                label: iterator[0].nama_layanan,
              };
              pnbpArr.push(val);
          }
          if(iterator[3]) {
            let val = {
                value: iterator[0].id,
                label: iterator[0].nama_layanan,
              };
              pnbpArr.push(val);
          }
        }
        setListPnbp(pnbpArr);
        console.log(pnbpArr)
      }
      dispatch(setLoading(false));
    } catch (error) {
      addToast(errorHandler(error), { appearance: "error" });
    }
  };

  return (
    <MainLayout>
      <div className="my-10 px-10">
      <form onSubmit={formik.handleSubmit} method="POST" id="CariData">
        <div class="flex mb-4 justify-center">
            <div class="w-1/12  h-12">
                <h3 class="text-right py-2 pr-2 ">Periode :</h3>
            </div>
            <div class="w-1/5 h-12">
                <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showYearDropdown
                    showMonthDropdown
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                />
                {/* <input
                    className="h-full px-2 rounded block w-full focus:outline-none text-base"
                    name="start_date"
                    placeholder="Pilih Tanggal"
                    type="date"
                    // value={formik.values.start_date}
                    // onChange={formik.handleChange}
                /> */}
            </div>
            <div class="w-1/12  h-12">
                <h3 class="text-center py-2 ">s.d</h3>
            </div>
            <div class="w-1/5 h-12">
                <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showYearDropdown
                    showMonthDropdown
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                />
            {/* <input
                    className="h-full px-2 rounded block w-full focus:outline-none text-base"
                    name="end_date"
                    placeholder="Pilih Tanggal"
                    type="date"
                    // value={formik.values.start_date}
                    // onChange={formik.handleChange}
                /> */}
            </div>
        </div>
        <div class="flex mb-4 justify-center">
            <div class="w-1/6  h-12">
                <h3 className="text-right py-2 pr-2">Jenis Laporan :</h3>
            </div>
            <div class="w-1/2 h-full">
                <Select
                placeholder="Pilih Jenis Laporan"
                name="id_pnbp"
                styles={customStyles}
                onChange={(e) => {
                    const val = e ? e.value : "";
                    formik.setFieldValue("id_pnbp", val);
                }}
                value={listPnbp.find((op) => op.value === id)} //op.value === parentId
                options={listPnbp}
                />
            </div>
        </div>
        <div class="flex mb-4 justify-center">
            <div class="w-1/6 h-12">
                <h3 className="text-right py-2 pr-2">Pilih Satuan Kerja :</h3>
                </div>
                <div class="w-1/2 h-full">
                    <Select
                    placeholder="Pilih Satuan Kerja"
                    name="id_kantor"
                    styles={customStyles}
                    onChange={(e) => {
                        const val = e ? e.value : "";
                        formik.setFieldValue("id_kantor", val);
                    }}
                    value={listKantor.find((op) => op.value === id_kantor)} //op.value === parentId
                    options={listKantor}
                    />
                </div>
            </div>
        <div>
        <div class="flex h-12 justify-center">
            <button 
            type="submit"
            className="rounded-xl font-bold cursor-pointer focus:outline-none inline-block text-xl bg-blue-700 w-24 text-white ">
                Submit
            </button>
        </div>
            <div className="flex mb-4 mt-6 text-center font-bold justify-center">
                <p className="w-1/12 py-2 bg-blue-400 h-10">No</p>
                <p className="w-1/2 py-2 bg-blue-300 h-10">Jenis PNBP</p>
                <p className="w-1/12 py-2 bg-blue-400 h-10">Laki-laki</p>
                <p className="w-1/12 py-2 bg-blue-300 h-10">Perempuan</p>
                <p className="w-1/6 py-2 bg-blue-400 h-10">Rupiah</p>
            </div>
        </div>
        </form>
      </div>
    </MainLayout>
  );
}


export default Laporan;
