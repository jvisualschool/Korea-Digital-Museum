const api = new EmuseumAPI();
const app = document.getElementById('app');

// State
let currentState = {
    view: 'home', // home, search, detail
    activeTab: '동물', // Default active tab
    query: '',
    category: '',
    results: [],
    detailItem: null,
    totalCount: 0,
    timeMs: 0
};

// Category Data
const categoryData = {
    '⭐️ 특별전': [], // Special Exhibitions
    '동물': [
        { name: '개', icon: '🐕', count: 32134 }, { name: '고양이', icon: '🐈', count: 72 }, { name: '말', icon: '🐎', count: 2482 },
        { name: '소', icon: '🐂', count: 2474 }, { name: '닭', icon: '🐓', count: 212 }, { name: '호랑이', icon: '🐅', count: 422 },
        { name: '사자', icon: '🦁', count: 753 }, { name: '돼지', icon: '🐖', count: 142 }, { name: '양', icon: '🐑', count: 1550 },
        { name: '토끼', icon: '🐇', count: 145 }, { name: '사슴', icon: '🦌', count: 819 }, { name: '원숭이', icon: '🐒', count: 245 },
        { name: '코끼리', icon: '🐘', count: 111 }, { name: '다람쥐', icon: '🐿️', count: 77 }, { name: '뱀', icon: '🐍', count: 210 },
        { name: '쥐', icon: '🐀', count: 103 }, { name: '거북이', icon: '🐢', count: 87 }, { name: '물고기', icon: '🐟', count: 913 }
    ],
    '식물': [
        { name: '포도', icon: '🍇', count: 878 }, { name: '석류', icon: '🍅', count: 668 }, { name: '복숭아', icon: '🍑', count: 980 },
        { name: '소나무', icon: '🌲', count: 4894 }, { name: '버드나무', icon: '🌳', count: 914 }, { name: '파초', icon: '🌿', count: 368 }
    ],
    '새/곤충': [
        { name: '공작', icon: '🦚', count: 301 }, { name: '까치', icon: '🐧', count: 299 }, { name: '원앙', icon: '🦆', count: 121 },
        { name: '백로', icon: '🕊️', count: 74 }, { name: '기러기', icon: '🦢', count: 176 }, { name: '오리', icon: '🦆', count: 375 },
        { name: '물새', icon: '🌊', count: 25 }
    ],
    '상상의 동물': [
        { name: '도깨비', icon: '👹', count: 645 }, { name: '해태', icon: '🦁', count: 294 }, { name: '기린', icon: '🦒', count: 106 },
        { name: '거북', icon: '🐢', count: 3717 }, { name: '물고기', icon: '🐟', count: 9283 }, { name: '호랑이', icon: '🐯', count: 1391 },
        { name: '사슴', icon: '🦌', count: 1421 }, { name: '학', icon: '🦢', count: 2519 }
    ],
    '시대별': [
        { name: '구석기', icon: '🪨', count: 488 }, { name: '신석기', icon: '🏺', count: 2548 }, { name: '청동기', icon: '⚔️', count: 4786 },
        { name: '고구려', icon: '🏰', count: 686 }, { name: '백제', icon: '👑', count: 2530 }, { name: '신라', icon: '✨', count: 6922 },
        { name: '고려', icon: '📜', count: 32134 }, { name: '조선', icon: '🏯', count: 85292 }, { name: '근대', icon: '🚂', count: 21398 }
    ],
    '재질별': [
        { name: '도자기', icon: '🏺', count: 96839 }, { name: '금속', icon: '🪙', count: 37704 }, { name: '목재', icon: '🪵', count: 26392 },
        { name: '서화', icon: '🖼️', count: 17290 }, { name: '직물', icon: '👘', count: 15307 }, { name: '석재', icon: '🗿', count: 9815 },
        { name: '유리', icon: '🔮', count: 1813 }, { name: '골각', icon: '🦴', count: 3371 }
    ],
    '용도별': [
        { name: '식생활', icon: '🍚', count: 36720 }, { name: '주거', icon: '🏠', count: 12558 }, { name: '의생활', icon: '👗', count: 18451 },
        { name: '신앙', icon: '🙏', count: 14787 }, { name: '예술', icon: '🎨', count: 20138 }, { name: '교육', icon: '📚', count: 8182 },
        { name: '군사', icon: '⚔️', count: 5202 }, { name: '장례', icon: '⚰️', count: 3889 }
    ]
};

