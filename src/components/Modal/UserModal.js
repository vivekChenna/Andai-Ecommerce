import React, { useRef, useState } from "react";
import { X, LoaderCircle } from "lucide-react";

const UserModal = ({ onClose, title, docsURL }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: title,
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const modalRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        body: JSON.stringify({ ...formData, docsURL: docsURL }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
    } catch (error) {
      console.log("something went wrong", error);
    }
    setLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div
      ref={modalRef}
      onClick={(e) => {
        if (modalRef.current === e.target) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div className=" flex flex-col gap-1 w-[90%]  sm:w-1/3 ">
        <button onClick={onClose} className="place-self-end">
          <X className=" text-white   sm:w-8 sm:h-8" />
        </button>
        {isSubmitted ? (
          <div className="dark:bg-gray-800 bg-black/70 dark:text-gray-200 rounded-lg shadow-lg p-6 relative flex h-40 items-center justify-center">
            <p className="text-2xl font-bold mb-1 text-center  dark:text-gray-200 text-white">
              Thank you for connecting with us, please check your mail.
            </p>
          </div>
        ) : (
          <form
            onSubmit={submitHandler}
            className="dark:bg-gray-800 bg-black/70 dark:text-gray-200 rounded-lg shadow-lg p-6 relative flex flex-col"
          >
            <h2 className="text-2xl font-bold mb-1 text-center  dark:text-gray-200 text-white">
              Andaihub
            </h2>
            <p className="text-white dark:text-gray-400 text-sm text-center mb-4">
              Provide your details, and we’ll connect with you <br /> shortly to
              integrate this plugin.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1.5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-white"
                placeholder="Enter your name"
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1.5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-white"
                placeholder="Enter your email"
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-4 hidden">
              <label className="block text-sm font-medium text-white dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full mt-1.5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-white"
                placeholder="Enter your title"
                required
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-black text-white py-2 rounded-md hover:bg-gray-900 flex items-center justify-center gap-5 font-medium"
            >
              {loading ? "Submitting" : "Submit"}
              {loading && (
                <RefreshCw  className=" w-5 h-5 text-white animate-spin" />
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserModal;
