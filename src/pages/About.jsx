import { ArrowRight, BookOpen, Crown, Mountain, Sparkles, Swords } from "lucide-react";

export default function About() {
  const inviteUrl = import.meta.env.VITE_DISCORD_INVITE_URL || "#";

  return (
    <section className="page section about-realm-page">
      <div className="about-realm-hero">
        <div className="about-realm-mist" />
        <div className="about-realm-content">
          <span className="eyebrow"><Sparkles size={16}/> TIÊN LỘ SƠ KHAI</span>
          <h1>Một bước nhập tiên đồ,<br/><em>một đời cầu trường sinh.</em></h1>
          <p className="about-realm-lead">
            Giữa thiên địa mênh mang, vô số phàm nhân sống trọn một đời mà chưa từng chạm đến cánh cửa tu hành. Nhưng từ khoảnh khắc cơ duyên xuất hiện, con đường của ngươi sẽ không còn như trước.
          </p>
        </div>
      </div>

      <div className="lore-scroll">
        <span className="lore-seal">仙</span>
        <div className="lore-heading">
          <BookOpen size={20}/>
          <div><small>CỐT TRUYỆN</small><h2>Hành trình bước vào Tiên Giới</h2></div>
        </div>
        <p>
          Ngươi khởi đầu chỉ là một <strong>phàm nhân vô danh</strong>, chưa có danh vọng, chưa sở hữu sức mạnh và cũng chẳng biết tiên lộ phía trước sẽ dẫn mình đến đâu. Một lần cơ duyên đưa ngươi chạm tới thế giới của những người tu hành — nơi linh khí hội tụ, công pháp lưu truyền và mỗi lựa chọn đều có thể thay đổi vận mệnh.
        </p>
        <p>
          Từ đây, ngươi bắt đầu <strong>khai mở con đường tu luyện</strong>, tích lũy tu vi, tìm kiếm công pháp và pháp bảo, bước vào những bí cảnh ẩn chứa cả cơ duyên lẫn hiểm nguy. Trên hành trình ấy sẽ có bằng hữu cùng luận đạo, đối thủ tranh phong và những thử thách chỉ có thể vượt qua bằng chính thực lực của mình.
        </p>
        <p>
          Từng lần đột phá đưa ngươi vượt qua những <strong>Cảnh Giới</strong> cao hơn. Khi tên tuổi dần vang vọng, Thiên Bảng sẽ ghi nhận những tu sĩ đứng trên đỉnh của một thời đại. Nhưng thứ chờ đợi cuối tiên lộ không chỉ là thứ hạng — mà là thiên kiếp, phi thăng và câu hỏi liệu ngươi có thể bước ra khỏi giới hạn của phàm nhân để chạm đến trường sinh.
        </p>
      </div>

      <div className="cultivation-path">
        <article><span>01</span><Mountain/><h3>Nhập Tiên Lộ</h3><p>Từ phàm nhân bước qua cánh cửa tu hành và bắt đầu tích lũy tu vi.</p></article>
        <article><span>02</span><Swords/><h3>Tranh Cơ Duyên</h3><p>Khám phá bí cảnh, công pháp, pháp bảo và đối mặt những thử thách trên tiên đồ.</p></article>
        <article><span>03</span><Crown/><h3>Đề Danh Thiên Bảng</h3><p>Đột phá Cảnh Giới, tranh phong cùng quần hùng và để lại danh号 trong thiên hạ.</p></article>
      </div>

      <div className="immortal-cta">
        <span className="eyebrow"><Sparkles size={15}/> CƠ DUYÊN ĐÃ ĐẾN</span>
        <h2>Tiên lộ đã mở. Ngươi có dám bước vào?</h2>
        <p>Thêm Corgi Immortal vào server Discord và bắt đầu hành trình tu luyện cùng cộng đồng.</p>
        <a className={`join-immortal-btn ${inviteUrl === "#" ? "disabled" : ""}`} href={inviteUrl} target={inviteUrl === "#" ? undefined : "_blank"} rel="noreferrer">
          Gia nhập Tiên Giới <ArrowRight size={18}/>
        </a>
        {inviteUrl === "#" && <small>Thiết lập VITE_DISCORD_INVITE_URL để kích hoạt liên kết mời bot.</small>}
      </div>
    </section>
  );
}
