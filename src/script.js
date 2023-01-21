import UpdateWDollars, { getRandomInt } from "./js/helper.mjs";
import ShowHideTotalsMenu, { HideSection, ShowAllCosts, ShowHideHelper } from "./js/visual.mjs";
import GetValues, { GetMeetingValues, GetConsultantValues, GetPhaseValues, GetReimbursibleValues, GetProjectValues } from "./js/values.mjs";
import GenerateTestDoc from "./js/word.mjs";

//Event listeners for buttons
btnClear.addEventListener("click", Clear);
btnTotalsMenu.addEventListener("click", ShowHideTotalsMenu);
btnTestDataS.addEventListener("click", () => {
  SetTestData(10);
});
btnTestDataL.addEventListener("click", () => {
  SetTestData(30);
});
btnShowAllCosts.addEventListener("click", ShowAllCosts);
btnHospToOutpatient.addEventListener("click", HospitalToOutpatientRates);
btnCalculate.addEventListener("click", CalculateAll);
btnShowHideHelper.addEventListener("click", ShowHideHelper);

//Event listeners for hiding headers
const inpSections = document.querySelectorAll(".secHeader");

inpSections.forEach((sec) => {
  sec.addEventListener("click", (event) => {
    let str = event.target.id;
    str = str.substring(0, str.indexOf("Header"));
    HideSection(str);
  });
});

// Event listeners for all the input fields
document.querySelectorAll(".inputHalf").forEach((item) => {
  item.addEventListener("input", CalculateAll);
});
document.querySelectorAll(".inputFull").forEach((item) => {
  item.addEventListener("input", CalculateAll);
});

// On Mouseovers of header sections
document.getElementById("archCostsHeader").onmouseover = () => {
  let x = "archCostsHeader";
  Helper(x);
};

document.getElementById("siteVisitsHeader").onmouseover = () => {
  let x = "siteVisitsHeader";
  Helper(x);
};

document.getElementById("consultantCostsHeader").onmouseover = () => {
  let x = "consultantCostsHeader";
  Helper(x);
};

document.getElementById("reimbursiblesHeader").onmouseover = () => {
  let x = "reimbursiblesHeader";
  Helper(x);
};

document.getElementById("advancedHeader").onmouseover = () => {
  let x = "advancedHeader";
  Helper(x);
};

document.getElementById("projectInfoHeader").onmouseover = () => {
  let x = "projectInfoHeader";
  Helper(x);
};

document.getElementById("btnGenerateTestDoc").addEventListener("click", () => {
  GenerateTestDoc();
});

document.getElementById("btnAddConsultant").addEventListener("click", AddNewConsultant);
document.getElementById("btnRemoveLastConsultant").addEventListener("click", RemoveLastConsultant);

// Calculates total Total ArchCosts
// Returns - the calculated total architecture costs

function CalculateTotalArchCosts() {
  let values = GetValues();

  let totalArchCosts =
    values.ExistingRate * values.ExistingHours +
    values.PrincipalArchitectRate * values.PrincipalArchitect +
    values.ProjectArchitectRate * values.ProjectArchitect +
    values.AssociateArchitectRate * values.AssociateArchitect +
    values.SeniorDesignerRate * values.SeniorDesigner +
    values.SrProductionStaffRate * values.SrProductionStaff +
    values.AssociateProdStaffRate * values.AssociateProdStaff +
    values.ProjectAdminStaffRate * values.ProjectAdminStaff;
  UpdateWDollars("totalArchCosts", totalArchCosts);
  return totalArchCosts;
}

// Main calculate function.
// Returns - None

export function CalculateAll() {
  console.clear();

  CalculateTotalHours();
  CalculateTotalSiteVisits();
  CalculateTotalZoom();
  CalculateTotalFees();
  CalculateAverageRate();
  TotalConsultantCosts();
  CostPerPhases();
}

// Used for calculating the total fees both with and without reimbursibles
// Returns - None

