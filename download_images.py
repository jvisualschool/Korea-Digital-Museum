import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import os
import sys
import time

# API Configuration
from config import API_KEY
BASE_URL = "http://www.emuseum.go.kr/openapi/relic"

# Target List (Optimized Keywords, Filename)
targets = [
    ("산수문전", "부여_외리_문양전"),
    ("도기 기마인물형 명기", "도기_기마인물형_명기"),
    ("반가사유상", "금동미륵보살반가사유상"),
    ("송림사 오층전탑", "칠곡_송림사_오층전탑_사리장엄구"),
    ("단원 풍속도첩", "김홍도_필_풍속화첩"),
    ("금동판불상", "안압지_출토_금동판불상"),
    ("이광사 초상", "이광사_초상"),
    ("금관총 금관", "금관총_금관"),
    ("군수리 석조여래좌상", "부여_군수리_석조여래좌상"),
    ("선산읍 금동보살입상", "구미_선산읍_금동보살입상"),
    ("백자 상감연화당초문 대접", "백자_상감연화당초문_대접"),
    ("계림로 보검", "경주_계림로_보검"),
    ("감은사지 서삼층석탑", "감은사지_서삼층석탑_사리장엄구"),
    ("철화양류문 통형 병", "청자_철화양류문_통형_병"),
    ("청자 상감모란문 표주박모양 주전자", "청자_상감모란문_표주박모양_주전자"),
    ("백자 철화매죽문 항아리", "백자_철화매죽문_항아리")
]

def search_and_download(keyword, filename_prefix):
    print(f"Searching for: {keyword}...")
    try:
        # 1. Search List
        encoded_keyword = urllib.parse.quote(keyword)
        # Use simple keyword search and specific service key
        list_url = f"{BASE_URL}/list?serviceKey={API_KEY}&keyword={encoded_keyword}&rows=10"
        
        with urllib.request.urlopen(list_url) as response:
            raw_data = response.read()
            # print(f"DEBUG: {raw_data[:200]}") # Debug disabled
            
            root = ET.fromstring(raw_data)
            
            # Find first item content from <list> -> <item>
            list_node = root.find("list")
            if list_node is None:
                print(f"❌ No results found for '{keyword}' (No list node)")
                return

            item = list_node.find("item")
            if item is None:
                print(f"❌ No items found in list for '{keyword}'")
                return

            relic_id = item.get("id")
            name = item.get("name")
            print(f"   -> Found: {name} (ID: {relic_id})")

            # 2. Get Detail for High Res Image
            detail_url = f"{BASE_URL}/detail?serviceKey={API_KEY}&id={relic_id}"
            
            with urllib.request.urlopen(detail_url) as detail_response:
                detail_root = ET.parse(detail_response).getroot()
                
                # Try to find imgUri (High Res) in <data><item key='imgUri'>
                img_uri = None
                
                # Check data items
                for data_item in detail_root.findall(".//data/item"):
                    if data_item.get("key") == "imgUri":
                        img_uri = data_item.get("value")
                        break
                
                # Fallback to list thumbnail URL if needed, but detail usually has better
                if not img_uri:
                     img_uri = item.get("imgUri")

                if img_uri:
                    # Determine extension
                    file_ext = img_uri.split('.')[-1]
                    if len(file_ext) > 4 or '?' in file_ext: file_ext = "jpg"
                    
                    filename = f"download/{filename_prefix}.{file_ext}"
                    
                    print(f"   -> Downloading from {img_uri}...")
                    urllib.request.urlretrieve(img_uri, filename)
                    print(f"✅ Saved to {filename}")
                else:
                    print(f"⚠️ Image URL not found for {name}")

    except Exception as e:
        print(f"❌ Error processing {keyword}: {e}")
    
    time.sleep(0.5) # Be polite to API

# Run
if __name__ == "__main__":
    if not os.path.exists("download"):
        os.makedirs("download")
        
    print("--- Starting Bulk Download ---")
    for keyword, filename_prefix in targets:
        search_and_download(keyword, filename_prefix)
    print("--- Completed ---")
