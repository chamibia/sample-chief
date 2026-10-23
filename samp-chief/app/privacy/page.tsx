const sectionHeading = "font-ruder font-medium text-[#202020] text-2xl md:text-3xl mt-12 mb-4";
const paragraph = "font-sans font-light text-[#202020] text-base md:text-lg leading-loose tracking-wide mb-4";
const listItem = "font-sans font-light text-[#202020] text-base md:text-lg leading-loose tracking-wide";

export default function PrivacyPolicy() {
  return (
    <div className="pb-24">
      <div className="font-ruder font-medium text-[#202020] leading-tight text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] mb-4">
        Privacy Policy
      </div>
      <p className="font-sans font-light text-gray-500 text-sm mb-8">
        Last updated: October 2026
      </p>

      <p className={paragraph}>
        Sample Chief (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy.
        This policy explains what information we collect when you visit samplechief.com,
        how we use it, and the choices you have.
      </p>

      <h2 className={sectionHeading}>Information We Collect</h2>
      <p className={paragraph}>
        We collect information in a few different ways, depending on how you use the site:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li className={listItem}>
          <strong>Usage data</strong> — pages visited, time on site, device/browser type, and
          general location, collected automatically via Google Analytics if you accept cookies.
        </li>
        <li className={listItem}>
          <strong>Contact and newsletter information</strong> — name, email address, and country,
          if you subscribe to our newsletter or contact us directly.
        </li>
        <li className={listItem}>
          <strong>Order information</strong> — name, email, shipping address, and payment details
          if you make a purchase through our shop. Payments are processed securely by Shopify; we
          do not store your full payment card details ourselves.
        </li>
      </ul>

      <h2 className={sectionHeading}>Cookies</h2>
      <p className={paragraph}>
        Cookies are small files stored on your device. We use them for two purposes:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li className={listItem}>
          <strong>Essential cookies</strong> — needed for core site functionality, such as keeping
          items in your shopping cart and remembering your cookie preference. These cannot be
          disabled and do not require consent.
        </li>
        <li className={listItem}>
          <strong>Analytics cookies</strong> — set by Google Analytics to help us understand how
          visitors use the site, so we can improve it. These only load after you accept cookies
          via the banner shown on your first visit. You can change your choice at any time by
          clearing your browser&rsquo;s site data for samplechief.com, which will show the banner again.
        </li>
      </ul>

      <h2 className={sectionHeading}>How We Use Your Information</h2>
      <p className={paragraph}>We use the information we collect to:</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li className={listItem}>Operate, maintain, and improve the website and shop</li>
        <li className={listItem}>Process and fulfill orders</li>
        <li className={listItem}>Send newsletters and respond to inquiries, if you&rsquo;ve opted in</li>
        <li className={listItem}>Understand aggregate site usage and traffic trends</li>
      </ul>
      <p className={paragraph}>
        We do not sell your personal information.
      </p>

      <h2 className={sectionHeading}>Third-Party Services</h2>
      <p className={paragraph}>
        We rely on a small number of trusted third parties to run this site, each with their own
        privacy practices:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li className={listItem}><strong>Shopify</strong> — ecommerce platform and payment processing</li>
        <li className={listItem}><strong>Google Analytics</strong> — site usage analytics (only after cookie consent)</li>
        <li className={listItem}><strong>Mailchimp</strong> — newsletter and email communications</li>
        <li className={listItem}><strong>Vercel</strong> — website hosting and performance analytics</li>
      </ul>

      <h2 className={sectionHeading}>Data Retention</h2>
      <p className={paragraph}>
        We retain personal information only as long as necessary for the purposes described in
        this policy, or as required by law (for example, order records for tax and accounting
        purposes).
      </p>

      <h2 className={sectionHeading}>Your Rights and Choices</h2>
      <p className={paragraph}>
        Depending on where you live, you may have the right to access, correct, or request
        deletion of your personal information, and to opt out of analytics tracking or marketing
        emails at any time. To make a request, email us at the address below. You can unsubscribe
        from our newsletter using the link in any email we send.
      </p>

      <h2 className={sectionHeading}>Children&rsquo;s Privacy</h2>
      <p className={paragraph}>
        This site is not directed at children under 13, and we do not knowingly collect personal
        information from children.
      </p>

      <h2 className={sectionHeading}>Changes to This Policy</h2>
      <p className={paragraph}>
        We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top of
        this page reflects the most recent changes.
      </p>

      <h2 className={sectionHeading}>Contact Us</h2>
      <p className={paragraph}>
        Questions about this policy or your information? Email us at{" "}
        <a href="mailto:contactus@samplechief.com" className="underline hover:text-gray-600">
          contactus@samplechief.com
        </a>.
      </p>
    </div>
  );
}
