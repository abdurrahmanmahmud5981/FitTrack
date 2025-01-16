
import { Input, Textarea, Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <motion.section
      className="py-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-4 text-orange-700">
            Contact Us
          </h2>
          <Typography  variant="lead" className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Send us a message and we'll respond as soon as possible.
          </Typography>
        </motion.div>

        <motion.div
          className=" p-8 rounded-xl ring-1  ring-orange-900/70 max-w-screen-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                variant="outlined"
                label="Full Name"
                size="lg"
                color="orange"
                required
                className="focus:border-orange-500"
              />
              <Input
                variant="outlined"
                label="Email Address"
                type="email"
                size="lg"
                color="orange"
                required
                className="focus:border-orange-500"
              />
            </div>

            <div className="mt-6">
              <Input
                variant="outlined"
                label="Subject"
                size="lg"
                color="orange"
                required
                className="focus:border-orange-500"
              />
            </div>

            <div className="mt-6">
              <Textarea
                variant="outlined"
                label="Your Message"
                size="lg"
                color="orange"
                rows={5}
                required
                className="focus:border-orange-500"
              />
            </div>

            <motion.div
              className="mt-6"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                type="submit"
                variant="filled"
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

        {/* Contact Information */}
        <motion.div
          className="mt-12 grid md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="p-6 rounded-lg ring ring-orange-800/70 shadow-md">
            <h3 className="text-xl font-semibold text-orange-700 mb-2">Address</h3>
            <p className="text-gray-500">123 Fitness Street, Gym City, GC 12345</p>
          </div>
          
          <div className="p-6 rounded-lg ring ring-orange-800/70 shadow-md">
            <h3 className="text-xl font-semibold text-orange-700 mb-2">Email</h3>
            <p className="text-gray-500">contact@fitnessclub.com</p>
          </div>
          
          <div className="p-6 rounded-lg ring ring-orange-800/70 shadow-md">
            <h3 className="text-xl font-semibold text-orange-700 mb-2">Phone</h3>
            <p className="text-gray-500">(123) 456-7890</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactForm;