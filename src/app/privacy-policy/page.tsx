import React from "react";

type Props = {
  companyName?: string;
  contactEmail?: string;
  effectiveDate?: string;
};

export default function PrivacyPolicy({
  companyName = "Plaza Sales Pvt. Ltd.",
  contactEmail = "info@plazasales.com",
  effectiveDate = "January 1, 2025",
}: Props) {
  return (
    <main className="min-h-screen text-gray-800 px-4 xl:px-0">
      <section className="max-w-7xl mx-auto overflow-hidden">
        <header className="py-8 pb-4 border-b border-gray-100">
          <h1 className="text-3xl md:text-2xl font-semibold">Privacy Policy</h1>
          <p className="mt-2 text-sm lg:text-base text-gray-500">Effective date: {effectiveDate}</p>
        </header>

        <div className="py-8 pt-4 space-y-8">
          <Intro companyName={companyName} contactEmail={contactEmail} />

          <Section title="1. Information We Collect">
            <p className="mt-2 text-sm lg:text-base leading-7">
              We collect a wide range of information to provide a smoother, more personalized, and secure experience for every user who interacts with our platform. This includes both information that you provide directly and data that we gather automatically when you browse or use our services. The goal behind collecting this data is not only to offer a seamless user experience but also to uphold strong security, improve platform efficiency, and deliver relevant features. We collect <u>personal details</u> such as your name, contact number, and email address to identify you uniquely while ensuring your account functions correctly. Additionally, transactional details or optional billing information may also be collected whenever needed for financial processing or verification.
              Our systems also gather <u>usage-based information</u> such as visited pages, time spent on certain features, device identifiers, and browser types. This helps us analyze behavioral patterns, which allows us to improve the usability of our interface. Other technical information like IP addresses, login timestamps, session duration, and error logs contributes to our ongoing effort to strengthen technical infrastructure, identify loopholes, and protect accounts from unauthorized intrusions. Our platform further uses cookies and other tracking tools to remember user preferences, optimize load speeds, and capture analytics. These tools allow us to provide tailored experiences such as remembering login sessions or customizing recommendations.
              Collectively, the data we collect helps us create a service that is stable, efficient, user-friendly, and continuously improving. Everything collected is stored securely using modern technologies and encryption methods, ensuring that the information remains protected from threats. At the same time, we ensure transparency by informing users about the type of data being collected and the purpose behind each mechanism. Our commitment is not just to meet global standards of user privacy but to ensure that your trust is valued every step of the way while interacting with our service.
            </p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p className="mt-2 text-sm lg:text-base leading-7">
              The information we collect plays an essential role in improving your experience and ensuring that our service functions reliably and efficiently. We use your personal details to verify identity, maintain security, and ensure that every action carried out on the platform is legitimate. Your information helps us shape features that are relevant and meaningful by understanding how users navigate through our website. This includes modifying layouts, adding new functionalities, and enhancing existing ones based on user interactions. We also employ this data to deliver <u>personalized recommendations</u> that align with your interests, which helps make browsing effortless and engaging.
              Additionally, your information is used to communicate important messages, such as service updates, feature launches, account notifications, or policy revisions. This ensures that users stay informed and empowered. In cases where technical issues occur, usage logs and system data help us identify the root cause, implement timely fixes, and avoid similar issues in the future. A significant portion of data is also utilized to maintain <u>security protocols</u>, detect unauthorized activities, prevent fraud, and protect user accounts.
              We also rely on user activity analytics to gauge performance metrics, evaluate site speed, identify growth areas, and improve server optimization. This holistic use of data ensures that the user experience remains fast, reliable, and enjoyable. At the heart of our data usage lies the commitment to transparency, responsibility, and respect for user privacy. Every action connected to data usage adheres to strict internal policies and global data protection standards, ensuring that your information is used exclusively for legitimate and beneficial purposes.
            </p>
          </Section>

          <Section title="3. Cookies and Tracking Technologies">
            <p className="mt-2 text-sm lg:text-base leading-7">
              Cookies and tracking technologies help us deliver an experience that is fast, personalized, and consistent across all devices. These technologies allow us to remember your preferences, such as login sessions, language settings, or specific browsing behaviors. They enable us to analyze which pages are most visited, understand user flow, and detect performance bottlenecks. With this knowledge, we continually refine and enhance the platform to meet your expectations. Cookies also help manage authentication, ensuring that users stay logged in securely without having to repeatedly enter credentials.
              Additionally, tracking tools help detect unusual behavior and enhance proactive <u>security measures</u>. These technologies also support analytics platforms that help us measure the effectiveness of updates, identify user needs, and plan improvements. Users always retain control over cookies and can disable or manage them through browser settings.
            </p>
          </Section>

          <Section title="4. Sharing and Disclosure">
            <p className="mt-2 text-sm lg:text-base leading-7">
              We respect your privacy and only share information when absolutely necessary. This includes working with trusted third-party service providers who assist us with cloud hosting, payment processing, analytics, customer support, and security solutions. Each partner complies with strict confidentiality agreements and data protection requirements. We may also share information when required by law or when necessary to protect the <u>rights, safety, and integrity</u> of our company and users. No information is ever sold or traded for commercial gain.
            </p>
          </Section>

          <Section title="5. Third-Party Services">
            <p className="mt-2 text-sm lg:text-base leading-7">
              Some features depend on external services like maps, analytics, and payment gateways. When interacting with these integrations, their privacy policies apply. We ensure that all third-party services we work with follow strict safety standards, but users should always review their individual policies for complete clarity.
            </p>
          </Section>

          <Section title="6. Data Security">
            <p className="mt-2 text-sm lg:text-base leading-7">
              Keeping your data secure is one of our highest priorities. We employ strong encryption, multi-level authentication, secure servers, firewalls, and continuous monitoring systems to safeguard your information. Although no digital system can ever guarantee complete protection, we take all necessary steps to minimize risk. Users should also take precautions when sharing personal details online.
            </p>
          </Section>

          <Section title="7. Children’s Privacy">
            <p className="mt-2 text-sm lg:text-base leading-7">
              Our platform is not intended for children under 13, and we never knowingly collect data from minors. If a parent or guardian believes that a child has provided information unknowingly, they can contact us to request immediate removal.
            </p>
          </Section>

          <Section title="8. Your Rights & Choices">
            <p className="mt-2 text-sm lg:text-base leading-7">
              Depending on your region, you may have rights to access, edit, remove, or restrict how your data is used. You can request a copy of your stored data, correct mistakes, or ask us to delete your information. You may also opt out of marketing communications anytime.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p className="mt-2 text-sm lg:text-base leading-7">
              We occasionally update this policy to reflect new changes in technology, legal requirements, or service improvements. When updates occur, we post the revised version on this page along with a new effective date.
            </p>
          </Section>

          <Contact companyName={companyName} contactEmail={contactEmail} />

        </div>
      </section>
    </main>
  );
}


