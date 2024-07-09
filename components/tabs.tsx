import { createContext, useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { docking } from "@/utils/docking";

interface TabsContextProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}
const TabsContext = createContext<TabsContextProps>({
  activeTab: "",
  setActiveTab: () => {},
});

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}
function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View
      className={docking(
        "flex w-full flex-row justify-center rounded bg-muted p-1",
        className,
      )}
      {...props}
    />
  );
}

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
  value: string;
  title: string;
  textClasses?: string;
}
function TabsTrigger({
  value,
  title,
  className,
  textClasses,
  ...props
}: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <TouchableOpacity
      className={docking("w-1/2 rounded bg-muted px-8 py-3", className, {
        "bg-appBlue": activeTab === value,
      })}
      onPress={() => setActiveTab(value)}
      {...props}>
      <Text
        className={docking(
          "text-center font-medium text-muted-foreground",
          { "text-background": activeTab === value },
          textClasses,
        )}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  value: string;
}
function TabsContent({ value, className, ...props }: TabsContentProps) {
  const { activeTab } = useContext(TabsContext);

  if (value === activeTab)
    return <View className={docking("mt-4 w-full", className)} {...props} />;

  return null;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
