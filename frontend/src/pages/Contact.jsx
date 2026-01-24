import React from "react";
import Layout from "../components/Layout";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import SEO from "../components/SEO";

const Contact = () => {

 const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          e.target.reset();
          toast.success("Message sent successfully!!")
        },
        (error) => {
          console.error(error);
          toast.error("Failed to send Message. Please Try Again")
        }
      );
  };

  return (
    <Layout>
      <SEO
        title="Contact LAD Games | Get in Touch"
        description="Contact LAD Games for support, feedback, or business inquiries. We’re happy to hear from you."
        keywords="contact lad games, lad games support, gaming website contact"
        url="https://ladgames.online/contact"
      />
      <ToastContainer position="top-center" autoClose={3000} />
      <section
        className="min-h-screen px-4 py-16 bg-linear-to-br from-[#240750] via-[#344C64]  to-[#240750] text-white flex items-center"
      >
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#57A6A1]">
              Connect us 😉
            </h1>

            <p className="mt-4 text-gray-300 text-sm sm:text-base max-w-md">
              Have a question, feedback, or business inquiry?  
              Drop us a message and we’ll get back to you within 24–48 hours.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg backdrop-blur">
                <span className="text-xl"><i className="fas fa-envelope"></i></span>
                <span className="text-sm text-gray-200">
                  ladgamesinfo@gmail.com
                </span>
              </div>

              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg backdrop-blur">
                <span className="text-xl"><i className="fa-solid fa-earth-americas"></i></span>
                <span className="text-sm text-gray-200">
                  Available Worldwide
                </span>
              </div>

              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg backdrop-blur">
                <span className="text-xl"><i className="fas fa-clock"></i></span>
                <span className="text-sm text-gray-200">
                  Response time: 24–48 hours
                </span>
              </div>
            </div>
          </div>

          <div
            className="bg-white/10  backdrop-blur-xl border border-white/20  rounded-2xl p-6 sm:p-8 shadow-xl"
          >
            <h2 className="text-xl text-center text-[#bccecd] font-semibold mb-6">
              Send us a message
            </h2>

            <form onSubmit={sendEmail} className="space-y-5">

              <div>
                <label className="text-sm text-gray-300">Your Name</label>
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="John snow"
                  className="mt-1 w-full px-4 py-2.5 rounded-lg bg-[#344C64]/70 border border-[#577B8D] focus:outline-none focus:ring-2 focus:ring-[#57A6A1]
                    text-white"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Email Address</label>
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="John@email.com"
                  className="mt-1 w-full px-4 py-2.5 rounded-lg bg-[#344C64]/70 border border-[#577B8D] focus:outline-none focus:ring-2 focus:ring-[#57A6A1]
                    text-white"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Message</label>
                <textarea
                  rows="4"
                  name="message"
                  required
                  placeholder="Write your message here..."
                  className="mt-1 w-full px-4 py-2.5 rounded-lg bg-[#344C64]/70 border border-[#577B8D] focus:outline-none  focus:ring-2                   focus:ring-[#57A6A1] text-white resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#57A6A1] text-[#240750] py-2.5 rounded-lg font-semibold hover:opacity-90  transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default Contact;