const specialThemes = [
    {
        title: '옛 선조들의 강아지 사랑',
        desc: '회화, 도자기, 장식품 속에서 발견하는 반려동물의 역사',
        icon: '🐕',
        query: '개',
        image: 'img/1.jpg'
    },
    {
        title: '백자 속 헤엄치는 물고기',
        desc: '청화백자와 철화백자에 담긴 생동감 넘치는 수중 세계',
        icon: '🐟',
        query: '백자 어문',
        image: 'img/2.jpg'
    },
    {
        title: '달빛 아래 품은 이야기',
        desc: '백자, 자개장, 회화 등에서 찾아보는 선조들의 달 사랑',
        icon: '🌙',
        query: '달',
        image: 'img/3.jpg'
    },
    {
        title: '술자리의 미학',
        desc: '주전자, 술잔, 술병 등 시대별 음주 문화와 그릇의 변천사',
        icon: '🍶',
        query: '주전자 술잔'
    },
    {
        title: '여인들의 비밀 상자',
        desc: '빗, 거울, 노리개, 비녀 등 조선시대 뷰티 아이템 컬렉션',
        icon: '📿',
        query: '장신구'
    },
    {
        title: '용의 등장: 권력의 상징',
        desc: '도자기, 직물, 목가구에서 만나는 용의 다양한 표현',
        icon: '🐉',
        query: '용'
    },
    {
        title: '선비의 서재 풍경',
        desc: '벼루, 필통, 책상, 문진 등 조선 지식인의 일상과 문방사우',
        icon: '🖌️',
        query: '문방구'
    },
    {
        title: '사계절을 품은 그릇',
        desc: '매화(봄), 연꽃(여름), 국화(가을), 대나무(겨울) 문양의 도자기',
        icon: '🌸',
        query: '사군자'
    },
    {
        title: '조선의 지갑 사정',
        desc: '엽전, 은병, 상평통보 등 옛 사람들의 경제생활과 화폐의 역사',
        icon: '🪙',
        query: '상평통보'
    },
    {
        title: '부엌에서 온 타임캡슐',
        desc: '솥, 시루, 주발, 찬합 등 조리도구와 식기로 보는 한식의 원형',
        icon: '🔥',
        query: '부엌'
    },
    {
        title: '탈 속에 숨은 천 개의 얼굴',
        desc: '지역별 탈춤과 탈의 조형미, 표정의 다양성',
        icon: '🎭',
        query: '탈'
    },
    {
        title: '실과 바늘의 예술',
        desc: '자수, 누비, 조각보 등 바느질로 새긴 조선 여인들의 창의성',
        icon: '🧵',
        query: '자수'
    },
    {
        title: '밤을 밝힌 빛의 도구',
        desc: '촛대, 등잔, 호롱불 등 전기 이전 시대의 다양한 조명 기구',
        icon: '💡',
        query: '등잔'
    },
    {
        title: '놀이의 발견',
        desc: '윷, 투호, 쌍륙, 장기판 등 선조들의 여가와 게임 문화',
        icon: '🎲',
        query: '놀이'
    },
    {
        title: '하늘을 나는 자유의 상징',
        desc: '학, 봉황, 기러기 등 도자기와 병풍에 담긴 비상의 염원',
        icon: '🦅',
        query: '봉황'
    },
    {
        title: '소리를 담은 금속',
        desc: '종, 징, 꽹과리, 방울 등 사찰, 궁중, 민간의 소리 문화',
        icon: '🔔',
        query: '범종'
    },
    {
        title: '바다에서 온 선물',
        desc: '전복, 소라껍질로 빚어낸 나전칠기 속 찬란한 빛의 예술',
        icon: '🌊',
        query: '나전'
    },
    {
        title: '아이의 백 년을 기원하며',
        desc: '돌상 물품, 장난감, 굴레 등 조선시대 육아 유물과 성장 의례',
        icon: '👶',
        query: '아기'
    }
];

// Code Mappings
const nationalityMap = {
    'PS06001001': '한국', 'PS06001002': '중국', 'PS06001003': '일본', 'PS06001004': '북한',
    'PS06001021': '한국' // Assuming this common code is also Korea based on data
};

const materialMap = {
    'PS08001': '금속', 'PS08002': '토제', 'PS08003': '도자기', 'PS08004': '석',
    'PS08005': '유리/보석', 'PS08006': '초제', 'PS08007': '나무/목재', 'PS08008': '골각/패갑',
    'PS08009': '지', 'PS08010': '피모', 'PS08011': '직물', 'PS08012': '기타', 'PS08013': '복합재질'
};

