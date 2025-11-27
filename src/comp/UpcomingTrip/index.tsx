function UpcomingTrip() {
  return (
    <li className={`w-full h-auto flex flex-col base-shadow`}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR3p565lkyXBLlkNemqfGmUAWtVxN5XT6cQg&s"
        alt=""
        className={`object-cover rounded-t-xs aspect-5/2`}
      />
      <div
        className={`font-sans flex-5 bg-hdYellow p-2 flex flex-col rounded-b-xs`}
      >
        <h3 className="font-sans font-bold leading-5">Clarion Hotel The Hub</h3>
        <div className="flex flex-row items-center gap-2 text-sm">
          <p>Milan, Italy</p>
          <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
          <p>21-27 December 2025</p>
        </div>
      </div>
    </li>
  );
}

export default UpcomingTrip;
