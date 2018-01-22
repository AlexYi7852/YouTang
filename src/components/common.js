import md5 from 'blueimp-md5'

// GET请求排序
export function sort(info) {
    let infonull = {},
        keys = Object.keys(info),
        i, len = keys.length;
    keys.sort();
    let p = '';
    for (i = 0; i < len; i++) {
        let k = keys[i];
        p += k + '=' + info[k] + '&';
    }
    p = p.substring(0, p.length - 1);
    return p;
}

// POST请求排序加密
export function sortMd5(info) {
    let infonull = {},
    keys = Object.keys(info),
    i, len = keys.length;
    keys.sort();
    let p = '';
    for (i = 0; i < len; i++) {
        let k = keys[i];
        p += k + '=' + info[k] + '&';
    }
    p = p.substring(0, p.length - 1);
    let tokens = md5(`ilovewan${p}banghanchen`);
    return tokens;
}

export default{
    sort,sortMd5
}