function getCodeName(map, code) {
    if (!code) return '';
    // Prefix matching if exact match not found
    for (const key in map) {
        if (code.startsWith(key)) return map[key];
    }
    return '';
}

// Routing / Navigation
function navigateTo(view, params = {}) {
    currentState.view = view;
    Object.assign(currentState, params);
    render();
}

// Event Listeners for Nav
document.getElementById('nav-home').addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('home');
});



async function handleSearch(query, page = 1) {
    app.innerHTML = '<div class="hero"><p>검색 중입니다...</p></div>';
    const rows = 20;
    const { items, totalCount, timeMs } = await api.search(query, '', rows, page);
    updateResponseTime(timeMs);
    navigateTo('search', { query, results: items, totalCount, timeMs, page, rows });
}

function updateResponseTime(timeMs) {
    const el = document.getElementById('response-time-wrap');
    if (el) el.innerHTML = ` , 응답시간 : ${timeMs}ms`;
}

function hideResponseTime() {
    const el = document.getElementById('response-time-wrap');
    if (el) el.innerHTML = '';
}

// Render Functions
function render() {
    app.innerHTML = '';

    if (currentState.view === 'home') {
        hideResponseTime();
        renderHome();
    } else if (currentState.view === 'search') {
        renderSearch();
    } else if (currentState.view === 'detail') {
        renderDetail();
    }

    window.scrollTo(0, 0);
}

