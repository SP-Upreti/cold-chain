"use client";
import React from "react";

export default function CategoriesList({
  category,
}: {
  category: {
    id: number;
    name: string;
    slug: string;
    subcategories: { id: number; name: string; slug: string }[];
  };
}) {
  const [checked, setChecked] = React.useState<"on" | "off">("off");

  return (
    <>
      <li key={category.id} className={`flex items-center gap-3 `}>
        <label htmlFor={category.name} className="ios-checkbox red cursor-pointer">
          <input
            checked={checked === "on"}
            onChange={() => setChecked(checked === "on" ? "off" : "on")}
            id={category.name}
            type="checkbox"

          />
          <h3 className="flex gap-2">
            {/* <Icon
            icon="mynaui:chevron-down-solid"
            className={`transition-transform duration-300 ${checked === "on" ? 'rotate-0' : '-rotate-90'}`}
            /> */}
            {category.name}</h3>
        </label>
      </li>


    </>
  );
}
