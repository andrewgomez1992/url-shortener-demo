import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: #282a36;
  border: 1px solid #44475a;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  color: #bd93f9;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  color: #f8f8f2;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0;
  border: 1px solid #44475a;
  border-radius: 6px;
  background-color: #282a36;
  color: #f8f8f2;
  font-family: "JetBrains Mono", monospace;
`;

const CheckboxLabel = styled.label`
  color: #f8f8f2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  margin-top: 0.5rem;

  &:hover {
    background-color: #7082bb;
  }
`;

const ShortenCard = ({
  longUrl,
  setLongUrl,
  alias,
  setAlias,
  expiresIn,
  setExpiresIn,
  override,
  setOverride,
  onShorten,
  shortUrl,
}) => {
  return (
    <Card>
      <Title>Shorten a URL</Title>
      <FormGroup>
        <Label>Long URL:</Label>
        <Input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="https://reallylongsite.com/page/123"
        />
      </FormGroup>

      <FormGroup>
        <Label>Custom Alias:</Label>
        <Input
          type="text"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          placeholder="e.g. my-link"
        />
      </FormGroup>

      <FormGroup>
        <Label>Expiration (e.g. 1h, 1d):</Label>
        <Input
          type="text"
          value={expiresIn}
          onChange={(e) => setExpiresIn(e.target.value)}
          placeholder="e.g. 1h"
        />
      </FormGroup>

      <CheckboxLabel>
        <input
          type="checkbox"
          checked={override}
          onChange={() => setOverride(!override)}
        />
        Force override if alias exists
      </CheckboxLabel>

      <Button onClick={onShorten}>✂️ Shorten URL</Button>

      {shortUrl && (
        <p style={{ marginTop: "1rem", color: "#8be9fd" }}>
          🔗 Short URL: <strong>{shortUrl}</strong>
        </p>
      )}
    </Card>
  );
};

export default ShortenCard;
