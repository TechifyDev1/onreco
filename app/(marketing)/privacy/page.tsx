import type { Metadata } from 'next';
import Link from 'next/link';
import NavBar from '@/components/landing-page/nav-bar/NavBar';
import Footer from '@/components/landing-page/Footer';

export const metadata: Metadata = {
   title: 'Privacy Policy | Onreco',
   description:
      'How Onreco collects, uses, and protects your personal information.',
   alternates: { canonical: '/privacy' },
   openGraph: {
      title: 'Privacy Policy | Onreco',
      description:
         'How Onreco collects, uses, and protects your personal information.',
      url: 'https://onreco.app/privacy',
      siteName: 'Onreco',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Privacy Policy | Onreco',
      description:
         'How Onreco collects, uses, and protects your personal information.',
   },
};

export default function PrivacyPolicyPage() {
   const effectiveDate = 'July 23, 2026';

   return (
      <div className="min-h-screen flex flex-col bg-background text-on-surface">
         <NavBar />
         <main className="grow px-4 md:px-8 py-16 md:py-24">
            <div className="max-w-3xl mx-auto">
               <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface mb-2">
                  Privacy Policy
               </h1>
               <p className="text-sm text-on-surface-variant mb-8">
                  Effective date: {effectiveDate}
               </p>

               <div className="space-y-6 text-base leading-7 text-on-surface-variant">
                  <Section heading="1. Introduction">
                     <p>
                        Onreco (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                        &ldquo;our&rdquo;) respects your privacy. This Privacy Policy explains how
                        we collect, use, disclose, and safeguard your information when you use our
                        platform and services (collectively, the &ldquo;Service&rdquo;).
                     </p>
                     <p>
                        By using the Service, you agree to the collection and use of information
                        in accordance with this policy. If you do not agree, please discontinue
                        use of the Service.
                     </p>
                  </Section>

                  <Section heading="2. Information We Collect">
                     <h3 className="text-lg font-semibold text-on-surface mt-4 mb-2">
                        2.1 Information You Provide
                     </h3>
                     <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                        <li>
                           <strong className="text-on-surface">Account information:</strong>{' '}
                           Name, email address, and password when you create an account.
                        </li>
                        <li>
                           <strong className="text-on-surface">Profile information:</strong>{' '}
                           First name, last name, and preferences you add to your profile.
                        </li>
                        <li>
                           <strong className="text-on-surface">Wallet addresses:</strong>{' '}
                           Blockchain wallet addresses you connect for transaction monitoring.
                        </li>
                        <li>
                           <strong className="text-on-surface">Integration credentials:</strong>{' '}
                           OAuth tokens and API keys for third-party services like QuickBooks that
                           you authorize us to access.
                        </li>
                        <li>
                           <strong className="text-on-surface">Support communications:</strong>{' '}
                           Information you provide when contacting us for support.
                        </li>
                     </ul>

                     <h3 className="text-lg font-semibold text-on-surface mt-4 mb-2">
                        2.2 Information Collected Automatically
                     </h3>
                     <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                        <li>
                           <strong className="text-on-surface">Usage data:</strong> Pages viewed,
                           features used, actions taken, timestamps, and session duration.
                        </li>
                        <li>
                           <strong className="text-on-surface">Device information:</strong> Browser
                           type, operating system, device type, and screen resolution.
                        </li>
                        <li>
                           <strong className="text-on-surface">Log data:</strong> IP address, access
                           times, and error logs.
                        </li>
                     </ul>

                     <h3 className="text-lg font-semibold text-on-surface mt-4 mb-2">
                        2.3 Blockchain Data
                     </h3>
                     <p>
                        We access publicly available blockchain data associated with the wallet
                        addresses you connect, including transaction history, token balances, and
                        smart contract interactions. This data is public and not considered private
                        information.
                     </p>
                  </Section>

                  <Section heading="3. How We Use Your Information">
                     <p>We use the information we collect to:</p>
                     <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                        <li>Provide, operate, and maintain the Service;</li>
                        <li>Process and categorize your blockchain transactions;</li>
                        <li>Sync financial data to your QuickBooks or Xero account;</li>
                        <li>Send transactional emails (account verification, security alerts);</li>
                        <li>Improve and personalize the Service;</li>
                        <li>Detect and prevent fraud, abuse, and security incidents;</li>
                        <li>Comply with legal obligations;</li>
                        <li>Communicate with you about updates, features, and support.</li>
                     </ul>
                  </Section>

                  <Section heading="4. How We Share Your Information">
                     <p>
                        We do not sell your personal information. We may share your information
                        only in the following circumstances:
                     </p>
                     <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                        <li>
                           <strong className="text-on-surface">Third-party integrations:</strong>{' '}
                           When you authorize a connection (e.g., QuickBooks), we share data
                           necessary to fulfill that integration.
                        </li>
                        <li>
                           <strong className="text-on-surface">Service providers:</strong> We share
                           data with trusted vendors who assist in operating the Service (cloud
                           hosting, email delivery, analytics), bound by contractual obligations
                           to protect your data.
                        </li>
                        <li>
                           <strong className="text-on-surface">Legal requirements:</strong> When
                           required by law, regulation, legal process, or governmental request.
                        </li>
                        <li>
                           <strong className="text-on-surface">Business transfers:</strong> In
                           connection with a merger, acquisition, or sale of assets, with notice
                           to you.
                        </li>
                     </ul>
                  </Section>

                  <Section heading="5. Data Security">
                     <p>
                        We implement industry-standard security measures to protect your
                        information, including encryption in transit (TLS) and at rest, access
                        controls, and regular security audits. However, no method of transmission
                        over the Internet or electronic storage is 100% secure, and we cannot
                        guarantee absolute security.
                     </p>
                  </Section>

                  <Section heading="6. Data Retention">
                     <p>
                        We retain your personal information for as long as your account is active
                        or as needed to provide the Service. We may retain certain information as
                        required by law or for legitimate business purposes. When you delete your
                        account, we will remove your personal data within 30 days, except where we
                        are required to retain certain records for legal compliance.
                     </p>
                  </Section>

                  <Section heading="7. Your Rights">
                     <p>
                        Depending on your jurisdiction, you may have the following rights:
                     </p>
                     <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                        <li>
                           <strong className="text-on-surface">Access:</strong> Request a copy of
                           the personal data we hold about you.
                        </li>
                        <li>
                           <strong className="text-on-surface">Correction:</strong> Request
                           correction of inaccurate or incomplete data.
                        </li>
                        <li>
                           <strong className="text-on-surface">Deletion:</strong> Request deletion
                           of your personal data.
                        </li>
                        <li>
                           <strong className="text-on-surface">Portability:</strong> Request a copy
                           of your data in a structured, machine-readable format.
                        </li>
                        <li>
                           <strong className="text-on-surface">Objection:</strong> Object to
                           processing of your personal data for certain purposes.
                        </li>
                        <li>
                           <strong className="text-on-surface">Withdraw consent:</strong> Where
                           processing is based on consent, withdraw it at any time.
                        </li>
                     </ul>
                     <p>
                        To exercise any of these rights, contact us at{' '}
                        <a
                           href="mailto:techifydev1@gmail.com"
                           className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                        >
                           techifydev1@gmail.com
                        </a>
                        .
                     </p>
                  </Section>

                  <Section heading="8. Cookies and Tracking">
                     <p>
                        We use cookies and similar technologies to maintain session state,
                        remember preferences, and analyze usage patterns. You can control cookies
                        through your browser settings. Disabling cookies may affect the
                        functionality of the Service.
                     </p>
                  </Section>

                  <Section heading="9. International Data Transfers">
                     <p>
                        Your information may be transferred to and processed in countries other
                        than your country of residence. We ensure that such transfers comply with
                        applicable data protection laws and that appropriate safeguards are in
                        place.
                     </p>
                  </Section>

                  <Section heading="10. Children&rsquo;s Privacy">
                     <p>
                        The Service is not intended for individuals under the age of 18. We do not
                        knowingly collect personal information from children. If we learn that we
                        have collected personal data from a child, we will take steps to delete
                        that information promptly.
                     </p>
                  </Section>

                  <Section heading="11. Changes to This Policy">
                     <p>
                        We may update this Privacy Policy from time to time. We will notify you of
                        material changes by posting the updated policy on our website and updating
                        the &ldquo;Effective date&rdquo; above. Your continued use of the Service
                        after changes are posted constitutes acceptance of the updated policy.
                     </p>
                  </Section>

                  <Section heading="12. Contact Us">
                     <p>
                        If you have questions or concerns about this Privacy Policy, please
                        contact us at{' '}
                        <a
                           href="mailto:techifydev1@gmail.com"
                           className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                        >
                           techifydev1@gmail.com
                        </a>
                        .
                     </p>
                  </Section>
               </div>
            </div>
         </main>
         <Footer />
      </div>
   );
}

function Section({
   heading,
   children,
}: {
   heading: string;
   children: React.ReactNode;
}) {
   return (
      <section>
         <h2 className="text-xl font-semibold text-on-surface mb-3">{heading}</h2>
         {children}
      </section>
   );
}
