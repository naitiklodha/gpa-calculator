const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center h-12  bg-seagreen bottom-0 fixed w-screen text-dm-black font-roboto md:h-16">
      <h1>
        Developed with <span className="animate-pulse">❤️</span> by{" "}
        <a
          href="https://naitik-lodha.netlify.app/"
          className="text-pink-700 font-bold italic underline hover:text-slate-950"
        >
          Naitik Lodha
        </a>
      </h1>
    </footer>
  );
};
export default Footer;
