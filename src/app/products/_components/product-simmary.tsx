"use client";
import React from "react";


export default function Summary({ summary }: { summary: string }) {
  return (
    <section className="relative  text-xl overflow-hidden ">
      <div className="" dangerouslySetInnerHTML={{ __html: summary }}></div>
    </section>
  );
}
