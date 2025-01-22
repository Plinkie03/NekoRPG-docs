"use client"
import React, { useState, useEffect } from 'react';
import styles from '@/styles/cookieBanner.module.css';

const CookiesBanner: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);

  // Check if cookies have already been accepted
  useEffect(() => {
    const cookiesAccepted = document.cookie.split(';').some((cookie) => cookie.trim().startsWith('cookies-accepted='));
    if (cookiesAccepted) {
      setVisible(false);
    }
  }, []);

  const handleAccept = () => {
    // Set a cookie to track consent
    document.cookie = "cookies-accepted=true; path=/; max-age=" + 60 * 60 * 24 * 365; // Expires in 1 year
    setVisible(false);
  };

  return visible ? (
    <div className={styles.cookieBanner}>
      <p>
        This website uses essential cookies required for its functionality, such as authentication and session tracking.
        By continuing to use this site, you agree to our use of these cookies. Please see our{' '}
        <a href="/privacy-policy">Privacy Policy</a> for details.
      </p>
      <button onClick={handleAccept} className={styles.acceptButton}>
        OK, I understand
      </button>
    </div>
  ) : null;
};

export default CookiesBanner;
