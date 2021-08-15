import styled from 'styled-components';
import { Grid, Image } from 'semantic-ui-react';

export const StyledImage = styled(Image)`
  &&&{
    display: flex;
    justify-content: center;
    img{
      width: 40%;
      border-radius: 100%;
    }
  }
`;
