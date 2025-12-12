import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                <span className="text-blue-500 font-extrabold text-5xl">
                  F
                </span>
                reelaGo
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Connect with talented freelancers and find the perfect match for
              your projects. Quality work, on time, every time.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>

              <a
                href="#"
                className="h-9 w-9 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>

              <a
                href="#"
                className="h-9 w-9 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <a
                href="#"
                className="h-9 w-9 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/browse-tasks"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Browse Tasks
                </Link>
              </li>
              <li>
                <Link
                  to="/add-task"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Post a Task
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                alimuntasir2001@gmail.com
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                +880 1960551472
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                123 Freelance Street, Tech City, TC 12345
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} FreelaGo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
