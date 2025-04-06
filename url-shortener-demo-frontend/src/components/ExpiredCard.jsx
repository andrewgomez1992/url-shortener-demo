// components/ExpiredCard.jsx
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: #282a36;
  border: 1px solid #44475a;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
  color: #ff5555; /* or #bd93f9 for consistency */
  text-align: center;
`;

/* Scrollable container */
const ScrollArea = styled.div`
  max-height: 200px; /* Adjust as desired */
  overflow-y: auto;
`;

const AliasList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AliasItem = styled.li`
  margin: 0.5rem 0;
  background: #1e1f29;
  border-radius: 4px;
  padding: 0.5rem;
  border: 1px dashed #ff5555;
  color: #f8f8f2;
  font-size: 0.9rem;
`;

const ExpiredCard = ({ aliasList }) => {
  if (!aliasList || aliasList.length === 0) {
    return null;
  }

  return (
    <Card>
      <Title>Expired Aliases</Title>
      {/* The scrollable area container */}
      <ScrollArea>
        <AliasList>
          {aliasList.map(({ alias, url, expiresAt }) => (
            <AliasItem key={alias}>
              <strong>{alias}</strong> → {url}
              <br />
              <em>
                Expired at:{" "}
                {expiresAt ? new Date(expiresAt).toLocaleString() : "Unknown"}
              </em>
            </AliasItem>
          ))}
        </AliasList>
      </ScrollArea>
    </Card>
  );
};

export default ExpiredCard;
