// src/pages/Contact.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white shadow-md rounded-lg max-w-md w-full p-8 text-center">
        <h1 className="text-3xl font-bold mb-6 text-[var(--color-primary)]">
          Contact Us
        </h1>

        <p className="mb-4 text-gray-700">
          Email: <span className="font-medium text-gray-900">grocernest25@gmail.com</span>
        </p>
        <p className="mb-6 text-gray-700">
          Phone: <span className="font-medium text-gray-900">01734-567890</span>
        </p>

        <p className="text-gray-600 mb-6">
          For live support, please visit our{" "}
          <NavLink
            to="/chat"
            className="text-[var(--color-primary)] font-semibold hover:underline"
          >
            Chat
          </NavLink>{" "}
          page after login.
        </p>
      </div>
    </div>
  );
};

export default Contact;

