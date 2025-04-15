import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  background: #14151a;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  padding: 2rem 0;
  text-align: center;
  color: #f8f8f2;
  font-family: "JetBrains Mono", monospace;
  h1 {
    margin: 0;
    font-size: 2rem;
    color: #bd93f9;
  }
`;

export const MainContent = styled.main`
  display: grid;
  /* max of 2 columns, each up to 500px wide */
  grid-template-columns: minmax(0, 500px) minmax(0, 500px);
  gap: 2rem;
  padding: 2rem;
  flex: 1;
  margin: 0 auto;
  justify-content: center;
  justify-items: center;

  /* MEDIA QUERY: single-column on smaller screens */
  @media (max-width: 668px) {
    grid-template-columns: 1fr;
    /* Only 1 column on narrow screens */
  }
`;

export const Footer = styled.footer`
  text-align: center;
  padding: 1rem 0;
  color: #6272a4;
  font-size: 0.85rem;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;
