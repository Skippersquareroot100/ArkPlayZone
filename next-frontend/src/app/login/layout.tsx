import Image from "next/image";
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 

  return (
    <div className="min-h-screen bg-theme text-theme p-6 ">
      <header className="flex">
        <Image
          src="/assets/photos/logo.png"
          width={56}
          height={56}
          alt="ARK PLAYZONE"
          priority
          className="h-14 w-auto"
        />
        <h1 className="text-4xl font-bold mt-5">ARK PLAYZONE</h1>
      </header>
        {children}
      <footer >
        <p className="text-center mt-80 text-sm ">
          © {new Date().getFullYear()} ARKEVER LTD. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
