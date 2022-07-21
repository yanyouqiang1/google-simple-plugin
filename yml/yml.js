let area_json = document.getElementById('area_json');
let area_yaml = document.getElementById('area_yaml');

//没有使用
$("#toYml").click(()=>{
    let json = area_json.innerText;
    if (json) {
        try {
            let jsonObj = JSON.parse(json);
            area_yaml.innerHTML = hljs.highlight("yaml", jsyaml.dump(jsonObj)).value;
            area_json.innerHTML = hljs.highlight("json", json).value;
        } catch (e) {
            alert(e)
        }
    }
})
$("#toJson").click(()=>{
    let yaml = area_yaml.innerText;
    if (yaml) {
        try {
            let json = JSON.stringify(jsyaml.load(yaml), null, 2);
            area_json.innerHTML = hljs.highlight("json", json).value;
            area_yaml.innerHTML = hljs.highlight("yaml", yaml).value;
        } catch (e) {
            alert(e)
        }
    }
})
$("#toPOJO").click(e=>{
    let yaml = area_yaml.innerText;

})
$('#cleanup').click(e=>{
    area_json.innerHTML = '';
    area_yaml.innerHTML = '';
})
