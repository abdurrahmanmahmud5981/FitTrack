import { Input, Textarea, Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";

const ContactForm = () => {
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with backend POST or email logic
    console.log("Form submitted!");
  };

  return (
    <motion.section
      className="py-16 px-4 bg-black text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-orange-600 mb-4">Contact Us</h2>
          <Typography variant="lead" className="text-gray-400 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Send us a message and
            we’ll get back to you shortly.
          </Typography>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="p-8 bg-white/5 backdrop-blur rounded-xl ring-1 ring-orange-900/60 shadow-xl"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                variant="outlined"
                color="orange"
                size="lg"
                required
              />
              <Input
                label="Email Address"
                type="email"
                variant="outlined"
                color="orange"
                size="lg"
                required
              />
            </div>

            <div className="mt-6">
              <Input
                label="Subject"
                variant="outlined"
                color="orange"
                size="lg"
                required
              />
            </div>

            <div className="mt-6">
              <Textarea
                label="Your Message"
                variant="outlined"
                color="orange"
                size="lg"
                rows={5}
                required
              />
            </div>

            <motion.div
              className="mt-8"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                color="orange"
                size="lg"
                fullWidth
                className="shadow-md hover:shadow-lg transition-all"
              >
                Send Message
              </Button>
            </motion.div>
          </form>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <ContactInfoCard title="Address" info="123 Fitness Street, Gym City, GC 12345" />
          <ContactInfoCard title="Email" info="contact@fitnessclub.com" />
          <ContactInfoCard title="Phone" info="(123) 456-7890" />
        </motion.div>
      </div>
    </motion.section>
  );
};

// Reusable Card Component
const ContactInfoCard = ({ title, info }) => (
  <div className="p-6 rounded-lg ring-1 ring-orange-800/60 shadow-md bg-white/5">
    <h3 className="text-xl font-semibold text-orange-600 mb-2">{title}</h3>
    <p className="text-gray-400">{info}</p>
  </div>
);

export default ContactForm;
