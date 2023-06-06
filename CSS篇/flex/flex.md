# Flex

CSS Flexbox 是一种一维的布局模型,旨在适应不同的屏幕尺寸和设备。它提供了一套相当灵活的规则,用来给行或者列伸缩、旋转和对齐内容。

## 主要语法

CSS Flexbox 的主要语法如下:
定义 Flex 容器:

```css
.container {
  display: flex;
}
```

Flex 方向:

```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

Flex 换行:

```css
.container {
  flex-wrap: nowrap | wrap | wrap-reverse;  
}
```

Flex 对齐方式:

```css
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

Flex 项目对齐方式:

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;  
}
```

Flex 容器的对齐方式:

```css
.container {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

Flex 项目大小:

```css
.item {
  flex-grow: <number>;
  flex-shrink: <number>;
  flex-basis: <length> | auto;  
}
```

Flexbox 的所有属性和值都详细定义在 MDN 上,建议查阅文档并学习理解每个属性的作用。
