#!/bin/bash

# E-Museum API 검색 결과 수집 스크립트 (macOS 호환)
API_KEY="***REMOVED_API_KEY***"
BASE_URL="http://www.emuseum.go.kr/openapi/relic/list"

echo "{"
echo "  \"animals\": {"

# 동물 카테고리
keywords_animals=("동물" "개" "고양이" "말" "소" "닭" "병아리" "호랑이" "사자" "돼지" "양" "토끼" "사슴" "원숭이" "코끼리" "다람쥐" "도마뱀" "뱀" "쥐" "박쥐" "개구리" "거북이" "물고기" "잉어" "게" "오징어")

count=0
total=${#keywords_animals[@]}

for keyword in "${keywords_animals[@]}"; do
    count=$((count + 1))
    
    echo "  검색 중: $keyword ($count/$total)" >&2
    
    # URL 인코딩 (Python 사용)
    encoded=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$keyword'))")
    
    # API 호출
    response=$(curl -s "${BASE_URL}?serviceKey=${API_KEY}&name=${encoded}&numOfRows=1")
    
    # totalCount 추출 (sed 사용)
    total_count=$(echo "$response" | sed -n 's/.*<totalCount>\([^<]*\)<\/totalCount>.*/\1/p')
    
    # 빈 값이면 0으로
    if [ -z "$total_count" ]; then
        total_count="0"
    fi
    
    # JSON 출력
    if [ $count -eq $total ]; then
        echo "    \"$keyword\": $total_count"
    else
        echo "    \"$keyword\": $total_count,"
    fi
    
    # 2초 대기
    sleep 2
done

echo "  },"
echo "  \"plants\": {"

# 식물 카테고리
keywords_plants=("식물" "꽃" "모란" "연꽃" "매화" "국화" "나무" "대나무" "소나무" "버드나무" "난초" "갈대" "풀" "덩굴" "잎" "파초" "영지" "불수감" "과일" "포도" "복숭아" "석류" "수박" "밤" "채소" "가지" "무" "오이")

count=0
total=${#keywords_plants[@]}

for keyword in "${keywords_plants[@]}"; do
    count=$((count + 1))
    
    echo "  검색 중: $keyword ($count/$total)" >&2
    
    encoded=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$keyword'))")
    response=$(curl -s "${BASE_URL}?serviceKey=${API_KEY}&name=${encoded}&numOfRows=1")
    total_count=$(echo "$response" | sed -n 's/.*<totalCount>\([^<]*\)<\/totalCount>.*/\1/p')
    
    if [ -z "$total_count" ]; then
        total_count="0"
    fi
    
    if [ $count -eq $total ]; then
        echo "    \"$keyword\": $total_count"
    else
        echo "    \"$keyword\": $total_count,"
    fi
    
    sleep 2
done

echo "  },"
echo "  \"imaginary\": {"

# 상상의 동물 카테고리
keywords_imaginary=("상상의 동물" "백호" "용" "주작" "봉황" "청룡" "도깨비" "현무" "해태" "기린")

count=0
total=${#keywords_imaginary[@]}

for keyword in "${keywords_imaginary[@]}"; do
    count=$((count + 1))
    
    echo "  검색 중: $keyword ($count/$total)" >&2
    
    encoded=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$keyword'))")
    response=$(curl -s "${BASE_URL}?serviceKey=${API_KEY}&name=${encoded}&numOfRows=1")
    total_count=$(echo "$response" | sed -n 's/.*<totalCount>\([^<]*\)<\/totalCount>.*/\1/p')
    
    if [ -z "$total_count" ]; then
        total_count="0"
    fi
    
    if [ $count -eq $total ]; then
        echo "    \"$keyword\": $total_count"
    else
        echo "    \"$keyword\": $total_count,"
    fi
    
    sleep 2
done

echo "  },"
echo "  \"insects\": {"

# 새/곤충 카테고리
keywords_insects=("새" "나비" "곤충" "학" "매" "꿩" "공작" "까치" "원앙" "백로" "기러기" "오리" "물새")

count=0
total=${#keywords_insects[@]}

for keyword in "${keywords_insects[@]}"; do
    count=$((count + 1))
    
    echo "  검색 중: $keyword ($count/$total)" >&2
    
    encoded=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$keyword'))")
    response=$(curl -s "${BASE_URL}?serviceKey=${API_KEY}&name=${encoded}&numOfRows=1")
    total_count=$(echo "$response" | sed -n 's/.*<totalCount>\([^<]*\)<\/totalCount>.*/\1/p')
    
    if [ -z "$total_count" ]; then
        total_count="0"
    fi
    
    if [ $count -eq $total ]; then
        echo "    \"$keyword\": $total_count"
    else
        echo "    \"$keyword\": $total_count,"
    fi
    
    sleep 2
done

echo "  }"
echo "}"

echo "" >&2
echo "완료!" >&2
