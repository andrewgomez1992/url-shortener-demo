import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  background: #282a36;
  border: 1px solid #44475a;
  border-radius: 8px;
  padding: 1rem;
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  color: #bd93f9;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #f8f8f2;
  font-weight: bold;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #44475a;
  border-radius: 6px;
  background-color: #282a36;
  color: #f8f8f2;
  font-family: "JetBrains Mono", monospace;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: #6272a4;
  color: #f8f8f2;
  border: none;
  border-radius: 6px;
  font-family: "JetBrains Mono", monospace;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #7082bb;
  }
`;

const ResolvedText = styled.p`
  margin-top: 1rem;
  color: ${(props) => (props.isFound ? "#8be9fd" : "#ff5555")};
`;

const ResolveCard = ({ aliasList, onResolve, resolvedUrl, setResolvedUrl }) => {
  // We'll keep track of which alias is selected
  const [selectedAlias, setSelectedAlias] = useState("");

  const handleResolve = async () => {
    if (!selectedAlias) {
      setResolvedUrl("Please select an alias!");
      return;
    }
    onResolve(selectedAlias);
  };

  return (
    <Card>
      <Title>Resolve a Short URL</Title>

      {aliasList.length === 0 ? (
        <p style={{ color: "#ffb86c" }}>
          No aliases found. Shorten some URLs first!
        </p>
      ) : (
        <>
          <Label htmlFor="aliasSelect">Select an alias to resolve:</Label>
          <Select
            id="aliasSelect"
            value={selectedAlias}
            onChange={(e) => setSelectedAlias(e.target.value)}
          >
            <option value="">-- Choose Alias --</option>
            {aliasList.map((item) => (
              <option key={item.alias} value={item.alias}>
                {item.alias}
              </option>
            ))}
          </Select>

          <Button onClick={handleResolve}>🔍 Resolve Alias</Button>
        </>
      )}

      {resolvedUrl && (
        <ResolvedText isFound={!resolvedUrl.includes("❌")}>
          🔁 Resolved To: <strong>{resolvedUrl}</strong>
        </ResolvedText>
      )}
    </Card>
  );
};

export default ResolveCard;
