import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: #282a36;
  border: 1px solid #44475a;
  border-radius: 8px;
  padding: 1rem;
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
  color: #ff5555; /* or adjust as needed */
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

const InfoRow = styled.div`
  margin-top: 0.25rem;
`;

const AliasText = styled.strong`
  color: #bd93f9; /* alias text in purple */
`;

const StoreTag = styled.em`
  color: #bd93f9; /* store name in purple */
`;

const StatusTag = styled.span`
  display: inline-block;
  margin-top: 0.25rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.8rem;
  color: ${(props) => (props.expired ? "#ff5555" : "#50fa7b")};
  background: ${(props) => (props.expired ? "#ff555533" : "#50fa7b33")};
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

const AliasListCard = ({ title, aliasList, onDeleteAlias, baseDomain }) => {
  const now = Date.now();

  return (
    <Card>
      <Title>{title}</Title>
      <ScrollArea>
        <AliasList>
          {aliasList && aliasList.length > 0 ? (
            aliasList.map(({ alias, url, expiresAt, storeType }) => {
              const isExpired =
                expiresAt && new Date(expiresAt).getTime() < now;
              return (
                <AliasItem key={alias}>
                  <AliasText>Alias: {alias}</AliasText>{" "}
                  <InfoRow>
                    <em>
                      Short URL: {baseDomain}/{alias}
                    </em>
                  </InfoRow>
                  Long URL: {url}
                  {storeType && (
                    <InfoRow>
                      <StoreTag>Store: {storeType}</StoreTag>
                    </InfoRow>
                  )}
                  <InfoRow>
                    <em>
                      Expires at:{" "}
                      {expiresAt
                        ? new Date(expiresAt).toLocaleString()
                        : "Unknown"}
                    </em>
                  </InfoRow>
                  <InfoRow>
                    <StatusTag expired={isExpired}>
                      {isExpired ? "Expired" : "Active"}
                    </StatusTag>
                  </InfoRow>
                  {onDeleteAlias && (
                    <DeleteButton onClick={() => onDeleteAlias(alias)}>
                      Delete
                    </DeleteButton>
                  )}
                </AliasItem>
              );
            })
          ) : (
            <li style={{ textAlign: "center", color: "#f8f8f2" }}>
              No aliases found.
            </li>
          )}
        </AliasList>
      </ScrollArea>
    </Card>
  );
};

export default AliasListCard;
