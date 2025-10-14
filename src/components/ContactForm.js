// src/components/ContactForm.js

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, User, Phone, MessageSquare, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

emailjs.init('SB1AxaNwLXrfDBp2h');

const ContactForm = ({ lang = 'vi' }) => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: ''
  });

  const content = {
    vi: {
      title: 'Gửi tin nhắn',
      subtitle: 'Điền form bên dưới, mình sẽ phản hồi trong 24h',
      name: 'Họ và tên',
      namePlaceholder: 'Nguyễn Văn A',
      email: 'Email',
      emailPlaceholder: 'example@email.com',
      phone: 'Số điện thoại',
      phonePlaceholder: '0901234567',
      message: 'Nội dung',
      messagePlaceholder: 'Mô tả dự án hoặc câu hỏi của bạn...',
      send: 'Gửi tin nhắn',
      sending: 'Đang gửi...',
      successTitle: 'Gửi thành công!',
      successMessage: 'Cảm ơn bạn đã liên hệ. Mình sẽ phản hồi sớm nhất có thể!',
      errorTitle: 'Có lỗi xảy ra!',
      errorMessage: 'Không thể gửi tin nhắn. Vui lòng thử lại hoặc liên hệ trực tiếp qua email.',
      required: 'Vui lòng điền đầy đủ thông tin',
      invalidEmail: 'Email không hợp lệ'
    },
    en: {
      title: 'Send Message',
      subtitle: 'Fill the form below, I will respond within 24h',
      name: 'Full Name',
      namePlaceholder: 'John Doe',
      email: 'Email',
      emailPlaceholder: 'example@email.com',
      phone: 'Phone Number',
      phonePlaceholder: '+1234567890',
      message: 'Message',
      messagePlaceholder: 'Describe your project or question...',
      send: 'Send Message',
      sending: 'Sending...',
      successTitle: 'Success!',
      successMessage: 'Thank you for contacting me. I will respond as soon as possible!',
      errorTitle: 'Error!',
      errorMessage: 'Could not send message. Please try again or contact directly via email.',
      required: 'Please fill in all fields',
      invalidEmail: 'Invalid email address'
    }
  };

  const t = content[lang];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (status.error) {
      setStatus({ loading: false, success: false, error: false, message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.from_name || !formData.from_email || !formData.message) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: t.required
      });
      return;
    }

    if (!validateEmail(formData.from_email)) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: t.invalidEmail
      });
      return;
    }

    setStatus({ loading: true, success: false, error: false, message: '' });

    try {
      const [emailResult, backendResult] = await Promise.all([
        emailjs.send(
          'service_l8xvn6p',
          'template_i9qpo3a',
          {
            name: formData.from_name,  
            from_name: formData.from_name,
            from_email: formData.from_email,
            phone: formData.phone || 'Không cung cấp',
            message: formData.message
          },
          'SB1AxaNwLXrfDBp2h'
        ),

        fetch('https://main-landing-page-backend-production.up.railway.app/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.from_name,
            email: formData.from_email,
            phone: formData.phone || '',
            message: formData.message
          })
        }).then(res => {
          if (!res.ok) throw new Error('Backend API failed');
          return res.json();
        })
      ]);

      console.log('✅ EmailJS sent:', emailResult);
      console.log('✅ Backend saved:', backendResult);

      setStatus({
        loading: false,
        success: true,
        error: false,
        message: t.successMessage
      });

      setFormData({
        from_name: '',
        from_email: '',
        phone: '',
        message: ''
      });

      setTimeout(() => {
        setStatus({ loading: false, success: false, error: false, message: '' });
      }, 5000);

    } catch (error) {
      console.error('❌ Error:', error);
      
      let errorMsg = t.errorMessage;
      if (error.message && error.message.includes('Backend')) {
        errorMsg = 'Email đã gửi nhưng không lưu được vào hệ thống. Vui lòng thử lại!';
      }

      setStatus({
        loading: false,
        success: false,
        error: true,
        message: errorMsg
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/20">
        <h3 className="text-2xl font-bold text-white mb-2">{t.title}</h3>
        <p className="text-gray-400 mb-6">{t.subtitle}</p>

        {status.success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start space-x-3 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-400 font-semibold">{t.successTitle}</p>
              <p className="text-green-300 text-sm">{status.message}</p>
            </div>
          </div>
        )}

        {status.error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start space-x-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 font-semibold">{t.errorTitle}</p>
              <p className="text-red-300 text-sm">{status.message}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              {t.name} <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                placeholder={t.namePlaceholder}
                className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                disabled={status.loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              {t.email} <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="from_email"
                value={formData.from_email}
                onChange={handleChange}
                placeholder={t.emailPlaceholder}
                className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                disabled={status.loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              {t.phone}
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t.phonePlaceholder}
                className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                disabled={status.loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              {t.message} <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t.messagePlaceholder}
                rows="5"
                className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition resize-none"
                disabled={status.loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status.loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>{t.sending}</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>{t.send}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;