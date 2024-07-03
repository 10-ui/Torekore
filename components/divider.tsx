import React from "react";
import { View } from "react-native";
import { docking } from "@/utils/docking";

export interface DividerProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  orientation?: "horizontal" | "vertical";
}

const Divider = React.forwardRef<React.ElementRef<typeof View>, DividerProps>(
  ({ orientation = "horizontal", className, ...props }, ref) => {
    return (
      <View
        className={docking(
          "my-4 bg-slate-300",
          orientation === "vertical" ? "h-full w-[1px]" : "h-[1px] w-full",
          className,
        )}
        {...props}
        ref={ref}
      />
    );
  },
);

Divider.displayName = "Divider";

export { Divider };
