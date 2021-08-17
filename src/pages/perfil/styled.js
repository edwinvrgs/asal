import styled from 'styled-components';
import { Image, Card } from 'semantic-ui-react';

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

export const StyledCard = styled(Card)`
  && {
    .extra.content {
        padding-top: 4px;
        padding-bottom: 4px;
      }
  }
`
