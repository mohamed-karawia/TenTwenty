interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-light z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="flex flex-col items-center justify-center h-full gap-8 px-8">
        <a
          href="#"
          className="text-2xl hover:opacity-70 transition-opacity"
          onClick={onClose}
        >
          About
        </a>
        <a
          href="#"
          className="text-2xl hover:opacity-70 transition-opacity"
          onClick={onClose}
        >
          News
        </a>
        <a
          href="#"
          className="text-2xl hover:opacity-70 transition-opacity"
          onClick={onClose}
        >
          Services
        </a>
        <a
          href="#"
          className="text-2xl hover:opacity-70 transition-opacity"
          onClick={onClose}
        >
          Our Team
        </a>
        <a
          href="#"
          className="text-2xl hover:opacity-70 transition-opacity"
          onClick={onClose}
        >
          Make Enquiry
        </a>
      </nav>
    </div>
  );
};

export default MobileMenu;
