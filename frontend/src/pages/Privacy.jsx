import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SEO
        title="Privacy Policy | LAD Games"
        description="Read the Privacy Policy of LAD Games to understand how we collect, use, and protect user information while providing free online games."
        keywords="privacy policy lad games, lad games privacy, online gaming privacy policy"
        url="https://ladgames.online/privacy-policy"
      />
      <section className="bg-linear-to-bl from-[#240750] via-[#577B8D] to-[#240750] min-h-screen px-4 py-16 text-white">
        <div className="max-w-4xl mx-auto bg-white/10  backdrop-blur-xl border border-white/20  rounded-2xl p-6 sm:p-8 shadow-xl">
          <h1 className="text-2xl sm:text-3xl text-center font-bold text-[#57A6A1]">Privacy Policy</h1>
          <p className="mt-4 text-gray-400 text-sm text-center">Last updated: {new Date().toISOString().slice(0, 10).split("-").reverse().join("/")}</p>

          <div className="mt-10 space-y-8 text-sm sm:text-base text-gray-300">
            <p>
              At <strong>LAD Games</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website and play games
              hosted or embedded from third-party game monetization platforms.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#B6F500] mt-3">1. Information We Collect</h2>
            <p className="mt-2">
              We may collect the following information:
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
                <li>Non-personal data such as browser type, device, and IP address</li>
                <li>Gameplay-related data for analytics and performance</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#B6F500] mt-3">2. How We Use Your Informaion</h2>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
              <li>To improve user experience</li>
              <li>To respond to inquiries and support requests</li>
              <li>To analyze site traffic and performance</li>
              <li>To ensure security and prevent abuse</li>
            </ul>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">3. Third-Party Games & Ads</h2>
            <p className="mt-2 text-gray-300">
              Our website uses games and advertisements from third-party monetization platforms. These platforms may collect information according to their own privacy policies. We do not control how
              third-party services use your data.
            </p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">4. Cookies</h2>
            <p className="mt-2 text-gray-300">
              Cookies are used to enhance user experience, analyze traffic, and serve relevant ads. You can disable cookies through your browser settings if you prefer.
            </p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">5. Data Security</h2>
            <p className="mt-2 text-gray-300">We take reasonable measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">6. Children’s Information</h2>
            <p className="mt-2 text-gray-300">Our website is not intended for children under the age of 13. We do not knowingly collect personal data from children.</p>
          </div>

          <div>
            <h2 className="mt-3 text-[#B6F500] font-semibold text-lg">7. Changes to This Policy</h2>
            <p className="mt-2 text-gray-300">We may update this Privacy Policy from time to time. Any changes will be reflected on this page.</p>
          </div>

          <div>
            <h2 className="mt-3 text-[#B6F500] font-semibold text-lg">8. Contact Us</h2>
            <p className="mt-2 text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at:{" "}
              <span>
                <Link to="/contact" className="bg-[#2b86b4] px-3 py-2 rounded-md hover:bg-[#5f7682]">
                  Contact
                </Link>
              </span>{" "}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
