function sortData(data, fieldToSortBy){
    if(fieldToSortBy == "name"){
        const sorted = data.subdivisions.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
        data.subdivisions = sorted;
    }
    else if(fieldToSortBy == "nearMapImageDate"){
        const sorted = data.subdivisions.sort((a, b) => a.nearMapImageDate > b.nearMapImageDate ? 1 : -1);
        data.subdivisions = sorted;
    }
    return data;
}

function filterData(data, statusCodesToFilter) {
    data.subdivisions = data.subdivisions.filter((subdivision) => statusCodesToFilter.includes(subdivision.subdivisionStatusCode));
    return data;
}

export function filterAndSort(data, statusCodesToFilter, fieldToSortBy ){

    if(fieldToSortBy != ""){
        data = sortData(data, fieldToSortBy);
    }

    if(statusCodesToFilter != []){
        data = filterData(data, statusCodesToFilter);
    }

    return data;
}