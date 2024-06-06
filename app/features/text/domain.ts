export const Text = {
  pluralize: (
    count: number,
    {
      singular,
      plural = `${singular}s`,
    }: { singular: string; plural?: string },
  ) => (count === 1 ? singular : plural),
}
