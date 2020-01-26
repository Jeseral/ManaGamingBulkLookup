const STEM = "http://www.managaming.shop/products/search?q="

const REGEX = /^(\d+ )?([fFbB]* )?(.+?)$/;

const replace_list = [
    [",", "%2C"],
    ["'", "%27"],
    ["/", "%2F"],
    [" ", "+"]
]

const mods_list = [
    // ["e", "+extended"],
    ["f", "+foil", "\u{2728}"],
    // ["a", "+altered"],
    // ["p", "+promo"],
    ["b", "+borderless", "\u{1F3A8}"]
]

const GROUP_TOTAL = 1;
const GROUP_MODS  = 2;
const GROUP_NAME  = 3;


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

        links_list.appendChild(generateURL(line));
    }
}


function generateURL(line) {
    let matches = REGEX.exec(line);

    let total = matches[GROUP_TOTAL];
    let mods  = matches[GROUP_MODS];
    let name  = matches[GROUP_NAME];

    let output_string = name;
    let icons = [];

    if (mods) {
        for (i in mods_list) {
            if (mods.includes(mods_list[i][0])) {
                output_string += mods_list[i][1];
                icons.push(mods_list[i][2]);
            }
        }
    }

    for (i in replace_list) {
        output_string.replace(replace_list[i][0], replace_list[i][1]);
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