// Gets the values of the Arch Hours / Rate Section
// Returns - {object} with phase hours and rates per each role.

export default function GetValues() {
  let values = {};

  values.ExistingHours = parseFloat(document.getElementById("inpExistingHours").value);
  values.PrincipalArchitect = parseFloat(document.getElementById("inpPrincipalArchitect").value);
  values.ProjectArchitect = parseFloat(document.getElementById("inpProjectArchitect").value);
  values.AssociateArchitect = parseFloat(document.getElementById("inpAssociateArchitect").value);
  values.SeniorDesigner = parseFloat(document.getElementById("inpSeniorDesigner").value);
  values.SrProductionStaff = parseFloat(document.getElementById("inpSrProductionStaff").value);
  values.AssociateProdStaff = parseFloat(document.getElementById("inpAssociateProdStaff").value);
  values.ProjectAdminStaff = parseFloat(document.getElementById("inpProjectAdminStaff").value);

  values.ExistingRate = parseFloat(document.getElementById("inpExistingRate").value);
  values.PrincipalArchitectRate = parseFloat(document.getElementById("inpPrincipalArchitectRate").value);
  values.ProjectArchitectRate = parseFloat(document.getElementById("inpProjectArchitectRate").value);
  values.AssociateArchitectRate = parseFloat(document.getElementById("inpAssociateArchitectRate").value);
  values.SeniorDesignerRate = parseFloat(document.getElementById("inpSeniorDesignerRate").value);
  values.SrProductionStaffRate = parseFloat(document.getElementById("inpSrProductionStaffRate").value);
  values.AssociateProdStaffRate = parseFloat(document.getElementById("inpAssociateProdStaffRate").value);
  values.ProjectAdminStaffRate = parseFloat(document.getElementById("inpProjectAdminStaffRate").value);

  //console.log(values);
  return values;
}

export function GetReimbursibleValues() {
  let values = {};

  values.planReview = parseInt(document.getElementById("reiPlanReview").value);
  values.tdshs = parseInt(document.getElementById("reiTDSHS").value);
  values.tas = parseInt(document.getElementById("reiTAS").value);
  values.printing = parseInt(document.getElementById("reiPrinting").value);
  values.mepReimbursibles = parseInt(document.getElementById("reiMEPReimbursibles").value);
  values.mileage = parseInt(document.getElementById("reiMileage").value);
  values.renderings = parseInt(document.getElementById("reiRenderings").value);

  return values;
}

// Gets the values of the consultant section
// Returns the inputted values.

export function GetConsultantValues() {
  let values = {};

  values.MEPCosts = parseInt(document.getElementById("inpMEPCost").value);
  values.MEPName = document.getElementById("inpMEPName").value;
  values.StructCost = parseInt(document.getElementById("inpStructCost").value);
  values.StructName = document.getElementById("inpStructName").value;
  values.Consultant1Cost = parseInt(document.getElementById("inpCons1Cost").value);
  values.Consultant1Name = document.getElementById("inpCons1Name").value;
  values.Consultant2Cost = parseInt(document.getElementById("inpCons2Cost").value);
  values.Consultant2Name = document.getElementById("inpCons2Name").value;
  values.Consultant3Cost = parseInt(document.getElementById("inpCons3Cost").value);
  values.Consultant3Name = document.getElementById("inpCons3Name").value;

  return values;
}

// Gets values of precent of time allocated to each phase.
// Returns - {object} - with each phase inside.

export function GetPhaseValues() {
  let values = {};

  values.pre = parseFloat(document.getElementById("Programming").value);
  values.sD = parseFloat(document.getElementById("SD").value);
  values.dD = parseFloat(document.getElementById("DD").value);
  values.cD = parseFloat(document.getElementById("CD").value);
  values.bid = parseFloat(document.getElementById("Bid").value);
  values.cA = parseFloat(document.getElementById("CA").value);

  return values;
}

// Gets values from amount of meetings.
export function GetMeetingValues() {
  let values = {};

  values.siteVisitsCost = parseInt(document.getElementById("inpSiteVisitsCost").value);
  values.zoomMeetingCost = parseInt(document.getElementById("inpZoomMeetingsCost").value);
  values.programming = parseInt(document.getElementById("inpProgramming").value);
  values.programmingZoom = parseInt(document.getElementById("inpProgrammingZoom").value);
  values.preBid = parseInt(document.getElementById("inpPreBid").value);
  values.preBidZoom = parseInt(document.getElementById("inpPreBidZoom").value);
  values.preCon = parseInt(document.getElementById("inpPreCon").value);
  values.preConZoom = parseInt(document.getElementById("inpPreConZoom").value);
  values.cAVisits = parseInt(document.getElementById("inpCAVisits").value);
  values.cAVisitsZoom = parseInt(document.getElementById("inpCAZoom").value);
  values.punchlist = parseInt(document.getElementById("inpPunchlist").value);
  values.punchlistZoom = parseInt(document.getElementById("inpPunchlistZoom").value);
  values.tDSHS = parseInt(document.getElementById("inpTDSHS").value);
  values.tDSHSZoom = parseInt(document.getElementById("inpTDSHSZoom").value);
  values.tAS = parseInt(document.getElementById("inpTAS").value);
  values.tASZoom = parseInt(document.getElementById("inpTASZoom").value);

  return values;
}

// Gets values regarding the project info.
export function GetProjectValues() {
  let values = {};

  values.PName = document.getElementById("PName").value;
  values.PAddress = document.getElementById("PAddress").value;
  values.PNumber = document.getElementById("PNumber").value;
  values.PBidder = document.getElementById("PBidder").value;
  values.pDescription = document.getElementById("PDescription").value;

  return values;
}
