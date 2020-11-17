import React from 'react';

import { Container } from './styles';

interface CardProps {
  color: string;
  value: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ color, value }) => {
  return (
    <Container style={{ backgroundColor: color }} className="">
      <div>{value}</div>
    </Container>
  );
};

export default Card;
