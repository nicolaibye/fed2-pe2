import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-hdRed text-hdWhite text-sm font-light font-sans hidden md:flex flex-col items-center w-full p-6 mt-10">
      <div className="flex flex-col items-start gap-6">
        <img src="/Holidaze_main_white.svg" alt="Holidaze logo white" />
        <div className="flex flex-row gap-25">
          <div className="flex flex-col items-start gap-2">
            <h3 className="font-bold">Company</h3>
            <ul className="flex flex-col items-start">
              {[
                "About",
                "Jobs",
                "List your property",
                "Advertising",
                "Blog",
              ].map((item) => {
                return (
                  <li key={item}>
                    <Link to="">{item}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h3 className="font-bold">Explore</h3>
            <ul className="flex flex-col items-start">
              {[
                "Destinations",
                "Experiences",
                "Travel Tips",
                "Featured Stays",
                "Partners",
              ].map((item) => {
                return (
                  <li key={item}>
                    <Link to="">{item}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h3 className="font-bold">Policies</h3>
            <ul className="flex flex-col items-start">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Accessibility",
                "Responsible Travel",
              ].map((item) => {
                return (
                  <li key={item}>
                    <Link to="">{item}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h3 className="font-bold">Help</h3>
            <ul className="flex flex-col items-start">
              {[
                "FAQs",
                "Contact Us",
                "Booking Support",
                "Cancellation Info",
                "Feedback",
              ].map((item) => {
                return (
                  <li key={item}>
                    <Link to="">{item}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="w-full h-0.5 bg-hdRedAccent"></div>
        <p className="text-xs text-center w-full">
          &copy; 2025 Holidaze Accommodation. All rights reserved. Holidaze and
          the Holidaze logo are trademarks of Holidaze Accommodation, Inc.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
