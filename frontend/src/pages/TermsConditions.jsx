import React from "react";
import Layout from "../components/Layout";

const TermsConditions = () => {
  return (
    <Layout>
      <section className="bg-linear-to-bl from-[#240750] via-[#577B8D] to-[#240750] min-h-screen px-4 py-16 text-white">
        <section className="max-w-4xl mx-auto bg-white/10  backdrop-blur-xl border border-white/20  rounded-2xl p-6 sm:p-8 shadow-xl">
          <h1 className="text-2xl sm:text-3xl text-center font-bold text-[#57A6A1]">Terms & Conditions</h1>

          <p className="text-center text-sm mt-3 text-gray-400">LAD Games</p>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">1. Acceptance of Terms</h2>
            <p className="mt-2 text-gray-300">
              By accessing or using LAD Games, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our
              website.
            </p>
          </div>
          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">2. Eligibility</h2>
            <p className="mt-2 text-gray-300">You must be at least 13 years old to use this website. If you are under 18, you confirm that you have permission from a parent or guardian.</p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">3. Use of Website</h2>
            <p className="mt-2 text-gray-300">
              You agree to: Use the website only for personal, non-commercial entertainment Not attempt to hack, modify, copy, or misuse the website or games Not use bots, cheats, or automation tools
              You agree not to: Upload malicious content Interfere with ads or game functionality Exploit bugs or glitches
            </p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">4. Games & Third-Party Content (IMPORTANT)</h2>
            <p className="mt-2 text-gray-300">
              The games available on this website are provided by third-party platforms. We do not own or develop these games All game rights belong to their respective owners
              Advertisements shown inside games are managed by third-party ad providers We are not responsible for: Game performance issues In-game ads Rewards, scores, or progress loss External links
              inside games
            </p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">5. Advertisements</h2>
            <p className="mt-2 text-gray-300">
              This website displays advertisements, including in-game ads Ads may be personalized based on user behavior We are not responsible for the content of third-party advertisements
            </p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">6. Intellectual Property</h2>
            <p className="mt-2 text-gray-300">
              Website design, logo, branding, and original content belong to LAD Games.
              <br /> Games, images, and trademarks belong to their respective owners You may not copy or redistribute
              content without permission
            </p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">7. User Accounts</h2>
            <p className="mt-2 text-gray-300">
              If your website allows login or accounts: You are responsible for keeping your account secure We may suspend or terminate accounts that violate our terms
            </p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">8. Limitation of Liability</h2>
            <p className="mt-2 text-gray-300">
              LAD Games shall not be liable for: Any direct or indirect damages Loss of data, progress, or enjoyment Issues caused by third-party games or ads
            </p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">9. Termination</h2>
            <p className="mt-2 text-gray-300">We reserve the right to: Suspend or terminate access without notice Remove games or features at any time</p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">10. Changes to Terms</h2>
            <p className="mt-2 text-gray-300">
              We may update these Terms & Conditions at any time. <br />
              Continued use of the website means you accept the updated terms.
            </p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">11. Governing Law</h2>
            <p className="mt-2 text-gray-300">These terms are governed by the laws of India.</p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">12. Contact Information</h2>
            <p className="mt-2 text-gray-300">
              If you have any questions about these Terms & Conditions, you can contact us at: <br />
              ✉️ Email: ladgamesinfo@gmail.com
            </p>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default TermsConditions;