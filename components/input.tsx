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
    <View
      className={docking('w-full flex flex-col gap-1', className)}>
      {label && (
        <Text className={docking('text-base', labelClasses)}>
          {label}
        </Text>
      )}
      <TextInput
        ref={ref}
        className={docking(
          inputClasses,
          'w-full px-3 flex justify-center items-center border border-input h-12 rounded-lg text-slate-400'
        )}
        {...props}
      />
    </View>
  )
);

Input.displayName = 'Input';

export { Input };
