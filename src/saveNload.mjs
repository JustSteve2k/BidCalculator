import GetValues, { GetReimbursibleValues, GetMeetingValues, GetConsultantValues, GetPhaseValues, GetProjectValues } from "./src/js/values.mjs";
import { fileOpen } from "https://unpkg.com/browser-fs-access";
import { CalculateAll } from "./script.js";

// Event listeners
btnExport.addEventListener("click", Export);
btnImport.addEventListener("click", Import);

// Export function -
function Export() {
  let values = GetValues();
  let meet = GetMeetingValues();
  let rei = GetReimbursibleValues();
  let cons = GetConsultantValues();
  let phase = GetPhaseValues();
  let proj = GetProjectValues();

  alert("Exporting");
  //var blob = new Blob(["Hello, world!", "Anotherset fo stuff"], { type: "text/plain;charset=utf-8" });

  var blob = new Blob(
    [
      "01 " + values.ExistingHours + " " + values.ExistingRate + "\n",
      "02 " + values.PrincipalArchitect + " " + values.PrincipalArchitectRate + "\n",
      "03 " + values.ProjectArchitect + " " + values.ProjectArchitectRate + "\n",
      "04 " + values.AssociateArchitect + " " + values.AssociateArchitectRate + "\n",
      "05 " + values.SeniorDesigner + " " + values.SeniorDesignerRate + "\n",
      "06 " + values.SrProductionStaff + " " + values.SrProductionStaffRate + "\n",
      "07 " + values.AssociateProdStaff + " " + values.AssociateProdStaffRate + "\n",
      "08 " + values.ProjectAdminStaff + " " + values.ProjectAdminStaffRate + "\n",
      "09 " + meet.siteVisitsCost + " " + meet.zoomMeetingCost + "\n",
      "10 " + meet.programming + " " + meet.programmingZoom + "\n",
      "11 " + meet.preBid + " " + meet.preBidZoom + "\n",
      "12 " + meet.preCon + " " + meet.preConZoom + "\n",
      "13 " + meet.cAVisits + " " + meet.cAVisitsZoom + "\n",
      "14 " + meet.punchlist + " " + meet.punchlistZoom + "\n",
      "15 " + meet.tDSHS + " " + meet.tDSHSZoom + "\n",
      "16 " + meet.tAS + " " + meet.tASZoom + "\n",
      "17 " + cons.MEPCosts + " " + cons.MEPName + "\n",
      "18 " + cons.StructCost + " " + cons.StructName + "\n",
      "19 " + cons.Consultant1Cost + " " + cons.Consultant1Name + "\n",
      "20 " + cons.Consultant2Cost + " " + cons.Consultant1Name + "\n",
      "21 " + cons.Consultant3Cost + " " + cons.Consultant1Name + "\n",
      "22 " + rei.planReview + "\n",
      "23 " + rei.tdshs + "\n",
      "24 " + rei.tas + "\n",
      "25 " + rei.printing + "\n",
      "26 " + rei.mepReimbursibles + "\n",
      "27 " + rei.mileage + "\n",
      "28 " + rei.renderings + "\n",
      "29 " + phase.pre + "\n",
      "30 " + phase.sD + "\n",
      "31 " + phase.dD + "\n",
      "32 " + phase.cD + "\n",
      "33 " + phase.bid + "\n",
      "34 " + phase.cA + "\n",
      "35 " + proj.PName + "\n",
      "36 " + proj.PAddress + "\n",
      "37 " + proj.PNumber + "\n",
      "38 " + proj.PBidder + "\n",
      "39 " + proj.pDescription + "\n",
      "Version 0.1.2 ",
    ],
    {
      type: "text/plain;charset=utf-8",
    }
  );

  saveAs(blob, proj.PName + ".txt");
}

// Import function - TBD
async function Import() {
  alert("Importing");

  let words = "";

  try {
    const blob = await fileOpen({
      description: "Text files",
      mimeTypes: ["text/*"],
      extensions: [".txt"],
    });

    words = await blob.text();

    ParseTxtThenLoad(words);
  } catch (err) {
    if (err.name !== "AbortError") {
      return console.error(err);
    }
    console.log("The user aborted a request.");
  }

  CalculateAll();
}

