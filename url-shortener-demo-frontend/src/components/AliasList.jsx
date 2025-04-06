// import React from "react";
// import styled from "styled-components";

// const Container = styled.div`
//   margin-top: 2rem;
// `;

// const Title = styled.h4`
//   color: #ff79c6;
//   margin-bottom: 1rem;
// `;

// const List = styled.ul`
//   list-style: none;
//   padding-left: 0;
// `;

// const Item = styled.li`
//   margin-bottom: 0.5rem;
//   background: #282a36;
//   padding: 0.5rem;
//   border-radius: 6px;
//   color: #f8f8f2;
// `;

// const UrlLink = styled.a`
//   color: #8be9fd;
//   text-decoration: none;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const Expiry = styled.span`
//   color: #6272a4;
//   margin-left: 0.5rem;
//   font-size: 0.875rem;
// `;

// const AliasList = ({ entries }) => {
//   if (!entries || Object.keys(entries).length === 0) return null;

//   return (
//     <Container>
//       <Title>📇 All Stored Aliases</Title>
//       <List>
//         {Object.entries(entries).map(([alias, entry]) => (
//           <Item key={alias}>
//             <strong>{alias}</strong>:{" "}
//             <UrlLink href={entry.url} target="_blank" rel="noopener noreferrer">
//               {entry.url}
//             </UrlLink>
//             {entry.expiresAt && (
//               <Expiry>
//                 (expires {new Date(entry.expiresAt).toLocaleString()})
//               </Expiry>
//             )}
//           </Item>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default AliasList;
