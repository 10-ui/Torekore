import React from "react";
import { docking } from "@/utils/docking";
import { Text, TextInput, View } from "react-native";

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
}
const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, ...props }, ref) => (
    <View className={docking("flex w-full flex-col gap-1", className)}>
      {label && (
        <Text className={docking("text-base", labelClasses)}>{label}</Text>
      )}
      <TextInput
        ref={ref}
        className={docking(
          "flex h-12 w-full items-center justify-center rounded-lg border border-input px-3 text-slate-400",
          className,
        )}
        {...props}
      />
    </View>
  ),
);

Input.displayName = "Input";

export { Input };
