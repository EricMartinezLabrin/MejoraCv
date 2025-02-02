import React, { useState, useEffect } from "react";

const LeftAds = () => {
  const [showStickyAd, setShowStickyAd] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStickyAd(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showStickyAd) {
      const timer = setTimeout(() => {
        setShowStickyAd(false);
      }, 30000);

      return () => clearTimeout(timer);
    }
    if (!showStickyAd) {
      const timer = setTimeout(() => {
        setShowStickyAd(true);
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, [showStickyAd]);

  return (
    <aside className="hidden lg:block">
      <section className="sticky top-24 h-[calc(85vh)] py-4 hidden lg:flex ">
        <div className="lg:flex-col justify-end self-end">
          {showStickyAd && (
            <img
              src="https://mejoracv.s3.us-west-002.backblazeb2.com/ads/sticky-netflix-90.png"
              alt="Sticky Netflix 90"
              className="w-32 h-auto transition-all duration-300 rounded-lg mb-[-3.8rem] ml-16 hover:scale-125 hover:-translate-y-3 animate-[shake]"
            />
          )}
          <div className="animate-[sparkleAndShake_2s_ease-in-out_infinite_30s]">
            <img
              src="https://MejoraCv.s3.us-west-002.backblazeb2.com/ads/CuentasMexico.png"
              alt="CuentasMexicoCoin"
              className="w-40 h-auto hover:scale-125 transition-transform duration-300 rounded-lg"
            />
          </div>
        </div>
      </section>
    </aside>
  );
};

export default LeftAds;