function renderHome() {
    const section = document.createElement('section');
    section.className = 'hero fade-in';

    // Generate Dynamic Tabs
    const tabs = Object.keys(categoryData);
    const tabsHtml = `
        <div class="tabs-container">
            <div class="tabs-header">
                ${tabs.map(tab => `
                    <button class="tab-btn ${currentState.activeTab === tab ? 'active' : ''}" onclick="switchTab('${tab}')">${tab}</button>
                `).join('')}
            </div>
        </div>
    `;

    // Generate Content based on Tab
    let gridHtml = '';

    if (currentState.activeTab === '⭐️ 특별전') {
        // Special Exhibition Rendering
        gridHtml = `
            <div class="special-grid">
                ${specialThemes.map(theme => `
                    <div class="special-card" onclick="handleSearch('${theme.query}')">
                        ${theme.image ? `<div class="special-bg" style="background-image: url('${theme.image}')"></div>` : ''}
                        <div class="special-icon">${theme.icon}</div>
                        <div class="special-info">
                            <h3>${theme.title}</h3>
                            <p>${theme.desc}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        // Normal Category Grid
        const currentItems = categoryData[currentState.activeTab] || [];
        gridHtml = `
            <div class="sub-cat-grid">
                ${currentItems.map(item => `
                    <div class="sub-cat-item" onclick="handleSearch('${item.name}')">
                        <span class="sub-cat-icon">${item.icon}</span>
                        <span class="sub-cat-name">${item.name}</span>
                        <span class="sub-cat-count">(${item.count ? item.count.toLocaleString() : 0})</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    section.innerHTML = `
        <div class="hero-bg-container">
            <div class="hero-slider-track">
                ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<div class="hero-bg-slide" style="background-image: url('BG/bg_${i > 8 ? 1 : i}.jpg');"></div>`).join('')}
            </div>
            <div class="hero-overlay"></div>
            
            <div class="hero-content">
                <div class="hero-title-bg">
                    <p>전국 박물관의 소장품을 고해상도로 감상하세요.</p>
                    <h1>문화유산의 숨결을 만나다</h1>
                </div>
                
                <div class="search-box">
                    <input type="text" id="main-search-input" placeholder="유물 이름을 검색해보세요 (예: 백제)">
                    <button id="main-search-btn">검색</button>
                </div>
                
                ${tabsHtml}
            </div>
        </div>
        
        ${gridHtml}
        
        <div class="bottom-info-box">
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number">250만+</div>
                    <div class="stat-label">소장품 정보</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">354개</div>
                    <div class="stat-label">협력 박물관</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">무료</div>
                    <div class="stat-label">고해상도 다운로드</div>
                </div>
            </div>
            
            <div class="features-line">
                <span>📸 고해상도 이미지</span>
                <span class="divider">|</span>
                <span>🆓 무료 다운로드</span>
                <span class="divider">|</span>
                <span>🏛️ 354개 박물관</span>
                <span class="divider">|</span>
                <span>🔍 상세 정보</span>
            </div>
        </div>
    `;

    app.appendChild(section);

    // Wire up search
    const btn = document.getElementById('main-search-btn');
    const input = document.getElementById('main-search-input');

    const doSearch = () => {
        if (input.value.trim()) handleSearch(input.value.trim());
    };

    btn.addEventListener('click', doSearch);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') doSearch();
    });

    appendFooter();
    startHeroSlider();
}

function switchTab(tabName) {
    currentState.activeTab = tabName;
    render(); // Re-render home with new tab
}
// Expose switchTab to window
window.switchTab = switchTab;

function renderSearch() {
    const section = document.createElement('section');
    section.className = 'fade-in';

    // Header
    const header = document.createElement('div');
    header.style.padding = '2rem 5%';

    const countDisplay = currentState.totalCount ? Number(currentState.totalCount).toLocaleString() : 0;
    const timeDisplay = currentState.timeMs ? currentState.timeMs : 0;

    const pageDisplay = currentState.page ? currentState.page : 1;

    if (currentState.results.length > 0) {
        header.innerHTML = `
            <h2>
                <span onclick="navigateTo('home')" class="home-icon" title="메인으로"><i data-lucide="home"></i></span>
                '${currentState.query}' 검색 결과
            </h2>
            <p style="color:var(--text-secondary); margin-top:0.5rem; font-size: 0.9rem;">
                총 <strong style="color:var(--accent)">${countDisplay}</strong>건 발견
            </p>
        `;
    } else {
        header.innerHTML = `
            <h2>
                <span onclick="navigateTo('home')" class="home-icon" title="메인으로"><i data-lucide="home"></i></span>
                '${currentState.query}' 검색 결과
            </h2>
        `;
    }

    section.appendChild(header);

    if (currentState.results.length === 0) {
        header.innerHTML += `<p>검색 결과가 없습니다.</p>`;
        app.appendChild(section);
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'gallery-grid';

    currentState.results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'relic-card';

        // Check if image URL is valid and not a placeholder
        const isPlaceholder = item.imgUrl && (
            item.imgUrl.includes('placeholder.com') ||
            item.imgUrl.includes('no-image') ||
            item.imgUrl.includes('noimage')
        );
        const hasImage = item.imgUrl && item.imgUrl !== '' && !isPlaceholder;

        const imgWrapper = document.createElement('div');
        imgWrapper.className = hasImage ? 'relic-img-wrapper' : 'relic-img-wrapper no-image';

        if (hasImage) {
            const img = document.createElement('img');
            img.src = item.imgUrl;
            img.alt = item.name;
            img.loading = 'lazy';

            // Handle image load error
            img.addEventListener('error', function () {
                this.parentElement.classList.add('no-image');
                this.parentElement.innerHTML = `
                    <div class="no-image-placeholder">
                        <div class="camera-icon">📷</div>
                        <div class="no-image-text">이미지가 없습니다</div>
                    </div>
                `;
            });

            imgWrapper.appendChild(img);
        } else {
            imgWrapper.innerHTML = `
                <div class="no-image-placeholder">
                    <div class="camera-icon">📷</div>
                    <div class="no-image-text">이미지가 없습니다</div>
                </div>
            `;
        }

        const infoDiv = document.createElement('div');
        infoDiv.className = 'relic-info';

        let details = [];
        if (item.museumName) details.push(item.museumName);

        const nationality = getCodeName(nationalityMap, item.nationalityCode);
        if (nationality) details.push(nationality);

        const material = getCodeName(materialMap, item.materialCode);
        if (material) details.push(material);

        // Join with ' | ' or show default if empty
        const detailsText = details.length > 0 ? details.join(' | ') : '정보 없음';

        infoDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>${detailsText}</p>
        `;

        card.appendChild(imgWrapper);
        card.appendChild(infoDiv);

        card.addEventListener('click', () => {
            loadDetail(item.id);
        });

        grid.appendChild(card);
    });

    section.appendChild(grid);

    // --- Pagination Logic ---
    // Ensure totalCount is a clean number (remove commas if valid string)
    const rawCount = String(currentState.totalCount).replace(/,/g, '');
    const safeTotalCount = parseInt(rawCount, 10) || 0;

    const totalPages = Math.ceil(safeTotalCount / currentState.rows);
    if (totalPages > 1) {
        const pagination = document.createElement('div');
        pagination.className = 'pagination-container';

        const curr = currentState.page || 1;

        // Previous Page Button
        const prevBtn = document.createElement('button');
        prevBtn.className = `page-nav-btn ${curr === 1 ? 'disabled' : ''}`;
        prevBtn.innerHTML = '← 이전';
        prevBtn.disabled = curr === 1;
        prevBtn.onclick = () => {
            if (curr > 1) handleSearch(currentState.query, curr - 1);
        };
        pagination.appendChild(prevBtn);

        // Next Page Button
        const nextBtn = document.createElement('button');
        nextBtn.className = `page-nav-btn next ${curr === totalPages ? 'disabled' : ''}`;
        nextBtn.innerHTML = '다음 →';
        nextBtn.disabled = curr === totalPages;
        nextBtn.onclick = () => {
            if (curr < totalPages) handleSearch(currentState.query, curr + 1);
        };
        pagination.appendChild(nextBtn);

        // Page Info Container (input + of total + arrows)
        const pageInfo = document.createElement('div');
        pageInfo.className = 'page-info';

        // Current Page Input
        const pageInput = document.createElement('input');
        pageInput.type = 'number';
        pageInput.className = 'page-input';
        pageInput.value = curr;
        pageInput.min = 1;
        pageInput.max = totalPages;
        pageInput.onchange = (e) => {
            let val = parseInt(e.target.value, 10);
            if (val < 1) val = 1;
            if (val > totalPages) val = totalPages;
            if (val !== curr) handleSearch(currentState.query, val);
        };
        pageInfo.appendChild(pageInput);

        // "of 500" text
        const ofText = document.createElement('span');
        ofText.className = 'page-of-text';
        ofText.textContent = `of ${totalPages}`;
        pageInfo.appendChild(ofText);

        // Left Arrow
        const leftArrow = document.createElement('button');
        leftArrow.className = `page-arrow ${curr === 1 ? 'disabled' : ''}`;
        leftArrow.innerHTML = '‹';
        leftArrow.disabled = curr === 1;
        leftArrow.onclick = () => {
            if (curr > 1) handleSearch(currentState.query, curr - 1);
        };
        pageInfo.appendChild(leftArrow);

        // Right Arrow
        const rightArrow = document.createElement('button');
        rightArrow.className = `page-arrow ${curr === totalPages ? 'disabled' : ''}`;
        rightArrow.innerHTML = '›';
        rightArrow.disabled = curr === totalPages;
        rightArrow.onclick = () => {
            if (curr < totalPages) handleSearch(currentState.query, curr + 1);
        };
        pageInfo.appendChild(rightArrow);

        pagination.appendChild(pageInfo);

        section.appendChild(pagination);
    }

    app.appendChild(section);

    appendFooter();
    
    // Lucide 아이콘 초기화
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

