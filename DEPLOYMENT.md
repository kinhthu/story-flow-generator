# 🚀 Hướng dẫn Deploy Story Flow Generator lên Online

## 📋 Yêu cầu trước khi deploy

1. **OpenAI API Key** - Cần có API key hợp lệ
2. **GitHub Account** - Để push code lên repository
3. **Tài khoản hosting** - Chọn một trong các dịch vụ bên dưới

## 🎯 Các lựa chọn Hosting

### **1. Render (Miễn phí - Khuyến nghị)**

**Ưu điểm:**

- Miễn phí hoàn toàn
- Deploy tự động từ GitHub
- SSL certificate miễn phí
- Dễ sử dụng

**Cách deploy:**

1. **Push code lên GitHub:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/kinhthu/story-flow-generator.git
   git push -u origin main
   ```

2. **Đăng ký Render:**

   - Truy cập: https://render.com
   - Đăng ký tài khoản miễn phí

3. **Tạo Web Service:**

   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Chọn repository của bạn

4. **Cấu hình:**

   - **Name:** story-flow-generator
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm run dev`
   - **Plan:** Free

5. **Thêm Environment Variables:**

   - Click "Environment" tab
   - Thêm: `OPENAI_API_KEY` = your-api-key-here
   - Thêm: `NODE_ENV` = production

6. **Deploy:**
   - Click "Create Web Service"
   - Đợi build và deploy hoàn tất

### **2. Heroku (Miễn phí - Cần thẻ tín dụng)**

**Ưu điểm:**

- Miễn phí (với giới hạn)
- Tích hợp tốt với GitHub
- Nhiều add-ons

**Cách deploy:**

1. **Cài đặt Heroku CLI:**

   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku

   # Windows
   # Download từ https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login và tạo app:**

   ```bash
   heroku login
   heroku create your-app-name
   ```

3. **Set environment variables:**

   ```bash
   heroku config:set OPENAI_API_KEY=your-api-key-here
   heroku config:set NODE_ENV=production
   ```

4. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### **3. Vercel (Miễn phí)**

**Ưu điểm:**

- Deploy nhanh
- Tích hợp tốt với Next.js/React
- Edge functions

**Cách deploy:**

1. **Cài đặt Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Deploy:**

   ```bash
   vercel
   ```

3. **Cấu hình environment variables trong Vercel dashboard**

### **4. Railway (Miễn phí)**

**Ưu điểm:**

- Deploy đơn giản
- Tích hợp GitHub
- Database hosting

**Cách deploy:**

1. **Truy cập:** https://railway.app
2. **Connect GitHub repository**
3. **Thêm environment variables**
4. **Deploy tự động**

### **5. DigitalOcean App Platform (Trả phí)**

**Ưu điểm:**

- Ổn định, chuyên nghiệp
- Scalable
- Support tốt

**Cách deploy:**

1. **Tạo DigitalOcean account**
2. **Tạo App từ GitHub repository**
3. **Cấu hình environment variables**
4. **Deploy**

## 🔧 Cấu hình Environment Variables

Tất cả các platform đều cần set các biến môi trường:

```bash
OPENAI_API_KEY=your-openai-api-key-here
NODE_ENV=production
PORT=10000  # Render yêu cầu
```

## 📝 Cập nhật config.js cho Production

Tạo file `config.js` mới hoặc cập nhật để sử dụng environment variables:

```javascript
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "your-api-key-here";

// ... rest of config
```

## 🔒 Bảo mật

### **1. Bảo vệ API Key:**

- Không commit API key vào code
- Sử dụng environment variables
- Rotate API key định kỳ

### **2. Rate Limiting:**

- Thêm rate limiting cho API endpoints
- Monitor usage

### **3. CORS:**

- Cấu hình CORS cho domain cụ thể
- Không allow tất cả origins trong production

## 📊 Monitoring

### **1. Logs:**

- Monitor application logs
- Set up error tracking (Sentry)

### **2. Performance:**

- Monitor response times
- Set up uptime monitoring

### **3. Usage:**

- Track API usage
- Monitor costs

## 🚨 Troubleshooting

### **Common Issues:**

1. **Build fails:**

   - Check package.json scripts
   - Verify Node.js version
   - Check dependencies

2. **API errors:**

   - Verify OpenAI API key
   - Check API quota
   - Monitor logs

3. **CORS errors:**

   - Configure CORS properly
   - Check domain settings

4. **Port issues:**
   - Use `process.env.PORT` in server.js
   - Check platform requirements

## 📈 Scaling

### **Khi cần scale:**

1. **Upgrade plan** (Render/Heroku)
2. **Add load balancer**
3. **Use CDN** cho static files
4. **Database optimization**

## 💰 Cost Estimation

### **Free Tiers:**

- **Render:** $0/month (750 hours)
- **Heroku:** $0/month (550-1000 hours)
- **Vercel:** $0/month (unlimited)
- **Railway:** $0/month (limited)

### **Paid Plans:**

- **Render:** $7/month
- **Heroku:** $7/month
- **DigitalOcean:** $5/month

## 🎯 Khuyến nghị

**Cho người mới:** Render (miễn phí, dễ sử dụng)
**Cho production:** DigitalOcean hoặc AWS
**Cho development:** Vercel hoặc Railway

## 📞 Support

Nếu gặp vấn đề:

1. Check logs trong hosting platform
2. Verify environment variables
3. Test locally trước khi deploy
4. Check platform documentation
