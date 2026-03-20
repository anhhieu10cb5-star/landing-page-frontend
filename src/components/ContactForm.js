import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, User, Phone, MessageSquare, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

emailjs.init('SB1AxaNwLXrfDBp2h');

const ContactForm = ({ lang = 'vi' }) => {
  const [formData, setFormData] = useState({ from_name: '', from_email: '', phone: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: false, message: '' });

  const t = {
    vi: {
      title: 'Gửi tin nhắn', subtitle: 'Điền form bên dưới, mình sẽ phản hồi trong 24h',
      name: 'Họ và tên', namePlaceholder: 'Nguyễn Văn A',
      email: 'Email', emailPlaceholder: 'example@email.com',
      phone: 'Số điện thoại', phonePlaceholder: '0901234567',
      message: 'Nội dung', messagePlaceholder: 'Mô tả dự án hoặc câu hỏi của bạn...',
      send: 'Gửi tin nhắn', sending: 'Đang gửi...',
      successTitle: 'Gửi thành công!', successMessage: 'Cảm ơn bạn đã liên hệ!',
      errorTitle: 'Có lỗi!', errorMessage: 'Không thể gửi. Vui lòng thử lại.',
      required: 'Vui lòng điền đầy đủ', invalidEmail: 'Email không hợp lệ'
    },
    en: {
      title: 'Send Message', subtitle: 'Fill the form below, I will respond within 24h',
      name: 'Full Name', namePlaceholder: 'John Doe',
      email: 'Email', emailPlaceholder: 'example@email.com',
      phone: 'Phone', phonePlaceholder: '+1234567890',
      message: 'Message', messagePlaceholder: 'Describe your project...',
      send: 'Send', sending: 'Sending...',
      successTitle: 'Success!', successMessage: 'Thank you for contacting!',
      errorTitle: 'Error!', errorMessage: 'Could not send. Please try again.',
      required: 'Please fill all fields', invalidEmail: 'Invalid email'
    }
  }[lang];

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (status.error) setStatus({ loading: false, success: false, error: false, message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.from_name || !formData.from_email || !formData.message) {
      return setStatus({ loading: false, success: false, error: true, message: t.required });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email)) {
      return setStatus({ loading: false, success: false, error: true, message: t.invalidEmail });
    }

    setStatus({ loading: true, success: false, error: false, message: '' });
    try {
      await Promise.all([
        emailjs.send('service_l8xvn6p', 'template_i9qpo3a', {
          name: formData.from_name, from_name: formData.from_name, from_email: formData.from_email,
          phone: formData.phone || 'N/A', message: formData.message
        }, 'SB1AxaNwLXrfDBp2h'),
        fetch('https://api.devstudio.tech/api/messages', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formData.from_name, email: formData.from_email, phone: formData.phone, message: formData.message })
        })
      ]);
      setStatus({ loading: false, success: true, error: false, message: t.successMessage });
      setFormData({ from_name: '', from_email: '', phone: '', message: '' });
      setTimeout(() => setStatus({ loading: false, success: false, error: false, message: '' }), 5000);
    } catch (error) {
      setStatus({ loading: false, success: false, error: true, message: t.errorMessage });
    }
  };

  const inputClass = "w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pl-12 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h3>
        <p className="text-gray-500 mb-6">{t.subtitle}</p>

        {status.success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-emerald-700 font-semibold">{t.successTitle}</p>
              <p className="text-emerald-600 text-sm">{status.message}</p>
            </div>
          </div>
        )}

        {status.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 font-semibold">{t.errorTitle}</p>
              <p className="text-red-600 text-sm">{status.message}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">{t.name} <span className="text-red-500">*</span></label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" name="from_name" value={formData.from_name} onChange={handleChange} placeholder={t.namePlaceholder} className={inputClass} disabled={status.loading} />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">{t.email} <span className="text-red-500">*</span></label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="email" name="from_email" value={formData.from_email} onChange={handleChange} placeholder={t.emailPlaceholder} className={inputClass} disabled={status.loading} />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">{t.phone}</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t.phonePlaceholder} className={inputClass} disabled={status.loading} />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">{t.message} <span className="text-red-500">*</span></label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder={t.messagePlaceholder} rows="5" className={inputClass + " resize-none"} disabled={status.loading} />
            </div>
          </div>

          <button type="submit" disabled={status.loading} className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/30 transition flex items-center justify-center space-x-2 disabled:opacity-50">
            {status.loading ? <><Loader className="w-5 h-5 animate-spin" /><span>{t.sending}</span></> : <><Send className="w-5 h-5" /><span>{t.send}</span></>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
