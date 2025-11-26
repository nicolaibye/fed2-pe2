function MobileReserveBar() {
  return (
    <div className="fixed bottom-15 left-0 w-full h-14 md:hidden bg-hdRed text-hdWhite flex md:hidden gap-8 items-center justify-center z-1000">
      <div className="absolute inset-1 bg-[url(/SwirlPattern.svg)] w-full h-full top-0 left-0 bg-repeat"></div>
      <div className="flex flex-col items-start text-sm font-light z-1001">
        <p>
          <span className="font-bold">£500</span> for 4 nights
        </p>
        <p>21 - 24 May 2025</p>
      </div>
      <button className="text-lg font-bold font-serif px-3 py-1 text-hdBlack bg-hdWhite cut-corner z-1001">
        Reserve
      </button>
    </div>
  );
}

export default MobileReserveBar;
