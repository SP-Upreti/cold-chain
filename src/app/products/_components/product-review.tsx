"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const reviews = [
  {
    name: "Emily Carter",
    role: "Verified Buyer",
    title: "Quick and Easy Experience",
    rating: 5,
    time: "2 days ago",
    comment:
      "Everything was seamless. Ordering was simple and the response time was super fast. Highly recommend to anyone looking for convenience and speed.",
    image: "https://readymadeui.com/team-2.webp",
  },
  {
    name: "Daniel Kim",
    role: "Verified Buyer",
    title: "Fantastic Support",
    rating: 5,
    time: "3 days ago",
    comment:
      "Had a few questions before ordering and the customer service team was amazing—super responsive and knowledgeable. It really made a difference!",
    image: "https://readymadeui.com/team-3.webp",
  },
  {
    name: "Priya Singh",
    role: "Verified Buyer",
    title: "Exceeded Expectations",
    rating: 5,
    time: "4 days ago",
    comment:
      "From start to finish, I felt taken care of. The ordering process was smooth and the delivery was right on time. Would definitely use this service again.",
    image: "https://readymadeui.com/team-4.webp",
  },
  {
    name: "Emily Carter",
    role: "Verified Buyer",
    title: "Quick and Easy Experience",
    rating: 5,
    time: "2 days ago",
    comment:
      "Everything was seamless. Ordering was simple and the response time was super fast. Highly recommend to anyone looking for convenience and speed.",
    image: "https://readymadeui.com/team-2.webp",
  },
  {
    name: "Liam Brown",
    role: "Verified Buyer",
    title: "Highly Recommended",
    rating: 5,
    time: "5 days ago",
    comment:
      "Very impressed by the quality and speed. It’s rare to see this level of dedication these days. I’ll definitely be coming back.",
    image: "https://readymadeui.com/team-5.webp",
  },
  {
    name: "Priya Singh",
    role: "Verified Buyer",
    title: "Exceeded Expectations",
    rating: 5,
    time: "4 days ago",
    comment:
      "From start to finish, I felt taken care of. The ordering process was smooth and the delivery was right on time. Would definitely use this service again.",
    image: "https://readymadeui.com/team-4.webp",
  },
];

export default function ProductReview() {
  const cardContainer = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // spacing between animations
      },
    },
  };

  // const cardItem = {
  //   hidden: { opacity: 50, x: -40 },
  //   show: {
  //     opacity: 1,
  //     x: 0,
  //     transition: { duration: 0.3, ease: "linear" },
  //   },
  // };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Customers Say
        </motion.h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-12">
          Real feedback from real users. Here’s how our customers describe their
          experience.
        </p>

        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-3xl  p-8 border border-gray-100 text-left hover:shadow transition-all duration-300"
              initial={{
                opacity: 40, y: 40,
              }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "linear", delay: i * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full border border-gray-300"
                />
                <div>
                  <p className="font-semibold text-gray-900">{review.name}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <Icon
                      icon="mdi:check-decagram"
                      className="text-green-500"
                    />
                    {review.role}
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {review.title}
              </h3>
              <div className="flex items-center mb-3">
                {[...Array(review.rating)].map((_, index) => (
                  <Icon
                    key={index}
                    icon="mdi:star"
                    className="text-yellow-400 w-5 h-5"
                  />
                ))}
                <span className="text-sm text-gray-400 ml-2">
                  {review.time}
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed">{review.comment}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-14"
          initial={{ opacity: 40 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button className="px-8 py-3 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-all">
            Read More Reviews
          </button>
        </motion.div>
      </div>
    </section>
  );
}
