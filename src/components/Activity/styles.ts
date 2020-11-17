import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  justify-content: flex-start;
  align-items: center;

  .redondo {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    display: flex;
  }

  p {
    margin-left: 10px;
    font-size: 16px;
    color: black;
  }
`;
