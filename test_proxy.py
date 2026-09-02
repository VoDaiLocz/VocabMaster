import sys
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.proxies import ProxyConfig

proxy_config = ProxyConfig(http="http://101.96.122.196:8080", https="http://101.96.122.196:8080")

try:
    print("Testing proxy...")
    api = YouTubeTranscriptApi(proxy_config=proxy_config)
    tlist = api.list('2ePf9rue1Ao')
    source_t = tlist.find_transcript(['en', 'en-US', 'en-GB'])
    cues = source_t.fetch()
    print("SUCCESS! Got", len(cues), "cues.")
except Exception as e:
    print("FAILED:", str(e))
