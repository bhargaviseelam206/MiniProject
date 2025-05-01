import React from "react";
import { motion } from "framer-motion";

const Donate = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-[url('https://images.unsplash.com/photo-1604200211979-dbee3a8e3f89')] bg-cover bg-center h-[60vh] flex items-center justify-center">
        <div className="bg-black/50 w-full h-full absolute"></div>
        <motion.div
          className="relative z-10 text-center text-white p-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Give Hope. Give Joy. Donate Today.
          </h1>
          <p className="text-lg md:text-xl">
            Your small act of kindness can mean the world to a child in need.
          </p>
        </motion.div>
      </div>

      {/* Safety Measures */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
          🛡️ Government Safety Measures for Donations
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Authorized NGOs ensure proper collection and distribution.</li>
          <li>Hygienic packaging & verified food expiry checks.</li>
          <li>Masks, gloves, and sanitation for all handlers.</li>
          <li>Contactless delivery to protect all parties.</li>
          <li>Clothes and accessories are cleaned and sorted before distribution.</li>
        </ul>
      </section>

      {/* Donation Cards */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              img: "https://images.unsplash.com/photo-1604917877937-0c6fce48f03c",
              title: " Food Donations",
              desc: "Provide nutritious meals to orphaned children and fight hunger effectively.",
            },
            {
              img: "https://images.unsplash.com/photo-1618354691416-9f5d3fbc8709",
              title: " Clothes Donations",
              desc: "Share warmth with gently-used clothes to help children stay confident and comfortable.",
            },
            {
              img: "https://images.unsplash.com/photo-1616077164479-28c9cd17fdde",
              title: "Accessories & Essentials",
              desc: "Donate shoes, bags, books & toys that bring joy and support education.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Button */}
      <motion.div
        className="text-center pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p className="text-lg mb-4">Join hands to make the world a better place for every child.</p>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300">
          Donate Now
        </button>
      </motion.div>
    </div>
  );
};

export default Donate;
