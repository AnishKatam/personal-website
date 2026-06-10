export default function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(1100px 700px at 75% -10%, rgba(80,100,160,0.16), transparent 65%), radial-gradient(900px 600px at 0% 100%, rgba(60,70,110,0.12), transparent 60%)",
      }}
    />
  );
}
