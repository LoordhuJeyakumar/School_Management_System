import styled from 'styled-components';
import { Button, IconButton } from '@mui/material';
import { colors } from './styles';

// Base button styling
const BaseButton = styled(Button)`
  && {
    font-weight: 600;
    border-radius: 8px;
    text-transform: none;
    transition: all 0.3s ease;
    padding: 8px 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    letter-spacing: 0.5px;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &.Mui-disabled {
      background-color: ${colors.grayLight};
      color: ${colors.gray};
    }
  }
`;

// Button variants
export const PrimaryButton = styled(BaseButton)`
  && {
    background-color: ${colors.primary};
    color: white;
    &:hover {
      background-color: ${colors.secondary};
    }
  }
`;

export const SecondaryButton = styled(BaseButton)`
  && {
    background-color: transparent;
    color: ${colors.primary};
    border: 2px solid ${colors.primary};
    &:hover {
      background-color: rgba(67, 97, 238, 0.08);
    }
  }
`;

export const DangerButton = styled(BaseButton)`
  && {
    background-color: ${colors.danger};
    color: white;
    &:hover {
      background-color: #d32f2f;
    }
  }
`;

export const SuccessButton = styled(BaseButton)`
  && {
    background-color: ${colors.success};
    color: white;
    &:hover {
      background-color: #1b8074;
    }
  }
`;

export const InfoButton = styled(BaseButton)`
  && {
    background-color: ${colors.info};
    color: white;
    &:hover {
      background-color: #25a5c4;
    }
  }
`;

export const WarningButton = styled(BaseButton)`
  && {
    background-color: ${colors.warning};
    color: white;
    &:hover {
      background-color: #e67e22;
    }
  }
`;

export const AccentButton = styled(BaseButton)`
  && {
    background-color: ${colors.accent};
    color: white;
    &:hover {
      background-color: #d81b60;
    }
  }
`;

export const TextButton = styled(BaseButton)`
  && {
    background-color: transparent;
    color: ${colors.primary};
    box-shadow: none;
    &:hover {
      background-color: rgba(67, 97, 238, 0.08);
      box-shadow: none;
    }
  }
`;

// Legacy buttons maintained for backward compatibility
export const RedButton = styled(DangerButton)``;

export const BlackButton = styled(BaseButton)`
  && {
    background-color: ${colors.dark};
    color: white;
    &:hover {
      background-color: #000000;
    }
  }
`;

export const DarkRedButton = styled(BaseButton)`
  && {
    background-color: #7f0000;
    color: white;
    &:hover {
      background-color: #5c0000;
    }
  }
`;

export const BlueButton = styled(BaseButton)`
  && {
    background-color: #1a237e;
    color: #fff;
    &:hover {
      background-color: #0d1257;
    }
  }
`;

export const PurpleButton = styled(BaseButton)`
  && {
    background-color: #4a148c;
    color: #fff;
    &:hover {
      background-color: #3a1170;
    }
  }
`;

export const LightPurpleButton = styled(BaseButton)`
  && {
    background-color: ${colors.secondary};
    color: #fff;
    &:hover {
      background-color: #3632b2;
    }
  }
`;

export const GreenButton = styled(SuccessButton)``;

export const BrownButton = styled(BaseButton)`
  && {
    background-color: #3e2723;
    color: white;
    &:hover {
      background-color: #2d1e1a;
    }
  }
`;

export const IndigoButton = styled(BaseButton)`
  && {
    background-color: #303f9f;
    color: white;
    &:hover {
      background-color: #26327d;
    }
  }
`;

// Icon buttons
export const RoundIconButton = styled(IconButton)`
  && {
    background-color: ${props => props.bgcolor || 'transparent'};
    color: ${props => props.iconcolor || colors.dark};
    transition: all 0.3s ease;
    
    &:hover {
      background-color: ${props => props.hoverbg || 'rgba(0, 0, 0, 0.08)'};
      transform: scale(1.1);
    }
  }
`;

// Floating action button
export const FloatingActionButton = styled(Button)`
  && {
    position: fixed;
    bottom: 24px;
    right: 24px;
    border-radius: 50%;
    min-width: 56px;
    height: 56px;
    padding: 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    z-index: 1000;
    background-color: ${colors.primary};
    color: white;
    
    &:hover {
      background-color: ${colors.secondary};
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }
  }
`;