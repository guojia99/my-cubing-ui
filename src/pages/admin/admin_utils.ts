export function parseTimeToSeconds(time: string) : number {
    const data = function (time) {
        if (time === 'DNF') {
            return -10000;
        }
        if (time === "DNS"){
            return -10001
        }

        // 解析纯秒数格式
        if (/^\d+(\.\d+)?$/.test(time)) {
            return parseFloat(time);
        }

        // 解析分+秒格式
        if (/^\d{1,2}[:：]\d{2}(\.\d+)?$/.test(time)) {
            const [minutes, seconds] = time.split(/[:：]/);
            return parseFloat(minutes) * 60 + parseFloat(seconds);
        }

        // 解析时+分+秒格式
        if (/^\d{1,2}[:：]\d{2}[:：]\d{2}(\.\d+)?$/.test(time)) {
            const [hours, minutes, seconds] = time.split(/[:：]/);
            return parseFloat(hours) * 3600 + parseFloat(minutes) * 60 + parseFloat(seconds);
        }
        return 0;
    }(time)

    return parseFloat(data.toString())
}