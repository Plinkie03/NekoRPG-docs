import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex px-40 py-20 text-white font-sans">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-2">You’ve wandered into the wrong realm...</h2>
        <p className="text-lg mb-6">This page is lost somewhere in the forest, like a forgotten quest item.</p>

        <div className={`bg-secondary p-6 rounded-lg shadow-lg text-center max-w-md mx-auto mb-6`}>
          <h3 className="text-2xl font-semibold">What now?</h3>
          <p className="mb-4">You can return to safety by heading back to the main page or exploring your options.</p>
          <Link href="/">
            <span className={`inline-block text-xl color-theme`}>Return to the homepage</span>
          </Link>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <img
            src="https://cdn.discordapp.com/avatars/1104838193276268705/ad5f179d35ae4ee4ba5334367144a2be.webp" // Not gonna use a bot of mine to get a avatar update this manually
            alt="Bot Avatar"
            className="w-16 h-16 rounded-full"
          />
          <p className="text-xl">I can help you find your way!</p>
        </div>
      </div>
    </div>
  );
};
