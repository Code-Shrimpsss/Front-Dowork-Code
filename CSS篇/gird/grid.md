# Grid

CSS Grid 是一个完全新的布局系统,用于二维布局。它以行(row)和列(column)的形式来管理内容,可以非常容易地实现复杂的布局。

## 主要语法

CSS Grid 的一些主要语法:

```css
/*定义网格容器*/
.container {
  display: grid;
}

/*设置行/列大小*/
.container {
  grid-template-rows: 100px 200px;
  grid-template-columns: 1fr 2fr 1fr;
}

/*设置间距*/
.container {
  grid-row-gap: 20px;
  grid-column-gap: 10px;
  /*或简写*/
  gap: 20px 10px;
}

/*定义网格区域*/
.container {
  grid-template-areas:
    "header header"
    "main sidebar"
    "footer footer";
}

/*内容对齐方式*/
.container {
  justify-items: center; /*水平对齐*/
  align-items: center; /*垂直对齐*/
}

/*项目对齐方式*/
.item {
  justify-self: end; /*水平对齐*/
  align-self: stretch; /*垂直对齐*/
}
```

## 常见的布局

```css

/*1. 单元格布局*/
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

/*2. 头部+内容+底部布局*/
.container {
  display: grid;
  grid-template-areas:
    "header"
    "content"
    "footer";
}

/*3. 两列布局,一列固定宽度,一列自适应*/
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
}

/*4. 三列等宽布局*/
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

/*5. 图片网格*/
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}
```
