import React from 'react';
import { Button } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled: boolean;
}

const AppButton = ({ title, onPress, disabled }: ButtonProps) => {
  return (
    <Button title={title} onPress={onPress} disabled={disabled} />
  );
};

export default AppButton;
