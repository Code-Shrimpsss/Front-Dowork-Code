var tools = (function () {
    function templateReplace(tql, replaeObj) {
        return tql.replace(/\{\{(.*?)\}\}/g, function (node, key) {
            return replaeObj[key.trim()];
        })
    }

    return {
        templateReplace: templateReplace
    }
})();