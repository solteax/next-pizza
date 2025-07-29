export const getVaLidTranslation = ({
  key,
  defaultValue,
  t,
}: {
  key?: string | null
  defaultValue: string
  t: (key: string) => string
}) => {
  return key && t(key) ? t(key) : defaultValue
}
