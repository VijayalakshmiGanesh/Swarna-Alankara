function Footer() {
  return (
    <>
      <div className="bg-blue-950 text-white container  px-5 py-3 mt-5">
        <div className="flex justify-around text-left items-end">
          <ul>
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
          <ul>
            <li>Connect</li>
            <li>
              <a href="/">GitHub</a>
            </li>
            <li>
              <a href="/">Twitter</a>
            </li>
            <li>
              <a href="/">LinkedIn</a>
            </li>
          </ul>
          <ul>
            <li>Resources</li>

            <li>
              <a href="/">Sign Up</a>
            </li>
            <li>
              <a href="/">Sign In</a>
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
