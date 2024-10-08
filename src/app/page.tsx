import { Map } from "./map/map";

export default function Home() {
  return (
    <div className="min-h-full">
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px lg:px-8">
          <Map />
        </div>
      </main>
    </div>
  );
}
