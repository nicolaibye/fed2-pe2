// interface props {
//   data: {
//     id: string;
//     name: string;
//     description: string;
//     media: [
//       {
//         url: string;
//         alt: "";
//       },
//     ];
//     price: number;
//     maxGuests: number;
//     rating: number;
//     created: string;
//     updated: string;
//     meta: {
//       wifi: boolean;
//       parking: boolean;
//       breakfast: boolean;
//       pets: boolean;
//     };
//     location: {
//       address: string;
//       city: string;
//       zip: string;
//       country: string;
//       continent: string;
//       lat: number;
//       lng: number;
//     };
//     owner: {
//       name: string;
//       email: string;
//       bio: string;
//       avatar: {
//         url: string;
//         alt: "";
//       };
//     };
//     bookings: [
//       {
//         id: string;
//         dateFrom: string;
//         dateTo: string;
//         guests: number;
//         created: string;
//         updated: string;
//         customer: {
//           name: string;
//           email: string;
//           bio: string;
//           avatar: {
//             url: string;
//             alt: "";
//           };
//           banner: {
//             url: string;
//             alt: "";
//           };
//         };
//       },
//     ];
//     _count: {
//       bookings: number;
//     };
//   };
// }

function VenueLandscapeListing() {
  // const { id, name, description, media, price, rating } = data;
  return (
    <li className={`max-w-[90%] h-fit rounded-sm flex flex-col`}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR3p565lkyXBLlkNemqfGmUAWtVxN5XT6cQg&s"
        alt=""
        className="w-full max-h-[55%] object-cover"
      />
      <div className="flex flex-row">
        <div className="font-sans w-60 bg-hdYellow p-2 flex flex-col gap-2">
          <div>
            <h3 className="font-sans font-bold leading-5">
              Clarion Hotel The Hub
            </h3>
            <p>Milan, Italy</p>
          </div>
          <div className="flex flex-row items-center gap-2 text-sm">
            <p>4.77</p>
            <div className="bg-hdBlack w-0.5 h-0.5 rounded-full"></div>
            <p>
              <span className="font-bold">£500</span> for 4 nights
            </p>
          </div>
        </div>
        <button className="bg-hdRed font-light text-hdWhite leading-5">
          Express Booking
        </button>
      </div>
    </li>
  );
}

export default VenueLandscapeListing;
