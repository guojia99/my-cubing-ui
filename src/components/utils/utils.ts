export function GetAllQueryParams(url: string): Record<string, string> {
    const searchParams = new URLSearchParams(url.split('?')[1]);
    // const searchParams = new URLSearchParams(url);
    const queryParams: Record<string, string> = {};

    searchParams.forEach((value, key) => {

        if (value.indexOf("#") === -1) {
            queryParams[key] = value
            return
        }

        queryParams[key] = value.split('#')[0];
        queryParams["#"] = value.split("#")[1];
    });
    return queryParams;
}

export function GoToSh() {
    const p = GetLocationQueryParams()

    const s = p["#"]
    if (s === undefined || s.length === 0){
        return;
    }

    // 通过ID获取带有锚点的元素
    const targetElement = document.getElementById(s);

    if (targetElement === null) {
        return
    }
    // 滚动到元素的位置
    targetElement.scrollIntoView({
        behavior: 'smooth', // 可选，实现平滑滚动
        block: 'start'      // 可选，滚动到元素的顶部
    });
}

export function GetLocationQueryParams(): Record<string, string> {
    return GetAllQueryParams(window.location.href)
}

export function GetLocationQueryParam(key: string): string {
    const q = GetLocationQueryParams()
    return q[key] ? q[key] : ""
}

export function UpdateBrowserURL(key: string, value: string): void {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has(key)) {
        urlParams.set(key, value);
    } else {
        urlParams.append(key, value);
    }
    const newURL = window.location.pathname + "?" + urlParams.toString();
    window.history.pushState({path: newURL}, "", newURL);
}

export function GetURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.toString()
}

export function IsSubPath(p: string): boolean {
    return window.location.pathname.startsWith(p)
}

export function SetTitleName(name: string) {
    document.title = name + "| 广州魔缘魔方"
}
