import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Last Updated: February 20, 2025</h2>
          <p className="text-gray-700 mb-4">
            This Privacy Policy describes how Saunders & Simmons Ltd ("we," "us," or "our") collects, uses, and shares your personal information when you visit our website.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Information We Collect</h3>
          <p className="text-gray-700 mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Contact information (name, email address, phone number)</li>
            <li>Business information (company name, job title)</li>
            <li>Communication preferences</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">How We Use Your Information</h3>
          <p className="text-gray-700 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Communicate with you about our services</li>
            <li>Respond to your inquiries and requests</li>
            <li>Send you technical notices and updates</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Information Sharing</h3>
          <p className="text-gray-700 mb-4">
            We do not sell, trade, or otherwise transfer your personal information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Data Security</h3>
          <p className="text-gray-700 mb-4">
            We implement appropriate technical and organizational measures to maintain the security of your personal information, including encryption and secure server infrastructure.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Your Rights</h3>
          <p className="text-gray-700 mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to our use of your information</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="text-gray-700">
            <p>Saunders & Simmons Ltd</p>
            <p>Email: [Your Contact Email]</p>
            <p>Phone: [Your Contact Phone]</p>
          </div>
        </section>
      </div>
    </div>
  );
}
