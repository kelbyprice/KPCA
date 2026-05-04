type ArrowProps = {
  className?: string;
};

export function Arrow({ className = "" }: ArrowProps) {
  const cls = `arr ${className}`.trim();
  return (
    <svg
      className={cls}
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 1L13 5L9 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
      <path
        d="M0 5H13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  );
}
