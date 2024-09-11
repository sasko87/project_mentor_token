import React, { useState } from "react";
import "./contact.css";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Textarea/Textarea";
import Grid from "../../components/Grid/Grid";
import Column from "../../components/Grid/Column";
import Button from "../../components/Button/Button";

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendContactMessage = async (e) => {
    e.preventDefault();
    const data = {
      fullName,
      email,
      message,
    };
    try {
      // Send the POST request to the backend
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <section id="contact">
      <div>
        <div className="contact-data">
          <h2 className="contact-title">Let’s Talk!</h2>
          <p className="contact-description">
            We’re thrilled to connect with you! Whether you have a question,
            need assistance, or want to discuss a potential project, we’re here
            to listen and help. At Mentor Token, we believe in the power of
            collaboration and are committed to providing you with the best
            support and solutions. Fill out the form below, and one of our team
            members will get back to you as soon as possible. <br />
            <span className="bold">
              Let’s create something amazing together!
            </span>
          </p>
        </div>
        <div className="contact-form">
          <form action="">
            <Grid columns={12}>
              <Column size="6">
                <Input
                  type="text"
                  name="full-name"
                  className="full-name"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Column>
              <Column size="6">
                <Input
                  type="email"
                  name="input-email"
                  className="input-email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Column>
              <Column size="12">
                <Textarea
                  placeholder="Your message"
                  textareaClass="textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Column>
              <Column size="12">
                <Button
                  label="Send Message"
                  clickFunction={handleSendContactMessage}
                />
              </Column>
            </Grid>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
