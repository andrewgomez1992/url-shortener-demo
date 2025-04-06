import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 1.5rem 0;
`;

const Label = styled.label`
  color: #f8f8f2;
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  background-color: #282a36;
  color: #f8f8f2;
  padding: 0.5rem 1rem;
  border: 1px solid #44475a;
  border-radius: 6px;
  font-family: "JetBrains Mono", monospace;
`;

const StoreSelector = ({ storeType, setStoreType }) => {
  return (
    <Wrapper>
      <Label htmlFor="storeType">🗃️ Select Storage Type:</Label>
      <Select
        id="storeType"
        value={storeType}
        onChange={(e) => setStoreType(e.target.value)}
      >
        <option value="inMemory">InMemoryStore</option>
        <option value="file">FileStore</option>
        <option value="redis">Redis API Store</option>
      </Select>
    </Wrapper>
  );
};

export default StoreSelector;
