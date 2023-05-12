// 模板字符串
let func = (name) => `Hello ${name}`;
func('CHLI');

let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;

// echo('<ul>');
// for (let i = 0; i < data.supplies.length; i++) {
//     echo('<li>');
//     echo(data.supplies[i]);
//     echo('</li>');
// };
// echo('</ul>');

// let evalExpr = /<%=(.+?)%>/g;
// let expr = /<%([\s\S]+?)%>/g;
// template = template
//     .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
//     .replace(expr, '`); \n $1 \n  echo(`');
// template = 'echo(`' + template + '`);';

// 标签模板
// let a = 5;
// let b = 10;
// let mob = tag`Hello ${a + b}`
// console.log(mob);

let a = 5;
let b = 10;
function tag(s, v1, v2) {
	console.log(s);
	console.log(v1);
	console.log(v2);
	return 'OK';
}
tag`Hello ${a + b} world ${a * b}`;

let sender = '<script>alert("abc")</script>'; // 恶意代码
let message = SaferHTML`<p>${sender} has sent you a message.</p>`;
function SaferHTML(templateData) {
	let s = templateData[0];
	for (let i = 1; i < arguments.length; i++) {
		let arg = String(arguments[i]);
		// Escape special characters in the substitution.
		s += arg.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		// Don't escape special characters in the template.
		s += templateData[i];
	}
	return s;
}
console.log(sender);
console.log(message);
