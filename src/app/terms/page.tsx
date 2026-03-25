import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for GridLocal Miami Cars, operated by Flaming Go LLC.",
};

export default function TermsPage() {
  return (
    <div className="bg-background py-16">
      <div className="container-content max-w-3xl">
        <h1 className="text-4xl font-black text-secondary mb-2">Terms &amp; Conditions</h1>
        <p className="text-muted text-sm mb-10">Last updated: March 25, 2026</p>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">1. Agreement to Terms</h2>
            <p>By accessing or using GridLocal Miami Cars (&ldquo;the Site&rdquo;), operated by Flaming Go LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use the Site.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">2. Description of Service</h2>
            <p>GridLocal Miami Cars is a local media and marketplace platform that provides automotive news, articles, car listings, event information, and related content focused on the Miami and South Florida market. Some content on this site is generated or assisted by artificial intelligence.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">3. Use of the Site</h2>
            <p>You agree to use the Site only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Use the Site in any way that violates applicable federal, state, or local law</li>
              <li>Attempt to gain unauthorized access to any portion of the Site</li>
              <li>Use any automated system (scraper, bot, spider) to access the Site without our written permission</li>
              <li>Introduce viruses, malware, or other harmful material</li>
              <li>Impersonate or misrepresent your affiliation with any person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">4. Listings &amp; Third-Party Content</h2>
            <p>Vehicle listings displayed on the Site may be aggregated from third-party sources. We do not own, sell, or broker vehicles. We make no representations or warranties regarding the accuracy, completeness, or reliability of any listing information, including price, mileage, condition, or availability. Always verify details directly with the seller before making a purchase decision.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">5. AI-Generated Content</h2>
            <p>Portions of the editorial content on this Site are generated or assisted by artificial intelligence. While we strive for accuracy, AI-generated content may contain errors or inaccuracies. We do not guarantee the accuracy, completeness, or reliability of any AI-generated content. Users should independently verify important information.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">6. Affiliate Links &amp; Advertising</h2>
            <p>The Site may contain affiliate links and advertisements. When you click on an affiliate link and make a purchase or complete an action, we may receive a commission at no additional cost to you. Advertising and affiliate relationships do not influence our editorial content.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">7. Intellectual Property</h2>
            <p>All content, design, graphics, logos, and trademarks on the Site are the property of Flaming Go LLC or their respective owners and are protected by United States and international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">8. Newsletter &amp; Communications</h2>
            <p>By subscribing to our newsletter, you consent to receive periodic emails about Miami car culture, listings, events, and promotions. You may unsubscribe at any time by clicking the unsubscribe link in any email.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">9. Privacy</h2>
            <p>Your use of the Site is also governed by our Privacy Policy. By using the Site, you consent to the collection and use of information as described therein.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">10. Disclaimer of Warranties</h2>
            <p>THE SITE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">11. Limitation of Liability</h2>
            <p>TO THE FULLEST EXTENT PERMITTED BY LAW, FLAMING GO LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SITE, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">12. Indemnification</h2>
            <p>You agree to indemnify, defend, and hold harmless Flaming Go LLC and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses arising from your use of the Site or violation of these Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">13. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts located in Miami-Dade County, Florida.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">14. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site after changes constitutes acceptance of the modified Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">15. Contact</h2>
            <p>If you have questions about these Terms, please contact us at:</p>
            <p className="mt-2">
              <strong>Flaming Go LLC</strong><br />
              Email: <a href="mailto:contact@gridlocal.io" className="text-primary hover:underline">contact@gridlocal.io</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
