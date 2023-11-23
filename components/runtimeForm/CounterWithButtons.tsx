"use client";

import { MinusCircle, PlusCircle } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const CounterWithButtons = ({
  increment,
  decrement,
  canIncrement,
  canDecrement,
  children,
}: {
  increment: () => void;
  decrement: () => void;
  canIncrement: boolean;
  canDecrement: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full flex items-center gap-x-2">
      <Button
        variant="ghost"
        size="icon"
        shape="round"
        className="flex-none"
        onClick={decrement}
        disabled={!canDecrement}
      >
        <MinusCircle />
      </Button>
      <div className="grow cursor-default select-none	">{children}</div>
      <Button
        variant="ghost"
        size="icon"
        shape="round"
        className="flex-none"
        onClick={increment}
        disabled={!canIncrement}
      >
        <PlusCircle />
      </Button>
    </div>
  );
};

export default CounterWithButtons;
