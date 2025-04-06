import React from "react";
import styled from "styled-components";

const LogContainer = styled.div`
  margin-top: 2rem;
  background: #1e1f29;
  border: 1px solid #44475a;
  border-radius: 8px;
  padding: 1rem;
  max-height: 200px;
  overflow-y: auto;
  font-size: 0.875rem;
  color: #f8f8f2;
`;

const LogEntry = styled.div`
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: #282a36;
  border-left: 4px solid #bd93f9;
  border-radius: 4px;
  word-break: break-word;
`;

const Header = styled.h4`
  margin-bottom: 0.5rem;
  color: #bd93f9;
`;

const ClearButton = styled.button`
  margin-bottom: 0.75rem;
  background: #ff5555;
  color: #fff;
  border: none;
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  float: right;

  &:hover {
    background: #ff4444;
  }
`;

const LogViewer = ({ logs, setLogs }) => {
  if (!logs || logs.length === 0) return null;

  return (
    <LogContainer>
      <Header>
        📝 Logs
        <ClearButton onClick={() => setLogs([])}>Clear</ClearButton>
      </Header>
      {logs.map((log, index) => (
        <LogEntry key={index}>{log}</LogEntry>
      ))}
    </LogContainer>
  );
};

export default LogViewer;
