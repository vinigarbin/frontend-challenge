import React from 'react';

import { Container } from './styles';

interface ActivityProps {
  color: string;
  value: string;
}

const Activity: React.FC<ActivityProps> = ({ color, value }) => {
  return (
    <Container>
      <div style={{ backgroundColor: color }} className="redondo" />
      <div className="content">
        <p>{value}</p>
      </div>
    </Container>
  );
};

export default Activity;
