export function Empty({ hidden }: { hidden?: boolean }) {
  return <div className={`cell ${hidden ? "event" : undefined}`} />;
}
