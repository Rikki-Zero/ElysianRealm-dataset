let debug = false

function debug_log(msg){
    if(debug){
        console.log(msg)
    }
}

// 获取所有collapse_btn元素
const collapseBtns = document.querySelectorAll('.collapse_btn');


function gen_layer(title = "", meta = "", content = []){
    return {
        "type": "layer",
        "title": title,
        "meta": meta,
        "content": content
    }
}

function gen_text(speaker = "Background", content = ""){
    return {
        "type": "text",
        "speaker": speaker,
        "content": content
    }
}

// return: <layer|text>
function parser(node) {
    let childs = node.childNodes

    // 每个layer的第一个元素一定是标题
    let title = childs[0].textContent.trim()

    // 根据传入的node情况，设置meta
    let meta = ""
    if(node.classList.contains("collapse_content")){
        meta = "paragraph"
    }else if(node.classList.contains("quote")){
        meta = "quote"
    }

    let content = []

    for(let i = 1; i < childs.length; i++){
        let child = childs[i]

        debug_log(child)

        let Speaker = "Background"
        let TextContent = ""

        if (child.nodeType === Node.TEXT_NODE) {
            // 出现了对话前导
            if(child.textContent.trim() === '['){
                // 将操作指针后移
                i++;
                child = childs[i];
                
                // 对话前导的后一个元素一定是SPAN
                Speaker = child.textContent.trim()

                do {
                    // SPAN 的后一个元素一定是 '[' + '说的内容'
                    i++;
                    child = childs[i];
                    TextContent += child.textContent.trim().slice(1);
                    
                    // 将操作指针后移,开始寻找<br>
                    i++;
                    child = childs[i];
                }while(!(child.nodeName === "BR")){ // 在找到<br>之前，将所有内容添加到TextContent中
                    TextContent += child.textContent.trim();

                    i++;
                    child = childs[i];
                }
            }else{
                do{
                    // 没有对话前导，直接将内容添加到当前内容中
                    TextContent += child.textContent.trim();

                    // 将操作指针后移,开始寻找<br>
                    i++;
                    child = childs[i];
                }while(!(child.nodeName === "BR")){
                    TextContent += child.textContent.trim();

                    // 将操作指针后移
                    i++;
                    child = childs[i];
                }
            }

            content.push(gen_text(Speaker, TextContent));
        }else if(child.nodeType === Node.ELEMENT_NODE && child.tagName === 'DIV' && child.classList.contains('quote')){
            // 出现了引用
            content.push(parser(child))
        }
    }

    return gen_layer(title, meta, content)
}

// 初始化结果对象
const result = [];

// 遍历每个collapse_btn元素
collapseBtns.forEach(btn => {
    const contentDiv = btn.nextElementSibling;
    result.push(parser(contentDiv))
});

// 输出结果
console.log(JSON.stringify(result, null, 2));