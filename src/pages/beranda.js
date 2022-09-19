import loadable from "@loadable/component";
import styled from "styled-components";
import Select from "react-select";
import {
  Cell,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Bar,
  BarChart,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { CircularProgressbar } from "react-circular-progressbar";
import { axiosGeneral, errorHandler } from "../components/helpers/global";
import { useToasts } from "react-toast-notifications";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../store/actionCreator";
import { useState, useEffect } from "react";
import { Card } from "../components/Card";
const MainLayout = loadable(() => import("../components/MainLayout"));

function Beranda() {

  return (
    <div>
      <MainLayout>
        <div className="my-10 px-5">
          
        </div>
      </MainLayout>
    </div>
  );
}

export default Beranda;

const ButtonSearch = styled.div`
  font-size: 14px;
  background: #4361ee;
  color: #fff;
  padding: 10px 23px;
  border-radius: 0.25rem;
  font-weight: 700;
  cursor: pointer;
`;

const Dropdown = styled.select`
  border-radius: 10px;
  background: #f0f0f0;
  padding: 5px 12px;
  font-size: 16px;
  width: 100%;
  &:focus {
    outline: none;
  }
`;
// eslint-disable-next-line
const InputFilter = styled.input`
  border-radius: 10px;
  background: #f0f0f0;
  padding: 5px 12px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;
