import React from "react";
import { docking } from "@/utils/docking";
import { Text, TextInput, View } from "react-native";

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
  rightIcon?: React.ReactNode;
}
const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, rightIcon, ...props }, ref) => (
    <View className={docking("flex w-full flex-col gap-1", className)}>
      {label && (
        <Text className={docking("text-base", labelClasses)}>{label}</Text>
      )}
      <TextInput
        ref={ref}
        className={docking(
          "relative flex h-12 w-full items-center justify-center rounded-lg border border-input p-3 text-slate-400",
          className,
        )}
        {...props}
      />
      {rightIcon && (
        <View className='absolute right-3 top-[calc(50%+2px)] h-6 w-6 items-center justify-center p-1'>
          {rightIcon}
        </View>
      )}
    </View>
  ),
);

Input.displayName = "Input";

export { Input };
