interface ControllerProps {
  images: string[];
  currentIndex: number;
  onNextSlide: () => void;
  resetKey: number;
}

const Controller = ({
  images,
  currentIndex,
  onNextSlide,
  resetKey,
}: ControllerProps) => {
  const totalSlides = images.length;
  const nextIndex = (currentIndex + 1) % totalSlides;
  const nextImage = images[nextIndex];

  return (
    <div className="absolute bottom-8 left-[25px] md:left-[135px] flex items-center gap-[30px]">
      <div
        className="relative w-[115px] h-[115px] md:w-[140px] md:h-[140px] cursor-pointer group p-[22px]"
        onClick={onNextSlide}
      >
        <div
          key={resetKey}
          className="absolute inset-0 pointer-events-none"
          style={{
            padding: "2px",
          }}
        >
          <div className="w-full h-full border border-light relative">
            <div className="absolute top-0 left-0 right-0 h-[8px] bg-light animate-border-top -translate-y-1 w-[113px] md:w-[138px]" />
            <div className="absolute top-0 right-0 bottom-0 w-[8px] bg-light animate-border-right translate-x-1 md:h-[134px]" />
            <div className="absolute bottom-0 left-0 right-0 h-[8px] bg-light animate-border-bottom translate-y-1  w-[113px] md:w-[138px]" />
            <div className="absolute top-0 left-0 bottom-0 w-[8px] bg-light animate-border-left -translate-x-1 h-[113px] md:h-[138px]" />
          </div>
        </div>

        <div className="relative w-full h-full">
          <img
            src={nextImage}
            alt="Next slide"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-light text-base cursor-pointer transition-transform duration-300 hover:scale-110">
              Next
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[17px]">
        <span className="text-light text-base font-light">
          {String(currentIndex + 1).padStart(2, "0")}
        </span>
        <div className="w-[103px] h-px bg-light"></div>
        <span className="text-light text-base font-light">
          {String(totalSlides).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default Controller;
