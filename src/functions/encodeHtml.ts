const HTML_DECODE:Record<string,string|undefined> = {
    "<":"&lt;" ,
    ">":"&gt;",
    "&":"&amp;" ,
    " ":"&nbsp;" ,
    '"': "&quot;",
    "©":"&copy;" ,
};
export const encodeHtml = (s:string)=>{
    return s.split('').map(e=>{
        return HTML_DECODE[e] ?? e;
    }).join('')
};
