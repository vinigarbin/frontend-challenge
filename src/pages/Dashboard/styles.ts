import styled, { css } from 'styled-components';

interface SituationProps {
  ativo: number;
}

export const Container = styled.div``;

export const Content = styled.div`
  padding: 20px 0;
  display: flex;

  aside.quadro1 {
    width: 30%;
    height: 600px;
    margin-left: 10px;
  }
  section.quadro2 {
    width: 30%;
    height: 600px;
    margin-left: 10px;
  }

  aside.quadro3 {
    width: 40%;
    height: 620px;
    background: white;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
  }

  .box {
    background: white;
    height: 200px;
    margin-bottom: 10px;
    border-radius: 10px;

    h1 {
      text-align: center;
      color: black;
      width: 100%;
      font-size: 16px;
    }
  }
`;

export const InfoGeral = styled.div<SituationProps>`
  .twoItems {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-left: 10px;
    p {
      margin-top: 10px;
      color: black;
      font-size: 16px;
    }

    .situation {
      ${props =>
        props.ativo === 1
          ? css`
              color: blue;
            `
          : css`
              color: red;
            `}
    }

    img {
      margin-top: 10px;
      width: 70px;
      height: 70px;
      border-radius: 100%;
      margin-right: 10px;
    }
  }

  .twoItemsIcon {
    align-items: center;
    align-self: center;
    justify-content: flex-end;
    display: flex;
    margin-top: 7px;
    margin-right: 10px;
    p {
      margin-left: 10px;
      color: black;
      font-size: 16px;
    }
  }
`;

export const Local = styled.div``;

export const Oportunidade = styled.div`
  .twoItems {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    width: 75%;

    section {
      margin-left: 2px;
      margin-top: 2px;
      p {
        color: black;
        font-size: 16px;
      }
      span {
        color: black;
        font-size: 12px;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    margin-top: 20px;
    margin-left: 10px;

    .card-green {
      background: green;
      width: 40px;
      height: 40px;
      border-radius: 10px;

      p {
        margin-top: 4px;
        align-self: center;
        text-align: center;
        font-size: 25px;
      }
    }
    .card-black {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: black;

      p {
        margin-top: 4px;
        align-self: center;
        text-align: center;
        font-size: 25px;
      }
    }
    .card-red {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: red;

      p {
        margin-top: 4px;
        align-self: center;
        text-align: center;
        font-size: 25px;
      }
    }
    .card-blue {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: blue;
      p {
        margin-top: 4px;
        align-self: center;
        text-align: center;
        font-size: 25px;
      }
    }
  }
`;

export const LimiteCredito = styled.div`
  .content {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    margin-left: 60px;

    section {
      margin-left: 2px;
      margin-bottom: 20px;
      > p {
        color: blue;
        font-size: 16px;
        margin-bottom: 5px;
      }
      .available {
        color: green;
        font-size: 16px;
        margin-bottom: 5px;
      }

      span {
        color: black;
        font-size: 12px;
      }
    }
  }
`;

export const ChartContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export const Vendas = styled.div`
  height: 100%;
  width: 100%;
`;

export const ContainerQuadro3 = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 620px;
  .title {
    text-align: center;
  }

  .content {
    position: relative;
    margin: 10px;
    margin-left: 1px;
    margin-right: 1px;

    .barra-busca {
      position: absolute;
      width: 100%;
      height: 30px;

      background-color: LightGrey;
      border-radius: 5px;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      input {
        flex: 1;
        width: 90%;
        background: LightGrey;
        border: none;
        margin-left: 10px;
      }

      .icon {
        width: 10%;
      }
    }
  }

  .list-view {
    position: absolute;
    margin-top: 40px;
    width: 100%;

    height: 500px;

    .barra-totais {
      margin-top: 10px;
      display: flex;
      flex-direction: row;

      .twoItems {
        display: flex;
        flex-direction: row;
        width: 100%;

        justify-content: center;
        align-items: center;
        > p {
          margin-top: 2px;
          margin-left: 2px;
          color: black;
          font-size: 12px;
        }
      }
    }
    .list {
      margin-top: 10px;
      margin-left: 10px;
      width: 98%;

      overflow: auto;
      height: 90%;

      .twoItems {
        margin-left: 10%;
        display: flex;
        flex-direction: row;

        section {
          margin-top: 0;
          margin-left: 10px;
          color: black;
        }
      }
    }
  }
`;