async function loadDetail(id) {
    const detail = await api.getDetail(id);
    if (detail) {
        navigateTo('detail', { detailItem: detail });
    } else {
        alert('상세 정보를 불러올 수 없습니다.');
    }
}

function renderDetail() {
    const item = currentState.detailItem;
    if (!item) return;

    const section = document.createElement('section');
    section.className = 'detail-view fade-in';

    const imgUrl = item.imgUrl || item.imgUrlKy || 'https://via.placeholder.com/800x600?text=No+Image';
    const desc = item.desc ? item.desc.replace(/\n/g, '<br>') : '상세 설명이 없습니다.';

    section.innerHTML = `
        <div class="back-btn" id="back-btn">← 목록으로 돌아가기</div>
        
        <div class="detail-content">
            <div class="detail-image" id="detail-img-container">
                <img src="${imgUrl}" alt="${item.name}" id="detail-img">
                <div class="zoom-hint">마우스를 올리면 확대</div>
            </div>
            <div class="detail-text">
                <h2>${item.name}</h2>
                ${item.otherName && item.otherName !== '-' ? `<p style="font-size: 0.9rem; color: #aaa; margin-bottom: 0.5rem;">${item.otherName}</p>` : ''}
                <p style="color:var(--accent); margin-bottom:1.5rem; font-weight: bold;">${item.museumName}</p>
                
                <div class="detail-meta">
                    <span class="meta-label">국적/시대</span>
                    <span>${item.nationality || '-'} / ${item.era || '-'}</span>
                    
                    <span class="meta-label">분류</span>
                    <span>${item.category || '-'}</span>

                    <span class="meta-label">재질</span>
                    <span>${item.material || '-'}</span>
                    
                    <span class="meta-label">작가</span>
                    <span>${item.author || '-'}</span>
                    
                    <span class="meta-label">크기</span>
                    <span>${item.size || '-'}</span>
                    
                    <span class="meta-label">소장품번호</span>
                    <span>${item.museumNo || '-'}</span>
                </div>
                
                <div class="detail-desc">
                    ${desc}
                </div>
                
                <a href="${imgUrl}" target="_blank" class="download-btn" download>
                    이미지 다운로드/원본 보기
                </a>
            </div>
        </div>
    `;

    app.appendChild(section);

    // Zoom Logic
    const container = document.getElementById('detail-img-container');
    const img = document.getElementById('detail-img');

    container.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = (e.clientX - left) / width * 100;
        const y = (e.clientY - top) / height * 100;

        img.style.transformOrigin = `${x}% ${y}%`;
        img.style.transform = 'scale(2.5)'; // 2.5x Zoom
        img.style.cursor = 'zoom-in';
    });

    container.addEventListener('mouseleave', () => {
        img.style.transformOrigin = 'center center';
        img.style.transform = 'scale(1)';
        img.style.cursor = 'default';
    });

    document.getElementById('back-btn').addEventListener('click', () => {
        if (currentState.results.length > 0) {
            navigateTo('search');
        } else {
            navigateTo('home');
        }
    });

    appendFooter();
}

