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

/**
 * Splits a log entry that contains an arrow ("→") into two parts.
 * The left part is further split at the last colon (":") so that the alias (i.e. the text after the colon)
 * is rendered in bold. The left part is colored green, and the right part (after the arrow) is colored orange.
 */
const formatLog = (log) => {
  if (log.includes("→")) {
    const parts = log.split("→");
    const leftPart = parts[0].trim();
    const rightPart = parts[1].trim();
    // Look for the last occurrence of a colon to isolate the alias.
    const colonIndex = leftPart.lastIndexOf(":");
    if (colonIndex !== -1) {
      const prefix = leftPart.slice(0, colonIndex + 1).trim(); // include colon
      const aliasText = leftPart.slice(colonIndex + 1).trim();
      return (
        <span>
          <span style={{ color: "green" }}>
            {prefix} <strong>{aliasText}</strong>
          </span>
          <span style={{ color: "orange" }}> → {rightPart}</span>
        </span>
      );
    } else {
      return (
        <span>
          <span style={{ color: "green" }}>{leftPart}</span>
          <span style={{ color: "orange" }}> → {rightPart}</span>
        </span>
      );
    }
  }
  return log;
};

const LogViewer = ({ logs, setLogs }) => {
  if (!logs || logs.length === 0) return null;

  return (
    <LogContainer>
      <Header>
        📝 Logs
        <ClearButton onClick={() => setLogs([])}>Clear</ClearButton>
      </Header>
      {logs.map((log, index) => (
        <LogEntry key={index}>{formatLog(log)}</LogEntry>
      ))}
    </LogContainer>
  );
};

export default LogViewer;
