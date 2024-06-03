import React from 'react';
import { docking } from '@/utils/docking';
import { Text, TouchableOpacity } from 'react-native';
export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
  label: string;
  labelClasses?: string;
}

const Button = React.forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  ButtonProps
>(({ label, labelClasses, className, onPress, ...props }, ref) => {
  return (
    <TouchableOpacity
      className={docking(className)}
      onPress={onPress}
      {...props}>
      <Text className={docking(labelClasses)}>{label}</Text>
    </TouchableOpacity>
  );
});

Button.displayName = 'Button';

export { Button };
