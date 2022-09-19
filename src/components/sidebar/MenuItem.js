import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

// eslint-disable-next-line
const Wrapper = styled.li`
  margin-bottom: 18px;
  cursor: pointer;
  font-weight: bold;
  background: ${(props) => (props.isActive ? "#003dad" : "")};
  border-radius: 10px;
  color: ${(props) => (props.isActive ? "#000" : "#FFF")};
  vertical-align: middle;
`;
// eslint-disable-next-line
const IconWrapper = styled.span`
  margin-right: 1.5rem;
  margin-left: 1rem;
`;

const MenuItem = ({ onClick, text, path }) => {
  const location = useLocation();
  // const [, pathName] = location.pathname.split("/");
  const isActive = location.pathname === path;
  return (
    <div
      onClick={onClick}
      style={{ background: isActive ? "#003dad" : "" }}
      className="flex flex-row font-bold rounded cursor-pointer text-lg my-3 mx-4 py-2 px-3"
    >
      <div>{text}</div>
    </div>
  );
};

export default MenuItem;