// Takes the input and then places them into their respective input fields
function ParseTxtThenLoad(words) {
  let entries = [];
  let entry = "";

  entries = words.split("\n");
  CheckVersion(entries);

  entry = entries[0].split(" ");
  console.log(entry);
  console.log(entry[1], " ", entry[2]);
  document.getElementById("inpExistingHours").value = entry[1];
  document.getElementById("inpExistingRate").value = entry[2];
  entry = entries[1].split(" ");
  console.log(entry);
  console.log(entry[1], " ", entry[2]);
  document.getElementById("inpPrincipalArchitect").value = entry[1];
  document.getElementById("inpPrincipalArchitectRate").value = entry[2];
  entry = entries[2].split(" ");
  console.log(entry);
  console.log(entry[1], " ", entry[2]);
  document.getElementById("inpProjectArchitect").value = entry[1];
  document.getElementById("inpProjectArchitectRate").value = entry[2];
  entry = entries[3].split(" ");
  console.log(entry);
  console.log(entry[1], " ", entry[2]);
  document.getElementById("inpAssociateArchitect").value = entry[1];
  document.getElementById("inpAssociateArchitectRate").value = entry[2];
  entry = entries[4].split(" ");
  console.log(entry);
  console.log(entry[1], " ", entry[2]);
  document.getElementById("inpSeniorDesigner").value = entry[1];
  document.getElementById("inpSeniorDesignerRate").value = entry[2];
  entry = entries[5].split(" ");
  console.log(entry);
  console.log(entry[1], " ", entry[2]);
  document.getElementById("inpSrProductionStaff").value = entry[1];
  document.getElementById("inpSrProductionStaffRate").value = entry[2];
  entry = entries[6].split(" ");
  console.log(entry);
  console.log(entry[1], " ", entry[2]);
  document.getElementById("inpAssociateProdStaff").value = entry[1];
  document.getElementById("inpAssociateProdStaffRate").value = entry[2];
  entry = entries[7].split(" ");
  console.log(entry);
  console.log(entry[1], " ", entry[2]);
  document.getElementById("inpProjectAdminStaff").value = entry[1];
  document.getElementById("inpProjectAdminStaffRate").value = entry[2];

  entry = entries[8].split(" ");
  console.log(entry);
  console.log(entry[1], " ", entry[2]);
  document.getElementById("inpSiteVisitsCost").value = entry[1];
  document.getElementById("inpZoomMeetingsCost").value = entry[2];
  entry = entries[9].split(" ");
  console.log(entry);
  console.log(entry[1], " ", entry[2]);
  document.getElementById("inpProgramming").value = entry[1];
  document.getElementById("inpProgrammingZoom").value = entry[2];
  entry = entries[10].split(" ");
  console.log(entry);
  console.log(entry[1], " ", entry[2]);
  document.getElementById("inpPreBid").value = entry[1];
  document.getElementById("inpPreBidZoom").value = entry[2];
  entry = entries[11].split(" ");
  console.log(entry);
  console.log(entry[1], " ", entry[2]);
  document.getElementById("inpPreCon").value = entry[1];
  document.getElementById("inpPreConZoom").value = entry[2];
  entry = entries[12].split(" ");
  console.log(entry);
  console.log(entry[1], " ", entry[2]);
  document.getElementById("inpCAVisits").value = entry[1];
  document.getElementById("inpCAZoom").value = entry[2];
  entry = entries[13].split(" ");
  console.log(entry);
  console.log(entry[1], " ", entry[2]);
  document.getElementById("inpPunchlist").value = entry[1];
  document.getElementById("inpPunchlistZoom").value = entry[2];
  entry = entries[14].split(" ");
  console.log(entry);
  console.log(entry[1], " ", entry[2]);
  document.getElementById("inpTDSHS").value = entry[1];
  document.getElementById("inpTDSHSZoom").value = entry[2];
  entry = entries[15].split(" ");
  console.log(entry);
  console.log(entry[1], " ", entry[2]);
  document.getElementById("inpTAS").value = entry[1];
  document.getElementById("inpTASZoom").value = entry[2];

  entry = entries[16].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("inpMEPCost").value = entry[1];
  document.getElementById("inpMEPName").value = entry[2];
  entry = entries[17].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("inpStructCost").value = entry[1];
  document.getElementById("inpStructName").value = entry[2];
  entry = entries[18].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("inpCons1Cost").value = entry[1];
  document.getElementById("inpCons1Name").value = entry[2];
  entry = entries[19].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("inpCons2Cost").value = entry[1];
  document.getElementById("inpCons2Name").value = entry[2];
  entry = entries[20].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("inpCons3Cost").value = entry[1];
  document.getElementById("inpCons3Name").value = entry[2];

  entry = entries[21].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("reiPlanReview").value = entry[1];

  entry = entries[22].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("reiTDSHS").value = entry[1];
  entry = entries[23].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("reiTAS").value = entry[1];
  entry = entries[24].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("reiPrinting").value = entry[1];
  entry = entries[25].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("reiMEPReimbursibles").value = entry[1];
  entry = entries[26].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("reiMileage").value = entry[1];
  entry = entries[27].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("reiRenderings").value = entry[1];

  entry = entries[28].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("Programming").value = entry[1];
  entry = entries[29].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("SD").value = entry[1];
  entry = entries[30].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("DD").value = entry[1];
  entry = entries[31].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("CD").value = entry[1];
  entry = entries[32].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("Bid").value = entry[1];
  entry = entries[33].split(" ");
  console.log(entry);
  console.log(entry[1]);
  document.getElementById("CA").value = entry[1];

  entry = entries[34].slice(3);
  console.log(entry);
  document.getElementById("PName").value = entry;
  entry = entries[35].slice(3);
  console.log(entry);
  document.getElementById("PAddress").value = entry;
  entry = entries[36].slice(3);
  console.log(entry);
  document.getElementById("PNumber").value = entry;
  entry = entries[37].slice(3);
  console.log(entry);
  document.getElementById("PBidder").value = entry;
  entry = entries[38].slice(3);
  console.log(entry);
  document.getElementById("PDescription").value = entry;
  console.log("completed Load!");
}

// Checks the current version of the save file then notes if there might be a conflict with it.
// Returns - none.

function CheckVersion(entry) {
  if (entry[38] === undefined) console.log("Looks like an old version, use carefully.");
  else {
    console.log("Current version is - " + entry[38]);
  }
}