function appendFooter() {
    const footer = document.createElement('footer');
    footer.className = 'main-footer';
    footer.innerHTML = `
        <p>
            데이터 제공: <a href="http://www.emuseum.go.kr" target="_blank">국립중앙박물관 e뮤지엄</a> 
            <span class="divider" style="margin: 0 10px; opacity: 0.3;">|</span> 
            API 정보: <a href="https://www.data.go.kr" target="_blank">공공데이터포털</a>
        </p>
    `;
    app.appendChild(footer);
}

// Initial Render
render();

// Expose handleSearch to window for onclick in HTML strings
window.handleSearch = handleSearch;


/* --- Hero Slider Logic (4 square images, slide left one at a time) --- */
function startHeroSlider() {
    const track = document.querySelector('.hero-slider-track');
    if (!track) return;

    if (window.heroInterval) clearInterval(window.heroInterval);

    // 트랙 초기화
    track.style.transition = 'none';
    track.style.transform = 'translateX(0)';

    window.heroInterval = setInterval(() => {
        if (currentState.view !== 'home') {
            clearInterval(window.heroInterval);
            return;
        }

        // 왼쪽으로 25vw (한 슬라이드 너비) 이동
        track.style.transition = 'transform 1.5s ease-in-out';
        track.style.transform = 'translateX(-25vw)';

        // 애니메이션 완료 후 첫 번째 요소를 맨 뒤로 이동
        setTimeout(() => {
            track.style.transition = 'none';
            const first = track.firstElementChild;
            if (first) track.appendChild(first);
            track.style.transform = 'translateX(0)';
        }, 1500);

    }, 4000); // 4초마다 슬라이드
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Initialize Lucide icons for theme toggle
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Initialize theme toggle when DOM is loaded
// Initialized via the combined listener below
// document.addEventListener('DOMContentLoaded', initThemeToggle);
/* --- Splash Modal Functionality --- */
function initSplashModal() {
    const splashModal = document.getElementById('splash-modal');
    const splashTrigger = document.getElementById('logo-splash-trigger');
    const closeBtn = document.getElementById('close-splash');
    const startBtn = document.getElementById('start-project');

    const showModal = () => {
        splashModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    const hideModal = () => {
        splashModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    };

    // Show on logo click
    if (splashTrigger) {
        splashTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showModal();
        });
    }

    // Hide on buttons
    if (closeBtn) closeBtn.addEventListener('click', hideModal);
    if (startBtn) startBtn.addEventListener('click', hideModal);

    // Hide on outside click
    splashModal.addEventListener('click', (e) => {
        if (e.target === splashModal) hideModal();
    });

    // Show automatically on first load in this session
    if (!sessionStorage.getItem('splashShown')) {
        setTimeout(showModal, 500);
        sessionStorage.setItem('splashShown', 'true');
    }
}

// Update initialization
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initSplashModal();
});
