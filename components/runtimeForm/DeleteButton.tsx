import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { ClassNameValue } from "tailwind-merge";

const DeleteButton = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className: string;
}) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      shape="round"
      className={className}
    >
      <Trash2 size={15} />
    </Button>
  );
};

export default DeleteButton;
