import GetValues, { GetMeetingValues, GetConsultantValues, GetPhaseValues, GetReimbursibleValues, GetProjectValues } from "./values.mjs";

export default function GenerateTestDoc() {
  let projectInfo = GetProjectValues();

  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: [
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: "Project Address: ",
                bold: true,
              }),
              new docx.TextRun({
                text: projectInfo.PName,
              }),
              new docx.TextRun({
                text: "Project Address: ",
                bold: true,
                break: 1,
              }),
              new docx.TextRun({
                text: projectInfo.PAddress,
              }),
              new docx.TextRun({
                text: "Project Number: ",
                bold: true,
                break: 1,
              }),
              new docx.TextRun({
                text: projectInfo.PNumber,
              }),
              new docx.TextRun({
                text: "Project Bidder: ",
                bold: true,
                break: 1,
              }),
              new docx.TextRun({
                text: projectInfo.PBidder,
              }),
            ],
          }),
        ],
      },
    ],
  });

  // Used to export the file into a .docx file
  docx.Packer.toBlob(doc).then((buffer) => {
    saveAs(buffer, "My Document.docx");
  });
}
