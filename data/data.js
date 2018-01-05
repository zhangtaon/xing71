/**
 * Created by ZTO on 2015/3/9.
 * 线上的数据结构
 */
private Long id; //搭配图详情Id
private int type; //标签类型：明星-1； 地点-3； 风格-4；商品-50；红包-60；悬赏-61；猜字-62；
private int x; //搭配图详情标签的x坐标值
private int y; //搭配图详情标签的y坐标值
private int d; //搭配图详情标签的方向值
private String name; //明星-1/地点-3/风格-4:团名称/商品-50：商品名称； 红包-60/悬赏-61/猜字-62：为空
private int amount;  //红包-60/悬赏-61/猜字-62：对应的金币数；商品-50：商品对应的品牌的价格
private int fashion; //悬赏/猜字使用
private String descrp; //明星-1/地点-3/风格-4: 为空; 商品-50：商品对应的品牌名称； 悬赏-61/猜字-62：描述
private String answer; //猜字答案
private Long theId; //明星/地点/风格/商品的Id

{
    "id": 432,
    "home": 1,
    "status": 10,
    "mid": 221312,
    "user":{
        "level": 1,
        "uid": 150491,
        "headFace": 199077,
        "nick": "happyman",
        "rcode":1999,
        "fashion":0
    },
    "commentCount": 6,
    "descrp": "好美好美！！！好美好美！！！好美好美！！！好美好美！！！好美好美！！！好美好美！！！好美好美！！！好美好美！！！",
    "pubTime": 1429585200000,
    "laudCount": 4,
    "venusDetails": [
        {"name": "ABC", "id": 951, "type": 1, "x": 1680, "y": 2220, "startTime": null, "endTime": null, "descrp": null, "theId": 959, "fashion": 0, "amount": 0, "d": 1, "answer": null},
        {"name": "精品购物", "id": 952, "type": 3, "x": 1733, "y": 2100, "startTime": null, "endTime": null, "descrp": null, "theId": 896, "fashion": 0, "amount": 0, "d": 1, "answer": null},
        {"name": "test风格", "id": 953, "type": 4, "x": 2373, "y": 3940, "startTime": null, "endTime": null, "descrp": null, "theId": 850, "fashion": 0, "amount": 0, "d": 5, "answer": null},
        {"name": "1/30狐猴", "id": 954, "type": 5, "x": 2186, "y": 4940, "startTime": null, "endTime": null, "descrp": null, "theId": 865, "fashion": 0, "amount": 0, "d": 5, "answer": null},
        {"name": "测试商品10", "id": 955, "type": 50, "x": 4426, "y": 6799, "startTime": null, "endTime": null, "descrp": null, "theId": 931, "fashion": 0, "amount": 0, "d": 1, "answer": null},
        {"name": "", "id": 956, "type": 60, "x": 1040, "y": 7540, "startTime": 1425523080000, "endTime": 1427731200000, "descrp": "", "theId": -1, "fashion": 0, "amount": 10, "d": 1, "answer": null},
        {"name": "", "id": 957, "type": 61, "x": 5626, "y": 1500, "startTime": null, "endTime": null, "descrp": "这是谁", "theId": -1, "fashion": 8, "amount": 20, "d": 3, "answer": null},
        {"name": "品牌团", "id": 958, "type": 62, "x": 8746, "y": 9200, "startTime": 1425523080000, "endTime": 1427731200000, "descrp": "这是什么品牌", "theId": 920, "fashion": 5, "amount": 6, "d": 7, "answer": "yj"}
    ],
    "lauded": 0

    数据按一下方式组装

    type:
    1, 明星
    3，地点
    4，风格
    5，Lemur
    上述几种类型只需要 venusDetail.name


    50，商品
    以上需要 x, y, d, name


    60, 红包，手动设置descrp="领红包"
    61, 悬赏
    62, 猜字
    以上需要 x, y, d, descrp

}
