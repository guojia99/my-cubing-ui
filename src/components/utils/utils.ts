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