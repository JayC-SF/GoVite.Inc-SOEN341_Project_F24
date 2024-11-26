
const Footer = () => {
  return (
    <div>
    <footer className="bg-gray-800 text-white py-5 mt-10 w-full">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} GoVite Inc. All rights reserved.</p>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
