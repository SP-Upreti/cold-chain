"use client";

import { Calendar, Code, FileText, User, Clock } from "lucide-react";
import RadialOrbitalTimeline from "../ui/radial-timeline";

const timelineData = [
  {
    id: 1,
    title: "Deli",
    date: "Jan 2024",
    content: "When you land on a sample web page or open an email template and see content beginning with lorem ipsum,  the page creator placed that apparent gibberish there on purpose.Page layouts look better with something in each section.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
    img:"/brands/Deli.png"
  },
  {
    id: 2,
    title: "UNV",
    date: "Feb 2024",
    content: "When you land on a sample web page or open an email template and see content beginning with lorem ipsum,  the page creator placed that apparent gibberish there on purpose.Page layouts look better with something in each section.",
    category: "Design",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
    img:"/brands/UNV.png"
  },
  {
    id: 3,
    title: "Forward",
    date: "Mar 2024",
    content: "When you land on a sample web page or open an email template and see content beginning with lorem ipsum,  the page creator placed that apparent gibberish there on purpose.Page layouts look better with something in each section.",
    category: "Development",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 60,
    img:"/brands/Forward.png"
  },
  {
    id: 4,
    title: "Ziasys",
    date: "Apr 2024",
    content: "When you land on a sample web page or open an email template and see content beginning with lorem ipsum,  the page creator placed that apparent gibberish there on purpose.Page layouts look better with something in each section.",
    category: "Testing",
    icon: User,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 30,
    img:"/brands/Ziasys.png"
  },
  {
    id: 5,
    title: "Uniarch",
    date: "May 2024",
    content: "When you land on a sample web page or open an email template and see content beginning with lorem ipsum,  the page creator placed that apparent gibberish there on purpose.Page layouts look better with something in each section.",
    category: "Release",
    icon: Clock,
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
    img:"/brands/Uniarch.png"
  },
];

export default function Divider() {
  return (
    <>
      <RadialOrbitalTimeline timelineData={timelineData} />
    </>
  );
}


