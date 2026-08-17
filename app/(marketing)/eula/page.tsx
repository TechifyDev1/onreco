import type { Metadata } from 'next';
import Link from 'next/link';
import NavBar from '@/components/landing-page/nav-bar/NavBar';
import Footer from '@/components/landing-page/Footer';

export const metadata: Metadata = {
   title: 'End User License Agreement | Onreco',
   description:
      'The terms and conditions governing your use of the Onreco platform.',
   alternates: { canonical: '/eula' },
   openGraph: {
      title: 'End User License Agreement | Onreco',
      description:
         'The terms and conditions governing your use of the Onreco platform.',
      url: 'https://onreco.app/eula',
      siteName: 'Onreco',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'End User License Agreement | Onreco',
      description:
         'The terms and conditions governing your use of the Onreco platform.',
   },
};

export default function EULAPage() {
   const effectiveDate = 'July 23, 2026';

   return (
      <div className="min-h-screen flex flex-col bg-background text-on-surface">
         <NavBar />
         <main className="grow px-4 md:px-8 py-16 md:py-24">
            <div className="max-w-3xl mx-auto">
               <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface mb-2">
                  End User License Agreement
               </h1>
               <p className="text-sm text-on-surface-variant mb-8">
                  Effective date: {effectiveDate}
               </p>

               <div className="space-y-6 text-base leading-7 text-on-surface-variant">
                  <Section heading="1. Agreement to Terms">
                     <p>
                        By accessing or using the Onreco platform (&ldquo;Software&rdquo;), you
                        agree to be bound by this End User License Agreement (&ldquo;Agreement&rdquo;)
                        between you (&ldquo;User&rdquo; or &ldquo;you&rdquo;) and Onreco
                        (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                        &ldquo;our&rdquo;). If you do not agree to this Agreement, do not use the
                        Software.
                     </p>
                  </Section>

                  <Section heading="2. License Grant">
                     <p>
                        Subject to the terms of this Agreement, we grant you a limited,
                        non-exclusive, non-transferable, revocable license to access and use the
                        Software for your internal business purposes. This license does not include
                        the right to:
                     </p>
                     <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                        <li>
                           Copy, modify, distribute, sell, or lease any part of the Software;
                        </li>
                        <li>
                           Reverse engineer, decompile, or disassemble the Software;
                        </li>
                        <li>
                           Remove, alter, or obscure any proprietary notices or labels;
                        </li>
                        <li>
                           Use the Software to build a competing product or service;
                        </li>
                        <li>
                           Use the Software in any manner that violates applicable law or
                           regulation.
                        </li>
                     </ul>
                  </Section>

                  <Section heading="3. Account Registration">
                     <p>
                        To use certain features of the Software, you must create an account. You
                        agree to provide accurate, current, and complete information during
                        registration and to update such information to keep it accurate. You are
                        responsible for safeguarding your account credentials and for all activity
                        that occurs under your account.
                     </p>
                  </Section>

                  <Section heading="4. Third-Party Integrations">
                     <p>
                        The Software integrates with third-party services, including but not
                        limited to QuickBooks, blockchain networks, and wallet providers. Your use
                        of these third-party services is subject to their respective terms and
                        privacy policies. We are not responsible for the availability, accuracy,
                        or practices of third-party services.
                     </p>
                  </Section>

                  <Section heading="5. Data and Privacy">
                     <p>
                        Your use of the Software is also governed by our{' '}
                        <Link
                           href="/privacy"
                           className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                        >
                           Privacy Policy
                        </Link>
                        , which describes how we collect, use, and share information about you.
                        By using the Software, you consent to the data practices described in the
                        Privacy Policy.
                     </p>
                  </Section>

                  <Section heading="6. Intellectual Property">
                     <p>
                        The Software, including all copies, modifications, enhancements, and
                        derivative works thereof, and all intellectual property rights therein,
                        are and shall remain the exclusive property of the Company and its
                        licensors. This Agreement does not convey any ownership interest in or to
                        the Software.
                     </p>
                  </Section>

                  <Section heading="7. Fee-Based Services">
                     <p>
                        Certain features of the Software may require payment of fees. All fees are
                        non-refundable unless expressly stated otherwise. We reserve the right to
                        change our pricing at any time with reasonable advance notice. Continued
                        use of fee-based features after a price change constitutes acceptance of
                        the new pricing.
                     </p>
                  </Section>

                  <Section heading="8. Acceptable Use">
                     <p>You agree not to:</p>
                     <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                        <li>
                           Use the Software for any unlawful purpose or in violation of any
                           applicable laws, including anti-money laundering (AML) and
                           counter-terrorism financing (CTF) regulations;
                        </li>
                        <li>
                           Interfere with or disrupt the integrity or performance of the Software;
                        </li>
                        <li>
                           Attempt to gain unauthorized access to the Software or its related
                           systems;
                        </li>
                        <li>
                           Transmit any viruses, malware, or other harmful code through the
                           Software;
                        </li>
                        <li>
                           Use the Software to send unsolicited communications or spam;
                        </li>
                        <li>
                           Exceed applicable rate limits or quotas imposed on the Software.
                        </li>
                     </ul>
                  </Section>

                  <Section heading="9. Disclaimer of Warranties">
                     <p>
                        THE SOFTWARE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo;
                        WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY.
                        WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED
                        WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE,
                        AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SOFTWARE WILL BE
                        UNINTERRUPTED, ERROR-FREE, OR SECURE.
                     </p>
                  </Section>

                  <Section heading="10. Limitation of Liability">
                     <p>
                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL THE COMPANY BE
                        LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
                        DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR
                        INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE
                        LOSSES, RESULTING FROM YOUR USE OF THE SOFTWARE. OUR TOTAL AGGREGATE
                        LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THIS AGREEMENT
                        SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS
                        IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
                     </p>
                  </Section>

                  <Section heading="11. Indemnification">
                     <p>
                        You agree to indemnify, defend, and hold harmless the Company, its
                        officers, directors, employees, and agents from and against any claims,
                        liabilities, damages, losses, and expenses (including reasonable
                        attorneys&rsquo; fees) arising out of or relating to your use of the
                        Software, your violation of this Agreement, or your violation of any
                        rights of a third party.
                     </p>
                  </Section>

                  <Section heading="12. Termination">
                     <p>
                        We may terminate or suspend your license to use the Software at any time,
                        with or without cause, with or without notice. Upon termination, your
                        right to use the Software ceases immediately. You may also terminate this
                        Agreement by ceasing all use of the Software and deleting all copies in
                        your possession.
                     </p>
                  </Section>

                  <Section heading="13. Modifications to This Agreement">
                     <p>
                        We reserve the right to modify this Agreement at any time. We will notify
                        you of material changes by posting the updated Agreement on our website
                        and updating the &ldquo;Effective date&rdquo; above. Your continued use of
                        the Software after such changes constitutes acceptance of the updated
                        Agreement.
                     </p>
                  </Section>

                  <Section heading="14. Governing Law">
                     <p>
                        This Agreement shall be governed by and construed in accordance with the
                        laws of the Federal Republic of Nigeria, without regard to its conflict of
                        law principles. Any disputes arising under this Agreement shall be resolved
                        in the courts of competent jurisdiction in Lagos, Nigeria.
                     </p>
                  </Section>

                  <Section heading="15. Severability">
                     <p>
                        If any provision of this Agreement is held to be unenforceable or invalid,
                        such provision will be modified to the minimum extent necessary to make it
                        enforceable, and the remaining provisions shall continue in full force and
                        effect.
                     </p>
                  </Section>

                  <Section heading="16. Entire Agreement">
                     <p>
                        This Agreement, together with our Privacy Policy and any other policies or
                        guidelines referenced herein, constitutes the entire agreement between you
                        and the Company regarding the Software and supersedes all prior agreements
                        and understandings.
                     </p>
                  </Section>

                  <Section heading="17. Contact Us">
                     <p>
                        If you have questions about this Agreement, please contact us at{' '}
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
