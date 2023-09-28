export function GetAllQueryParams(url: string): Record<string, string> {
    const searchParams = new URLSearchParams(url.split('?')[1]);
    const queryParams: Record<string, string> = {};

    searchParams.forEach((value, key) => {
        queryParams[key] = value;
    });
    return queryParams;
}

export function GetLocationQueryParams(): Record<string, string>{
    return GetAllQueryParams(window.location.href)
}

export function GetLocationQueryParam(key: string) : string{
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
    window.history.pushState({ path: newURL }, "", newURL);
}

export function GetURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.toString()
}

export function IsSubPath(p: string) : boolean{
    console.log(window.location.pathname, p)
    return window.location.pathname.startsWith(p)
}

export function SetTitleName(name: string) {
    document.title = name + "| 魔缘赛事系统"
}
