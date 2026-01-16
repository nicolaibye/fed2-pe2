import { useState, useRef } from "react";
import {
  BinocularsIcon,
  CaretLeftIcon,
  CaretRightIcon,
  LeafIcon,
  PersonSimpleHikeIcon,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const slides = [
  {
    icon: PersonSimpleHikeIcon,
    title: "We believe in the people",
    text: "For the betterment of now and the future. People will be a pivotal player in our success.",
    link: "Our mission",
  },
  {
    icon: LeafIcon,
    title: "We believe in sustainability",
    text: "Thoughtful choices today create lasting impact. Responsibility guides how we move forward.",
    link: "Our cause",
  },
  {
    icon: BinocularsIcon,
    title: "We believe in exploration",
    text: "Progress comes from curiosity. Exploring new ideas keeps us evolving and relevant.",
    link: "Our beliefs",
  },
];

function Card({ slide }: { slide: (typeof slides)[number] }) {
  const Icon = slide.icon;

  return (
    <div className="flex flex-col gap-3 items-center justify-center p-4 px-10 pb-8">
      <Icon size={60} weight="duotone" />
      <div className="font-sans flex flex-col gap-1 text-center">
        <h3 className="text-2xl font-serif font-bold leading-6">
          {slide.title}
        </h3>
        <p className="leading-4">{slide.text}</p>
        <Link to="/" className="underline font-bold">
          {slide.link}
        </Link>
      </div>
    </div>
  );
}

function MobileCarousel() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SWIPE_THRESHOLD = 50;

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.targetTouches[0].clientX;
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchEndX.current = e.targetTouches[0].clientX;
  }

  function handleTouchEnd() {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;

    if (distance > SWIPE_THRESHOLD) {
      next(); // swipe left → next slide
    } else if (distance < -SWIPE_THRESHOLD) {
      prev(); // swipe right → previous slide
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }

  function next() {
    setActive((i) => (i + 1) % slides.length);
  }

  function prev() {
    setActive((i) => (i - 1 + slides.length) % slides.length);
  }
  return (
    <div
      className="relative overflow-hidden md:hidden bg-hdYellow cut-corner"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="min-w-full">
            <Card slide={slide} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2 mt-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1 w-1 rotate-45 ${
              i === active ? "bg-hdBlack" : "bg-hdBlack/25"
            }`}
          />
        ))}
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2">
        <button onClick={prev} className="text-hdBlack rounded-full">
          <CaretLeftIcon size={24} weight="bold" />
        </button>
        <button onClick={next} className="text-hdBlack rounded-full">
          <CaretRightIcon size={24} weight="bold" />
        </button>
      </div>
    </div>
  );
}
export default MobileCarousel;
