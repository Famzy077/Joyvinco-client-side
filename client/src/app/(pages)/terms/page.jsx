import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Terms & Conditions
        </h1>
        <p className="mb-4 text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p>
            Welcome to <strong>Joyvinco</strong>. By accessing or using our
            services, you agree to be bound by these Terms and Conditions. If
            you do not agree, please discontinue use of our platform
            immediately.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            2. Use of Our Services
          </h2>
          <p>
            You agree to use our services only for lawful purposes and in
            accordance with applicable laws. You must not misuse, hack, or
            attempt to gain unauthorized access to our system or interfere with
            its operation.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Accounts</h2>
          <p>
            To use certain features, you may need to create an account. You are
            responsible for safeguarding your account credentials and any
            activity that occurs under your account. We are not liable for any
            loss or damage arising from unauthorized access to your account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Payments</h2>
          <p>
            If our services require payment, you agree to provide accurate
            billing details. All payments are non-refundable unless otherwise
            stated. We reserve the right to change our pricing at any time with
            prior notice.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
          <p>
            All content, trademarks, and materials provided on our platform are
            owned by or licensed to <strong>Joyvinco</strong>. You are granted a
            limited, non-exclusive, non-transferable license to use our
            services. Reproduction or redistribution without consent is
            prohibited.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>
          <p>
            We are not liable for any indirect, incidental, or consequential
            damages resulting from your use of our services. Use our platform at
            your own risk.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
          <p>
            We may suspend or terminate your access at any time if you violate
            these Terms. Upon termination, your right to use our services will
            immediately cease.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
          <p>
            These Terms shall be governed by and interpreted in accordance with
            the laws of your country of residence, without regard to its conflict
            of law rules.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">9. Changes to Terms</h2>
          <p>
            We may update these Terms & Conditions at any time. Continued use of
            our services after changes indicates your acceptance of the updated
            Terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:{" "}
            <a
              href="mailto:support@joyvinco.com"
              className="text-blue-green hover:underline"
            >
              support@joyvinco.comJoyvincoventures@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
