import Terms from "./Terms";

const Footer = () => {
  return (
    <footer className="bg-[#8DB600] py-5 -mb-8 w-full">
      <div className="mt-8 text-center lg:mx-auto mx-5">
        <p className="text-black ">
          2024 &copy; WoodWork. Todos los derechos reservados.
        </p>
        <p className="text-black font-thin">No-Country | s15-17-t</p>
        <Terms />
      </div>
    </footer>
  );
};

export default Footer;
