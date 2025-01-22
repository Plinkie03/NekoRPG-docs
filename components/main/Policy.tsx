"use client"
import React, { useEffect, useState } from 'react';
import style from '@/styles/policy.module.css'

const PrivacyPolicy: React.FC = () => {
  const [cookies, setCookies] = useState<any[]>([]);
  const [analyticsCookies, setAnalyticsCookies] = useState<any[]>([]);

  useEffect(() => {
    // Function to parse the cookies from document.cookie
    const getCookies = () => {
      const cookiesArray: any[] = [];
      const analyticsCookiesArray: any[] = [];
      const cookies = document.cookie.split('; ');

      cookies.forEach(cookie => {
        const [nameValue, ...rest] = cookie.split(';');
        const [name, value] = nameValue.split('=');
        let domain = window.location.hostname; // Default to current domain
        let expires = null;

        // Search for expiration and domain in the cookie string
        rest.forEach(part => {
          if (part.startsWith('expires=')) {
            expires = part.split('=')[1];
          }
          if (part.startsWith('domain=')) {
            domain = part.split('=')[1];
          }
        });

        // Check if it's an Analytics cookie
        if (name.startsWith('_ga')) {
          analyticsCookiesArray.push({
            name,
            value,
            domain,
            expirationDate: expires ? new Date(expires) : null,
          });
        } else {
          cookiesArray.push({
            name,
            value,
            domain,
            expirationDate: expires ? new Date(expires) : null,
          });
        }
      });

      setCookies(cookiesArray);
      setAnalyticsCookies(analyticsCookiesArray);
    };

    getCookies(); // Fetch cookies dynamically when the component mounts
  }, []);

  return (
    <div className={style.div}>
      <h1 className={style.h1}>Privacy Policy</h1>
      <p className={style.p}><strong className={style.strong}>Last Updated:</strong> January 22, 2025</p>

      <section className={style.section}>
        <h2 className={style.h2}>1. What Are Cookies?</h2>
        <p className={style.p}>
          Cookies are small text files stored on your device when you visit websites. They help us improve your browsing experience by remembering your preferences and login details. Some cookies are essential for the functionality of the site, such as authentication and session tracking.
        </p>
      </section>

      <section className={style.section}>
        <h2 className={style.h2}>2. Cookies We Use</h2>
        <p className={style.p}>We use both essential and non-essential cookies. Below are the cookies we use on this site:</p>

        <h3 className={style.h3}>Essential Cookies</h3>
        <p className={style.p}>
          These cookies are required for the functionality of the website and cannot be turned off. They include:
        </p>
        <ul className={style.ul}>
          {cookies.map(cookie => (
            <li className={style.li} key={cookie.name}>
              <strong>Cookie Name:</strong> {cookie.name}
              <ul className={style.ul}>
                <li className={style.li}><strong>Domain:</strong> {cookie.domain}</li>
                <li className={style.li}><strong>Expiration Date:</strong> {cookie.expirationDate ? cookie.expirationDate.toISOString() : 'Session'} </li>
                <li className={style.li}><strong>Purpose:</strong> {cookie.name === "cookies-accepted" ? "Used to remember if you agreed to this policy." : "Used for maintaining a session or tracking user interactions."}</li>
              </ul>
            </li>
          ))}
        </ul>

        <h3 className={style.h3}>Analytics Cookies</h3>
        <p className={style.p}>
          We use Google Analytics to collect data about your interaction with the site. This data helps us improve the site’s functionality and security. Google Analytics cookies cannot be disabled as they are crucial for our reporting and security measures.
        </p>
        <ul className={style.ul}>
          {analyticsCookies.map(cookie => (
            <li className={style.li} key={cookie.name}>
              <strong className={style.strong}>Cookie Name:</strong> {cookie.name}
              <ul className={style.ul}>
                <li className={style.li}><strong>Domain:</strong> {cookie.domain}</li>
                <li className={style.li}><strong>Expiration Date:</strong> {cookie.expirationDate ? cookie.expirationDate.toISOString() : 'Session'}</li>
                <li className={style.li}><strong>Purpose:</strong> Used to distinguish users and track website usage.</li>
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className={style.section}>
        <h2 className={style.h2}>3. How We Use Your Data</h2>
        <p className={style.p}>
          We use cookies to authenticate your sessions, track user interactions, and improve the security of our website. The data collected by Google Analytics is anonymized and aggregated. This information helps us understand website traffic, trends, and security risks.
        </p>
      </section>

      <section className={style.section}>
        <h2 className={style.h2}>4. Your Consent</h2>
        <p className={style.p}>
          By continuing to use this site, you consent to our use of cookies, including the essential cookies required for authentication and analytics. You can manage or disable cookies by adjusting your browser settings, but doing so may affect the functionality of the website.
        </p>
        <p className={style.p}>
          For more information about how to manage cookies, you can visit your browser's help section or <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-Out</a>.
        </p>
      </section>

      <section className={style.section}>
        <h2 className={style.h2}>5. Data Security</h2>
        <p className={style.p}>
          We are committed to protecting your personal data. We use various security measures to ensure that your data is stored safely and is only accessible to authorized parties.
        </p>
      </section>

      <section className={style.section}>
        <h2 className={style.h2}>6. Contact Information</h2>
        <p className={style.p}>If you have any questions regarding our Privacy Policy or cookie usage, please contact us at:</p>
        <ul>
          <li className={style.li}><strong className={style.strong}>Email:</strong> [Ruben Email Address]</li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
