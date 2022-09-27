import { useState, useEffect, react } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import MenuItem from "./sidebar/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setUser } from "../store/actionCreator";
import { capitalizeFirstLetter, axiosGeneral } from "./helpers/global";

const Wrapper = styled.div`
  width: 10%;
  background: #69afb5;
  color: #fff;
`;
const MenuWrapper = styled.ul`
  padding: 0px 0px;
`;

export default function Sidebar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [namaPegawai, setNamaPegawai] = useState();
  const [rolePegawai, setRolePegawai] = useState();
  const accessToken = useSelector((state) => state.accessToken);

  useEffect(() => {
  }, []);

  const doLogout = () => {
    dispatch(setAccessToken(null));
    dispatch(setUser(null));
    history.replace("/");
  };
  //capitalizeFirstLetter(user.nama_lengkap)
  return (
    <Wrapper className="flex-shrink-0 h-full overflow-y-auto relative">
       <div className="flex flex-row justify-between items-center px-6 mb-20 mt-10">
       <div className="flex flex-row w-11/12">
          <div className="align-middle ml-3">
            <p className="pb-0 mb-0">
              NAMA
            </p>
            <p className="text-xs">jabatan</p>
          </div>
        </div>
      </div> 

      <MenuWrapper className="flex flex-col">
        <MenuItem
          text="Beranda"
          onClick={() => history.push("/")}
          path="/"
        />
        <MenuItem
          text="Paspor"
          onClick={() => history.push("/paspor")}
          path="/paspor"
        />
        <MenuItem
          text="Izin Tinggal"
          onClick={() => history.push("/intal")}
          path="/intal"
        />
        <MenuItem
          text="Perlintasan"
          onClick={() => history.push("/perlintasan")}
          path="/perlintasan"
        />
        <MenuItem
          text="Penegakan Hukum"
          onClick={() => history.push("/gakum")}
          path="/gakum"
        />
        <MenuItem
          text="PNBP"
          onClick={() => history.push("/pnbp")}
          path="/pnbp"
        />
        {/* <MenuItem
          text="Data Survey"
          icon={<i className="material-icons">assignment</i>}
          onClick={() => history.push("/data-kuesioner")}
          path="/data-kuesioner"
        />
        <MenuItem
          text="Data Pokok"
          icon={<i className="material-icons">all_inbox</i>}
          onClick={() => history.push("/data-pokok")}
          path="/data-pokok"
        />
        <MenuItem
          text="Laporan"
          icon={<i className="material-icons">print</i>}
          onClick={() => history.push("/laporan")}
          path="/laporan"
        /> */}
        <div className="fixed bottom-10">
          <MenuItem
            text="Keluar"
            onClick={doLogout}
          />
        </div>
      </MenuWrapper>
    </Wrapper>
  );
}
