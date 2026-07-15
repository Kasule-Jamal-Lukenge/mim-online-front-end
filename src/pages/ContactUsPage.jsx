import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

const contactDetails = [
  {
    icon: FaMapMarkerAlt,
    title: "Our Location",
    lines: ["13004 Meridian Avenue St.", "Everett, Washington"],
  },
  {
    icon: FaPhoneAlt,
    title: "Call Us",
    lines: ["+1 (206) 791-7445"],
  },
  {
    icon: FaEnvelope,
    title: "Email Us",
    lines: ["support@alostoreafrica.com", "sales@alostoreafrica.com"],
  },
  {
    icon: FaClock,
    title: "Working Hours",
    lines: ["Mon - Sat: 8:00am - 7:00pm", "Sunday: Closed"],
  },
];

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarComponent />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-r from-blue-800 to-blue-600 text-white text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-blue-100 max-w-2xl mx-auto text-lg">
          We'd love to hear from you. Whether you have a question about an
          order, our products, or anything else, our team is ready to help.
        </p>
      </section>

      {/* Contact info cards */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto -mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactDetails.map(({ icon: Icon, title, lines }) => (
            <div
              key={title}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                <Icon size={20} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
              {lines.map((line) => (
                <p key={line} className="text-sm text-gray-500 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Form + map/info split */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Left panel */}
          <div className="lg:col-span-2 bg-blue-700 text-white p-6 sm:p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Have a question about a recent order, a product, or a
              partnership opportunity? Fill out the form and our team will
              get back to you within 24 hours.
            </p>
            <div className="space-y-4 text-blue-100 text-sm">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt /> 13004 Meridian Avenue St., Everett, Washington
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt /> +1 (206) 791-7445
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope /> support@alostoreafrica.com
              </div>
            </div>
          </div>

          {/* Right panel: form */}
          <div className="lg:col-span-3 p-6 sm:p-10">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-white text-gray-900 placeholder-gray-400 border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-white text-gray-900 placeholder-gray-400 border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full bg-white text-gray-900 placeholder-gray-400 border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Write your message here..."
                  rows="5"
                  className="w-full bg-white text-gray-900 placeholder-gray-400 border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <FooterComponent />
    </div>
  );
}
