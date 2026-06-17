export function factParts(value: string) {
  const match = value.match(/^([\d,.]+)(.*)$/);
  if (!match) return { target: 0, suffix: value, decimals: 0 };
  const target = Number(match[1].replaceAll(",", ""));
  return {
    target,
    suffix: match[2],
    decimals: match[1].includes(".") ? 1 : 0,
  };
}

export function nextIndex(current: number, length: number) {
  if (length <= 0) return 0;
  return (current + 1) % length;
}
