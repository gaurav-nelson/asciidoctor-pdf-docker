document.addEventListener("DOMContentLoaded", function () {
  addAttributeField();
  generateCommand();
  setupEventListeners();
});

function setupEventListeners() {
  document.querySelectorAll("input, select").forEach((element) => {
    if (element.type === "checkbox") {
      element.addEventListener("change", generateCommand);
    } else {
      element.addEventListener("input", generateCommand);
    }
  });

  const attributesContainer = document.getElementById("attributesContainer");
  attributesContainer.addEventListener("input", generateCommand);

  document.querySelectorAll(".tablinks").forEach((tab) => {
    tab.addEventListener("click", function (event) {
      openTab(event, this.getAttribute("data-tab"));
    });
  });

  document
    .getElementById("addAttributeBtn")
    .addEventListener("click", addAttributeField);

  document.getElementById("resetBtn").addEventListener("click", resetForm);

  document.getElementById("copyBtn").addEventListener("click", copyToClipboard);
}

function openTab(evt, tabName) {
  var tabcontent = document.getElementsByClassName("tabcontent");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove("active");
  }

  var tablinks = document.getElementsByClassName("tablinks");
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

function addAttributeField() {
  const container = document.getElementById("attributesContainer");
  const attributeRow = document.createElement("div");
  attributeRow.className = "attribute-row";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.className = "attribute-name";
  nameInput.placeholder = "Attribute name";
  nameInput.style.width = "40%";

  const valueInput = document.createElement("input");
  valueInput.type = "text";
  valueInput.className = "attribute-value";
  valueInput.placeholder = "Value (optional)";
  valueInput.style.width = "40%";

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "attribute-remove";
  removeButton.textContent = "×";
  removeButton.onclick = function () {
    container.removeChild(attributeRow);
    generateCommand();
  };

  attributeRow.appendChild(nameInput);
  attributeRow.appendChild(valueInput);
  attributeRow.appendChild(removeButton);

  container.appendChild(attributeRow);

  nameInput.addEventListener("input", generateCommand);
  valueInput.addEventListener("input", generateCommand);
}

function generateCommand() {
  let command =
    "docker run --rm -v $(pwd):/documents quay.io/ganelson/asciidoctor-pdf-docker:latest";

  const backend = document.getElementById("backend").value;
  if (backend) {
    command += ` -b ${backend}`;
  }

  const doctype = document.getElementById("doctype").value;
  if (doctype) {
    command += ` -d ${doctype}`;
  }

  if (document.getElementById("noHeaderFooter").checked) {
    command += " -s";
  }

  if (document.getElementById("sectionNumbers").checked) {
    command += " -n";
  }

  if (document.getElementById("embedded").checked) {
    command += " -e";
  }

  const outFile = document.getElementById("outFile").value;
  if (outFile) {
    command += ` -o ${outFile}`;
  }

  const safeMode = document.getElementById("safeMode").value;
  if (safeMode) {
    command += ` -S ${safeMode}`;
  }

  if (document.getElementById("quiet").checked) {
    command += " -q";
  }

  if (document.getElementById("verbose").checked) {
    command += " -v";
  }

  if (document.getElementById("timings").checked) {
    command += " -t";
  }

  if (document.getElementById("warnings").checked) {
    command += " -w";
  }

  const attributeNames = document.getElementsByClassName("attribute-name");
  const attributeValues = document.getElementsByClassName("attribute-value");

  for (let i = 0; i < attributeNames.length; i++) {
    const name = attributeNames[i].value.trim();
    const value = attributeValues[i].value.trim();

    if (name) {
      if (value) {
        command += ` -a ${name}=${value}`;
      } else {
        command += ` -a ${name}`;
      }
    }
  }

  const inputFile = document.getElementById("inputFile").value;
  if (inputFile) {
    command += ` ${inputFile}`;
  } else {
    command += ` document.adoc`;
  }

  document.getElementById("commandText").textContent = command;
}

function copyToClipboard() {
  const commandText = document.getElementById("commandText").textContent;
  const copyButton = document.getElementById("copyBtn");

  navigator.clipboard.writeText(commandText).then(
    () => {
      copyButton.textContent = "Copied!";
      copyButton.style.backgroundColor = "#54926c";

      setTimeout(() => {
        copyButton.textContent = "Copy";
        copyButton.style.backgroundColor = "#4caf50";
      }, 3000);
    },
    (err) => {
      console.error("Could not copy text: ", err);

      const textarea = document.createElement("textarea");
      textarea.value = commandText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      copyButton.textContent = "Copied!";
      copyButton.style.backgroundColor = "#28a745";

      setTimeout(() => {
        copyButton.textContent = "Copy";
        copyButton.style.backgroundColor = "#4caf50";
      }, 3000);
    }
  );
}

function resetForm() {
  document.getElementById("inputFile").value = "";
  document.getElementById("backend").value = "";
  document.getElementById("doctype").value = "";
  document.getElementById("outFile").value = "";

  document.getElementById("noHeaderFooter").checked = false;
  document.getElementById("sectionNumbers").checked = false;
  document.getElementById("embedded").checked = false;
  document.getElementById("quiet").checked = false;
  document.getElementById("verbose").checked = false;
  document.getElementById("timings").checked = false;
  document.getElementById("warnings").checked = false;

  document.getElementById("safeMode").value = "";

  const container = document.getElementById("attributesContainer");
  container.innerHTML = "";
  addAttributeField();

  generateCommand();
}
