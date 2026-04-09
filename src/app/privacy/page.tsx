import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://gridlocal.io/privacy" },
  title: "Privacy Policy",
  description:
    "Privacy Policy for GridLocal Miami Cars, operated by Flaming Go LLC. Learn how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-background py-16">
      <div className="container-content max-w-3xl">
        <h1 className="text-4xl font-black text-secondary mb-2">Privacy Policy</h1>
        <p className="text-muted text-sm mb-10">Last updated: April 9, 2026</p>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">1. Introduction</h2>
            <p>
              GridLocal Miami Cars (&ldquo;the Site&rdquo;) is operated by Flaming Go LLC
              (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you visit
              our website at{" "}
              <a href="https://gridlocal.io" className="text-primary hover:underline">
                gridlocal.io
              </a>
              . Please read this policy carefully. By using the Site, you consent to the practices
              described herein.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">
              2. Information We Collect
            </h2>

            <h3 className="text-lg font-semibold text-secondary mt-4 mb-2">
              Information You Provide
            </h3>
            <p>We may collect information you voluntarily provide, including:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Contact information</strong> — name, email address, and phone number when
                you submit a form (e.g., insurance quote request, newsletter signup, event
                submission, or contact form)
              </li>
              <li>
                <strong>Vehicle information</strong> — year, make, model, and estimated value when
                you request an insurance quote
              </li>
              <li>
                <strong>Communications</strong> — any messages or feedback you send us via email or
                forms
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-secondary mt-4 mb-2">
              Information Collected Automatically
            </h3>
            <p>When you visit the Site, we may automatically collect:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Usage data</strong> — pages visited, time spent on pages, referring URLs,
                click patterns, and search queries
              </li>
              <li>
                <strong>Device information</strong> — browser type, operating system, screen
                resolution, and device type
              </li>
              <li>
                <strong>IP address and location</strong> — approximate geographic location based on
                your IP address
              </li>
              <li>
                <strong>Cookies and tracking technologies</strong> — see Section 5 below
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Provide, operate, and maintain the Site</li>
              <li>Process and respond to your inquiries and form submissions</li>
              <li>Connect you with insurance partners when you request a quote</li>
              <li>Send newsletters and marketing communications (with your consent)</li>
              <li>Analyze usage trends to improve the Site&rsquo;s content and user experience</li>
              <li>Display relevant advertisements</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">
              4. How We Share Your Information
            </h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Insurance partners</strong> — when you submit an insurance quote request, we
                share your contact and vehicle details with selected insurance providers who may
                contact you with quotes
              </li>
              <li>
                <strong>Service providers</strong> — third-party companies that help us operate the
                Site (e.g., hosting, email delivery, analytics, form processing)
              </li>
              <li>
                <strong>Advertising partners</strong> — aggregated or de-identified data for ad
                targeting and performance measurement
              </li>
              <li>
                <strong>Legal requirements</strong> — when required by law, court order, or
                governmental authority
              </li>
              <li>
                <strong>Business transfers</strong> — in connection with a merger, acquisition, or
                sale of assets
              </li>
            </ul>
            <p className="mt-2">
              We do <strong>not</strong> sell your personal information to third parties for their
              own marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">
              5. Cookies &amp; Tracking Technologies
            </h2>
            <p>We use the following technologies:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Google Analytics</strong> — to analyze website traffic and usage patterns
              </li>
              <li>
                <strong>Google AdSense</strong> — to serve relevant advertisements; AdSense may use
                cookies to personalize ads based on your browsing history
              </li>
              <li>
                <strong>Affiliate tracking</strong> — Amazon Associates and other affiliate programs
                may set cookies when you click affiliate links to attribute purchases
              </li>
              <li>
                <strong>Social media pixels</strong> — to measure advertising performance on
                platforms like Meta and X (Twitter)
              </li>
            </ul>
            <p className="mt-2">
              You can manage cookie preferences through your browser settings. Disabling cookies may
              affect Site functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">
              6. Third-Party Links
            </h2>
            <p>
              The Site contains links to third-party websites, including car dealerships, auction
              platforms, and affiliate partners. We are not responsible for the privacy practices or
              content of these external sites. We encourage you to review the privacy policies of
              any third-party site you visit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">7. Data Security</h2>
            <p>
              We implement reasonable administrative, technical, and physical safeguards to protect
              your information. However, no method of transmission over the Internet or electronic
              storage is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">8. Data Retention</h2>
            <p>
              We retain your personal information only as long as necessary to fulfill the purposes
              outlined in this policy, comply with legal obligations, resolve disputes, and enforce
              our agreements. Form submissions and lead data are retained for up to 24 months unless
              you request earlier deletion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">9. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Opt out of the sale of personal information (California residents — CCPA)</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:privacy@gridlocal.io"
                className="text-primary hover:underline"
              >
                privacy@gridlocal.io
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">
              10. California Privacy Rights (CCPA)
            </h2>
            <p>
              If you are a California resident, you have the right to request disclosure of the
              categories and specific pieces of personal information we have collected, the
              categories of sources, the business purpose for collection, and the categories of
              third parties with whom we share it. You also have the right to request deletion and
              to opt out of the sale of personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">
              11. Children&rsquo;s Privacy
            </h2>
            <p>
              The Site is not intended for children under the age of 13. We do not knowingly collect
              personal information from children under 13. If we learn that we have collected
              information from a child under 13, we will delete it promptly. If you believe a child
              has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">
              12. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated &ldquo;Last updated&rdquo; date. Your continued use of the Site
              after changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secondary mt-8 mb-3">13. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, contact us at:</p>
            <p className="mt-2">
              <strong>Flaming Go LLC</strong>
              <br />
              Email:{" "}
              <a
                href="mailto:privacy@gridlocal.io"
                className="text-primary hover:underline"
              >
                privacy@gridlocal.io
              </a>
              <br />
              General:{" "}
              <a
                href="mailto:contact@gridlocal.io"
                className="text-primary hover:underline"
              >
                contact@gridlocal.io
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