function Intro({ companyName, contactEmail }: { companyName: string; contactEmail: string }) {
  return (
    <div>
      <h2 className="text-xl  text-primary font-semibold">Welcome to {companyName}</h2>
      <p className="mt-2 text-sm lg:text-base text-gray-600"> Welcome to {companyName}, where your privacy, trust, and digital safety remain at the center of everything we do. Our Privacy Policy outlines how we collect, use, manage, and protect the information you share with us. We believe in maintaining complete transparency while ensuring that your experience is seamless, personalized, and secure. Our platform collects certain information to provide functionalities, enhance performance, personalize interactions, and safeguard user accounts. Whether you are browsing, creating an account, or using advanced platform features, the information you share helps us deliver a smooth and reliable experience.
        We handle all data with utmost care, using industry-standard security measures and responsible data practices. This ensures that your personal details, browsing behavior, preferences, and interactions are treated with respect and confidentiality. Our commitment extends to keeping you informed about how data is used, clarifying your rights, and offering</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="">
      <h3 className="text-lg  text-primary lg:text-baset-xl font-semibold">{title}</h3>
      <div className="mt-2  md:text-base">{children}</div>
    </section>
  );
}

function Contact({ companyName, contactEmail }: { companyName: string; contactEmail: string }) {
  return (
    <section>
      <h3 className="text-lg font-semibold">Contact Us</h3>
      <p className="mt-2 text-sm lg:text-base text-gray-700">If you have questions about this Privacy Policy for {companyName}, please contact us at <a href={`mailto:${contactEmail}`} className="underline">{contactEmail}</a>.</p>
    </section>
  );
}

