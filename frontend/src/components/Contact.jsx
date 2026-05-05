import React from "react";
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      
      <p><strong>Email:</strong> support@example.com</p>
      <p><strong>Phone:</strong> +91 9876543210</p>
      <p><strong>Address:</strong> Patna, Bihar, India</p>

      <h2>Send Message</h2>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" /><br /><br />
        <input type="email" placeholder="Your Email" /><br /><br />
        <textarea placeholder="Your Message"></textarea><br /><br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;