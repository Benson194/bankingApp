import { StyleSheet } from 'react-native'
import { theme } from './theme'

export const commonStyles = StyleSheet.create({
  /** Layout **/
  container: {
    flex: 1,
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.small,
  },

  /** Typography **/
  heading1: {
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.large,
  },
  heading2: {
    fontSize: theme.fontSize.medium,
    fontWeight: '600',
  },
  subheading1: {
    fontSize: theme.fontSize.medium,
  },
  errorText: {
    fontSize: theme.fontSize.small,
    color: theme.colors.error,
    marginBottom: theme.spacing.medium,
  },

  /** Input Fields **/
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    borderRadius: theme.borderRadius.small,
    backgroundColor: theme.colors.white,
  },

  /** Buttons **/
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: theme.borderRadius.large,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.medium,
    fontWeight: 'bold',
  },
})
