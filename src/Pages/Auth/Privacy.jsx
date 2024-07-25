import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const TermsandConditions = ({ terms, agreeToTerms, disagreeToTerms }) => {
  return <>

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
                  Privacy Policy
                </h2>
                <h2 className="leading-[20px] text-[14px] text-[#64748B]">
                  Last Updated 5/07/2024
                </h2>
              </div>
            </div>
          </div>
          <div className="z-10">
            <img src="/compliant_4252354 1.png" alt="" />
          </div>
        </header>
        <div className="p-5">
          <div className="py-6 md:w-[55%]">
            <h4>
            Speedy Card Lister is committed to protecting the privacy and
              security of your personal information. This Privacy Policy
              explains how we collect, use, and disclose personal information
              when you use SpeedyCardLister.ai and related services.
            </h4>
          </div>

          <div className="text-sm md:text-base  w-full overflow-y-scroll md:px-3">
            <ul className="">
              {/* <li className="mb-4">
              <h3 className="font-bold">1. Acceptance of Terms</h3>
              <h4></h4>
            </li> */}
              
              <li className="mb-4 flex w-full flex-1 flex-col md:md:grid md:grid-cols-[1fr,70%]">
                  <h3 className="font-bold">1. Information we collect</h3>
                  <div className="flex flex-col">
                    <h4>
                      We use the personal information we collect for the
                      following purposes:
                    </h4>
                    <ul className="list-disc pl-5">
                      <li>
                        User Account Information: First name, last name, email
                        address, phone number, address, postal code, and country
                      </li>
                      <li>
                        eBay Account Credentials: For authentication and card
                        listings only.
                      </li>
                      <li>
                        User Content: Trading Card images and extracted cards
                      </li>
                      <li>
                        eBay Preferences: Shipping and handling time, listing
                        type, and currency preferences.
                      </li>
                    </ul>
                  </div>
                </li>
                <hr />
                <br />

              <li className="mb-4  flex w-full flex-1 flex-col md:md:grid md:grid-cols-[1fr,70%]">
                <h3 className="font-bold">2. How We Use Your Information</h3>
                <div className='flex flex-col'>
                <h4>
                We use the personal information we collect for the following
                purposes:
              </h4>
                <ul className="list-disc pl-5">
                  <li>
                  Authenticate and authorize eBay account connections.
                  </li>
                  <li>
                  Facilitate card listing on eBay.
                  </li>
                  <li>
                  Communicate with you (customer support, updates, and
                    marketing).
                  </li>
                  <li>
                  Comply with legal obligations and protect our rights.
                  </li>
                </ul>

                </div>
               
              </li>
              <hr />
              <br />
              <li className="mb-4  flex w-full flex-1 flex-col md:md:grid md:grid-cols-[1fr,70%]">
                <h3 className="font-bold">3. Disclosure of Personal Information</h3>
                <div className='flex flex-col'>
                <h4>
                We may disclose personal information to the following types of
                third parties:
              </h4>
                <ul className="list-disc pl-5">
                  <li>
                  eBay: If you choose to send your trading cards to eBay, we
                  will share your card details and images with eBay for this
                  purpose only.
                  </li>
                  <li>
                  Service Providers: We may engage third-party service providers
                  to assist us in providing and maintaining our website and
                  services.
                  </li>
                  <li>
                  Legal Compliance: We may disclose personal information if
                  required to do so by law or in response to valid legal
                  process.
                  </li>
                </ul>
                </div>

              </li>
              <hr />
              <br />
              <li className="mb-4  flex w-full flex-1 flex-col md:md:grid md:grid-cols-[1fr,70%]">
                <h3 className="font-bold">4. Data Security</h3>
                <ul className="">
                  <li>
                  We implement reasonable security measures to protect your
                information from unauthorized access, use, disclosure,
                alteration, or destruction. However, we recommend that users
                take proactive steps to safeguard their credentials and employ
                additional security measures, such as two-factor authentication,
                to protect against unauthorized access.
                  </li>
                
                </ul>
              </li>
              <hr />
              <br />
              <li className="mb-4 flex w-full flex-1 flex-col md:md:grid md:grid-cols-[1fr,70%]">
                <h3 className="font-bold">5. Data Retention</h3>
                <ul className="">
                  <li>
                  We retain personal information for as long as necessary to
                fulfill the purposes outlined in this Privacy Policy, unless a
                longer retention period is required or permitted by law.
                  </li>
                </ul>
              </li>
              <hr />
              <br />
              <li className="mb-4 flex w-full flex-1 flex-col md:md:grid md:grid-cols-[1fr,70%]">
                <h3 className="font-bold">6. Your Rights</h3>
                <ul className="">
                  <li>
                  You have the right to access, update, and correct your personal
                information. You also have the right to request deletion of your
                personal information, subject to certain exceptions.
                  </li>
                </ul>
              </li>
              <hr />
              <br />
              <li className="mb-4 flex flex-1 flex-col md:flex-row  w-full md:md:grid md:grid-cols-[1fr,70%]">
                <h3 className="font-bold">7. Modifications to Privacy Policy</h3>
                <ul className="">
                  <li>
                  We may update this Privacy Policy from time to time. We will
                notify you of significant changes by posting a notice on our
                website or sending an email.
                  </li>
                </ul>
              </li>
              <hr />
              <br />
              <li className="mb-4 flex w-full flex-1 flex-col md:md:grid md:grid-cols-[1fr,70%]">
                <h3 className="font-bold">8. Contact Us</h3>
                <ul className="">
                  <li>
                  If you have any questions or concerns about this Privacy Policy
                or our handling of your personal information, please contact us
                at{" "}
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

    
   
    </>

};

export default TermsandConditions;
