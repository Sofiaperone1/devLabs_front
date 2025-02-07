// utils/Button.tsx
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';

interface ButtonProps {
  variant?: 'cancel' | 'save';
  disabled?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 1% 4%;
  margin-right: ${(props) => (props.variant === 'cancel' ? '2%' : '0')};
  margin-top: 3%;
  font-size: medium;
  background-color: ${(props) =>
    props.variant === 'cancel'
      ? 'black'
      : props.disabled
        ? '#e0e0e0'
        : '#ff57e3cc'};
  color: white;
  border: none;
  font-family: ${(props) => props.theme.typography.fontFamily};
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;

const Buttons = ({
  variant = 'save',
  disabled = false,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) => {
  const theme = useTheme();
  return (
    <StyledButton
      variant={variant}
      theme={theme}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Buttons;
