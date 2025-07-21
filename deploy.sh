#!/bin/bash

# 🚀 Story Flow Generator - Deployment Script
# Hướng dẫn deploy lên các platform khác nhau

echo "🚀 Story Flow Generator - Deployment Script"
echo "=========================================="

# Kiểm tra xem có git repository chưa
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Menu lựa chọn platform
echo ""
echo "🎯 Chọn platform để deploy:"
echo "1. Render (Miễn phí - Khuyến nghị)"
echo "2. Heroku (Miễn phí - Cần thẻ tín dụng)"
echo "3. Vercel (Miễn phí)"
echo "4. Railway (Miễn phí)"
echo "5. Chỉ push lên GitHub"
echo ""

read -p "Nhập lựa chọn (1-5): " choice

case $choice in
    1)
        echo "🎯 Deploy lên Render..."
        echo ""
        echo "📋 Các bước thực hiện:"
        echo "1. Push code lên GitHub"
        echo "2. Đăng ký Render tại: https://render.com"
        echo "3. Tạo Web Service và connect GitHub"
        echo "4. Thêm environment variables:"
        echo "   - OPENAI_API_KEY = your-api-key"
        echo "   - NODE_ENV = production"
        echo ""
        
        read -p "Nhập GitHub repository URL (hoặc Enter để bỏ qua): " repo_url
        
        if [ ! -z "$repo_url" ]; then
            git remote add origin $repo_url
            git branch -M main
            git push -u origin main
            echo "✅ Code đã được push lên GitHub"
        fi
        
        echo "🌐 Truy cập https://render.com để tiếp tục..."
        ;;
        
    2)
        echo "🎯 Deploy lên Heroku..."
        echo ""
        echo "📋 Các bước thực hiện:"
        echo "1. Cài đặt Heroku CLI"
        echo "2. Login Heroku"
        echo "3. Tạo app và deploy"
        echo ""
        
        read -p "Bạn đã cài Heroku CLI chưa? (y/n): " heroku_installed
        
        if [ "$heroku_installed" = "y" ]; then
            read -p "Nhập tên app Heroku: " app_name
            heroku create $app_name
            heroku config:set NODE_ENV=production
            echo "🔑 Thêm OpenAI API key:"
            echo "heroku config:set OPENAI_API_KEY=your-api-key-here"
            git push heroku main
            echo "✅ Deploy hoàn tất!"
        else
            echo "📥 Cài đặt Heroku CLI:"
            echo "macOS: brew tap heroku/brew && brew install heroku"
            echo "Windows: Download từ https://devcenter.heroku.com/articles/heroku-cli"
        fi
        ;;
        
    3)
        echo "🎯 Deploy lên Vercel..."
        echo ""
        echo "📋 Các bước thực hiện:"
        echo "1. Cài đặt Vercel CLI: npm i -g vercel"
        echo "2. Chạy: vercel"
        echo "3. Thêm environment variables trong Vercel dashboard"
        echo ""
        
        read -p "Bạn đã cài Vercel CLI chưa? (y/n): " vercel_installed
        
        if [ "$vercel_installed" = "y" ]; then
            vercel
        else
            echo "📥 Cài đặt Vercel CLI: npm i -g vercel"
        fi
        ;;
        
    4)
        echo "🎯 Deploy lên Railway..."
        echo ""
        echo "📋 Các bước thực hiện:"
        echo "1. Truy cập: https://railway.app"
        echo "2. Connect GitHub repository"
        echo "3. Thêm environment variables"
        echo "4. Deploy tự động"
        echo ""
        
        read -p "Nhập GitHub repository URL (hoặc Enter để bỏ qua): " repo_url
        
        if [ ! -z "$repo_url" ]; then
            git remote add origin $repo_url
            git branch -M main
            git push -u origin main
            echo "✅ Code đã được push lên GitHub"
        fi
        
        echo "🌐 Truy cập https://railway.app để tiếp tục..."
        ;;
        
    5)
        echo "🎯 Chỉ push lên GitHub..."
        read -p "Nhập GitHub repository URL: " repo_url
        
        if [ ! -z "$repo_url" ]; then
            git remote add origin $repo_url
            git branch -M main
            git push -u origin main
            echo "✅ Code đã được push lên GitHub"
        else
            echo "❌ URL không hợp lệ"
        fi
        ;;
        
    *)
        echo "❌ Lựa chọn không hợp lệ"
        exit 1
        ;;
esac

echo ""
echo "🎉 Hoàn tất! Kiểm tra file DEPLOYMENT.md để biết thêm chi tiết."
echo "📞 Nếu gặp vấn đề, hãy kiểm tra logs và documentation của platform." 