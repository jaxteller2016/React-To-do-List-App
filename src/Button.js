export default function Button({
  className,
  textColor,
  bgColor,
  onClick,
  children
}) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}
