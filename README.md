# Focus - Modern Todo List Application

*A minimalist, highly responsive Todo List application built with React, Vite, and Tailwind CSS.*  
*Một ứng dụng Todo List tối giản, tốc độ cao được xây dựng bằng React, Vite và Tailwind CSS.*

---

## 🚀 Features / Các tính năng chính
- **CRUD Operations:** Create, Read, Update (Double-click to edit), Delete tasks.  
  *(Tạo, Đọc, Cập nhật - Nhấp đúp để sửa, Xóa các công việc)*
- **Persistent Data:** Tasks are saved directly to your browser's LocalStorage.  
  *(Dữ liệu được lưu trực tiếp vào LocalStorage của trình duyệt)*
- **Filtering & Search:** Filter by Status (Pending/Completed) and Search by text.  
  *(Lọc theo trạng thái Chưa hoàn thành/Đã hoàn thành và Tìm kiếm bằng văn bản)*
- **Sorting:** Organize tasks by Newest or Oldest.  
  *(Sắp xếp công việc theo Mới nhất hoặc Cũ nhất)*
- **Responsive Design:** Mobile-first design using Tailwind CSS v4.  
  *(Giao diện tối ưu cho mọi thiết bị di động)*

---

## 🛠️ Prerequisites / Yêu cầu hệ thống
- **Node.js** (v18 or higher recommended / *Khuyến nghị v18 trở lên*)
- **Docker** (Optional, for containerized environments / *Tùy chọn nếu muốn chạy qua Docker*)

---

## 💻 Running Locally (Standard) / Chạy trên máy ở chế độ thông thường

1. **Install Dependencies / Cài đặt thư viện**
   ```bash
   npm install
   ```

2. **Start the Development Server / Khởi động server phát triển**
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173`.  
   *(Mở trình duyệt và truy cập vào đường dẫn trên).*

---

## 🐳 Running via Docker / Chạy ứng dụng thông qua Docker

1. **Build the Docker Image / Build Image**
   ```bash
   docker build -t todo-app .
   ```

2. **Run the Container / Chạy Container**
   ```bash
   docker run -d -p 8080:80 todo-app
   ```
3. **Verify the container is running / Kiểm tra container đang chạy**
   ```bash
   docker ps
   ```
4. Open your browser and navigate to `http://localhost:8080`.  
   *(Mở trình duyệt và truy cập vào đường dẫn trên).*

---

## 🌐 Deployment (GitHub Pages) / Triển khai lên GitHub Pages

The project is already configured for GitHub Pages deployment.  
*(Dự án đã được cấu hình sẵn để triển khai lên GitHub Pages).*

To deploy / *Để triển khai*:
```bash
npm run deploy
```
This will automatically build the project and push the `dist` folder to the `gh-pages` branch.  
*(Lệnh này sẽ tự động build dự án và đẩy thư mục `dist` lên nhánh `gh-pages`).*
