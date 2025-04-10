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
  color: #ff5555;
  text-align: center;
`;

const ScrollArea = styled.div`
  max-height: 200px;
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
  display: flex;
  flex-direction: column;
`;

const DeleteButton = styled.button`
  margin-top: 0.5rem;
  background: #ff5555;
  color: #f8f8f2;
  border: none;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background: #ff4444;
  }
`;

const ExpiredCard = ({ aliasList, onDeleteAlias }) => {
  if (!aliasList || aliasList.length === 0) return null;

  return (
    <Card>
      <Title>Expired Aliases</Title>
      <ScrollArea>
        <AliasList>
          {aliasList.map(({ alias, url, expiresAt }) => (
            <AliasItem key={alias}>
              <strong>{alias}</strong> → {url}
              <em>
                Expired at:{" "}
                {expiresAt ? new Date(expiresAt).toLocaleString() : "Unknown"}
              </em>
              {onDeleteAlias && (
                <DeleteButton onClick={() => onDeleteAlias(alias)}>
                  Delete
                </DeleteButton>
              )}
            </AliasItem>
          ))}
        </AliasList>
      </ScrollArea>
    </Card>
  );
};

export default ExpiredCard;
