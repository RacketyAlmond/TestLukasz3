window.onload = function () {
  const savedList = document.getElementById("saved-list");

  // Retrieve the saved essays from localStorage
  const savedEssays = JSON.parse(localStorage.getItem("savedEssays")) || [];

  if (savedEssays.length === 0) {
    savedList.innerHTML = "<p>No essays saved yet.</p>";
  } else {
    const list = document.createElement("ul");
    savedEssays.forEach((essay) => {
      const listItem = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = essay.fileName;
      button.addEventListener("click", () => {
        showPopup(essay.content, essay.fileName);
      });

      listItem.appendChild(button);
      list.appendChild(listItem);
    });
    savedList.appendChild(list);
  }
};

function showPopup(content, title) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const closeButton = document.createElement("span");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = "&times;";
  closeButton.onclick = () => {
    modal.remove();
  };

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;

  const contentElement = document.createElement("pre");
  contentElement.textContent = content;

  modalContent.appendChild(closeButton);
  modalContent.appendChild(titleElement);
  modalContent.appendChild(contentElement);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}
function initializeForum() {
  const savedList = document.getElementById("saved-list");
  const searchBar = document.getElementById("search-bar");
  const sortButtons = document.querySelectorAll(".sort-buttons button");

  let savedEssays = JSON.parse(localStorage.getItem("savedEssays")) || [];
  let displayedEssays = savedEssays;

  const displayEssays = (essays) => {
    savedList.innerHTML = '';
    if (essays.length === 0) {
      savedList.innerHTML = "<p>No essays saved yet.</p>";
    } else {
      const list = document.createElement("ul");
      essays.forEach((essay, index) => {
        const listItem = document.createElement("li");

        const essayInfo = document.createElement("div");
        essayInfo.classList.add("essay-info");

        const button = document.createElement("button");
        button.textContent = essay.fileName;
        button.addEventListener("click", () => {
          showPopup(essay.content, essay.fileName);
        });

        const writingType = document.createElement("span");
        writingType.textContent = essay.writingType;
        writingType.classList.add("writing-type");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          deleteEssay(index);
          location.reload();
        });

        essayInfo.appendChild(button);
        essayInfo.appendChild(writingType);
        listItem.appendChild(essayInfo);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
      });
      savedList.appendChild(list);
    }
  };

  const searchEssays = (searchTerm) => {
    displayedEssays = savedEssays.filter(essay =>
      essay.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      essay.writingType.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayEssays(displayedEssays);
  };

  const sortEssays = (type) => {
    if (type === 'all') {
      displayedEssays = savedEssays;
    } else {
      displayedEssays = savedEssays.filter(essay => essay.writingType.toLowerCase() === type);
    }
    displayEssays(displayedEssays);
  };

  searchBar.addEventListener('input', (e) => searchEssays(e.target.value));

  sortButtons.forEach(button => {
    button.addEventListener('click', () => {
      sortEssays(button.getAttribute('data-type'));
    });
  });

  displayEssays(displayedEssays);
}

function showPopup(content, title) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const closeButton = document.createElement("span");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = "&times;";
  closeButton.onclick = () => {
    modal.remove();
  };

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;

  const contentElement = document.createElement("pre");
  contentElement.textContent = content;

  modalContent.appendChild(closeButton);
  modalContent.appendChild(titleElement);
  modalContent.appendChild(contentElement);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

function deleteEssay(index) {
  const savedEssays = JSON.parse(localStorage.getItem("savedEssays")) || [];
  savedEssays.splice(index, 1);
  localStorage.setItem("savedEssays", JSON.stringify(savedEssays));
  initializeForum(); // Refresh the forum to reflect the changes
}
