import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const Disclaimer = () => {
  return (
    <Layout>
      <SEO
        title="Disclaimer | LAD Games"
        description="Read the Disclaimer of LAD Games regarding game content, third-party links, and limitations of liability while using our free online gaming platform."
        keywords="disclaimer lad games, lad games disclaimer, online gaming disclaimer"
        // url="https://ladgames.online/disclaimer"
      />
      <section className="bg-linear-to-bl from-[#240750] via-[#577B8D] to-[#240750] min-h-screen px-4 py-16 text-white">
        <div className="max-w-4xl mx-auto bg-white/10  backdrop-blur-xl border border-white/20  rounded-2xl p-6 sm:p-8 shadow-xl">
          <h1 className="text-2xl sm:text-3xl text-center font-bold text-[#57A6A1]">Disclaimer</h1>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">1. General Information</h2>
            <p className="mt-2 text-gray-300">
              he information and games provided on LAD Games are for entertainment purposes only. All content on this website is provided in good faith; however, we make no representations or
              warranties of any kind regarding accuracy, reliability, or availability.
            </p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">2. Games & Third-Party Content</h2>
            <p className="mt-2 text-gray-300">
              The games available on this website are sourced from third-party providers.
              <br />
              We do not own, develop, or control these games
              <br />
              All game content, trademarks, logos, and intellectual property belong to their respective owners
            </p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">3. We are not responsible for:</h2>
            <p className="mt-2 text-gray-300">
              Game behavior, bugs, or performance issues
              <br />
              Loss of game progress, scores, or rewards
              <br />
              In-game advertisements or third-party links
            </p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">4. Advertisements</h2>
            <p className="mt-2 text-gray-300">
              This website displays third-party advertisements, including ads shown within games
              <br />
              Advertisements are controlled by external ad networks
              <br />
              We do not endorse or guarantee the accuracy, safety, or legality of advertised products or services
            </p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">5. External Links Disclaimer</h2>
            <p className="mt-2 text-gray-300">
              Our website may contain links to external websites through games or advertisements. We have no control over the content or policies of these external sites and are not responsible for
              any damages or losses caused by visiting them.
            </p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">6. Limitation of Liability</h2>
            <p className="mt-2 text-gray-300">
              Under no circumstances shall LAD Games, its owners, or affiliates be held liable for:
              <br />
              Any direct or indirect damages
              <br />
              Loss of data or enjoyment
              <br />
              Issues caused by third-party games, ads, or external websites
              <br />
              Any direct or indirect damages
              <br />
              Your use of this website is entirely at your own risk.
            </p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">7. Consent</h2>
            <p className="mt-2 text-gray-300">By using our website, you hereby consent to this disclaimer and agree to its terms.</p>
          </div>

          <div>
            <h2 className="mt-3 font-semibold text-[#B6F500] text-lg">8. Updates</h2>
            <p className="mt-2 text-gray-300">
              We reserve the right to update or modify this Disclaimer at any time without prior notice.
              <br /> Any changes will be effective immediately upon posting.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Disclaimer;