function CalculateTotalFees() {
  let totalArchCosts = CalculateTotalArchCosts();

  let totalMEPCosts = parseInt(document.getElementById("inpMEPCost").value);
  let totalStructCost = parseInt(document.getElementById("inpStructCost").value);
  let totalConsultantCost = parseInt(document.getElementById("inpCons1Cost").value);

  let total = totalArchCosts + totalMEPCosts + totalStructCost + totalConsultantCost;
  let totalWReimbursibles = CalculateReimbursibles() + total;

  UpdateWDollars("totalWOReimbursibles", total);
  UpdateWDollars("totalWReimbursibles", totalWReimbursibles);
}

// Used for calculating the total amount of hours, then updates section in output
// Returns - None

function CalculateTotalHours() {
  let values = GetValues();

  let totalHours =
    values.ExistingHours +
    values.PrincipalArchitect +
    values.ProjectArchitect +
    values.AssociateArchitect +
    values.SeniorDesigner +
    values.SrProductionStaff +
    values.AssociateProdStaff +
    values.ProjectAdminStaff;

  document.getElementById("totalHours").innerHTML = totalHours;
}

// Calculates the total amount of site visits then updates section in output.
// Returns - none

function CalculateTotalSiteVisits() {
  let values = GetMeetingValues();

  let inpSiteVisitsCost = parseInt(document.getElementById("inpSiteVisitsCost").value);

  let dollarUSLocale = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let totalVisits = values.programming + values.preBid + values.preCon + values.cAVisits + values.punchlist + values.tDSHS + values.tAS;
  let siteVisitsCost = totalVisits * inpSiteVisitsCost;

  document.getElementById("totalSiteVisits").innerText = totalVisits + " x " + inpSiteVisitsCost + " = " + dollarUSLocale.format(siteVisitsCost);
}

// Calculates the total amount of zoom , and calculates their cost.
// Returns - None

function CalculateTotalZoom() {
  let values = GetMeetingValues();

  let inpZoomMeetingsCost = parseInt(document.getElementById("inpZoomMeetingsCost").value);

  let dollarUSLocale = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let totalZooms =
    values.programmingZoom + values.preBidZoom + values.preConZoom + values.cAVisitsZoom + values.punchlistZoom + values.tDSHSZoom + values.tASZoom;

  let zoomMeetingsCost = totalZooms * inpZoomMeetingsCost;

  document.getElementById("totalZooms").innerText = totalZooms + " x " + inpZoomMeetingsCost + " = " + dollarUSLocale.format(zoomMeetingsCost);
}

// Totals up all the reimbursibles.
// Returns {int} - total of all the reimbursibles

function CalculateReimbursibles() {
  let values = GetReimbursibleValues();

  let total = values.planReview + values.tdshs + values.tas + values.printing + values.mepReimbursibles + values.mileage + values.renderings;

  return total;
}

// Clears Input and Output section of calculator.
// Returns - None

