const show_recipe = (el) => {
    console.log("Recipe switched");
    console.log(el);
    // Clear current recipe
    document.getElementById('recipe-ingredients-text').innerHTML = "";
    document.getElementById('recipe-directions-text').innerHTML = "";
    // Replace it with the ingredients/directions info inside the hidden HTML of the recipe cards
    document.getElementById('recipe-ingredients-text').innerHTML = el.querySelector('#recipe-ingredients').innerHTML;
    document.getElementById('recipe-directions-text').innerHTML  = el.querySelector('#recipe-directions').innerHTML;
    // Remove the opacity from placeholder text
    document.querySelector('#recipe-ingredients-text').style["opacity"] = "1"
    document.querySelector('#recipe-directions-text').style["opacity"] = "1"
}

function search_recipe() {
    let input, filter, aside, recipe_items, i, item, title;
    input = document.getElementById("recipe-search-input");
    filter = input.value.toUpperCase();
    aside = document.getElementById("recipes-container")
    recipe_items = aside.getElementsByClassName("title-item");

    for (i = 0; i < recipe_items.length; i++) {
        item = recipe_items[i].getElementsByClassName("recipe-title")[0];
        title = item.innerHTML
        if (title.toUpperCase().indexOf(filter) != -1) {
            recipe_items[i].style.display = "";
        } else {
            recipe_items[i].style.display = "none"
        }
    }
}
// ASDASIDJASJD COMMNENTNTNTN