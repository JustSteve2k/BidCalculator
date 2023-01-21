// Shows or hides the output menu.
export default function ShowHideTotalsMenu() {
  var x = document.getElementById("output");
  var y = document.getElementById("left");
  let z = document.getElementById("temp");

  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.width = "40%";
    z.style.width = "80rem";
  } else {
    x.style.display = "none";
    y.style.width = "80%";
    z.style.width = "60rem";
    z.style.margin = " 2rem auto";
  }
}

// Hiding and showing certain
// @param {string} section - hides a section of the input area depending on what is input.
export function HideSection(section) {
  let x = document.getElementById(section); // This is the section being hidden
  let temp = section + "Header";
  let y = document.getElementById(temp); // This is for the header itself.
  console.log(temp);
  if (x.style.display == "block") {
    x.style.display = "none";
    y.style.backgroundColor = "red";
    y.style.color = "white";
  } else {
    x.style.display = "block";
    y.style.backgroundColor = "lightskyblue";
    y.style.color = "black";
  }
}

// Hide the overlay
export function CloseOverlay() {
  document.getElementsByClassName("overlay")[0].style.display = "none";
}

// Reveals all hidden input sections, alternates by hiding them.
export function ShowAllCosts() {
  let u = document.getElementById("archCosts");
  let v = document.getElementById("siteVisits");
  let w = document.getElementById("consultantCosts");
  let x = document.getElementById("reimbursibles");
  let y = document.getElementById("advanced");
  let z = document.getElementById("projectInfo");

  if (
    u.style.display == "none" ||
    v.style.display == "none" ||
    w.style.display == "none" ||
    x.style.display == "none" ||
    y.style.display == "none" ||
    z.style.display == "none"
  ) {
    u.style.display = "block";
    document.getElementById("archCostsHeader").style.backgroundColor = "lightskyblue";
    v.style.display = "block";
    w.style.display = "block";
    x.style.display = "block";
    y.style.display = "block";
    z.style.display = "block";
  } else {
    u.style.display = "none";
    document.getElementById("archCostsHeader").style.backgroundColor = "green";
    v.style.display = "none";
    w.style.display = "none";
    x.style.display = "none";
    y.style.display = "none";
    z.style.display = "none";
  }
}

// Shows and hides the helper overlay.
// Returns - None

export function ShowHideHelper() {
  let x = document.getElementById("infoContainer");
  let y = document.getElementById("helper");

  if (x.style.display == "none") {
    x.style.display = "block";
    y.innerText = "HI!";
    return;
  } else if (x.style.display == "block") {
    x.style.display = "none";
    return;
  }
}
