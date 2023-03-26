import {TabulatorFull as Tabulator} from 'tabulator-tables';
import {getCookie} from "@/utils/myFunctions.js";
import {ref} from "vue";

export function createTabulator(tabulator, tableRef, tableBuiltRef, tableName, tableUrl, schema, additionalOptions = {}) {
    tabulator.value = new Tabulator(
        tableRef.value,
        {
            reactiveData: true, //enable data reactivity
            autoColumns: true, //create columns from data field names
            ajaxURL: tableUrl, //ajax URL
            ajaxParams: {table: tableName, schema: schema},
            ajaxConfig: {
                headers: {
                    'API': getCookie('API'),
                },
            },//ajax parameters
            pagination: true, //enable pagination
            paginationMode: "remote", //enable remote pagination
            paginationSize: 100, //optional parameter to request a certain number of rows per page
            paginationInitialPage: 1, //optional parameter to set the initial page to load
            ajaxResponse: function (url, params, response) {
                //url - the URL of the request
                //params - the parameters passed with the request
                //response - the JSON object returned in the body of the response.
                return response; //return the response data to tabulator
            },
            sortMode:"remote",
            filterMode: "remote", //send filter data to the server instead of processing locally


            ...additionalOptions
        }
    );
    tabulator.value.on("tableBuilt", function () {
        tableBuiltRef.value = true;
    });
}

//custom max min header filter
export const minMaxFilterEditor = function (cell, onRendered, success, cancel, editorParams) {

    var end;

    var container = document.createElement("span");

    //create and style inputs
    var start = document.createElement("input");
    start.setAttribute("type", "number");
    start.setAttribute("placeholder", "Min");
    start.setAttribute("min", 0);
    start.setAttribute("max", 100);
    start.style.padding = "4px";
    start.style.width = "50%";
    start.style.boxSizing = "border-box";

    start.value = cell.getValue();

    function buildValues() {
        success({
            start: start.value,
            end: end.value,
        });
    }

    function keypress(e) {
        if (e.keyCode == 13) {
            buildValues();
        }

        if (e.keyCode == 27) {
            cancel();
        }
    }

    end = start.cloneNode();
    end.setAttribute("placeholder", "Max");

    start.addEventListener("change", buildValues);
    start.addEventListener("blur", buildValues);
    start.addEventListener("keydown", keypress);

    end.addEventListener("change", buildValues);
    end.addEventListener("blur", buildValues);
    end.addEventListener("keydown", keypress);


    container.appendChild(start);
    container.appendChild(end);

    return container;
};

//custom max min filter function
export const minMaxFilterFunction = (headerValue, rowValue, rowData, filterParams) => {
    //headerValue - the value of the header filter element
    //rowValue - the value of the column in this row
    //rowData - the data for the row being filtered
    //filterParams - params object passed to the headerFilterFuncParams property

    if (rowValue) {
        if (headerValue.start != "") {
            if (headerValue.end != "") {
                return rowValue >= headerValue.start && rowValue <= headerValue.end;
            } else {
                return rowValue >= headerValue.start;
            }
        } else {
            if (headerValue.end != "") {
                return rowValue <= headerValue.end;
            }
        }
    }

    return true; //must return a boolean, true if it passes the filter.
};

