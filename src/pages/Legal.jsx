export default function Legal({type}){
  const privacy = type === "privacy";
  return <section className="page section narrow">
    <div className="page-hero compact"><span className="eyebrow">{privacy?"PRIVACY":"TERMS"}</span><h1>{privacy?"Chính sách quyền riêng tư":"Điều khoản sử dụng"}</h1></div>
    <article className="panel legal">
      {privacy ? <>
        <h2>Dữ liệu được sử dụng</h2><p>Website có thể nhận thông tin hồ sơ cơ bản từ Discord thông qua Supabase Auth, bao gồm ID tài khoản, tên hiển thị và ảnh đại diện. Dữ liệu này được dùng để nhận diện tác giả bài viết, bình luận, diễn đàn và yêu cầu hỗ trợ.</p>
        <h2>Nội dung người dùng</h2><p>Nội dung bạn đăng lên diễn đàn, bình luận hoặc gửi qua trang hỗ trợ được lưu để cung cấp chức năng của website và xử lý yêu cầu.</p>
        <h2>Quản lý dữ liệu</h2><p>Đội ngũ quản trị có thể xóa nội dung vi phạm hoặc xử lý yêu cầu xóa dữ liệu phù hợp.</p>
      </> : <>
        <h2>Quy tắc chung</h2><p>Không spam, quấy rối, giả mạo, phát tán nội dung nguy hiểm hoặc cố tình khai thác lỗ hổng của website.</p>
        <h2>Nội dung cộng đồng</h2><p>Người dùng chịu trách nhiệm với nội dung mình đăng. Quản trị viên có quyền ẩn hoặc xóa nội dung vi phạm quy tắc cộng đồng.</p>
        <h2>Thay đổi dịch vụ</h2><p>Tính năng có thể được cập nhật trong quá trình phát triển Corgi Immortal.</p>
      </>}
    </article>
  </section>
}
