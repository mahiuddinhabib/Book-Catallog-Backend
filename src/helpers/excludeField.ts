export function excludeField<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  return Object.fromEntries(
    Object.entries(user as any).filter(([key]) => !keys.includes(key as any))
  ) as Omit<User, Key>;
}
