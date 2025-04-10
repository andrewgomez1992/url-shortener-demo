import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatusRow = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 6px;
  background: #282a36;
  color: #f8f8f2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #44475a;
`;

const Label = styled.span`
  font-weight: bold;
  color: #bd93f9;
`;

const Indicator = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  background: ${(props) => (props.active ? "#50fa7b33" : "#ff555533")};
  color: ${(props) => (props.active ? "#50fa7b" : "#ff5555")};
  font-weight: bold;
  font-size: 0.85rem;
`;

const ConnectionStatus = ({ activeStore, isConnected }) => {
  // activeStore: "redis", "file", or "inMemory" (the current store used by the demo)
  // isConnected: Only relevant for Redis, indicates if the API is reachable

  const statuses = [
    {
      key: "redis",
      label: "Redis Connection",
      active: activeStore === "redis" && isConnected,
    },
    {
      key: "file",
      label: "File Store (Local)",
      active: activeStore === "file",
    },
    {
      key: "inMemory",
      label: "In Memory Store (Local)",
      active: activeStore === "inMemory",
    },
  ];

  return (
    <Wrapper>
      {statuses.map((status) => (
        <StatusRow key={status.key}>
          <Label>{status.label}</Label>
          <Indicator active={status.active}>
            {status.active ? "Online" : "Offline"}
          </Indicator>
        </StatusRow>
      ))}
    </Wrapper>
  );
};

export default ConnectionStatus;
