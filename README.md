# 简介

算数解析器——你也可以叫我 coral。

## 主要功能

输入一段文本，对文本进行解析，从文本中解析出合法的四则混合运算式，如果在解析过程中遇到无法识别的 token，会抛出相应的错误。

coral 的功能比较基础。

1. 支持的运算符是加、减、乘、除；
2. 支持的运算数是无符号的整数以及有符号的整数（由一对圆括号进行包裹）；
3. 支持整数 0，但是 0 只能单独存在，即不支持 000 这种表示；其他非 0 整数也不可以有前置的 0，即 087 是无效的表示；

合法的字符集有：+、-、*、/、0、1、2、3、4、5、6、7、8、9、(、) 以及空格。

### 可解析的文本示例

- 1+2+3
- 1 + 2 + 3
- 1+(-2)+(+3)+1*(-4)+4/(-2)
- 0

### 不可解析的文本示例

- 00
- 0++
- 0+
- 0(
- 0 234
- (1)

## 快速开始

## 使用方法

## 开发路线

## 如何贡献

## 鸣谢
