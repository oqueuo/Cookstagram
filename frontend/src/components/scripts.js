export function toggleRecipesOrForm() {
    if (document.getElementById("add-btn").getAttribute("status") === "Add") {

        document.getElementById("add-btn").setAttribute("status", "Cancel");
        document.getElementById("add-btn").className = 'far fa-times-circle';

        document.getElementById("recipeform-container").className = ''
        document.getElementById("recipecard-container-PROFILE").className = 'hidden'

    } else if (document.getElementById("add-btn").getAttribute("status") === "Cancel") {

        document.getElementById("add-btn").setAttribute("status", "Add");
        document.getElementById("add-btn").className = 'far fa-plus-square';

        document.getElementById("recipeform-container").className = 'hidden'
        document.getElementById("recipecard-container-PROFILE").className = ''
    }
    console.log(document.getElementById("add-btn").getAttribute("status"))
    console.log("button clicked")
}