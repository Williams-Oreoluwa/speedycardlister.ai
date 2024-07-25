import React from "react";
import Slider from "./Slider";
const SliderData = [
  {
    id: 1,
    name: "Angela Tom",
    title: "Card Trader",
    comment:
      "You guys made it so simple and seamless the fact that all i have to do is just manually upload and AI does the rest is incredible",
    image: "/passportgirl.svg",
  },
  {
    id: 2,
    name: "Parul Walia",
    title: "Card Trader",
    comment:
      "You guys made it so simple and seamless the fact that all i have to do is just manually upload and AI does the rest is incredible",
    image: "/passportgirl.svg",
  },
  {
    id: 3,
    name: "Peter Paterson",
    title: "Card Trader",
    comment:
      "You guys made it so simple and seamless the fact that all i have to do is just manually upload and AI does the rest is incredible",
    image: "/passportgirl.svg",
  },
  {
    id: 4,
    name: "Sam Walia",
    title: "Card Trader",
    comment:
      "You guys made it so simple and seamless the fact that all i have to do is just manually upload and AI does the rest is incredible",
    image: "/passportgirl.svg",
  },
  {
    id: 5,
    name: "Parul Malia",
    title: "Card Trader",
    comment:
      "You guys made it so simple and seamless the fact that all i have to do is just manually upload and AI does the rest is incredible",
    image: "/passportgirl.svg",
  },
  {
    id: 6,
    name: "John Doe",
    title: "Card Trader",
    comment:
      "You guys made it so simple and seamless the fact that all i have to do is just manually upload and AI does the rest is incredible",
    image: "/passportgirl.svg",
  },
];
const FeedBack = () => {
  return (
    <section className="pt-12 flex items-center flex-col bg-white">
      <div className="text-center">
        <h1 className="text-2xl sm:text-[2.5rem] text-[#0304FF] font-bold uppercase">
          Feedbacks
        </h1>
        <h4 className="text-[#7A7474] px-2 mt-1 sm:text-3xl sm:leading-[42.2px]">
          Hear what our customers are saying about us
        </h4>
      </div>
      <div className="w-full h-full">
        <Slider data={SliderData} />
      </div>
    </section>
  );
};

export default FeedBack;
