const input = document.querySelectorAll("input");
const addBook = document.querySelector(".addBook");

function generateRandomId(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

const randomId = generateRandomId(8);

document.addEventListener("DOMContentLoaded", () => {
  const finishedReading = document.querySelector(".finishedReading");
  const unFinishedReading = document.querySelector(".unFinishedReading");

  if (unFinishedReading.childNodes.length === 0) {
    const p = document.createElement("p");
    p.textContent = "Data buku tidak tersedia";
    unFinishedReading.appendChild(p);
  }

  if (finishedReading.childNodes.length === 0) {
    const p = document.createElement("p");
    p.style.textAlign = "center";
    p.textContent = "Data buku tidak tersedia";
    finishedReading.appendChild(p);
  }

  const book = JSON.parse(localStorage.getItem("rack")) || [];

  function displayBookDetails(book) {
    const author = document.querySelector(".author");
    const tahun = document.querySelector(".tahun");
    const status = document.querySelector(".status-badge");
    const title = document.querySelector(".title-detail");
    const imgDetail = document.querySelector(".img-detail");
    const statusButton = document.querySelector(".status-button");
    const deleteButton = document.querySelector(".accept-del");

    author.textContent = book.author;
    tahun.textContent = book.year;
    title.textContent = book.title;

    imgDetail.src = "./Assets/ImageDefault.jpg";

    if (book.isComplete === false) {
      status.textContent = "Belum selesai dibaca";
      status.classList.add("false-status");
    } else {
      status.textContent = "Selesai dibaca";
      status.classList.add("status-true");
    }

    if (book.isComplete === true) {
      statusButton.textContent = "Belum Selesai Baca";
      statusButton.classList.add("status-button-false");
    } else {
      statusButton.textContent = "Selesai Baca";
      statusButton.classList.add("status-button-true");
    }

    statusButton.addEventListener("click", () => {
      const bookData = JSON.parse(localStorage.getItem("rack")) || [];
      const bookIndex = bookData.findIndex((item) => item.id === book.id);

      if (bookIndex !== -1) {
        bookData[bookIndex].isComplete = !bookData[bookIndex].isComplete;
        localStorage.setItem("rack", JSON.stringify(bookData));
        location.reload();
      }
    });

    deleteButton.addEventListener("click", () => {
      const bookData = JSON.parse(localStorage.getItem("rack")) || [];
      const bookIndex = bookData.findIndex((item) => item.id === book.id);

      if (bookIndex !== -1) {
        bookData.splice(bookIndex, 1);
        localStorage.setItem("rack", JSON.stringify(bookData));
        location.reload();
      }
    });

    document.getElementById("modalDetail").style.display = "block";
  }

  function createBookCard(task) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");

    div.classList.add("card");

    img.src = "./Assets/ImageDefault.jpg";
    h2.textContent = task.title;

    div.appendChild(img);
    div.appendChild(h2);

    let targetElement;
    if (task.isComplete !== false) {
      targetElement = finishedReading;
    } else {
      targetElement = unFinishedReading;
    }

    const noDataParagraph = targetElement.querySelector("p");

    if (
      noDataParagraph &&
      noDataParagraph.textContent === "Data buku tidak tersedia"
    ) {
      targetElement.removeChild(noDataParagraph);
    }

    targetElement.appendChild(div);

    div.addEventListener("click", () => {
      displayBookDetails(task);
    });
  }

  book.map((task) => {
    createBookCard(task);
  });

  addBook.addEventListener("click", () => {
    if (input[0].value) {
      book.push({
        id: randomId,
        title: input[0].value,
        author: input[1].value,
        year: parseInt(input[2].value),
        isComplete: false,
      });

      localStorage.setItem("rack", JSON.stringify(book));

      location.reload();
    } else {
      alert("Data buku tidak boleh kosong");
    }
  });

  openTab("tab2", "tab-button2");
});

function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function openModalDelete() {
  document.getElementById("modal-delete").style.display = "flex";
}

function closeModalDelete() {
  document.getElementById("modal-delete").style.display = "none";
}

window.onclick = function (event) {
  const detail = document.getElementById("modalDetail");
  const modal = document.getElementById("myModal");
  const dialog = document.getElementById("modal-delete");
  if (event.target === modal) {
    modal.style.display = "none";
  } else if (event.target === detail) {
    detail.style.display = "none";
  } else if (event.target === dialog) {
    dialog.style.display = "none";
  }
};

function openTab(tabName, tabButton) {
  const buttonTab1 = document.getElementById("tab-button1");
  const buttonTab2 = document.getElementById("tab-button2");
  if (buttonTab1.id === tabButton) {
    buttonTab1.classList.add("active");
    buttonTab2.classList.remove("active");
  } else {
    buttonTab1.classList.remove("active");
    buttonTab2.classList.add("active");
  }

  const tabContents = document.getElementsByClassName("tab-content");
  for (const content of tabContents) {
    content.style.display = "none";
  }

  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.style.display = "flex";
  }
}
