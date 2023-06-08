function Footer() {
  return (
    <>
      <div className="bg-blue-950 text-white  px-5 py-3 mt-5">
        <div className="flex flex-col justify-center text-left sm:flex-row sm:items-end sm:justify-around">
          <ul className="my-1">
            <img
              src="../../assests/logo1-removebg-preview.png"
              alt="logo"
              className="h-20"
            />
            {/* <li>SWARNA ALANKARA</li> */}
            <li>Unleash Your Style with Gold and Silver Splendor</li>
            <li>Privacy policy</li>
            <li>Terms of Use</li>
            <li>© 2023 SWARNA ALANKARA</li>
          </ul>
          <ul className="my-1">
            <li>Connect</li>
            <li>
              <a href="https://github.com/VijayalakshmiGanesh">GitHub</a>
            </li>
            <li>
              <a href="https://twitter.com/VIJAYALAKSHMIG4">Twitter</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/vijayalakshmi-g-182a061a9">
                LinkedIn
              </a>
            </li>
          </ul>
          <ul className="my-1">
            <li>Resources</li>

            <li>
              <a href="/signup">Sign Up</a>
            </li>
            <li>
              <a href="/login">Sign In</a>
            </li>
            <li>
              <a href="/" className="invisible">
                dummy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
