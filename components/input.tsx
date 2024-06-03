import React from 'react';
import { docking } from '@/utils/docking';
import { Text, TextInput, View } from 'react-native';

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
}
const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  InputProps
>(
  (
    { className, label, labelClasses, inputClasses, ...props },
    ref
  ) => (
    <View className={docking('flex flex-col gap-1.5', className)}>
      {label && (
        <Text className={docking('text-base', labelClasses)}>
          {label}
        </Text>
      )}
      <TextInput
        ref={ref}
        className={docking(
          inputClasses,
          'border border-input py-2.5 px-4 rounded-lg'
        )}
        {...props}
      />
    </View>
  )
);

Input.displayName = 'Input';

export { Input };
