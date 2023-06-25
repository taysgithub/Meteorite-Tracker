let data = [];
const meteorite_landings_url = "https://data.nasa.gov/resource/y77d-th95.json";

// Create a main function with url and callback function as parameters.
let getData = (url, callBackFn) => {
    // If the getData() function is not called for the first time, the callback function is called directly.
    if(data.length !== 0){
        return callBackFn(data); 
    }
    else{
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.send();
        xhr.onload = () => {    
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300){
                    data = JSON.parse(xhr.responseText); 
                    /* 
                     * Since there is an undefined value in the year property.
                     * For the sake of efficiency, 
                     * the year value is modified here to the appropriate format.
                     */
                    for(let i = 0; i < data.length; i++){
                        if(data[i].year !== undefined){
                            data[i].year = new Date(data[i].year).getFullYear();
                        }
                    }                               
                    return callBackFn(data);
                }
                else{
                    alert("Oops! Something goes wrong...");
                }
            }
            else{
                alert("Oops! Something goes wrong...");
            }
        }
    }
}

let validate = () => {
    let minYear = document.getElementById("minYear").value;
    let maxYear = document.getElementById("maxYear").value;
    if(minYear === "" && maxYear === ""){
        return true;
    }
    if(minYear < 0 || maxYear < 0 || isNaN(minYear) || isNaN(maxYear)){
        alert("Invalid input(s), try again!");
        document.getElementById("minYear").value = "";
        maxYear = document.getElementById("maxYear").value = "";
        return; 
    }
    else if(minYear > maxYear){
        alert("MaxYear has to be greater than MinYear, try again!");
        document.getElementById("minYear").value = "";
        maxYear = document.getElementById("maxYear").value = "";
        return;
    }
    else{
        return true;
    }
}

let filter = (array) => {
    if(validate() !== true){
        return;
    }
    else{
        let filtered_data = [];
        let formatted_date;
        let minYear = document.getElementById("minYear").value;
        let maxYear = document.getElementById("maxYear").value;
        if(minYear === "" && maxYear === ""){
            filtered_data = array;
        }
        else if(minYear === "" && maxYear !== ""){
            for(let i = 0; i < array.length; i++){
                if(array[i].year !== undefined){
                    formatted_date = array[i].year;
                    if(formatted_date <= maxYear){
                        filtered_data.push(array[i]);
                    } 
                }
            }
        }
        else if(minYear !== "" && maxYear === ""){
            for(let i = 0; i < array.length; i++){
                if(array[i].year !== undefined){
                    formatted_date = array[i].year;
                    if(formatted_date >= minYear){
                        filtered_data.push(array[i]);
                    } 
                }
            }
        }
        else if(minYear !== "" && maxYear !== ""){
            for(let i = 0; i < array.length; i++){
                if(array[i].year !== undefined){
                    formatted_date = array[i].year;
                    if(formatted_date >= minYear && formatted_date <= maxYear){
                        filtered_data.push(array[i]);
                    } 
                }
            } 
        }
        return filtered_data;
    }
}

let print = (array) => {
    let tableBody = document.getElementById("tablebody");
    tableBody.innerHTML = ""; 
    let properties = [];
    let filtered_data = filter(array);
    for(let i = 0; i < filtered_data.length; i++){
        if(filtered_data[i].year === undefined){
            properties = [filtered_data[i].id, filtered_data[i].name, filtered_data[i].year, filtered_data[i].recclass];
        }
        else{
            properties = [filtered_data[i].id, filtered_data[i].name, filtered_data[i].year, filtered_data[i].recclass]; 
        }
        let newTr = document.createElement("tr");
        for(let i = 0; i < properties.length; i++){
            let newTd = document.createElement("td");
            newTd.innerHTML = properties[i];
            newTr.appendChild(newTd);
        }
        tableBody.appendChild(newTr); 
    }
    for(let i = 0; i < markers.length; i++){
        markers[i].setMap(null);
    }
    for(let i = 0; i < filtered_data.length; i++){
        drawPin({lat: parseFloat(filtered_data[i].reclat), lng: parseFloat(filtered_data[i].reclong), id: filtered_data[i].id, name: filtered_data[i].name, year: filtered_data[i].year, class: filtered_data[i].recclass}); 
    }
}