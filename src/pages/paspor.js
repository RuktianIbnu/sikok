import loadable from "@loadable/component";
import styled from "styled-components";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import "./laporan.css";
import { useState, useEffect } from "react";
import { axiosGeneral, errorHandler } from "../components/helpers/global";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps"
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
    PieChart, Pie, Sector,
  } from "recharts";

const MainLayout = loadable(() => import("../components/MainLayout"));
const geoWorld = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
const geoAsia =  "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/asia.json"

function Paspor() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [listYears, setListYears] = useState([]);
    const { addToast } = useToasts();
    useEffect(() => {
        ListYear();
      }, [year]);

    // const defaultCenter = {
    //     lat: -2.1556299410997055,
    //     lng: 106.16382657378412,
    // };

    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

    function handleZoomIn() {
        if (position.zoom >= 4) return;
        setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
    }

    function handleZoomOut() {
        if (position.zoom <= 1) return;
        setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
    }

    function handleMoveEnd(position) {
        setPosition(position);
    }

    const ListYear = () => {
        try {
          const maxOffset = [0, 1, 2, 3, 4];
          const thisYear = new Date().getFullYear();
          const allYears = [];
          for (const iterator of maxOffset) {
            let val = {
              value: thisYear - iterator,
              label: thisYear - iterator,
            };
            allYears.push(val);
          }
          setListYears(allYears);
        } catch (error) {
          addToast(errorHandler(error), { appearance: "error" });
        }
      };

      const data = [
        { name: 'Laki-laki', value: 400 },
        { name: 'Perempuan', value: 300 },
      ];

      let renderLabel = function(entry) {
        return entry.name+" "+entry.value;
    }

  return (
    <div className="w-screen">
      <MainLayout>
            <div className="flex">
            {/*mapp*/}
            <div className=" w-4/5 h-screen">
                <div className="ml-96">
                    <Select
                        className="w-44"
                        placeholder="Pilih Tahun"
                        name="years"
                        onChange={(e) => {
                        const val = e ? e.value : "";
                        setYear(val);
                        }}
                        value={listYears.find((op) => op.value === year)}
                        options={listYears}
                    />                
                </div>
                <ComposableMap>
                    <ZoomableGroup 
                        zoom={position.zoom}
                        center={position.coordinates}
                        onMoveEnd={handleMoveEnd}
                    >
                        <Geographies geography={geoAsia}>
                            {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography 
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#06F"
                                stroke="#FFF"
                                strokeWidth={2}
                                style={{
                                    default: { fill: "#06F" },
                                    hover: { fill: "#04D" },
                                    pressed: { fill: "#02A" },
                                }}
                            />
                            ))
                            }
                        </Geographies>
                        <Marker coordinates={[-2.1556299410997055, 106.16382657378412]}>
                            <g
                                fill="none"
                                stroke="#003DA5"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                transform="translate(-2.1556299410997055,106.16382657378412)"
                            >
                                <circle cx="12" cy="10" r="3" />
                                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                            </g>
                        </Marker>
                    </ZoomableGroup>
                </ComposableMap>
                {/* <LoadScript googleMapsApiKey="AIzaSyCN5RsuQUGXEAd3TqNpEkHygtmhFxNiDZk">
                    <GoogleMap
                        mapContainerClassName="w-full h-full rounded-xl"
                        zoom={13}
                        center={defaultCenter}
                    >
                        <Marker key="location" position={defaultCenter} />
                    </GoogleMap>
                </LoadScript> */}
            </div>
            {/*------------------------------------------------------------------------------------------------------------------------*/}


            {/*chart*/}
            <div className=" w-1/4 h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderLabel}
                    >
                        {data.map((entry, index) => (
                        <Cell 
                        fill={entry.name == "Perempuan" ? "#A0A0A0" : "#404040"}
                        key={`cell-` + index}
                        label={entry.name}
                        />
                        ))}
                    </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="text-center">
                    <p>PNBP Paspor : 28.000.000</p>
                </div>
            </div>
            {/*------------------------------------------------------------------------------------------------------------------------*/}
        </div>
      </MainLayout>
    </div>
  );
}

export default Paspor;