function Clear() {
  // Output Section
  console.clear();

  document.getElementById("totalHours").innerHTML = 0;
  document.getElementById("totalSiteVisits").innerHTML = 0;
  document.getElementById("totalZooms").innerHTML = 0;
  document.getElementById("totalArchCosts").innerHTML = 0;
  document.getElementById("totalConsultantCosts").innerHTML = 0;
  document.getElementById("totalWOReimbursibles").innerHTML = 0;
  document.getElementById("totalWReimbursibles").innerHTML = 0;
  document.getElementById("avgRate").innerHTML = 0;

  document.getElementById("costProg").innerHTML = 0;
  document.getElementById("costSD").innerHTML = 0;
  document.getElementById("costDD").innerHTML = 0;
  document.getElementById("costCD").innerHTML = 0;
  document.getElementById("costBid").innerHTML = 0;
  document.getElementById("costCA").innerHTML = 0;

  // Input Fields
  document.getElementById("inpExistingHours").value = 0;
  document.getElementById("inpPrincipalArchitect").value = 0;
  document.getElementById("inpProjectArchitect").value = 0;
  document.getElementById("inpAssociateArchitect").value = 0;
  document.getElementById("inpSeniorDesigner").value = 0;
  document.getElementById("inpSrProductionStaff").value = 0;
  document.getElementById("inpAssociateProdStaff").value = 0;
  document.getElementById("inpProjectAdminStaff").value = 0;

  document.getElementById("inpMEPCost").value = 0;
  document.getElementById("inpStructCost").value = 0;
  document.getElementById("inpCons1Cost").value = 0;
  document.getElementById("inpCons2Cost").value = 0;
  document.getElementById("inpCons3Cost").value = 0;

  document.getElementById("inpMEPName").value = "";
  document.getElementById("inpStructName").value = "";
  document.getElementById("inpCons1Name").value = "";
  document.getElementById("inpCons2Name").value = "";
  document.getElementById("inpCons3Name").value = "";

  document.getElementById("inpProgramming").value = 0;
  document.getElementById("inpPreBid").value = 0;
  document.getElementById("inpPreCon").value = 0;
  document.getElementById("inpCAVisits").value = 0;
  document.getElementById("inpPunchlist").value = 0;
  document.getElementById("inpTDSHS").value = 0;
  document.getElementById("inpTAS").value = 0;

  document.getElementById("inpProgrammingZoom").value = 0;
  document.getElementById("inpPreBidZoom").value = 0;
  document.getElementById("inpPreConZoom").value = 0;
  document.getElementById("inpCAZoom").value = 0;
  document.getElementById("inpPunchlistZoom").value = 0;
  document.getElementById("inpTDSHSZoom").value = 0;
  document.getElementById("inpTASZoom").value = 0;

  document.getElementById("PName").value = "";
  document.getElementById("PAddress").value = "";
  document.getElementById("PNumber").value = "";
  document.getElementById("PBidder").value = "";
  document.getElementById("PDescription").value = "";
}

// Sets random input data then recalculates.
// Returns - None

function SetTestData(seed) {
  document.getElementById("inpExistingHours").value = getRandomInt(seed);
  document.getElementById("inpPrincipalArchitect").value = getRandomInt(seed);
  document.getElementById("inpProjectArchitect").value = getRandomInt(seed);
  document.getElementById("inpAssociateArchitect").value = getRandomInt(seed);
  document.getElementById("inpSeniorDesigner").value = getRandomInt(seed);
  document.getElementById("inpSrProductionStaff").value = getRandomInt(seed);
  document.getElementById("inpAssociateProdStaff").value = getRandomInt(seed);
  document.getElementById("inpProjectAdminStaff").value = getRandomInt(seed);

  document.getElementById("inpMEPCost").value = getRandomInt(seed * 500);
  document.getElementById("inpMEPName").value = "TestMEPConsultant";
  document.getElementById("inpStructCost").value = getRandomInt(seed * 500);
  document.getElementById("inpStructName").value = "TestStructConsultant";
  document.getElementById("inpCons1Cost").value = getRandomInt(seed * 500);
  document.getElementById("inpCons1Name").value = "TestConsultant1";
  document.getElementById("inpCons2Cost").value = getRandomInt(seed * 500);
  document.getElementById("inpCons2Name").value = "TestConsultant2";
  document.getElementById("inpCons3Cost").value = getRandomInt(seed * 500);
  document.getElementById("inpCons3Name").value = "TestConsultant3";

  document.getElementById("inpSiteVisitsCost").value = 500;
  document.getElementById("inpProgramming").value = getRandomInt(seed);
  document.getElementById("inpPreBid").value = getRandomInt(seed);
  document.getElementById("inpPreCon").value = getRandomInt(seed);
  document.getElementById("inpCAVisits").value = getRandomInt(seed);
  document.getElementById("inpPunchlist").value = getRandomInt(seed);
  document.getElementById("inpTDSHS").value = getRandomInt(seed);
  document.getElementById("inpTAS").value = getRandomInt(seed);

  document.getElementById("inpZoomMeetingsCost").value = 250;
  document.getElementById("inpProgrammingZoom").value = getRandomInt(seed);
  document.getElementById("inpPreBidZoom").value = getRandomInt(seed);
  document.getElementById("inpPreConZoom").value = getRandomInt(seed);
  document.getElementById("inpCAZoom").value = getRandomInt(seed);
  document.getElementById("inpPunchlistZoom").value = getRandomInt(seed);
  document.getElementById("inpTDSHSZoom").value = getRandomInt(seed);
  document.getElementById("inpTASZoom").value = getRandomInt(seed);

  document.getElementById("reiPlanReview").value = 1500;
  document.getElementById("reiTDSHS").value = 0;
  document.getElementById("reiTAS").value = 1050;
  document.getElementById("reiPrinting").value = 500;
  document.getElementById("reiMEPReimbursibles").value = 500;
  document.getElementById("reiMileage").value = 500;
  document.getElementById("reiRenderings").value = 0;

  document.getElementById("PName").value = "Project TestName";
  document.getElementById("PAddress").value = "13581 Makebelieve Ln";
  document.getElementById("PNumber").value = "212155";
  document.getElementById("PBidder").value = "Test Builder";
  document.getElementById("PDescription").value = "This is an imaginary project for testing.";

  CalculateAll();
}

