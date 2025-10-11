// backend/src/utils/emailService.js
const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send reply email to client
const sendReplyEmail = async ({ to, clientName, originalMessage, replyText }) => {
  // Debug log
  console.log('🔵 Sending email with:', { to, clientName, replyText });
  
  const mailOptions = {
    from: `DevStudio <${process.env.EMAIL_USER}>`,
    to: to,
    subject: 'Re: Phản hồi từ DevStudio',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f4f4f4;
          }
          .container {
            background-color: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #0891b2 0%, #3b82f6 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
          }
          .content {
            padding: 30px;
          }
          .greeting {
            font-size: 18px;
            color: #0891b2;
            margin-bottom: 20px;
          }
          .original-message {
            background-color: #f8f9fa;
            border-left: 4px solid #0891b2;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
          }
          .original-message h3 {
            margin-top: 0;
            color: #0891b2;
            font-size: 14px;
            text-transform: uppercase;
          }
          .reply-box {
            background-color: #f0f9ff;
            border-left: 4px solid #0891b2;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
          }
          .reply-box h3 {
            margin-top: 0;
            color: #0891b2;
            font-size: 14px;
            text-transform: uppercase;
          }
          .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #dee2e6;
          }
          .footer a {
            color: #0891b2;
            text-decoration: none;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(135deg, #0891b2 0%, #3b82f6 100%);
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💼 DevStudio</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Phát triển ứng dụng chuyên nghiệp</p>
          </div>
          
          <div class="content">
            <p class="greeting">Xin chào ${clientName || 'bạn'},</p>
            
            <p>Cảm ơn bạn đã liên hệ với <strong>DevStudio</strong>! Chúng tôi đã nhận được tin nhắn của bạn và xin gửi phản hồi như sau:</p>
            
            <div class="original-message">
              <h3>📝 Tin nhắn của bạn:</h3>
              <p style="margin: 0; color: #555;">${originalMessage || 'N/A'}</p>
            </div>
            
            <div class="reply-box">
              <h3>💬 Phản hồi từ chúng tôi:</h3>
              <p style="margin: 0; color: #333; white-space: pre-wrap;">${replyText || 'Chưa có nội dung phản hồi'}</p>
            </div>
            
            <p>Nếu bạn có thêm câu hỏi hoặc muốn thảo luận chi tiết hơn về dự án, vui lòng trả lời email này!</p>
            
            <center>
              <a href="mailto:${process.env.EMAIL_USER}" class="button">Trả lời Email</a>
            </center>
          </div>
          
          <div class="footer">
            <p><strong>DevStudio - Full-Stack Developer</strong></p>
            <p>
              📧 <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a><br>
              🌐 <a href="http://localhost:3001">Truy cập Website</a>
            </p>
            <p style="margin-top: 15px; color: #999;">
              © 2025 DevStudio. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  const result = await transporter.sendMail(mailOptions);
  console.log('✅ Reply email sent successfully to:', to);
  return result;
};

module.exports = {
  sendReplyEmail
};