let dropdown = document.getElementsByClassName("dropdown-btn");
let subDropdown = document.getElementsByClassName("sub-dropdown-btn");
let i;
let o;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
};

for (o = 0; o < subDropdown.length; o++) {
  subDropdown[o].addEventListener("click", function() {
    this.classList.toggle("active2");
    let dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}