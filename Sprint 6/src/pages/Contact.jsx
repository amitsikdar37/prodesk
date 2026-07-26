import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page-wrapper">
        <div className="container contact-success">
          <div className="contact-success__icon">✉️</div>
          <h2 className="contact-success__title">Message Sent!</h2>
          <p className="contact-success__text">
            Thanks for reaching out, <strong>{form.name}</strong>. We'll get back to you at <strong>{form.email}</strong> within 24 hours.
          </p>
          <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="contact-hero">
        <div className="container">
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-subtitle">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="container contact-layout">
        <div className="contact-info">
          <h3 className="contact-info__heading">Contact Information</h3>
          <div className="contact-info__items">
            <div className="contact-info__item">
              <span className="contact-info__icon">📍</span>
              <div>
                <p className="contact-info__label">Address</p>
                <p className="contact-info__value">123 Commerce St, New York, NY 10001</p>
              </div>
            </div>
            <div className="contact-info__item">
              <span className="contact-info__icon">📧</span>
              <div>
                <p className="contact-info__label">Email</p>
                <p className="contact-info__value">support@shopora.com</p>
              </div>
            </div>
            <div className="contact-info__item">
              <span className="contact-info__icon">📞</span>
              <div>
                <p className="contact-info__label">Phone</p>
                <p className="contact-info__value">+1 (800) 123-4567</p>
              </div>
            </div>
            <div className="contact-info__item">
              <span className="contact-info__icon">🕐</span>
              <div>
                <p className="contact-info__label">Hours</p>
                <p className="contact-info__value">Mon–Fri, 9am – 6pm EST</p>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <h3 className="contact-form__heading">Send a Message</h3>

          <div className="contact-form__row">
            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">Full Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                className="form-input"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">Email Address</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                className="form-input"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contact-subject" className="form-label">Subject</label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              className="form-input"
              placeholder="How can we help?"
              value={form.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message" className="form-label">Message</label>
            <textarea
              id="contact-message"
              name="message"
              className="form-input form-textarea"
              placeholder="Tell us more..."
              value={form.message}
              onChange={handleChange}
              rows={6}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg contact-form__submit">
            Send Message →
          </button>
        </form>
      </div>
    </div>
  );
}