// Calculates the Arch average rate then updates it.
// Returns - None

function CalculateAverageRate() {
  let values = GetValues();
  let totalHours =
    values.ExistingHours +
    values.PrincipalArchitect +
    values.ProjectArchitect +
    values.AssociateArchitect +
    values.SeniorDesigner +
    values.SrProductionStaff +
    values.AssociateProdStaff +
    values.ProjectAdminStaff;

  let avgRate =
    (values.ExistingHours * values.ExistingRate +
      values.PrincipalArchitect * values.PrincipalArchitectRate +
      values.ProjectArchitect * values.ProjectArchitectRate +
      values.AssociateArchitect * values.AssociateArchitectRate +
      values.SeniorDesigner * values.SeniorDesignerRate +
      values.SrProductionStaff * values.SrProductionStaffRate +
      values.AssociateProdStaff * values.AssociateProdStaffRate +
      values.ProjectAdminStaff * values.ProjectAdminStaffRate) /
    totalHours;

  //console.log(values);
  console.log("totalHours - ", totalHours);
  console.log("Average Rate - ", avgRate);

  UpdateWDollars("avgRate", avgRate);
}

// Converts from hospital to Outpatient Rates
// Returns - None

function HospitalToOutpatientRates() {
  let level = parseFloat(document.getElementById("inpPrincipalArchitectRate").value);

  if (level === 220.0) {
    alert("Changing to Outpatient Rates");
    document.getElementById("inpExistingRate").value = 160;
    document.getElementById("inpPrincipalArchitectRate").value = 175;
    document.getElementById("inpProjectArchitectRate").value = 160;
    document.getElementById("inpAssociateArchitectRate").value = 160;
    document.getElementById("inpSeniorDesignerRate").value = 145;
    document.getElementById("inpSrProductionStaffRate").value = 130;
    document.getElementById("inpAssociateProdStaffRate").value = 115;
    document.getElementById("inpProjectAdminStaffRate").value = 100;
  } else {
    alert("Changing to Hospital Rates");
    document.getElementById("inpExistingRate").value = 185;
    document.getElementById("inpPrincipalArchitectRate").value = 220;
    document.getElementById("inpProjectArchitectRate").value = 185;
    document.getElementById("inpAssociateArchitectRate").value = 170;
    document.getElementById("inpSeniorDesignerRate").value = 150;
    document.getElementById("inpSrProductionStaffRate").value = 130;
    document.getElementById("inpAssociateProdStaffRate").value = 120;
    document.getElementById("inpProjectAdminStaffRate").value = 100;
  }
}

// Totals up all the consultant costs and then updates the section in output.
// Returns - None

function TotalConsultantCosts() {
  let values = GetConsultantValues();

  let total = values.MEPCosts + values.StructCost + values.Consultant1Cost + values.Consultant1Cost + values.Consultant3Cost;

  console.log("Consultant Total - ", total);

  UpdateWDollars("totalConsultantCosts", total);
}

// Gets the cost per phases
// Returns - None

