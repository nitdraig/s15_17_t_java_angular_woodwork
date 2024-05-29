import Terms from "./Terms";

const Footer = () => {
  return (
    <footer className="bg-[#010101] py-5 -mb-8 w-full">
      <div className="mt-8 text-center">
        <p className="text-white">
          2024 &copy; WoodWork. Todos los derechos reservados.
        </p>
        <p className="text-white font-thin">No-Country | s15-17-t</p>
        <Terms />
      </div>
    </footer>
  );
};

export default Footer;
