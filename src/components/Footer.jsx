export const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12 px-12 md:px-36 lg:px-52">
      <div>
        <div>
          <div>
            <h3 className="text-xl font-bold mb-4">Mindora</h3>
            <p>Your partner in mental health and well-being.</p>
          </div>
          <div className="flex justify-between mt-12 flex-col md:flex-row">
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p>
                Email: hello@mindora.com
                <br />
                Support: support@mindora.com
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center">
          <p>&copy; {new Date().getFullYear()} Mindora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
