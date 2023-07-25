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