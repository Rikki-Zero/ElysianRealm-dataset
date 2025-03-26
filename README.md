# 往世乐土 数据集

虽然是说数据集，但是本仓库并不提供可供直接使用的数据集。这样做有几个原因：
1. 希望提高使用者的心智负担
2. 直接提供校对好的数据会侵犯 米哈游 公司的著作权
3. 本项目实际上是服务于练手和能力提升目的的项目，不希望保证可用性

本项目仅提供的对公开数据进行处理的脚本，如果确实是爱莉厨，可以在研究后选择使用。

> 为了阻止跑一下代码就拿到数据的行为，仓库的代码并不会完整提供，一些功能会被删除，您需要自己找出问题并修复

# 数据集结构设计
```bnf
<document> ::= <node>+

<node> ::= <layer> | <text>

<layer> ::= {
    "type": "layer",
    "title": <string>,
    "meta": <meta-type>,
    "content": [ <node>* ]
}

<text> ::= {
    "type": "text",
    "speaker": <string>,
    "content": <string>
}

<meta-type> ::= "paragraph" | "quote"
```

# Cpt1

数据来源 [NGA](https://ngabbs.com/read.php?tid=28126328)

处理脚本 `Cpt1/scan.js`
