import Image from "next/image";

export default function Suspending() {
  return (
    <div
      className="suspending-window"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "white",
        zIndex: 99999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        width={75}
        height={75}
        src="/logo.webp"
        alt="logo"
        priority={true}
      />
      <div className="pulse-motion"></div>
    </div>
  );
}
