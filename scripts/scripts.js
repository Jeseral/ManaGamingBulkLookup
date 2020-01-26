/*------------------------------------------------------------------------ 
** Const Declarations
*/
const STEM = "http://www.managaming.shop/products/search?q="

const REGEX = /^(\d+ )?([fFbB]* )?(.+?)$/;
const REGEX_GROUP_TOTAL = 1;
const REGEX_GROUP_MODS  = 2;
const REGEX_GROUP_NAME  = 3;

const REPLACE_LIST = [
    [",", "%2C"],
    ["'", "%27"],
    ["/", "%2F"],
    [" ", "+"]
];
const REPLACE_LIST_TARGET = 0;
const REPLACE_LIST_REPLACEMENT = 1;

const MODS_LIST = [
    ["f", "+foil", "\u{2728}"],
    ["b", "+borderless", "\u{1F3A8}"]
];
const MODS_LIST_MOD = 0;
const MODS_LIST_REPLACEMENT = 1;
const MODS_LIST_ICON = 2;

/*------------------------------------------------------------------------ 
**
*/
function generateClicked()
{
    let card_list = document.getElementById("card_list");
    let links_list = document.getElementById("links_list_table");

    let child = links_list.lastElementChild;
    while (child) {
        links_list.removeChild(child);
        child = links_list.lastElementChild;
    }

    let text = card_list.value;

    let lines = text.split("\n");
    
    for (i in lines) {
        let line = lines[i].trim();
        if (line === "") {
            continue;
        }

        links_list.appendChild(generateTableEntry(line));
    }
}


/*------------------------------------------------------------------------ 
**
*/
function generateTableEntry(line) {
    let matches = REGEX.exec(line);

    let total = matches[REGEX_GROUP_TOTAL];
    let mods  = matches[REGEX_GROUP_MODS];
    let name  = matches[REGEX_GROUP_NAME];

    let output_string = name;
    let icons = [];

    if (mods) {
        for (i in MODS_LIST) {
            if (mods.includes(MODS_LIST[i][MODS_LIST_MOD]) 
                || mods.includes(MODS_LIST[i][MODS_LIST_MOD].toUpperCase())) {

                output_string += MODS_LIST[i][MODS_LIST_REPLACEMENT];
                icons.push(MODS_LIST[i][MODS_LIST_ICON]);
            }
        }
    }

    for (i in REPLACE_LIST) {
        output_string.replace(REPLACE_LIST[i][REPLACE_LIST_TARGET], 
                              REPLACE_LIST[i][REPLACE_LIST_REPLACEMENT]);
    }

    output_string = output_string.trim();

    let ret = document.createElement("tr");

    let icons_td = document.createElement("td");
    let link_td  = document.createElement("td");
    let total_td = document.createElement("td");

    ret.appendChild(total_td);
    ret.appendChild(link_td);
    ret.appendChild(icons_td);
    
    total_td.appendChild(document.createTextNode (
                            (total ? total.trim() : "1") + "x"));

    let link = document.createElement("a");
    link.setAttribute("href", STEM + output_string);
    link.appendChild(document.createTextNode(name));
    link_td.appendChild(link);

    for (i in icons) {
        icons_td.appendChild (
            document.createTextNode(icons[i]));
    }

    return ret;
}

/*------------------------------------------------------------------------ 
** End of File
*/