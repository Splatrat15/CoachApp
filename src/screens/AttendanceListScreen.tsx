import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Platform, Pressable, Text, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { StatusBadge } from '../components/StatusBadge';
import { useAttendance } from '../context/AttendanceContext';
import { ROSTER } from '../data/roster';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'AttendanceList'>;

export function AttendanceListScreen({ navigation }: Props) {
  const { getStatus } = useAttendance();
  const { colors } = useTheme();
  const styles = useThemedStyles((theme) => ({
    list: {
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.xl,
    },
    separator: {
      height: theme.spacing.sm,
    },
    row: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      minHeight: theme.ms(56),
      ...(Platform.OS === 'android'
        ? { elevation: 1 }
        : {
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 3,
          }),
    },
    rowPressed: {
      borderColor: theme.colors.borderFocus,
      backgroundColor: theme.colors.pressedAccent,
    },
    name: {
      ...theme.typography.body,
      flex: 1,
      color: theme.colors.text,
      marginRight: theme.spacing.sm,
    },
    unmarked: {
      width: theme.ms(10),
      height: theme.ms(10),
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.unmarked,
    },
  }));

  return (
    <ScreenContainer edges={['bottom']}>
      <FlatList
        data={ROSTER}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          const status = getStatus(item.id);

          return (
            <Pressable
              style={({ pressed }) => [
                styles.row,
                pressed && styles.rowPressed,
              ]}
              android_ripple={{ color: colors.pressedAccent }}
              onPress={() =>
                navigation.navigate('AttendanceDetail', {
                  personId: item.id,
                  name: item.name,
                })
              }>
              <Text style={styles.name} numberOfLines={2}>
                {item.name}
              </Text>
              {status ? (
                <StatusBadge status={status} compact />
              ) : (
                <View style={styles.unmarked} />
              )}
            </Pressable>
          );
        }}
      />
    </ScreenContainer>
  );
}
