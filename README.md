# Corgi Immortal Web V1

Website cộng đồng chính thức cho Corgi Immortal.

## Có sẵn

- Trang Chủ
- Giới thiệu
- Trung tâm lệnh + tìm kiếm/lọc
- Tin tức kiểu blog/báo
- Tác giả, ngày đăng, ảnh bìa
- ❤️ Like bài viết
- Bình luận bài viết
- Diễn đàn: chủ đề + replies + category
- Liên hệ/hỗ trợ + trạng thái ticket
- Đăng nhập bằng Discord qua Supabase Auth
- Admin Control Panel
- Quản lý bài viết
- Quản lý danh sách lệnh
- Quản lý ticket hỗ trợ
- Privacy / Terms
- Responsive mobile + desktop
- Cloudflare Pages compatible

---

## 1. Tạo Supabase

1. Tạo project mới tại Supabase.
2. Vào **SQL Editor**.
3. Mở file `supabase/schema.sql`.
4. Copy toàn bộ và Run.

### Cấp quyền Admin đầu tiên

Đăng nhập website bằng Discord một lần để tạo profile.

Sau đó vào Supabase > SQL Editor và chạy:

```sql
select id, display_name, role from public.profiles;
```

Lấy đúng `id` của bạn rồi chạy:

```sql
update public.profiles
set role = 'developer'
where id = 'UUID_CUA_BAN';
```

`developer` và `admin` đều truy cập được `/admin`.

---

## 2. Bật Discord Login trong Supabase

1. Discord Developer Portal > Application của bạn.
2. Tạo OAuth2 Client Secret.
3. Supabase > Authentication > Providers > Discord.
4. Bật Discord.
5. Điền Client ID + Client Secret.
6. Discord Redirect URI phải là callback URL do Supabase hiển thị, dạng:

`https://YOUR_PROJECT.supabase.co/auth/v1/callback`

7. Supabase > Authentication > URL Configuration:
   - Site URL: `https://corgi-immortal.pages.dev`
   - Redirect URLs: thêm `https://corgi-immortal.pages.dev/**`
   - Trong giai đoạn test có thể thêm `http://localhost:5173/**`

---

## 3. Lấy biến môi trường

Supabase > Project Settings > API:

- Project URL -> `VITE_SUPABASE_URL`
- anon/public key -> `VITE_SUPABASE_ANON_KEY`

Copy `.env.example` thành `.env` khi chạy local.

**Không dùng service_role key ở frontend.**

---

## 4. Chạy local

```bash
npm install
npm run dev
```

---

## 5. Deploy Cloudflare Pages

### Cách GitHub

Cloudflare > Workers & Pages > Create > Pages > Connect to Git.

Chọn repo `Corgi-Immortal-Web`.

Build settings:

- Framework preset: **Vite**
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`

Environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_DISCORD_INVITE_URL` (tùy chọn)
- `VITE_SUPPORT_DISCORD_URL` (tùy chọn)

Sau khi deploy, Cloudflare cấp URL `*.pages.dev`.

Nếu muốn đúng `corgi-immortal.pages.dev`, project name trong Cloudflare Pages phải là `corgi-immortal` và tên đó còn khả dụng.

---

## 6. Quản trị nội dung

Sau khi tài khoản đã có role `developer` hoặc `admin`, menu **Quản trị** xuất hiện.

Trong `/admin` có thể:

- Đăng/xóa bài Tin tức
- Thêm/xóa command
- Xem ticket hỗ trợ
- Đổi trạng thái ticket: open / processing / resolved

Forum có nút xóa chủ đề dành cho Admin/Developer.

---

## Ghi chú bảo mật

Database đã bật RLS. Người dùng thông thường không thể tự cấp `admin` hoặc `developer` qua website.

## Visual refresh V2.1
Giao diện được tinh chỉnh theo hướng official community/game website hiện đại với không khí tu tiên vừa phải: nền tiên cảnh trừu tượng, ngọc + vàng làm accent, layout sạch và responsive. Không sao chép asset hoặc chức năng từ website tham khảo.


### Thiên Bảng – Cảnh Giới
Leaderboard API có thể trả thêm trường `realm` (hoặc `canhGioi`, `realmName`) để website hiển thị Cảnh Giới của thành viên Discord.

## V2.5 — Discord verification legal URLs
After production deployment, the two public legal pages are:
- `https://corgi-immortal.pages.dev/terms` — Terms of Service / Điều Khoản Dịch Vụ
- `https://corgi-immortal.pages.dev/privacy` — Privacy Policy / Chính Sách Bảo Mật

Both routes are public and do not require Discord login. Before submitting them in Discord Developer Portal, open both production URLs in a private/incognito tab and confirm they load successfully.
