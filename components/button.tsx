import React from "react";
import { docking } from "@/utils/docking";
import { type VariantProps, cva } from "class-variance-authority";
import { Pressable, Text, View } from "react-native";
import ExpoImage from "@/components/expo-image";

const buttonVariants = cva(
  "rounded-md flex items-center justify-center w-full h-15",
  {
    variants: {
      variant: {
        default: "bg-appBlue",
        outline: "bg-transparent border border-2 border-appBlue",
        withicon:
          "items-start px-20 bg-transparent border border-2 border-appBlue",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const buttonTextVariants = cva("text-white text-base", {
  variants: {
    variant: {
      default: "text-white",
      outline: "text-appBlue",
      withicon: "text-appBlue",
    },
  },
});

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  label: string;
  labelClasses?: string;
  source?: string;
}

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ label, labelClasses, variant, className, source, ...props }, ref) => {
  return (
    <Pressable
      className={docking(buttonVariants({ variant }), className)}
      {...props}
      ref={ref}>
      {source ? (
        <View className='flex flex-row items-center justify-center gap-4'>
          <ExpoImage source={source} className='h-7 w-7' />
          <Text
            className={docking(buttonTextVariants({ variant }), {
              className: labelClasses,
            })}>
            {label}
          </Text>
        </View>
      ) : (
        <Text
          className={docking(buttonTextVariants({ variant }), {
            className: labelClasses,
          })}>
          {label}
        </Text>
      )}
    </Pressable>
  );
});

Button.displayName = "Button";

export { Button };
