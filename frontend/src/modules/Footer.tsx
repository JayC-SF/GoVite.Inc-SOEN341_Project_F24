
const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-5 mt-0.5 w-full">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-400 mt-2 mb-2">
            Need more help? Contact us at{" "}
            <a href="tel:514-848-2424" className="text-[#ca3448] hover:text-[#E9D3D7]">
              514-848-2424
            </a>
          </p>
          <p>&copy; {new Date().getFullYear()} GoVite Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
