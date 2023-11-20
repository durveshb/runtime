import { Button } from "@/components/ui/button";
import { PauseIcon, PlayIcon } from "lucide-react";
import React from "react";

const Controls = ({
  isPaused,
  play,
  pause,
}: {
  isPaused: boolean;
  play: () => void;
  pause: () => void;
}) => {
  if (isPaused) {
    return (
      <Button variant="secondary" className="rounded p-6" onClick={play}>
        <PlayIcon size={20} className="text-foreground/60" />
      </Button>
    );
  }

  return (
    <Button variant="secondary" className="rounded p-6" onClick={pause}>
      <PauseIcon size={20} />
    </Button>
  );
};

export default Controls;
