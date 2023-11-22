"use client";

import React, { useMemo } from "react";
import { useSession } from "./_hooks/useSession";
import Progress from "./_components/Progress";
import Controls from "./_components/Controls";
import { Runtime } from "@/lib/types";
import { BPM } from "@/lib/constants";
import RunTimer from "./_components/RunTimer";
import BackButton from "./_components/BackButton";

const RunPage = ({
  searchParams: { runtime },
}: {
  searchParams: { runtime: string };
}) => {
  const parsedRuntime = useMemo(() => JSON.parse(runtime), [runtime]);
  if (runtime) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <BackButton />
        <RunTimer runtime={parsedRuntime} />
      </div>
    );
  }
  return <div className="flex items-center justify-between">No run found</div>;
};

export default RunPage;
