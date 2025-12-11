import React, { useState } from "react";
import Button from "../UI/Button.jsx";
const AlertDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    alert("Account Deletion Confirmed!");
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-950">
      <Button onClick={() => setIsOpen(true)} variant="destructive">
        Delete Account
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/80 transition-opacity duration-200"
            onClick={() => setIsOpen(false)}
          />

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-2xl z-50 w-full max-w-lg mx-4 transform transition-all duration-200">
            <div className="flex flex-col space-y-2 text-center sm:text-left mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Are you absolutely sure?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4 border-t dark:border-gray-700">
              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="mt-2 sm:mt-0"
              >
                Cancel
              </Button>

              <Button onClick={handleConfirm} variant="destructive">
                Delete My Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { AlertDialog };
