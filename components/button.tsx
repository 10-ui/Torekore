import React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { docking } from '@/utils/docking';
import { Pressable, Text, TouchableOpacity } from 'react-native';

const buttonVariants = cva(
  'rounded-md flex items-center justify-center w-full h-15',
  {
    variants: {
      variant: {
        default: 'bg-appBlue',
        outline: 'bg-transparent border border-2 border-appBlue',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const buttonTextVariants = cva('text-white text-base', {
  variants: {
    variant: {
      default: 'text-white',
      outline: 'text-appBlue',
    },
  },
});

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  label: string;
  labelClasses?: string;
}

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    { label, labelClasses, variant, className, onPress, ...props },
    ref
  ) => {
    return (
      <Pressable
        className={docking(buttonVariants({ variant }), className)}
        onPress={onPress}
        {...props}>
        <Text
          className={docking(buttonTextVariants({ variant }), {
            className: labelClasses,
          })}>
          {label}
        </Text>
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

export { Button };
