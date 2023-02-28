import React, { useState, type FC } from "react";
import cls from "classnames";

export interface ToggleProps {
  initialValue?: boolean;
  className?: string;
  label: string;
  onSwitchOn?: () => void;
  onSwitchOff?: () => void;
}

export const Toggle: FC<ToggleProps> = ({
  className = "",
  initialValue = false,
  label,
  onSwitchOn,
  onSwitchOff,
}: ToggleProps) => {
  const [status, setStatus] = useState(initialValue);

  const onClick = () => {
    if (status && onSwitchOff) {
      onSwitchOff();
    }
    if (!status && onSwitchOn) {
      onSwitchOn();
    }
    setStatus(!status);
  };

  const containerClass = () => {
    return cls(
      "flex-none relative mr-3 h-5 w-9 rounded-full p-1 duration-200 ",
      {
        "bg-kale-500 dark:bg-red-600": status,
        "bg-grey-300 dark:bg-zinc-400": !status,
      }
    );
  };

  const cursorClass = () => {
    return cls("absolute h-3 w-3 rounded-full duration-200 bg-white ", {
      "left-5 dark:bg-kale-100": status,
      "left-1 dark:bg-kale-700": !status,
    });
  };

  className += " flex cursor-pointer select-none items-center";

  return (
    <label className={className} onClick={onClick}>
      <span className={containerClass()}>
        <span className={cursorClass()}></span>
      </span>

      <span className="block text-sm font-medium text-black dark:text-white">
        {label}
      </span>
    </label>
  );
};
