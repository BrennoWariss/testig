type Props = {
  onClick: () => void;
};

export function SwapButton({ onClick }: Props) {
  return (
    <button type="button" className="swap" onClick={onClick} aria-label="Swap currencies" title="Swap">
      ⇄ Swap
    </button>
  );
}

