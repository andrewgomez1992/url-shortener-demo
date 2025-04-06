// import React from "react";
// import styled from "styled-components";

// const Container = styled.div`
//   margin-top: 1.5rem;
// `;

// const Button = styled.button`
//   padding: 0.5rem 1rem;
//   font-weight: bold;
//   background: #44475a;
//   color: #f8f8f2;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   transition: 0.2s;

//   &:hover {
//     background: #6272a4;
//   }
// `;

// const Text = styled.p`
//   margin-top: 0.5rem;
//   color: #bd93f9;
// `;

// const Code = styled.code`
//   background: #282a36;
//   padding: 2px 6px;
//   border-radius: 4px;
// `;

// const ResolveUrlForm = ({ alias, shortUrl, onResolve, resolvedUrl }) => {
//   const displayAlias = alias || (shortUrl && shortUrl.split("/").pop());

//   return (
//     <Container>
//       {displayAlias && (
//         <Text>
//           🔎 Resolving Alias: <Code>{displayAlias}</Code>
//         </Text>
//       )}

//       <Button onClick={onResolve}>🔍 Resolve URL</Button>

//       {resolvedUrl && (
//         <Text>
//           🔁 Resolved To: <strong>{resolvedUrl}</strong>
//         </Text>
//       )}
//     </Container>
//   );
// };

// export default ResolveUrlForm;
