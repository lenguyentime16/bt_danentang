Destiny - Interactive Story (React Native + Expo)

Mục tiêu
- Ứng dụng kể chuyện tương tác: người chơi chọn các lựa chọn để quyết định tiến trình câu chuyện.

Các file chính
- `App.js` - engine chính quản lý state (nodeId) và hiển thị các lựa chọn.
- `data/story.js` - định nghĩa cây câu chuyện (nodes với title, text, choices).
- `components/StoryText.js` - component hiển thị tiêu đề và nội dung.
- `components/ChoiceButton.js` - nút lựa chọn.

Chạy ứng dụng
```powershell
cd "E:\Đa nền tảng\Labs\lab7\Destiny_app"
npx expo start
```
Mở bằng `Expo Go` hoặc kết nối USB và nhấn `a`.

Muốn tôi:
- Thêm hình ảnh/âm thanh vào một số nodes,
- Thêm lưu trạng thái người chơi (AsyncStorage),
- Thêm animation khi chuyển node.

Chọn tiếp theo: A (hình ảnh/âm thanh), B (lưu trạng thái), C (animation).