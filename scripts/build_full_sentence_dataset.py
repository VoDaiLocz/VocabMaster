import json
import os

out_dir = "/home/vodailoc/VocabMaster/src/data/sentence-patterns"

# -------------------------------------------------------------
# STAGE 1: FOUNDATION & CORE PATTERNS (15 topics x 24 = 360 sentences)
# -------------------------------------------------------------
stage1_data = [
    {
        "id": "s1_svo", "title": "S-V-O Daily Habits", "titleVi": "Cấu Trúc S-V-O & Thói Quen Hàng Ngày",
        "description": "Nắm vững trật tự từ cơ bản Chủ ngữ + Động từ + Tân ngữ trong giao tiếp.",
        "icon": "Activity", "level": "Beginner",
        "raw": [
            ("I drink fresh coffee every morning.", "Tôi uống cà phê tươi mỗi buổi sáng.", "S + V + O + Time", "Thì hiện tại đơn diễn tả thói quen lặp lại."),
            ("She reads educational books before sleeping.", "Cô ấy đọc sách giáo dục trước khi ngủ.", "S + V + O + Time", "Động từ thêm 's' với chủ ngữ 'She'."),
            ("We prepare breakfast at seven o'clock.", "Chúng tôi chuẩn bị bữa sáng lúc bảy giờ.", "S + V + O + Time", "Dùng 'at' trước giờ cụ thể."),
            ("He plays tennis with colleagues on Saturdays.", "Anh ấy chơi tennis với đồng nghiệp vào thứ Bảy.", "S + V + O + Partner + Time", "Dùng 'on' trước các thứ trong tuần."),
            ("They study English grammar at the library.", "Họ học ngữ pháp tiếng Anh tại thư viện.", "S + V + O + Place", "Nơi chốn đứng sau tân ngữ trực tiếp."),
            ("My mother cooks delicious meals for our family.", "Mẹ tôi nấu những bữa ăn ngon cho gia đình chúng tôi.", "S + V + O + Target", "Tính từ 'delicious' đứng trước danh từ 'meals'."),
            ("The company develops modern web applications.", "Công ty phát triển các ứng dụng web hiện đại.", "S + V + O", "Chủ ngữ số ít đi với động từ thêm 's'."),
            ("I check important emails first thing today.", "Tôi kiểm tra các email quan trọng đầu tiên trong ngày hôm nay.", "S + V + O + Time", "Cụm 'first thing' nhấn mạnh mức độ ưu tiên."),
            ("She teaches mathematics at a private academy.", "Cô ấy dạy toán học tại một học viện tư nhân.", "S + V + O + Place", "Động từ 'teach' chuyển thành 'teaches'."),
            ("We clean our workspace every Friday afternoon.", "Chúng tôi dọn dẹp không gian làm việc mỗi chiều thứ Sáu.", "S + V + O + Time", "'workspace' là danh từ ghép chỉ nơi làm việc."),
            ("He drives an electric car to work.", "Anh ấy lái một chiếc xe điện đi làm.", "S + V + O + Destination", "Mạo từ 'an' đứng trước nguyên âm 'electric'."),
            ("They practice conversational skills with native speakers.", "Họ luyện kỹ năng đàm thoại với người bản xứ.", "S + V + O + Partner", "'practice' đi với danh từ hoặc V-ing."),
            ("My brother listens to podcasts while driving.", "Anh trai tôi nghe podcast trong khi lái xe.", "S + V + O + Time", "'listen' luôn đi kèm giới từ 'to'."),
            ("She writes technical documentation for software developers.", "Cô ấy viết tài liệu kỹ thuật cho các lập trình viên.", "S + V + O + Target", "'documentation' là danh từ không đếm được."),
            ("We take a refreshing walk in the park.", "Chúng tôi đi dạo sảng khoái trong công viên.", "S + V + O + Place", "Colocation 'take a walk' nghĩa là đi dạo."),
            ("He washes his hands before eating lunch.", "Anh ấy rửa tay trước khi ăn trưa.", "S + V + O + Time", "Sau 'before' là danh từ hoặc V-ing."),
            ("They visit foreign countries during summer vacations.", "Họ đi thăm các nước ngoài trong kỳ nghỉ hè.", "S + V + O + Time", "'during' đi kèm danh từ chỉ khoảng thời gian."),
            ("I keep my personal computer password secure.", "Tôi giữ mật khẩu máy tính cá nhân an toàn.", "S + V + O + Adj", "Cấu trúc 'keep + O + Adj'."),
            ("She purchases fresh fruits at the organic grocery.", "Cô ấy mua hoa quả tươi tại tiệm tạp hóa hữu cơ.", "S + V + O + Place", "'purchases' là từ trang trọng của 'buys'."),
            ("We watch documentary films on weekend evenings.", "Chúng tôi xem phim tài liệu vào các buổi tối cuối tuần.", "S + V + O + Time", "'documentary films' nghĩa là phim tài liệu."),
            ("He organizes his daily schedule on mobile calendar.", "Anh ấy sắp xếp lịch trình hàng ngày trên lịch di động.", "S + V + O + Medium", "'organize' nghĩa là sắp xếp có tổ chức."),
            ("They attend virtual conferences every single month.", "Họ tham gia các hội nghị ảo mỗi một tháng.", "S + V + O + Frequency", "'attend' không cần giới từ 'to'."),
            ("I drink herbal tea to stay relaxed.", "Tôi uống trà thảo mộc để giữ thư giãn.", "S + V + O + Purpose", "'to stay relaxed' chỉ mục đích."),
            ("She sends weekly progress reports to her director.", "Cô ấy gửi báo cáo tiến độ hàng tuần cho giám đốc.", "S + V + O + Recipient", "'weekly' đóng vai trò là tính từ chỉ tần suất.")
        ]
    },
    {
        "id": "s1_wh", "title": "Wh- Questions & Information", "titleVi": "Câu Hỏi Wh- & Khai Thác Thông Tin",
        "description": "Hỏi thông tin tự nhiên và chính xác với Wh-questions.",
        "icon": "HelpCircle", "level": "Beginner",
        "raw": [
            ("What time does the conference start tomorrow?", "Cuộc hội nghị bắt đầu lúc mấy giờ vào ngày mai?", "What time + does + S + V + Time", "Dùng 'does' cho chủ ngữ số ít."),
            ("Where can I find reliable technical documentation?", "Tôi có thể tìm tài liệu kỹ thuật đáng tin cậy ở đâu?", "Where + can + S + V + O", "'reliable' nghĩa là đáng tin cậy."),
            ("Why did you choose this specific career path?", "Tại sao bạn lại chọn con đường sự nghiệp cụ thể này?", "Why + did + S + V + O", "Dùng 'did' cho thì quá khứ đơn."),
            ("How long does it take to master English?", "Mất bao lâu để làm chủ tiếng Anh?", "How long + does it take to + V", "Cấu trúc hỏi thời lượng cần thiết."),
            ("Who is in charge of this customer account?", "Ai là người phụ trách tài khoản khách hàng này?", "Who + is in charge of + N", "'in charge of' nghĩa là phụ trách."),
            ("Which option provides the most practical benefits?", "Lựa chọn nào đem lại nhiều lợi ích thực tế nhất?", "Which option + V + O", "'the most practical' là so sánh nhất."),
            ("When will the product update be released?", "Khi nào bản cập nhật sản phẩm sẽ được phát hành?", "When + will + S + be V3", "Cấu trúc bị động thì tương lai đơn."),
            ("How much does the annual subscription fee cost?", "Phí thuê bao hàng năm có giá bao nhiêu?", "How much + does + S + cost", "'annual fee' là phí hàng năm."),
            ("What kind of projects do you usually handle?", "Bạn thường xử lý những loại dự án nào?", "What kind of + N + do + S + V", "'handle' nghĩa là xử lý hoặc quản lý."),
            ("How often do you conduct code review sessions?", "Bạn tiến hành các buổi review mã nguồn bao lâu một lần?", "How often + do + S + V + O", "'conduct' là động từ trang trọng của 'do'."),
            ("Where did they deploy the staging application server?", "Họ đã triển khai máy chủ ứng dụng thử nghiệm ở đâu?", "Where + did + S + V + O", "'deploy' nghĩa là triển khai phần mềm."),
            ("Why is the network connection unstable this morning?", "Tại sao kết nối mạng lại không ổn định sáng nay?", "Why + is + S + Adj + Time", "'unstable' nghĩa là chập chờn, không ổn định."),
            ("What are the key differences between these frameworks?", "Những điểm khác biệt then chốt giữa các framework này là gì?", "What + are + the key differences", "'differences between A and B'."),
            ("How do you manage stress during tight deadlines?", "Bạn quản lý sự căng thẳng như thế nào trong thời hạn gấp rút?", "How + do + S + V + O + Time", "'tight deadlines' nghĩa là hạn chót gấp."),
            ("Who should we notify in case of emergency?", "Chúng ta nên thông báo cho ai trong trường hợp khẩn cấp?", "Who + should + S + V + Condition", "'in case of' nghĩa là phòng khi."),
            ("Which design pattern is best suited for this?", "Mẫu thiết kế nào phù hợp nhất cho trường hợp này?", "Which + N + is best suited for", "'best suited for' nghĩa là phù hợp nhất."),
            ("What makes an engineering culture truly productive?", "Điều gì làm nên một văn hóa kỹ thuật thực sự hiệu quả?", "What + makes + O + Adj", "'productive' nghĩa là năng suất, hiệu quả."),
            ("How can we reduce our application memory usage?", "Làm thế nào chúng ta có thể giảm mức sử dụng bộ nhớ của ứng dụng?", "How + can + S + V + O", "'memory usage' là mức dung lượng ram sử dụng."),
            ("When is the optimal time to deploy changes?", "Khi nào là thời điểm tối ưu để triển khai các thay đổi?", "When + is + the optimal time", "'optimal time' là thời điểm tối ưu nhất."),
            ("Where do you store sensitive configuration variables?", "Bạn lưu trữ các biến cấu hình nhạy cảm ở đâu?", "Where + do + S + V + O", "'sensitive variables' là các biến nhạy cảm."),
            ("Why did the unit tests fail unexpectedly?", "Tại sao các bài kiểm thử đơn vị lại thất bại một cách bất ngờ?", "Why + did + S + V + Adv", "'unexpectedly' nghĩa là ngoài dự tính."),
            ("What happened during the database migration process?", "Chuyện gì đã xảy ra trong suốt quá trình chuyển dịch cơ sở dữ liệu?", "What + happened + Time", "'database migration' là di chuyển dữ liệu."),
            ("How many active users are currently online?", "Có bao nhiêu người dùng đang hoạt động trực tuyến hiện tại?", "How many + N + are + Adj", "'currently' nghĩa là hiện thời."),
            ("Which database engine is more reliable here?", "Hệ quản trị cơ sở dữ liệu nào đáng tin cậy hơn ở đây?", "Which + N + is + Comparative", "'more reliable' là so sánh hơn.")
        ]
    },
    {
        "id": "s1_requests", "title": "Polite Requests & Permissions", "titleVi": "Yêu Cầu & Xin Phép Lịch Sự",
        "description": "Nói tiếng Anh nhã nhặn, tự tin trong mọi hoàn cảnh.",
        "icon": "MessageSquare", "level": "Beginner",
        "raw": [
            ("Could you please share the meeting summary notes?", "Bạn có thể vui lòng chia sẻ ghi chú tóm tắt cuộc họp được không?", "Could you please + V + O", "Dùng 'Could you please' để yêu cầu lịch thiệp."),
            ("Would you mind explaining this complex logic again?", "Bạn có phiền giải thích lại phần logic phức tạp này không?", "Would you mind + V-ing + O", "Sau 'Would you mind' luôn là V-ing."),
            ("May I have permission to access this repository?", "Tôi có thể xin phép được truy cập vào kho mã nguồn này không?", "May I have permission to + V", "'permission' nghĩa là sự cho phép."),
            ("Could you clarify what this error message means?", "Bạn có thể làm rõ thông báo lỗi này có nghĩa là gì không?", "Could you clarify + Clause", "'clarify' nghĩa là làm rõ ràng."),
            ("Would you please speak slightly louder during calls?", "Bạn có thể vui lòng nói lớn hơn một chút trong cuộc gọi được không?", "Would you please + V + Adv", "'slightly louder' nghĩa là to hơn một chút."),
            ("Do you mind if I review your pull request?", "Bạn có phiền nếu tôi xem qua pull request của bạn không?", "Do you mind if + S + V", "Dùng 'Do you mind if' cho câu hỏi xin phép."),
            ("Could you assist me with configuring this environment?", "Bạn có thể hỗ trợ tôi cấu hình môi trường này không?", "Could you assist me with + V-ing", "'assist someone with' nghĩa là hỗ trợ ai làm gì."),
            ("Would it be feasible to extend the deadline?", "Liệu việc gia hạn thời hạn chót có khả thi không?", "Would it be feasible to + V", "'feasible' nghĩa là khả thi."),
            ("May I ask for your professional advice here?", "Tôi có thể xin lời khuyên chuyên môn của bạn ở đây được không?", "May I ask for + O", "'professional advice' là lời khuyên chuyên môn."),
            ("Could you kindly review the attached design document?", "Bạn có thể vui lòng xem qua tài liệu thiết kế đính kèm được không?", "Could you kindly + V + O", "'kindly' làm tăng sắc thái lịch sự."),
            ("Would you mind keeping me updated on progress?", "Bạn có phiền cập nhật tiến độ liên tục cho tôi không?", "Would you mind + keeping me updated", "'keep someone updated' nghĩa là báo tiến độ liên tục."),
            ("Can you hold on for just one moment?", "Bạn có thể giữ máy trong giây lát được không?", "Can you hold on + Time", "'hold on' là cụm từ giữ máy điện thoại."),
            ("Could I get your honest feedback on this?", "Tôi có thể xin phản hồi chân thành của bạn về điều này không?", "Could I get + O + on N", "'honest feedback' là góp ý thẳng thắn."),
            ("Would you be available for a brief sync?", "Bạn có rảnh cho một cuộc trao đổi ngắn không?", "Would you be available for + N", "'brief sync' là cuộc họp ngắn đồng bộ."),
            ("May I propose an alternative architectural approach?", "Tôi có thể đề xuất một hướng tiếp cận kiến trúc thay thế không?", "May I propose + O", "'alternative approach' là hướng đi thay thế."),
            ("Could you please elaborate on that specific point?", "Bạn có thể vui lòng nói chi tiết hơn về điểm cụ thể đó không?", "Could you please elaborate on + N", "'elaborate on' nghĩa là giải thích chi tiết."),
            ("Would you mind muting your microphone when not speaking?", "Bạn có phiền tắt mic khi không nói chuyện không?", "Would you mind muting + O", "'mute microphone' nghĩa là tắt tiếng micro."),
            ("Could you notify me as soon as possible?", "Bạn có thể thông báo cho tôi càng sớm càng tốt không?", "Could you notify me + Time", "'as soon as possible' (ASAP) nghĩa là càng sớm càng tốt."),
            ("May I borrow your charging cable for a while?", "Tôi có thể mượn dây sạc của bạn một lát được không?", "May I borrow + O + Time", "'for a while' nghĩa là trong chốc lát."),
            ("Would you mind sharing your screen right now?", "Bạn có phiền chia sẻ màn hình của bạn ngay bây giờ không?", "Would you mind sharing + O", "'share screen' là chia sẻ màn hình họp."),
            ("Could you provide a few more practical examples?", "Bạn có thể cung cấp thêm vài ví dụ thực tế được không?", "Could you provide + O", "'practical examples' là ví dụ thực tế."),
            ("Would you be open to pairing on this task?", "Bạn có cởi mở để làm chung nhiệm vụ này không?", "Would you be open to + V-ing", "'pair on a task' nghĩa là làm đôi cùng nhau."),
            ("Could I trouble you to approve this deployment?", "Tôi có thể làm phiền bạn phê duyệt đợt triển khai này không?", "Could I trouble you to + V", "Cách nói trang trọng khi nhờ vả duyệt việc."),
            ("May I schedule a follow-up meeting next week?", "Tôi có thể lên lịch một cuộc họp tiếp nối vào tuần tới không?", "May I schedule + O + Time", "'follow-up meeting' là cuộc họp tiếp theo.")
        ]
    },
    {
        "id": "s1_plans", "title": "Plans, Intentions & Future", "titleVi": "Kế Hoạch, Dự Định & Tương Lai",
        "description": "Diễn tả dự định, cam kết và các mốc tương lai một cách chuyên nghiệp.",
        "icon": "Calendar", "level": "Beginner",
        "raw": [
            ("I am going to optimize our core algorithms.", "Tôi sẽ tối ưu hóa các thuật toán cốt lõi của chúng ta.", "S + be going to + V + O", "'be going to' dùng cho kế hoạch đã định sẵn."),
            ("She plans to present the quarterly business review.", "Cô ấy lên kế hoạch trình bày bản đánh giá kinh doanh quý.", "S + plan to + V + O", "'quarterly review' là báo cáo quý."),
            ("We intend to migrate our infrastructure to cloud.", "Chúng tôi dự định chuyển đổi hạ tầng của mình lên đám mây.", "S + intend to + V + O", "'migrate infrastructure' nghĩa là chuyển đổi hạ tầng."),
            ("He is considering adopting a modern microservices pattern.", "Anh ấy đang cân nhắc việc áp dụng mô hình microservices hiện đại.", "S + be considering + V-ing", "Sau 'consider' luôn là V-ing."),
            ("They hope to achieve ninety percent test coverage.", "Họ hy vọng đạt được độ bao phủ kiểm thử chín mươi phần trăm.", "S + hope to + V + O", "'test coverage' là độ bao phủ của unit test."),
            ("I have decided to automate our deployment workflow.", "Tôi đã quyết định tự động hóa quy trình triển khai của chúng ta.", "S + have decided to + V", "'automate workflow' nghĩa là tự động hóa quy trình."),
            ("She aims to complete the certification by December.", "Cô ấy đặt mục tiêu hoàn thành chứng chỉ trước tháng Mười Hai.", "S + aim to + V + Time", "'by December' chỉ thời hạn chót."),
            ("We look forward to collaborating on future projects.", "Chúng tôi rất mong đợi được hợp tác trong các dự án tương lai.", "S + look forward to + V-ing", "Sau 'look forward to' luôn là V-ing."),
            ("He is preparing to deliver a keynote speech.", "Anh ấy đang chuẩn bị phát biểu bài phát biểu chính.", "S + be preparing to + V", "'keynote speech' là bài phát biểu đinh của hội nghị."),
            ("They are scheduled to release the beta version.", "Họ được lên lịch phát hành phiên bản thử nghiệm beta.", "S + be scheduled to + V", "Dùng để diễn tả lịch trình cố định."),
            ("I will ensure all security standards are met.", "Tôi sẽ đảm bảo mọi tiêu chuẩn an toàn bảo mật được đáp ứng.", "S + will ensure + Clause", "'meet standards' là đáp ứng tiêu chuẩn."),
            ("She promises to finish the backend API endpoints.", "Cô ấy hứa sẽ hoàn thành các endpoint API phía backend.", "S + promise to + V", "'endpoints' là các cổng giao tiếp API."),
            ("We are bound to discover new optimization insights.", "Chúng tôi chắc chắn sẽ khám phá ra những hiểu biết tối ưu mới.", "S + be bound to + V", "'be bound to' chỉ sự việc chắc chắn diễn ra."),
            ("He is about to merge the feature branch.", "Anh ấy chuẩn bị gộp nhánh tính năng vào nhánh chính.", "S + be about to + V", "'be about to' chỉ hành động sắp diễn ra tức thì."),
            ("They are likely to approve our technical proposal.", "Họ có nhiều khả năng sẽ phê duyệt đề xuất kỹ thuật của chúng tôi.", "S + be likely to + V", "'be likely to' chỉ xác suất xảy ra cao."),
            ("I am determined to eliminate all performance bottlenecks.", "Tôi quyết tâm loại bỏ tất cả các điểm nghẽn hiệu năng.", "S + be determined to + V", "'bottlenecks' là điểm nghẽn hiệu năng."),
            ("She wants to deepen her knowledge of databases.", "Cô ấy muốn đào sâu kiến thức của mình về cơ sở dữ liệu.", "S + want to + V + O", "'deepen knowledge' nghĩa là mở rộng chuyên sâu kiến thức."),
            ("We plan on conducting thorough stress testing sessions.", "Chúng tôi dự định tiến hành các buổi kiểm thử chịu tải kỹ lưỡng.", "S + plan on + V-ing", "'stress testing' là kiểm tra độ chịu tải hệ thống."),
            ("He expects to finish refactoring legacy code modules.", "Anh ấy kỳ vọng sẽ hoàn thành việc tái cấu trúc các module mã nguồn cũ.", "S + expect to + V + O", "'legacy code' là mã nguồn cũ."),
            ("They aspire to build scalable global distributed systems.", "Họ khát khao xây dựng các hệ thống phân tán toàn cầu có khả năng mở rộng.", "S + aspire to + V + O", "'distributed systems' là hệ thống phân tán."),
            ("I am set to lead the frontend architecture.", "Tôi được chỉ định sẽ dẫn dắt kiến trúc giao diện frontend.", "S + be set to + V", "'be set to' là được sắp xếp nhiệm vụ."),
            ("She hopes that the new release will succeed.", "Cô ấy hy vọng rằng bản phát hành mới sẽ thành công rực rỡ.", "S + hope that + Clause", "'release' là bản phát hành phần mềm."),
            ("We are ready to handle high volume traffic.", "Chúng tôi đã sẵn sàng xử lý lượng truy cập lưu lượng lớn.", "S + be ready to + V", "'high volume traffic' là lưu lượng truy cập khủng."),
            ("He intends to implement robust error handling mechanisms.", "Anh ấy có ý định triển khai các cơ chế xử lý lỗi vững chắc.", "S + intend to + V + O", "'robust mechanisms' là cơ chế hoạt động bền bỉ.")
        ]
    }
]

# We expand stage 1 to have 15 complete topics by generating systematic rich linguistic patterns
def make_topic(t_id, title, title_vi, desc, icon, level, templates):
    sentences = []
    for s_id, (en, vi, pat, exp) in enumerate(templates, 1):
        words = en.strip().split()
        sentences.append({
            "id": f"{t_id}_{s_id:03d}",
            "textEn": en,
            "textVi": vi,
            "pattern": pat,
            "explanation": exp,
            "wordTiles": words
        })
    return {
        "id": t_id,
        "stageId": "1_foundation",
        "title": title,
        "titleVi": title_vi,
        "description": desc,
        "icon": icon,
        "level": level,
        "sentences": sentences
    }

print("Stage 1 base ready")
