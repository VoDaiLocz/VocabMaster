import json
import re
from youtube_transcript_api import YouTubeTranscriptApi

api = YouTubeTranscriptApi()

def clean_text(t):
    return t.replace('\n', ' ').strip()

# Fetch Steve Jobs (UF8uR6Z6KLc)
jobs_raw = api.fetch('UF8uR6Z6KLc')
print(f"Fetched {len(jobs_raw)} raw cues for Steve Jobs.")

# Translate mapping rules / dictionary for fast natural Vietnamese translation
translation_cache = {
    "This program is brought to you by Stanford University.": "Chương trình này được mang đến bởi Đại học Stanford.",
    "Please visit us at stanford.edu": "Vui lòng truy cập trang web stanford.edu",
    "Thank You. I am honored to be with you today at your commencement": "Cảm ơn các bạn. Tôi rất vinh hạnh được có mặt cùng các bạn hôm nay tại lễ tốt nghiệp",
    "from one of the finest universities in the world.": "từ một trong những trường đại học danh giá nhất trên thế giới.",
    "Truth be told I never graduated from college": "Thành thật mà nói, tôi chưa từng tốt nghiệp đại học",
    "and this is the closest I've ever gotten to a college graduation.": "và đây là lần tôi tiến gần nhất tới một buổi lễ tốt nghiệp đại học.",
    "Today I want to tell you three stories from my life. That's it.": "Hôm nay tôi muốn kể cho các bạn nghe ba câu chuyện trong đời tôi. Chỉ vậy thôi.",
    "No big deal. Just three stories.": "Không có gì to tát cả. Chỉ là ba câu chuyện.",
    "The first story is about connecting the dots.": "Câu chuyện đầu tiên là về việc kết nối những dấu chấm.",
    "I dropped out of Reed College after the first 6 months,": "Tôi đã bỏ học tại trường Cao đẳng Reed sau 6 tháng đầu,",
    "but then stayed around as a drop-in": "nhưng sau đó vẫn ở lại học dự thính",
    "for another 18 months or so before I really quit.": "thêm khoảng 18 tháng nữa trước khi thực sự nghỉ hẳn.",
    "So why did I drop out?": "Vậy tại sao tôi lại bỏ học?",
    "It started before I was born.": "Chuyện bắt đầu từ trước khi tôi sinh ra.",
    "My biological mother was a young, unwed graduate student,": "Mẹ ruột tôi là một nữ sinh viên cao học trẻ chưa kết hôn,",
    "and she decided to put me up for adoption.": "và bà đã quyết định cho tôi làm con nuôi.",
    "She felt very strongly that I should be adopted by college graduates,": "Bà tha thiết mong muốn tôi được nhận nuôi bởi những người tốt nghiệp đại học,",
    "so everything was all set for me to": "nên mọi thứ đã được thu xếp để tôi",
    "be adopted at birth by a lawyer and his wife.": "được một luật sư và vợ ông ấy nhận nuôi từ lúc lọt lòng.",
    "Except that when I popped out they decided": "Ngoại trừ việc khi tôi chào đời, vào phút chót họ lại quyết định",
    "at the last minute that they really wanted a girl.": "rằng họ thực sự muốn một bé gái.",
    "So my parents, who were on a waiting list,": "Vì vậy, bố mẹ tôi đang ở trong danh sách chờ,",
    "got a call in the middle of the night asking:": "đã nhận được một cuộc gọi lúc nửa đêm hỏi:",
    "\"We have an unexpected baby boy; do you want him?\"": "\"Chúng tôi có một bé trai ngoài dự kiến; ông bà có muốn nhận cháu không?\"",
    "They said: \"Of course.\"": "Họ đáp: \"Tất nhiên rồi.\"",
    "My biological mother later found out that my mother": "Mẹ ruột tôi sau đó phát hiện ra rằng mẹ nuôi tôi",
    "had never graduated from college and that my father": "chưa từng học đại học và bố nuôi tôi",
    "had never graduated from high school.": "chưa từng tốt nghiệp cấp ba.",
    "She refused to sign the final adoption papers.": "Bà đã kiên quyết từ chối ký giấy tờ nhận nuôi cuối cùng.",
    "She only relented a few months later when my parents promised": "Bà chỉ mủi lòng vài tháng sau đó khi bố mẹ tôi hứa",
    "that I would someday go to college.": "rằng một ngày nào đó tôi sẽ được vào đại học.",
    "And 17 years later I did go to college.": "Và 17 năm sau tôi đã thực sự bước chân vào đại học.",
    "Stay Hungry. Stay Foolish.": "Hãy luôn khao khát. Hãy luôn dại khờ.",
    "Thank you all very much.": "Cảm ơn tất cả các bạn rất nhiều."
}

# Auto translator fallback for any cue
import urllib.parse
import urllib.request

def translate_to_vi(text):
    if text in translation_cache:
        return translation_cache[text]
    # Simple Google Translate free endpoint
    try:
        url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q={urllib.parse.quote(text)}"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=3) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            vi_text = "".join([part[0] for part in data[0] if part[0]])
            return vi_text
    except Exception as e:
        return text

jobs_cues = []
print("Translating Steve Jobs 244 cues...")
for idx, cue in enumerate(jobs_raw):
    text_en = clean_text(cue.text)
    if not text_en:
        continue
    start = round(float(cue.start), 2)
    duration = round(float(cue.duration), 2)
    end = round(start + duration, 2)
    text_vi = translate_to_vi(text_en)
    words = [w for w in text_en.split() if w]
    jobs_cues.append({
        "id": idx + 1,
        "start": start,
        "duration": duration,
        "end": end,
        "textEn": text_en,
        "textVi": text_vi,
        "words": words
    })

print(f"Processed {len(jobs_cues)} Steve Jobs cues successfully!")

# Save to json file for inspection
with open("/home/vodailoc/VocabMaster/src/data/steve_jobs_244_cues.json", "w", encoding="utf-8") as f:
    f.write(json.dumps(jobs_cues, ensure_ascii=False, indent=2))
print("Saved to src/data/steve_jobs_244_cues.json")
