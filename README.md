# crawler-hangzhou

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/crawler-hangzhou.svg?style=flat-square
[npm-url]: https://npmjs.org/package/crawler-hangzhou
[download-image]: https://img.shields.io/npm/dm/crawler-hangzhou.svg?style=flat-square
[download-url]: https://npmjs.org/package/crawler-hangzhou

[杭州网](http://hznews.hangzhou.com.cn/index.htm)的新闻爬虫

## 安装

```bash
$ npm i --save crawler-hangzhou
```

## 使用
```
const crawler = require('crawler-hangzhou');    // 引入爬虫
const moment = require('moment');

crawler({
    moduleType: '', // 新闻类型，填空为全部。具体的有['jingji','chengshi','shehui','wenti','kejiao']，六个类型
    dateAfter: moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD').valueOf()    // 当天
}).then((value) => {

    // 返回当天的，所有新闻内容
    console.log(value.map((obj) => {
        return Object.assign(obj, {
            date: moment(obj.moment).format('YYYY-MM-DD HH:mm:ss')      // date默认为毫秒，用moment格式化成需要的格式。
        })
    }));
}).catch((err) => {
    console.log(err);
});
```


## 案例

获取`杭州网`当天的`社会`类的新闻列表
```bash
$ node ./test/list.js
```
返回：
```
[ 'http://hznews.hangzhou.com.cn/shehui/content/2017-08/29/content_6641114.htm',
  'http://hznews.hangzhou.com.cn/shehui/content/2017-08/29/content_6641112.htm',
  'http://hznews.hangzhou.com.cn/shehui/content/2017-08/29/content_6640329.htm',
  'http://hznews.hangzhou.com.cn/shehui/content/2017-08/29/content_6640325.htm',
  'http://hznews.hangzhou.com.cn/shehui/content/2017-08/29/content_6640321.htm',
  'http://hznews.hangzhou.com.cn/shehui/content/2017-08/29/content_6640310.htm',
  'http://hznews.hangzhou.com.cn/shehui/content/2017-08/29/content_6640961.htm' ]

```

获取`杭州网`某条新闻的内容
```bash
$ node ./test/content.js
```
返回：
```
{ title: '盼了4年 杭州秋石快速路最后一对匝道终于开通',
  content: '    塘栖崇贤去半山，不再从杨家村绕了\n    省肿瘤医院附近交通拥堵的老大难问题有望缓解\n\n    过去，余杭塘栖、崇贤的出租车司机接到去半山田园区块的生意，总是会心里打鼓。为啥？怕乘客不理解：沿着一马平川的秋石快速路往南走，怎么到了半山路不下高架，还要往南再架的匝道。\n    从去年11月底开始，半山田园一带的居民欣喜地发现，半山路石桥路口，半山路以北，一对匝道开始施工了。\n    经过9个月左右时间的建设，昨天，秋石快速路二期半山路北匝道及地面道路正式通车。\n    第一天开通\n    走新匝道的车辆不少\n    这是秋石快速路全线的最后 秋石快速路二期匝道及地面道路工程起自半山路，止于半山隧道南口，全长641米。包含高架快速路一对平行匝道及地面主干道，匝道宽8米，东侧为上桥匝道，西侧为下桥匝道。\n    匝道开通首日下午，钱报记者也特地去实地体验了一番。驱车沿着秋石快速路往北走，在半山路驶下高架，过了半山是周日，又是第一天开通，但是走新匝道的车辆不算少。沿着匝道上高架，几百米外就是半山隧道。出了隧道再往北开，不到两分钟就到了绕城北线的半山收费站。\n    如果从塘栖、崇贤方向沿着秋石快速路过来，或者下了绕城高速半山收费站去往半山，从此可以直接在半山路下高架，拐入半山路。“过去没有匝道时，北边来的车子要到田园区块，只能再往南开上4公里左右，在杨家村附近下桥再绕回来。不堵车还好说，遇到堵车，可能就得多花半小时左右。”工程建设方杭州市地下空间建设发展中心的工程师凌建强说。\n',
  date: '2017-08-29 14:41:19',
  source_name: '杭州网',
  source_href: 'http://www.hangzhou.com.cn',
  cover_picture: 'http://hznews.hangzhou.com.cn/chengshi/content/attachement/jpg/site2/20170828/14feb5e6d9511b0da5772e.jpg' }

```

获取`杭州网`当天的所有新闻
```bash
$ node ./test/index.js
```
返回：
```
[{ title: '学生运动会主题灯光秀今起登场',
     content: '大家期盼已久的学生运动会主题灯光秀，终于要和大家见面了！\n记者昨天从市城管委亮灯监管中心获悉，为烘托全国第十三届学生运动会在杭召开的活动氛围，营造具有浙江特色、杭州韵味的全国学生体育盛会，继武林广场主题音乐喷泉《动如潮》奏放后，今天起，钱江两岸涉及的现杭城办出不一样的运动赛事。\n记者从杭州市钱江新城建设管委会获悉，钱江新城区块全新推出的15分钟主题灯光秀，用声光电的梦幻组合，绘出了体育强国的美好画卷。整场灯光秀共分5个章节，以“体育强，则中国强”为主题。\n上城区将在钱塘江沿线的7幢楼宇打造主题光影灯光秀，时长约为8分马湖建国饭店等标志性建筑后，以第十三届全国学生运动会主题口号“励志奋进，奔竞不息”为结尾，视频时长为5分钟。\n同时，市城管委亮灯监管中心透露，在全国学生运动会召开期间（8月29日-9月16日），杭州全市的景观照明亮灯时间也相应做了保障调整，每天都有魅力的夜景供您欣赏。\n其中22：30。\n而以灯光秀为主的表演类亮灯，在学生运动会期间也会同步进行。\n1.钱江两岸上城区、滨江区、钱江新城学生运动会主题灯光秀及喷泉：每天19:00、20:00各一场；\n2.武林广场灯光秀及音乐喷泉：学生运动会主题音乐喷泉每天19:30、20:30各一场；灯光秀每天20:00一场。\n3.西湖音乐喷泉:每天19:00、20:00各一场。',
     date: '2017-08-29 14:43:47',
     source_name: '杭州网',
     source_href: 'http://www.hangzhou.com.cn',
     cover_picture: '',
     type: 'chengshi' },
   { title: '突发！杭州某高校大一新生从高低铺摔下重伤昏迷',
     content: '8月29日上午，市民周先生打进96068热线称，早上5点多，杭州某高校里一名刚来报道的大一女生不小心摔下来，有生命危险，送往市二医院进行抢救。钱报记者接到热线后，立刻前往杭州市二医院。\n\n \n女孩正在接受治疗中，女孩姓徐，据学校的老师说，女孩是江苏人，事发时是是以抢救生命为主。\n\n \n听完医生的话，女孩的母亲忍不住哭了起来。上午10点30分，女孩手术完毕，被推了出来。\n',
     date: '2017-08-29 14:43:47',
     source_name: '杭州网',
     source_href: 'http://www.hangzhou.com.cn',
     cover_picture: 'http://hznews.hangzhou.com.cn/shehui/site2/20170829/002324b80c701b0f223330.jpeg',
     type: 'shehui' },
   ... 96 more items ]
```

## 问题&建议

提交到[issue](https://github.com/xjchenhao/crawler-hangzhou/issues).

## License

[MIT](LICENSE)
