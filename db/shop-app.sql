/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50731
 Source Host           : localhost:3306
 Source Schema         : shop-app

 Target Server Type    : MySQL
 Target Server Version : 50731
 File Encoding         : 65001

 Date: 15/10/2020 21:18:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dict
-- ----------------------------
DROP TABLE IF EXISTS `dict`;
CREATE TABLE `dict`  (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '1-正常 2-删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dict
-- ----------------------------
INSERT INTO `dict` VALUES ('goods_type', '商品类型', '1');
INSERT INTO `dict` VALUES ('order_status', '订单状态', '1');

-- ----------------------------
-- Table structure for dict_son
-- ----------------------------
DROP TABLE IF EXISTS `dict_son`;
CREATE TABLE `dict_son`  (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dictid` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sort` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `dictid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dict_son
-- ----------------------------
INSERT INTO `dict_son` VALUES ('01', 'goods_type', '游戏主机', 3);
INSERT INTO `dict_son` VALUES ('02', 'goods_type', '游戏大作', 2);
INSERT INTO `dict_son` VALUES ('03', 'goods_type', '鞋类', 1);
INSERT INTO `dict_son` VALUES ('06', 'goods_type', '潮服', 6);
INSERT INTO `dict_son` VALUES ('1', 'order_status', '等待发货', 1);
INSERT INTO `dict_son` VALUES ('2', 'order_status', '删除', 2);
INSERT INTO `dict_son` VALUES ('3', 'order_status', '关闭交易', 3);
INSERT INTO `dict_son` VALUES ('4', 'order_status', '运输中', 4);
INSERT INTO `dict_son` VALUES ('5', 'order_status', '等待买家确认', 5);
INSERT INTO `dict_son` VALUES ('6', 'order_status', '完成交易', 6);
INSERT INTO `dict_son` VALUES ('7', 'order_status', '退货中', 7);
INSERT INTO `dict_son` VALUES ('8', 'order_status', '退货成功', 8);

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `count` int(11) NULL DEFAULT NULL,
  `gooddesc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `imgpath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (1, '乔1', 1000.00, 500, '第1代jordan篮球鞋1', '03', 'shoe06.png');
INSERT INTO `goods` VALUES (2, '乔2', 1001.00, 501, '第2代jordan篮球鞋1', '03', 'shoe07.png');
INSERT INTO `goods` VALUES (3, '乔3', 1002.00, 502, '第3代jordan篮球鞋1', '03', 'shoe08.png');
INSERT INTO `goods` VALUES (4, '乔4', 1003.00, 503, '第4代jordan篮球鞋1', '03', 'shoe09.png');
INSERT INTO `goods` VALUES (5, '乔5', 1004.00, 504, '第5代jordan篮球鞋1', '03', 'shoe10.png');
INSERT INTO `goods` VALUES (6, '乔6', 1005.00, 505, '第6代jordan篮球鞋1', '03', 'shoe11.png');
INSERT INTO `goods` VALUES (7, '乔7', 1006.00, 506, '第7代jordan篮球鞋1', '03', 'shoe06.png');
INSERT INTO `goods` VALUES (8, '乔8', 1007.00, 507, '第8代jordan篮球鞋1', '03', 'shoe07.png');
INSERT INTO `goods` VALUES (9, '乔9', 1008.00, 508, '第9代jordan篮球鞋1', '03', 'shoe08.png');
INSERT INTO `goods` VALUES (10, '乔10', 1009.00, 509, '第10代jordan篮球鞋1', '03', 'shoe09.png');
INSERT INTO `goods` VALUES (11, '乔11', 1010.00, 510, '第11代jordan篮球鞋1', '03', 'shoe10.png');
INSERT INTO `goods` VALUES (12, '乔12', 1011.00, 511, '第12代jordan篮球鞋1', '03', 'shoe11.png');
INSERT INTO `goods` VALUES (13, '乔13', 1012.00, 512, '第13代jordan篮球鞋1', '03', 'shoe06.png');
INSERT INTO `goods` VALUES (14, '乔14', 1013.00, 513, '第14代jordan篮球鞋1', '03', 'shoe07.png');
INSERT INTO `goods` VALUES (15, '乔15', 1014.00, 514, '第15代jordan篮球鞋1', '03', 'shoe08.png');
INSERT INTO `goods` VALUES (16, '乔16', 1015.00, 515, '第16代jordan篮球鞋1', '03', 'shoe09.png');
INSERT INTO `goods` VALUES (17, '乔17', 1016.00, 516, '第17代jordan篮球鞋1', '03', 'shoe10.png');
INSERT INTO `goods` VALUES (18, '乔18', 1017.00, 517, '第18代jordan篮球鞋1', '03', 'shoe11.png');
INSERT INTO `goods` VALUES (19, '乔19', 1018.00, 518, '第19代jordan篮球鞋1', '03', 'shoe06.png');
INSERT INTO `goods` VALUES (20, '乔20', 1019.00, 519, '第20代jordan篮球鞋1', '03', 'shoe07.png');
INSERT INTO `goods` VALUES (21, '秋季毛衣', 100.00, 1000, '夏季牛仔上衣1', '06', 'c05.png');
INSERT INTO `goods` VALUES (22, '黄色运动卫衣', 200.00, 1000, '淡淡的黄色运动卫衣1', '06', 'c02.png');
INSERT INTO `goods` VALUES (23, '牛仔夹克', 300.00, 800, '牛仔夹克1', '06', 'c03.png');
INSERT INTO `goods` VALUES (24, '秋季大衣', 400.00, 800, '秋季大衣1', '06', 'c04.png');
INSERT INTO `goods` VALUES (25, '女款牛仔夹克', 400.00, 800, '秋季毛衣1', '06', 'c06.png');
INSERT INTO `goods` VALUES (26, '夏季牛仔上衣', 500.00, 900, '女款牛仔夹克1', '06', 'c01.png');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `userid` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '1-等待发货；2-删除；3-关闭交易；4-运输中；5-等待买家确认；6；交易完成；7-退货中，8-退货成功',
  `sysdate` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('677e09724f0e2df9b6c000b75b5da10d', 'admin@mail.com', '1', '2020-10-12 18:47:38');
INSERT INTO `order` VALUES ('7cbbc409ec990f19c78c75bd1e06f215', 'zhang@mail.com', '1', '2020-10-12 14:16:16');
INSERT INTO `order` VALUES ('ca8155f4d27f205953f9d3d7974bdd70', 'zhang@mail.com', '1', '2020-10-14 09:36:44');

-- ----------------------------
-- Table structure for order_list
-- ----------------------------
DROP TABLE IF EXISTS `order_list`;
CREATE TABLE `order_list`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `goodid` int(11) NULL DEFAULT NULL,
  `countbuy` int(255) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `gooddesc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `imgpath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `orderid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_list
-- ----------------------------
INSERT INTO `order_list` VALUES (17, '7cbbc409ec990f19c78c75bd1e06f215', 1, 10, '乔1', NULL, 1000.00, '03', 'http://127.0.0.1:3000/imgs/shoe06.png');
INSERT INTO `order_list` VALUES (18, '7cbbc409ec990f19c78c75bd1e06f215', 22, 1, '黄色运动卫衣', NULL, 200.00, '06', 'http://127.0.0.1:3000/imgs/c02.png');
INSERT INTO `order_list` VALUES (19, '7cbbc409ec990f19c78c75bd1e06f215', 3, 1, '乔3', NULL, 1002.00, '03', 'http://127.0.0.1:3000/imgs/shoe08.png');
INSERT INTO `order_list` VALUES (20, '7cbbc409ec990f19c78c75bd1e06f215', 23, 1, '牛仔夹克', NULL, 300.00, '06', 'http://127.0.0.1:3000/imgs/c03.png');
INSERT INTO `order_list` VALUES (21, '7cbbc409ec990f19c78c75bd1e06f215', 25, 3, '女款牛仔夹克', NULL, 400.00, '06', 'http://127.0.0.1:3000/imgs/c06.png');
INSERT INTO `order_list` VALUES (25, 'ca8155f4d27f205953f9d3d7974bdd70', 5, 2, '乔5', NULL, 1004.00, '06', 'http://127.0.0.1:3000/imgs/shoe10.png');
INSERT INTO `order_list` VALUES (26, 'ca8155f4d27f205953f9d3d7974bdd70', 4, 2, '乔4', NULL, 1003.00, '03', 'http://127.0.0.1:3000/imgs/shoe09.png');
INSERT INTO `order_list` VALUES (27, 'ca8155f4d27f205953f9d3d7974bdd70', 2, 2, '乔2', NULL, 1001.00, '03', 'http://127.0.0.1:3000/imgs/shoe07.png');

-- ----------------------------
-- Table structure for test_main
-- ----------------------------
DROP TABLE IF EXISTS `test_main`;
CREATE TABLE `test_main`  (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `main` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test_main
-- ----------------------------
INSERT INTO `test_main` VALUES ('1', NULL);
INSERT INTO `test_main` VALUES ('522ca16bef931935d8adc0aadb164a9e', '第2次测试事务');
INSERT INTO `test_main` VALUES ('8d05cfc4aaf4bc9b84441e90be906f23', '第1次测试事务');

-- ----------------------------
-- Table structure for test_main1
-- ----------------------------
DROP TABLE IF EXISTS `test_main1`;
CREATE TABLE `test_main1`  (
  `id` int(11) NOT NULL,
  `main` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test_main1
-- ----------------------------
INSERT INTO `test_main1` VALUES (1, 't1');
INSERT INTO `test_main1` VALUES (3, 't1');

-- ----------------------------
-- Table structure for test_main2
-- ----------------------------
DROP TABLE IF EXISTS `test_main2`;
CREATE TABLE `test_main2`  (
  `id` int(11) NOT NULL,
  `main` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test_main2
-- ----------------------------
INSERT INTO `test_main2` VALUES (2, 't2');
INSERT INTO `test_main2` VALUES (4, 't2');

-- ----------------------------
-- Table structure for test_main_list
-- ----------------------------
DROP TABLE IF EXISTS `test_main_list`;
CREATE TABLE `test_main_list`  (
  `id` int(11) NOT NULL,
  `main_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `main_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test_main_list
-- ----------------------------
INSERT INTO `test_main_list` VALUES (1, '522ca16bef931935d8adc0aadb164a9e', '商品一');
INSERT INTO `test_main_list` VALUES (1, '8d05cfc4aaf4bc9b84441e90be906f23', '商品一');
INSERT INTO `test_main_list` VALUES (2, '522ca16bef931935d8adc0aadb164a9e', '商品二');
INSERT INTO `test_main_list` VALUES (2, '8d05cfc4aaf4bc9b84441e90be906f23', '商品二');
INSERT INTO `test_main_list` VALUES (3, '522ca16bef931935d8adc0aadb164a9e', '商品三');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `pwd` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('li@mail.com', '李先生', '000000');
INSERT INTO `user` VALUES ('newzhang@mail.com', '正式用户1', '000000');
INSERT INTO `user` VALUES ('zhang@mail.com', '张三', '000000');
INSERT INTO `user` VALUES ('zhao1@mail.com', '兆先生', '000000');
INSERT INTO `user` VALUES ('zhao@mail.com', '兆先生', '000000');

-- ----------------------------
-- Table structure for user_action
-- ----------------------------
DROP TABLE IF EXISTS `user_action`;
CREATE TABLE `user_action`  (
  `userid` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `goodid` int(11) NOT NULL,
  `type` int(11) NOT NULL COMMENT '1-浏览 2-购物车',
  `num` int(11) NULL DEFAULT NULL COMMENT '放入购物车数量',
  `visitedcount` int(11) NULL DEFAULT NULL COMMENT '用户浏览次数',
  `sysdate` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`userid`, `goodid`, `type`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_action
-- ----------------------------
INSERT INTO `user_action` VALUES ('10', 11, 1, NULL, 3, '2020-10-07 09:51:27');
INSERT INTO `user_action` VALUES ('zhang@mail.com', 1, 1, NULL, 6, '2020-10-07 09:49:27');
INSERT INTO `user_action` VALUES ('zhang@mail.com', 2, 1, NULL, 5, '2020-10-07 09:49:40');
INSERT INTO `user_action` VALUES ('zhang@mail.com', 3, 1, NULL, 3, '2020-10-06 11:00:31');
INSERT INTO `user_action` VALUES ('zhang@mail.com', 4, 1, NULL, 1, '2020-10-06 11:23:38');
INSERT INTO `user_action` VALUES ('zhang@mail.com', 5, 1, NULL, 3, '2020-10-07 09:50:55');
INSERT INTO `user_action` VALUES ('zhang@mail.com', 6, 1, NULL, 1, '2020-10-06 10:17:24');
INSERT INTO `user_action` VALUES ('zhang@mail.com', 11, 1, NULL, 2, '2020-10-07 09:52:28');
INSERT INTO `user_action` VALUES ('zhang@mail.com', 21, 1, NULL, 13, '2020-10-06 15:12:51');
INSERT INTO `user_action` VALUES ('zhang@mail.com', 22, 1, NULL, 2, '2020-10-06 14:28:50');
INSERT INTO `user_action` VALUES ('zhang@mail.com', 23, 1, NULL, 16, '2020-10-07 08:49:03');
INSERT INTO `user_action` VALUES ('zhang@mail.com', 24, 1, NULL, 3, '2020-10-03 20:50:12');

-- ----------------------------
-- Table structure for user_actions
-- ----------------------------
DROP TABLE IF EXISTS `user_actions`;
CREATE TABLE `user_actions`  (
  `userid` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `goodid` int(11) NOT NULL,
  `type` int(2) NOT NULL COMMENT '1-浏览 2-购物车',
  `num` int(11) NULL DEFAULT NULL COMMENT '放进购物车的数量',
  `visitedcount` int(11) NULL DEFAULT NULL COMMENT '浏览次数',
  `sysdate` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`userid`, `goodid`, `type`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_actions
-- ----------------------------
INSERT INTO `user_actions` VALUES ('10', 11, 1, NULL, 1, '2020-10-06 09:12:48');
INSERT INTO `user_actions` VALUES ('admin@mail.com', 1, 1, NULL, 4, '2020-10-12 18:27:30');
INSERT INTO `user_actions` VALUES ('admin@mail.com', 2, 1, NULL, 2, '2020-10-12 18:27:51');
INSERT INTO `user_actions` VALUES ('li@mail.com', 1, 1, NULL, 2, '2020-10-06 10:11:33');
INSERT INTO `user_actions` VALUES ('li@mail.com', 22, 1, NULL, 1, '2020-10-05 09:44:16');
INSERT INTO `user_actions` VALUES ('li@mail.com', 25, 1, NULL, 2, '2020-10-05 09:44:01');
INSERT INTO `user_actions` VALUES ('zhang@mail.com', 1, 1, NULL, 72, '2020-10-03 14:14:13');
INSERT INTO `user_actions` VALUES ('zhang@mail.com', 2, 1, NULL, 7, '2020-10-10 10:10:49');
INSERT INTO `user_actions` VALUES ('zhang@mail.com', 3, 1, NULL, 11, '2020-10-03 14:18:07');
INSERT INTO `user_actions` VALUES ('zhang@mail.com', 4, 1, NULL, 1, '2020-10-14 09:31:59');
INSERT INTO `user_actions` VALUES ('zhang@mail.com', 5, 1, NULL, 3, '2020-10-14 09:32:01');
INSERT INTO `user_actions` VALUES ('zhang@mail.com', 21, 1, NULL, 30, '2020-10-03 14:14:27');
INSERT INTO `user_actions` VALUES ('zhang@mail.com', 22, 1, NULL, 9, '2020-10-03 14:18:39');
INSERT INTO `user_actions` VALUES ('zhang@mail.com', 23, 1, NULL, 10, '2020-10-03 14:18:38');
INSERT INTO `user_actions` VALUES ('zhang@mail.com', 24, 1, NULL, 2, '2020-10-12 10:13:41');
INSERT INTO `user_actions` VALUES ('zhang@mail.com', 25, 1, NULL, 2, '2020-10-12 10:13:44');

SET FOREIGN_KEY_CHECKS = 1;
