import { StyleSheet, View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';

type ScreenContainerProps = ViewProps & {
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
};

/**
 * Centers content on tablets and large Android screens (fluid max-width).
 */
export function ScreenContainer({
  children,
  style,
  edges = ['bottom'],
  ...rest
}: ScreenContainerProps) {
  const { colors, layout } = useTheme();

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
      edges={edges}
      {...rest}>
      <View
        style={[
          styles.inner,
          {
            maxWidth: layout.contentMaxWidth,
            paddingHorizontal: layout.horizontalPadding,
          },
          style,
        ]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: 'center',
  },
  inner: {
    flex: 1,
    width: '100%',
  },
});
