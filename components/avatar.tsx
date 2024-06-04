import { forwardRef, useState } from 'react';
import { Image, Text, View } from 'react-native';

import { docking } from '@/utils/docking';

const Avatar = forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={docking(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
));
Avatar.displayName = 'Avatar';

const AvatarImage = forwardRef<
  React.ElementRef<typeof Image>,
  React.ComponentPropsWithoutRef<typeof Image>
>(({ className, ...props }, ref) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }
  return (
    <Image
      ref={ref}
      onError={() => setHasError(true)}
      className={docking('aspect-square h-full w-full', className)}
      {...props}
    />
  );
});
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { textClassname?: string }
>(({ children, className, textClassname, ...props }, ref) => (
  <View
    ref={ref}
    className={docking(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className
    )}
    {...props}
  >
    <Text className={docking('text-lg text-primary', textClassname)}>
      {children}
    </Text>
  </View>
));
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };