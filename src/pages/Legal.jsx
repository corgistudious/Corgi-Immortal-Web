import { Link } from "react-router-dom";
import { ShieldCheck, ScrollText } from "lucide-react";

const updated = "11/09/2026";

export default function Legal({ type }) {
  const privacy = type === "privacy";
  return (
    <section className="page section narrow legal-page">
      <div className="page-hero compact legal-hero">
        <span className="eyebrow">{privacy ? "PRIVACY POLICY" : "TERMS OF SERVICE"}</span>
        <div className="legal-title-row">
          {privacy ? <ShieldCheck size={28}/> : <ScrollText size={28}/>} 
          <h1>{privacy ? "Chính Sách Bảo Mật" : "Điều Khoản Dịch Vụ"}</h1>
        </div>
        <p>Áp dụng cho Corgi Immortal Discord Bot và website chính thức.</p>
        <small>Cập nhật lần cuối: {updated}</small>
      </div>

      <article className="panel legal">
        {privacy ? <Privacy/> : <Terms/>}
      </article>

      <div className="legal-switch panel">
        <span>{privacy ? "Bạn cũng nên đọc Điều Khoản Dịch Vụ." : "Bạn cũng nên đọc Chính Sách Bảo Mật."}</span>
        <Link className="btn ghost" to={privacy ? "/terms" : "/privacy"}>
          {privacy ? "Xem Điều Khoản" : "Xem Chính Sách Bảo Mật"}
        </Link>
      </div>
    </section>
  );
}

function Privacy(){
  return <>
    <h2>1. Phạm vi</h2>
    <p>Chính sách này giải thích cách Corgi Immortal xử lý thông tin khi bạn sử dụng bot trên Discord, đăng nhập hoặc sử dụng các tính năng của website. Corgi Immortal là một dịch vụ độc lập và không phải sản phẩm do Discord vận hành.</p>

    <h2>2. Thông tin chúng tôi xử lý</h2>
    <p>Tùy tính năng bạn sử dụng, hệ thống có thể xử lý Discord User ID, tên hiển thị/username, ảnh đại diện, Discord Server ID và dữ liệu cần thiết để bot hoạt động trong máy chủ. Khi đăng nhập website bằng Discord, website nhận thông tin hồ sơ cơ bản được Discord cho phép thông qua OAuth.</p>
    <p>Các tính năng cộng đồng có thể lưu nội dung bạn chủ động gửi, như bài viết diễn đàn, phản hồi, bình luận và yêu cầu hỗ trợ. Hệ thống RPG có thể lưu tiến trình như XP, cấp độ, Cảnh Giới, vật phẩm, thành tích và dữ liệu trò chơi liên quan đến tài khoản Discord của bạn.</p>

    <h2>3. Cách thông tin được sử dụng</h2>
    <p>Dữ liệu được dùng để vận hành lệnh và tính năng bot, lưu tiến trình RPG, hiển thị Thiên Bảng, xác thực tài khoản website, cung cấp diễn đàn/tin tức/hỗ trợ, chống lạm dụng và duy trì an toàn, ổn định của dịch vụ.</p>

    <h2>4. Tin nhắn và dữ liệu máy chủ Discord</h2>
    <p>Bot chỉ nên xử lý dữ liệu Discord cần thiết cho những tính năng được bật và các quyền đã được máy chủ cấp. Nếu một tính năng cần truy cập dữ liệu thuộc quyền hạn chế của Discord, việc truy cập phụ thuộc vào quyền được Discord cấp cho ứng dụng. Corgi Immortal không tuyên bố có quyền truy cập vào dữ liệu mà Discord không cung cấp cho ứng dụng.</p>

    <h2>5. Dịch vụ hỗ trợ vận hành</h2>
    <p>Website sử dụng Supabase cho các chức năng backend/xác thực và Cloudflare Pages để phân phối website. Bot và cơ sở dữ liệu có thể chạy trên hạ tầng máy chủ do đội ngũ Corgi Immortal quản lý. Các nhà cung cấp này có thể xử lý dữ liệu kỹ thuật cần thiết để cung cấp dịch vụ theo chính sách của họ.</p>

    <h2>6. Chia sẻ và bán dữ liệu</h2>
    <p>Corgi Immortal không bán thông tin cá nhân của người dùng. Thông tin chỉ có thể được xử lý bởi nhà cung cấp hạ tầng cần thiết, được tiết lộ khi pháp luật yêu cầu, hoặc khi cần bảo vệ dịch vụ và người dùng khỏi hành vi lạm dụng.</p>

    <h2>7. Lưu giữ và xóa dữ liệu</h2>
    <p>Dữ liệu được giữ trong thời gian cần thiết để cung cấp tính năng tương ứng, duy trì tính toàn vẹn của hệ thống, giải quyết hỗ trợ hoặc đáp ứng nghĩa vụ hợp pháp. Dữ liệu không còn cần thiết có thể được xóa hoặc ẩn danh. Một số bản sao lưu có thể tồn tại trong thời gian giới hạn trước khi được luân chuyển.</p>

    <h2>8. Quyền và yêu cầu của người dùng</h2>
    <p>Bạn có thể liên hệ đội ngũ qua trang Hỗ trợ để yêu cầu xem xét, sửa hoặc xóa dữ liệu gắn với tài khoản của mình khi yêu cầu đó có thể được xác minh và pháp luật áp dụng cho phép. Việc xóa một số dữ liệu RPG có thể làm mất tiến trình liên quan.</p>

    <h2>9. Bảo mật</h2>
    <p>Chúng tôi áp dụng các biện pháp kỹ thuật và quyền truy cập hợp lý để bảo vệ dữ liệu. Tuy nhiên, không có hệ thống trực tuyến nào có thể bảo đảm an toàn tuyệt đối.</p>

    <h2>10. Người dùng trẻ tuổi</h2>
    <p>Bạn phải đáp ứng yêu cầu độ tuổi của Discord tại quốc gia của mình để sử dụng Corgi Immortal thông qua Discord. Nếu bạn không đủ điều kiện sử dụng Discord, bạn không được sử dụng dịch vụ thông qua bot.</p>

    <h2>11. Thay đổi chính sách</h2>
    <p>Chính sách có thể được cập nhật khi tính năng hoặc cách xử lý dữ liệu thay đổi. Ngày cập nhật gần nhất sẽ được hiển thị ở đầu trang.</p>

    <h2>12. Liên hệ</h2>
    <p>Các câu hỏi về quyền riêng tư hoặc yêu cầu dữ liệu có thể được gửi qua <Link to="/lien-he">trang Liên hệ & Hỗ trợ chính thức</Link> của Corgi Immortal.</p>
  </>;
}

function Terms(){
  return <>
    <h2>1. Chấp nhận điều khoản</h2>
    <p>Khi thêm Corgi Immortal vào máy chủ Discord, sử dụng lệnh của bot, đăng nhập hoặc sử dụng website, bạn đồng ý tuân thủ các điều khoản này và các quy định áp dụng của Discord. Nếu không đồng ý, bạn nên ngừng sử dụng dịch vụ.</p>

    <h2>2. Dịch vụ Corgi Immortal</h2>
    <p>Corgi Immortal cung cấp các tính năng Discord và trải nghiệm RPG Tu Tiên, cùng website cộng đồng như tin tức, diễn đàn, Thiên Bảng và hỗ trợ. Tính năng có thể được bổ sung, thay đổi, tạm dừng hoặc ngừng khi cần để phát triển, bảo trì hoặc bảo vệ dịch vụ.</p>

    <h2>3. Tài khoản và quyền máy chủ</h2>
    <p>Bạn chịu trách nhiệm đối với tài khoản Discord của mình. Người thêm hoặc cấu hình bot trong một máy chủ phải có quyền phù hợp tại máy chủ đó. Không được giả mạo quyền hạn, vượt qua cơ chế phân quyền hoặc cố tình sử dụng bot ngoài phạm vi quyền được cấp.</p>

    <h2>4. Hành vi không được phép</h2>
    <p>Không được dùng dịch vụ để spam, quấy rối, lừa đảo, phát tán nội dung bất hợp pháp hoặc nguy hiểm; khai thác lỗ hổng; phá hoại hệ thống; tự động hóa trái phép; gian lận bảng xếp hạng, phần thưởng hoặc tiến trình; cố gắng truy cập dữ liệu/tài khoản không thuộc quyền của mình; hoặc sử dụng dịch vụ theo cách vi phạm chính sách Discord.</p>

    <h2>5. Nội dung cộng đồng</h2>
    <p>Bạn chịu trách nhiệm với nội dung mình đăng trên diễn đàn, bình luận hoặc gửi cho đội ngũ hỗ trợ. Bạn vẫn giữ quyền đối với nội dung của mình, nhưng cho phép Corgi Immortal lưu trữ và hiển thị nội dung đó trong phạm vi cần thiết để vận hành tính năng bạn sử dụng. Nội dung vi phạm có thể bị ẩn hoặc xóa.</p>

    <h2>6. RPG, Thiên Bảng và tài sản ảo</h2>
    <p>XP, Cảnh Giới, vật phẩm, tiền tệ, thành tích, thứ hạng và các tài sản ảo khác là dữ liệu của dịch vụ, không đại diện cho quyền sở hữu tài sản ngoài đời thực trừ khi một chương trình cụ thể nêu rõ khác đi. Đội ngũ có thể sửa dữ liệu bị tạo ra do lỗi, exploit hoặc gian lận để bảo vệ tính công bằng của hệ thống.</p>

    <h2>7. Premium và tính năng trả phí</h2>
    <p>Nếu Corgi Immortal cung cấp Premium hoặc giao dịch thông qua Discord hay nền tảng được hỗ trợ, điều kiện, giá và quyền lợi áp dụng sẽ được hiển thị tại thời điểm giao dịch. Các giao dịch cũng có thể chịu điều khoản của nền tảng xử lý thanh toán tương ứng.</p>

    <h2>8. Đình chỉ hoặc hạn chế</h2>
    <p>Quyền truy cập có thể bị hạn chế hoặc đình chỉ khi có bằng chứng hợp lý về lạm dụng, gian lận, nguy cơ bảo mật hoặc vi phạm điều khoản. Quản trị viên máy chủ Discord vẫn kiểm soát việc bot có được phép hoạt động trong máy chủ của họ hay không.</p>

    <h2>9. Tính khả dụng</h2>
    <p>Chúng tôi cố gắng duy trì dịch vụ ổn định nhưng không bảo đảm dịch vụ luôn không gián đoạn hoặc không có lỗi. Bảo trì, sự cố hạ tầng, thay đổi API Discord hoặc sự kiện ngoài khả năng kiểm soát có thể ảnh hưởng đến dịch vụ.</p>

    <h2>10. Giới hạn trách nhiệm</h2>
    <p>Trong phạm vi pháp luật cho phép, Corgi Immortal được cung cấp theo hiện trạng. Đội ngũ không chịu trách nhiệm cho thiệt hại gián tiếp phát sinh từ gián đoạn dịch vụ, mất dữ liệu ngoài khả năng kiểm soát hợp lý, hành vi của người dùng khác hoặc dịch vụ bên thứ ba.</p>

    <h2>11. Quyền riêng tư</h2>
    <p>Cách dữ liệu được xử lý được mô tả tại <Link to="/privacy">Chính Sách Bảo Mật</Link>.</p>

    <h2>12. Thay đổi điều khoản</h2>
    <p>Điều khoản có thể được cập nhật để phản ánh tính năng mới, thay đổi vận hành hoặc yêu cầu pháp lý. Ngày cập nhật gần nhất được hiển thị ở đầu trang. Việc tiếp tục sử dụng dịch vụ sau khi điều khoản có hiệu lực đồng nghĩa bạn chấp nhận phiên bản mới trong phạm vi pháp luật cho phép.</p>

    <h2>13. Liên hệ</h2>
    <p>Nếu có câu hỏi về điều khoản hoặc cần hỗ trợ, hãy sử dụng <Link to="/lien-he">trang Liên hệ & Hỗ trợ chính thức</Link>.</p>
  </>;
}
