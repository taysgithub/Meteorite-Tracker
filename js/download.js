function download(){
    let link = document.createElement("a");
    link.download = "filtered_list.json";
    link.href = "data:text/plain," + JSON.stringify(filter(data));
    link.click();
}