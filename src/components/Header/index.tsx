import React from 'react';

import {Container} from './styles'

const Header: React.FC = () => {
  return (
    <Container>
    <header>
      <nav>
        <div>
            <div className="text">Challenge</div>
        </div>
      </nav>
    </header>
  </Container>
  );
};

export default Header;