function CostPerPhases() {
  let values = GetPhaseValues();

  let total = values.pre + values.sD + values.dD + values.cD + values.bid + values.cA;

  ConsoleSeparator("Costperphase");

  if (total > 100) {
    console.log("Your precentage total is too high");
    alert(`percentage is too high! by ${total - 100}`);
    return;
  }

  if (total < 100) {
    console.log(`Your precentage total is too low by ${total - 100}`);
    alert("percentage is too low!");
    return;
  }

  // Cleans up totalArch Costs input.

  let tAC = document.getElementById("totalArchCosts").innerText;

  console.log(tAC);
  tAC = tAC.slice(1); // Removes $
  tAC = tAC.replace(",", ""); // Removes commas
  tAC = parseFloat(tAC);

  // Outputs the precentage breakdowns in console

  console.log(`Total Arch costs - ${tAC}`);
  console.log(`PRE = ${values.pre}% = $${(values.pre / 100) * tAC}`);
  console.log(`SD = ${values.sD}% = $${(values.sD / 100) * tAC}`);
  console.log(`DD = ${values.dD}% = $${(values.dD / 100) * tAC}`);
  console.log(`CD = ${values.cD}% = $${(values.cD / 100) * tAC}`);
  console.log(`BID = ${values.bid}% = $${(values.bid / 100) * tAC}`);
  console.log(`CA = ${values.cA}% = $${(values.cA / 100) * tAC}`);

  UpdateCostPerPhase(values, tAC);
}

// Function called to update output section.
// @param {object} cost - phase precentages in object form
// @param {float} archCosts - money value to be converted
// Returns - None

function UpdateCostPerPhase(cost, archCosts) {
  UpdateWDollars("costProg", (cost.pre / 100) * archCosts);
  UpdateWDollars("costSD", (cost.sD / 100) * archCosts);
  UpdateWDollars("costDD", (cost.dD / 100) * archCosts);
  UpdateWDollars("costCD", (cost.cD / 100) * archCosts);
  UpdateWDollars("costBid", (cost.bid / 100) * archCosts);
  UpdateWDollars("costCA", (cost.cA / 100) * archCosts);

  //console.log("UpdateCostPerPhase engaged");
  //console.log(cost);
}

// Function that makes a separator in the console for easier reading.
// @param {string} title - takes a provided title and gives it a border in console.
// Returns - None

function ConsoleSeparator(title) {
  console.log(`\n\n=======================\n       ${title}\n=======================\n\n`);
}

function Helper(field) {
  let x = "Helper \n\n";

  switch (field) {
    case "archCostsHeader":
      x += "This section has the base rates";
      break;
    case "siteVisitsHeader":
      x += "This section has has information related to the amount of site visits";
      break;
    case "consultantCostsHeader":
      x += "This section has information related to the consultants";
      break;
    case "reimbursiblesHeader":
      x += "This section allows you to add reimbursibles costs";
      break;
    case "advancedHeader":
      x += "This section allows you to breakdown the costs per phase";
      break;
    case "projectInfoHeader":
      x += "This section has info about the project and who is managing it.";
      break;
  }

  document.getElementById("helper").innerText = x;
}

function AddNewConsultant() {
  let section = document.getElementById("consultantCosts");

  let num = section.lastElementChild.firstElementChild.innerHTML;
  console.log(section.lastElementChild.firstElementChild.innerHTML);
  console.log("^");

  let div = document.createElement("div");
  div.classList = "field";

  let label = document.createElement("label");
  label.innerText = " Consultant+";
  div.append(label);

  let inp = document.createElement("input");
  inp.type = "number";
  inp.classList = "inputHalf rightspace hn";
  inp.placeholder = "0";
  div.append(inp);

  /*
  let values = ["MEP", "Structural", "Technology","Civil", "Acoustical"];

  let drop = document.createElement("select");
  drop.name = "tester";

  for (const val of values) {
    var option = document.createElement("option");
    option.value = val;
    option.text = val;
    drop.appendChild(option);
  }
  
  div.append(drop);
  */

  inp = document.createElement("input");
  inp.type = "string";
  inp.classList = "input40";
  inp.placeholder = "Consultant Name Test";
  div.append(inp);

  section.append(div);
  console.log(section.childElementCount);
}

function RemoveLastConsultant() {
  let section = document.getElementById("consultantCosts");
  if (section.childElementCount > 1) section.lastElementChild.outerHTML = "";
  console.log(section.childElementCount);
}
