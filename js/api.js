class EmuseumAPI {
    constructor() {
        // Using local proxy to avoid Mixed Content (HTTPS -> HTTP) issues
        this.baseUrl = './proxy.php';
    }

    async search(query, category = '', rows = 20, page = 1) {
        // Construct URL for proxy: ./proxy.php?action=list&name=...&numOfRows=...&pageNo=...
        const url = new URL(this.baseUrl, window.location.origin + window.location.pathname);
        url.searchParams.append('action', 'list');
        url.searchParams.append('numOfRows', rows);
        url.searchParams.append('pageNo', page);

        if (query) {
            url.searchParams.append('name', query);
        }

        if (category) {
            // Include category in name search if name is empty, or add robust logic
            if (!url.searchParams.get('name')) {
                url.searchParams.append('name', category);
            }
        }

        try {
            const startTime = performance.now();
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`API Request failed: ${response.status}`);
            }

            const text = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "text/xml");

            // Check for error in XML
            const errorMsg = xmlDoc.querySelector('resultMsg');
            // Logic to check success (resultCode usually 0000)

            const endTime = performance.now();
            const timeMs = (endTime - startTime).toFixed(0);

            // Correct XML structure: <result><list><data><item key='name' value='...'/></data>...</list></result>
            const dataNodes = xmlDoc.querySelectorAll('list > data');
            const totalCount = xmlDoc.querySelector('totalCount')?.textContent || 0;

            const items = Array.from(dataNodes).map(dataNode => {
                const obj = {};
                // Each 'data' node has multiple 'item' children which are properties
                const props = dataNode.querySelectorAll('item');
                props.forEach(prop => {
                    const key = prop.getAttribute('key');
                    const value = prop.getAttribute('value');
                    obj[key] = value;
                });

                return {
                    id: obj.id,
                    name: obj.name || obj.nameKr || obj.nameCn, // Fallback chain
                    desc: obj.desc || '', // Usually desc is in detail, but might be here
                    imgUrl: obj.imgThumUriL || obj.imgThumUriM || obj.imgUri, // Prefer large thumbnail for better quality
                    museumName: obj.museumName2 || obj.museumName3 || obj.museumName1,
                    nationalityCode: obj.nationalityCode,
                    materialCode: obj.materialCode
                };
            }).filter(item => item.id); // Filter out empty or malformed

            return { items, totalCount, timeMs };

        } catch (error) {
            console.error("Search failed:", error);
            return { items: [], totalCount: 0, timeMs: 0 };
        }
    }

    async getDetail(id) {
        // proxy.php?action=detail&id={id}
        const url = new URL(this.baseUrl, window.location.origin + window.location.pathname);
        url.searchParams.append('action', 'detail');
        url.searchParams.append('id', id);

        try {
            const response = await fetch(url);
            const text = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "text/xml");

            // Detail also comes in <list><data>...</data></list> structure (usually usually single data node)
            const dataNode = xmlDoc.querySelector('list > data');
            if (!dataNode) return null;

            const obj = {};
            dataNode.querySelectorAll('item').forEach(prop => {
                obj[prop.getAttribute('key')] = prop.getAttribute('value');
            });

            // Sometimes detail has an imageList node separately
            // But let's grab main info first

            return {
                id: obj.id,
                name: obj.name || obj.nameKr,
                desc: obj.desc,
                imgUrl: obj.imgUri || obj.imgThumUriL || obj.imgThumUriM, // High res 'imgUri' preferred for detail
                material: obj.materialName1 || obj.materialName,
                size: obj.size || obj.sizeInfo, // 'size' might vary key
                nationality: obj.nationalityName1 || obj.nationalityName,
                museumName: obj.museumName2 || obj.museumName3 || obj.museumName1,

                // Detailed Metadata
                otherName: obj.nameOther || obj.indexWord || '-',
                era: obj.eraName1 || obj.eraName || '-',
                category: [obj.purposeName1, obj.purposeName2, obj.class1Name].filter(Boolean).join(' > ') || '-',
                author: obj.author || obj.authorName || '작자미상',
                museumNo: obj.relicNo || obj.museumNo1 || '-'
            };
        } catch (error) {
            console.error("Detail failed:", error);
            return null;
        }
    }
}
