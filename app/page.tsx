import { BackgroundLayers } from "@/components/BackgroundLayers";
import { TopBar } from "@/components/TopBar";
import { RadioPlayer } from "@/components/RadioPlayer";

export default function Page() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      <BackgroundLayers />
      <TopBar />
      <RadioPlayer />
    </main>
  );
}
