import React from 'react';
import styled from 'styled-components';

import { useTheme } from '@mui/material/styles';

const CustomFooter = styled.div`
  background: rgb(0, 0, 0);
  background: linear-gradient(#00000008 -4%, #8b898b85 100%, #ffadfb 94%);
  height: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: ${(props) => props.theme.typography.fontFamily};
`;

const Footer = () => {
  const theme = useTheme();
  return (
    <CustomFooter theme={theme} className="footer">
      Sofia Perone - devLabs Project
    </CustomFooter>
  );
};

export default Footer;
