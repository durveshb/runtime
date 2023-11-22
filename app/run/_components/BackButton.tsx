import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const BackButton = () => {
  return (
    <Button
      asChild
      className="absolute top-6 left-2 rounded"
      variant="secondary"
    >
      <Link href="/" className="flex gap-2">
        <ArrowLeft size={15} />
        Back
      </Link>
    </Button>
  );
};

export default BackButton;
