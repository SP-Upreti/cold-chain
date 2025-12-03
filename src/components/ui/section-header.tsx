import React from "react";

export default function SectionHeader({
  title,
  desc,
  descClassName,
  titleClassName
}: {
  title: string;
  desc?: string;
  icon?: React.ReactNode;
    titleClassName?: string;
    descClassName?: string;
}) {
  return (
    <div>
      <h2 className={`text-3xl font-bold text-slate-900 dark:text-slate-100 ${titleClassName}`}>{title}</h2>
      {desc && <p className={`text-muted-foreground ${descClassName}`}>{desc}</p>}
    </div>
  );
}
