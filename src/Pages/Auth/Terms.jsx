import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Terms = ({ termsDisagreeToTerms }) => {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col font-raleway pb-6">
        {/* Mobile headers start */}

        {/* Mobile headers */}

        <header className="relative flex flex-row items-center justify-between pl-5 py-2 bg-[#E2E8F0] w-full h-[30%] line-clamp-1 p-4 ">
          <div className="absolute top-0 left-0 z-0">
            <img src="/Header.png" />
          </div>
          <div className="flex flex-row items-center justify-between pl-5 py-2 bg-[#E2E8F0] w-full  p-4">
            <div className="flex items-center justify-center gap-3 z-10">
              <div className="h-[48px] w-[48px] rounded-[5rem] bg-[#FCFEFF] flex items-center justify-center  shadow-sm  border-[#E2E8F0]">
                <Link to="/register">
                  <FaArrowLeft />
                </Link>
              </div>

              <div className="flex flex-col">
                <h2 className="text-lg md:text-[28px] leading-[32px] font-semibold  text-[#1E293B]">
                  Terms of Agreement
                </h2>
                <h2 className="leading-[20px] text-[14px] text-[#64748B]">
                  Last Updated 5/07/2024
                </h2>
              </div>
            </div>
          </div>

          <div className="z-10">
            <img src="/contract_10872609 1.png" alt="" />
          </div>
        </header>
        <div className="p-5">
          <div className="py-6 md:w-[55%]">
            <h4>
              By accessing or using SpeedyCardLister.ai and related services,
              you agree to be bound by these Terms of Agreement and our Privacy
              Policy.
            </h4>
          </div>

          <div className="text-sm md:text-base  w-full overflow-y-scroll md:px-3">
            <ul className="">
              {/* <li className="mb-4">
              <h3 className="font-bold">1. Acceptance of Terms</h3>
              <h4></h4>
            </li> */}
              <li className="mb-4 flex w-full flex-1 flex-col md:md:grid md:grid-cols-[1fr,70%]">
                <h3 className="font-bold">
                  1. User Account and eBay Connection
                </h3>

                <ul className="list-disc pl-5">
                  <li>
                    You must create an account and connect your eBay account to
                    fully use the Service..
                  </li>
                  <li>
                    By connecting your eBay account, you agree to grant
                    SpeedyCardLister.ai access to obtain your eBay credentials
                    for the purpose of listing cards to eBay only..
                  </li>
                  <li>
                    SpeedyCardLister.ai endeavors to take reasonable measures to
                    secure user data and protect against unauthorized access.
                    However, we recommend that users take proactive steps to
                    safeguard their credentials and employ additional security
                    measures,such as two-factor authentication, to protect
                    against unauthorized access..
                  </li>
                </ul>
              </li>
              <hr />
              <br />

              <li className="mb-4 flex w-full flex-1 flex-col md:md:grid md:grid-cols-[1fr,70%]">
                <h3 className="font-bold">2. Use of Services</h3>

                <ul className="list-disc pl-5">
                  <li>
                    You may use our website and services solely for lawful
                    purposes and in compliance with these Terms of Agreement and
                    all applicable laws and regulations.
                  </li>
                  <li>
                    You may not reproduce, modify, or distribute the Service or
                    any content without our prior written consent.
                  </li>
                </ul>
              </li>
              <hr />
              <br />
              <li className="mb-4 flex w-full flex-1 flex-col md:md:grid md:grid-cols-[1fr,70%]">
                <h3 className="font-bold">3. User Content</h3>
                <ul className="list-disc pl-5">
                  <li>
                    You retain ownership of any images of trading cards uploaded
                    to our website. By uploading user content, you grant us a
                    non-exclusive, royalty-free, worldwide license to use, and
                    process the content for the purpose of providing our
                    services.
                  </li>
                </ul>
              </li>
              <hr />
              <br />
              <li className="mb-4 flex w-full flex-1 flex-col md:md:grid md:grid-cols-[1fr,70%]">
                <h3 className="font-bold">4. Intellectual Property</h3>
                <ul className="list-disc pl-5">
                  <li>
                    We own all intellectual property rights in and to the
                    Service, including any software, graphics, and trademarks.
                  </li>
                  <li>
                    You agree not to infringe or misappropriate our intellectual
                    property rights.
                  </li>
                </ul>
              </li>
              <hr />
              <br />
              <li className="mb-4 flex w-full flex-1 flex-col md:md:grid md:grid-cols-[1fr,70%]">
                <h3 className="font-bold">5. Warranty Disclaimer</h3>
                <ul className="">
                  <li>
                    The Service is provided on an "as is" and "as available"
                    basis, without warranties of any kind, express or implied.
                  </li>
                </ul>
              </li>
              <hr />
              <br />
              <li className="mb-4 flex w-full flex-1 flex-col md:md:grid md:grid-cols-[1fr,70%]">
                <h3 className="font-bold">6. Limitation of Liability</h3>
                <ul className="">
                  <li>
                    In no event will we be liable for any damages, including but
                    not limited to incidental, consequential, or punitive
                    damages, arising out of the use or inability to use the
                    Service.
                  </li>
                </ul>
              </li>
              <hr />
              <br />
              <li className="mb-4 flex w-full flex-1 flex-col md:md:grid md:grid-cols-[1fr,70%]">
                <h3 className="font-bold">7. Indemnification</h3>
                <ul className="">
                  <li>
                    You agree to indemnify and hold us harmless from any claims,
                    losses, liabilities, damages, and expenses (including
                    attorney's fees) arising out of or related to your use of
                    our website and services.
                  </li>
                </ul>
              </li>
              <hr />
              <br />
              <li className="mb-4 flex w-full flex-1 flex-col md:md:grid md:grid-cols-[1fr,70%]">
                <h3 className="font-bold">8. Governing Law</h3>
                <ul className="">
                  <li>
                    These Terms of Agreement are governed by and construed in
                    accordance with the laws of the United States, without
                    regard to its conflict of law principles.
                  </li>
                </ul>
              </li>
              <hr />
              <br />
              <li className="mb-4 flex w-full flex-1 flex-col md:md:grid md:grid-cols-[1fr,70%]">
                <h3 className="font-bold">9. Modifications to Terms</h3>
                <ul className="">
                  <li>
                    We reserve the right to modify or update these Terms of
                    Agreement at any time without prior notice. Continued use of
                    our website and services after any such changes constitutes
                    acceptance of the modified terms.
                  </li>
                </ul>
              </li>
              <hr />
              <br />
              <li className="mb-4 flex w-full flex-1 flex-col md:md:grid md:grid-cols-[1fr,70%]">
                <h3 className="font-bold">10. Contact Us</h3>
                <ul className="">
                  <li>
                    If you have questions or concerns about these Terms, please
                    contact us at{" "}
                    <span className="text-blue-300 underline">
                      speedycardlister@gmail.com
                    </span>
                    .
                  </li>
                </ul>
              </li>
              <hr />
              <br />
            </ul>
          </div>
        </div>

        <br />
        {/* <div className="grid  grid-cols-[40%,1fr]  gap-4">
          <button
            onClick={termsDisagreeToTerms}
            type="button"
            className={`w-full py-3 hover:bg-[rgb(160,160,179)] hover:text-white px-6 rounded-md shadow-sm text-sm font-medium text-[#272264] border-2 border-[#272264] bg-white focus:outline-none`}
          >
            Decline
          </button>

          <button
            type="submit"
            onClick={termsDisagreeToTerms}
            className={`w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#272264] hover:bg-[#463ea1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            Accept
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Terms;
