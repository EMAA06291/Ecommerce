import amazonPayLogo from "../../assets/images/amazon-pay.png";

import amircanExpressLogo from "../../assets/images/American-Express-Color.png";

import mastercardLogo from "../../assets/images/mastercard.webp";

import paypalLogo from "../../assets/images/paypal.png";

import appStoreLogo from "../../assets/images/get-apple-store.png";

import googlePlayLogo from "../../assets/images/get-google-play.png";

export default function Footer() {
  return (
    <footer className=" bg-slate-100 py-8 mt-2 ">
      <div className="container space-y-4 ">
        <header>
          <h2 className="text-sm font-semibold text-slate-500-800 ">
            {" "}
            Get the fresh cart App{" "}
          </h2>

          <p className="text-slate-500-400">
            we will send you a link, open it on your phone to download the app
          </p>
        </header>

        <div className="flex gap-2 xsm:flex-col sm:flex-col md:flex-row">
          <input
            type="email"
            name="emaii"
            placeholder="enter your email"
            className=" grow form-control"
          />

          <button className="btn ms-2 uppercase font-semibold bg-primary-80 hover:bg-primary-400 text-white">
            share app link
          </button>
        </div>

        <div className=" ">
          <div className="flex justify-between items-center py-4 border-y-2 border-slate-300 border-opacity-50 ">
            <div className="payment-partners flex gap-3 items-center xsm:flex-col md:flex-row">
              <h3>payment partners </h3>
              <img
                className="w-16"
                src={amazonPayLogo}
                alt="amamzon pay logo"
              />
              <img
                className="w-16"
                src={amircanExpressLogo}
                alt="american express logo"
              />
              <img
                className="w-20"
                src={mastercardLogo}
                alt=" master card logo"
              />
              <img className="w-16" src={paypalLogo} alt="pay pal logo" />
            </div>

            <div className="download flex gap-3 items-center xsm:flex-col md:flex-row">
              <h3>get delivers with FreshCart</h3>
              <img
                className="w-28"
                src={googlePlayLogo}
                alt="google play logo"
              />
              <img
                className="w-[107px]"
                src={appStoreLogo}
                alt="app Store Logo"
              />
            </div>
          </div>
        </div>

        <ul className="flex gap-5 items-center">
          <li>
            <a href="https://instagram.com" target="_blank">
              <i className="fa-brands fa-instagram text-slate-500"></i>
            </a>
          </li>

          <li>
            <a href="https://facebook.com" target="_blank">
              <i className="fa-brands fa-facebook text-slate-500"></i>
            </a>
          </li>

          <li>
            <a href="https://tiktok.com" target="_blank">
              <i className="fa-brands fa-tiktok text-slate-500"></i>
            </a>
          </li>

          <li>
            <a href="https://twitter.com" target="_blank">
              <i className="fa-brands fa-twitter text-slate-500"></i>
            </a>
          </li>

          <li>
            <a href="https://linkedin.com" target="_blank">
              <i className="fa-brands fa-linkedin text-slate-500"></i>
            </a>
          </li>

          <li>
            <a href="https://youtube.com" target="_blank">
              <i className="fa-brands fa-youtube text-slate-500"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
