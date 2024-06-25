import React from "react";
import { docking } from "@/utils/docking";
import { type VariantProps, cva } from "class-variance-authority";
import { Text, TextInput, View } from "react-native";
import ExpoImage from "@/components/expo-image";

const inputVariants = cva(
  "flex h-12 w-full items-center justify-center border border-input p-3 text-slate-400",
  {
    variants: {
      variant: {
        default: "bg-appLightBlue rounded-lg",
        card: "bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput>,
    VariantProps<typeof inputVariants> {
  label?: string;
  labelClasses?: string;
  source?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, source, variant, ...props }, ref) => (
    <>
      <View className={docking("flex w-full flex-col gap-1", className)}>
        {label && (
          <Text className={docking("text-base", { className: labelClasses })}>
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          className={docking(className, inputVariants({ variant }))}
          {...props}
        />
        {source && (
          <ExpoImage
            source={source}
            className='absolute bottom-4 right-3 h-5 w-5'
          />
        )}
      </View>
    </>
  ),
);

Input.displayName = "Input";

export { Input };
