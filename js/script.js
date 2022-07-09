const textArea = document.querySelector("#content");
const counter = document.querySelector("span");
const placeholderText = "Click to print...";
const placeholder = document.getElementById("result");
const timeDelay = 500;
//-----

printText = (placeholderText, placeholder, timeDelay) => {
  if (placeholderText.length > 0) {
    placeholder.innerHTML += placeholderText[0];
    setTimeout(() => {
      printText(placeholderText.slice(1), placeholder, timeDelay);
    }, timeDelay);
  } else {
    return (placeholder.innerHTML = "");
  }
};

setTimeout(() => {
  printText(placeholderText, placeholder, timeDelay);
}, 500);
setInterval(() => {
  printText(placeholderText, placeholder, timeDelay);
}, 12500);
textArea.addEventListener(
  "focus",
  () => (placeholder.style.visibility = "hidden")
);
textArea.addEventListener(
  "focusout",
  () => (placeholder.style.visibility = "visible")
);
textArea.addEventListener("input", () => {
  counter.innerHTML = textArea.value.length;
});

//-----------------------------------------------------

const btns = document.querySelectorAll(".toggle-tabs__li");
const stories = document.querySelectorAll(".toggle-tabs__story");
const btn = document.querySelector("li");
//-----

btns.forEach((e) => {
  e.addEventListener("mousedown", (e) => {
    if (!e.target.matches(".selected")) {
      [...btns].map((e) => e.classList.remove("selected"));
      e.target.classList.add("selected");
    }
  });
});

btns.forEach((e) => {
  e.addEventListener("click", () => {
    const iBtns = [...btns].indexOf(e);
    [...stories].filter((e) => {
      if (!e.matches(".active-story")) {
        [...stories].map((el) => el.classList.remove("active-story"));
        stories[iBtns].classList.add("active-story");
      }
    });
  });
});

//-----------------------------------------------------

const input = document.querySelector(".todo-list__input");
const addTodo = document.querySelector(".todo-list__btn");
const text = document.querySelector(".item__text");
let aaa = document.createTextNode(input.value);
const del = document.getElementsByClassName("item__del");
const random = document.querySelector(".todo-list__btn-p");
const randomDiv = document.querySelector(".todo-list__random");
const items = document.querySelector(".todo-list__items");
const checkbox = document.querySelector(".checkbox");
const item = document.getElementsByClassName("item");
//-----

random.addEventListener("click", (e) => {
  let randomNum = Math.floor(Math.random() * item.length);
  console.log(item.length);

  if (e.target == random) {
    if (item.length) randomDiv.append(item[randomNum]);
  }
});

addTodos = () => {
  let div = document.createElement("div");
  div.className = "todo-list__item item";
  div.innerHTML = `<div class="item__text">${input.value}</div><div class="item__add"><input class="checkbox" type="checkbox" /></div><div class="item__del button"><div class='item__del-1'></div></div></div>`;
  if (!input.value == "")
    document.querySelector(".todo-list__items").appendChild(div);
  else {
    setTimeout(() => {
      input.style.background = "rgba(255, 0, 0, 0.3)";
    }, 100);
    setTimeout(() => {
      input.style.background = "rgb(100, 100, 100, 0.5)";
    }, 500);
  }

  [...del].forEach((el) => {
    el.addEventListener("click", () => {
      el.parentElement.remove();
    });
  });

  input.value = "";
};

addTodo.addEventListener("click", addTodos);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodos();
});

addTodo.addEventListener("mousedown", () => {
  addTodo.classList.add("mouse__down");
});
addTodo.addEventListener("mouseup", () => {
  addTodo.classList.remove("mouse__down");
});

items.addEventListener("click", (e) => {
  if (e.target.tagName == "INPUT") {
    e.target.parentElement.parentElement.classList.toggle("done");
  }
});

//-----------------------------------------------------

const bookBtns = document.querySelectorAll(".some-document__li-btns");
const bookStories = document.querySelectorAll(".some-document__document-item");
//-----

bookBtns.forEach((e) => {
  e.addEventListener("click", (el) => {
    [...bookBtns].map((elem) => elem.classList.remove("bookBtns"));
    el.target.classList.add("bookBtns");
    let iBookBtns = [...bookBtns].indexOf(e);
    [...bookStories].filter((st) => {
      if (!st.matches(".active-story")) {
        [...bookStories].map((story) => story.classList.remove("active-story"));
        [...bookStories][iBookBtns].classList.add("active-story");
      }
    });
  });
});

//-----------------------------------------------------

const grid = document.querySelector("#grid");
const inputApi = document.querySelector("#input");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const currentPage = document.querySelector("#current-page");
let num = 1;
//-----

inputApi.addEventListener("keydown", (e) => {
  if (e.key === "Enter") apiRequest();
});
document.querySelector("#search").addEventListener("click", () => apiRequest());
apiRequest = () => {
  currentPage.innerHTML = `${num}`;
  grid.textContent = "";
  let url = `https://api.unsplash.com/search/photos?query=${inputApi.value}&page=${num}&per_page=6&client_id=Z1EN8qZkVpWQSq-QR75bdXqSYUNfYbudTuxF3r5jTDo`;
  console.log(url);

  fetch(url)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      loadImages(data);
    })
    .catch((err) => console.log(err));
};

loadImages = (data) => {
  for (let i = 0; i < data.results.length; i++) {
    // console.log(data.total_pages);
    let image = document.createElement("div");
    image.className = "img";
    image.style.backgroundImage = `url(${data.results[i].urls.raw}&w=1366&h=768)`;
    image.addEventListener("dblclick", () => {
      window.open(data.results[i].links.download, "_blank");
    });
    grid.appendChild(image);
    // let dataPages = data.total_pages;
    // console.log(dataPages);

    prev.addEventListener("click", () => {
      if (document.querySelectorAll(".img").length > 0) {
        num == 1 ? (num = data.total_pages) : --num;
        apiRequest();
      }
    });
    next.addEventListener("click", () => {
      if (document.querySelectorAll(".img").length > 0) {
        num < data.total_pages ? ++num : (num = 1);
        apiRequest();
      }
    });
  }
};

//-----------------------------------------------------

const btnBar = document.querySelector(".progress-bar__bar-btn");
const wiPr = document.querySelector("#widthpr");
const proggressBar = document.querySelector(".progress-bar__progress");
//-----

addMouse = () => {
  btnBar.classList.add("mouse__down");
};
removeMouse = () => {
  btnBar.classList.remove("mouse__down");
};
btnBar.addEventListener("mousedown", addMouse);
btnBar.addEventListener("mouseup", removeMouse);

btnBar.addEventListener("click", () => {
  let width = 0;

  let frame = () => {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      proggressBar.style.width = width + "%";
      wiPr.innerHTML = width + "%";
    }
  };
  let id = setInterval(frame, 20);
});

//-----------------------------------------------------
const password = document.querySelector(".sign-in__input-password");
const show = document.querySelector(".show");
const hide = document.querySelector(".hide");
const eye = document.querySelectorAll(".sign-in__eye");
//-----

eye.forEach((e) => {
  e.addEventListener("mousedown", () => {
    password.type = "text";
    hide.style.display = "block";
    show.style.display = "none";
  });
});

eye.forEach((e) => {
  e.addEventListener("mouseup", () => {
    password.type = "password";
    show.style.display = "block";
    hide.style.display = "none";
  });
});

const Email = document.getElementById("email");
const Password = document.querySelector("#password");
const submitBtn = document.querySelector(".sign-in__submit");
let i = 1;
//-----

document.addEventListener("DOMContentLoaded", () => {
  if (Email) {
    Email.value = localStorage.getItem("userEmail") || "";
  }
  if (Password) {
    Password.value = localStorage.getItem("userPassword") || "";
  }
  Password.addEventListener("input", () => {
    localStorage.setItem(`userPassword`, Password.value);
  });
  Email.addEventListener("input", () => {
    localStorage.setItem(`userEmail`, Email.value);
  });
  submitBtn.addEventListener("click", () => {
    Email.value = "";
    Password.value = "";
    localStorage.clear();
  });
});

//-----------------------------------------------------

let monsters = [
  "/img/monsters/socks.svg",
  "/img/monsters/monster01.svg",
  "/img/monsters/monster02.svg",
  "/img/monsters/monster03.svg",
  "/img/monsters/monster04.svg",
  "/img/monsters/monster05.svg",
  "/img/monsters/monster06.svg",
  "/img/monsters/monster07.svg",
];
const monsterBody = document.querySelector(".monsters__body");
const room = document.querySelectorAll(".monsters__room");
const door = document.querySelectorAll(".monsters__door");
const imgElem = document.querySelectorAll(".monsters__img-elem");
const elem = document.querySelectorAll(".monsters__elem");
//-----

room.forEach((e) => {
  e.addEventListener("mousedown", () => {
    e.classList.add("mouse__down");
  });
});
room.forEach((e) => {
  e.addEventListener("mouseup", () => {
    e.classList.remove("mouse__down");
  });
});

for (let i = 0; i < monsters.length; i++) {
  door[i].addEventListener("click", () => {
    const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
    let indexMonsters = monsters.indexOf(randomMonster);
    if (indexMonsters !== -1) monsters.splice(indexMonsters, 1);
    door[i].style.display = "none";
    elem[i].style.display = "block";
    imgElem[i].setAttribute("src", randomMonster);
    gameOver = () => {
      monsterBody.style.display = "none";
      const gameOverBtn = document.querySelector(".monsters__game-over-btn");
      gameOverBtn.style.display = "flex";
      monsterBody.classList.add("monsters__game-over");

      gameOverBtn.addEventListener("mousedown", () => {
        gameOverBtn.classList.add("mouse__down");
      });
      gameOverBtn.addEventListener("mouseup", () => {
        gameOverBtn.classList.remove("mouse__down");
      });
      gameOverBtn.addEventListener("click", () => {
        monsterBody.style.display = "grid";
        gameOverBtn.style.display = "none";
        monsters = [
          "/img/monsters/socks.svg",
          "/img/monsters/monster01.svg",
          "/img/monsters/monster02.svg",
          "/img/monsters/monster03.svg",
          "/img/monsters/monster04.svg",
          "/img/monsters/monster05.svg",
          "/img/monsters/monster06.svg",
          "/img/monsters/monster07.svg",
        ];

        [...door].map((e) => (e.style.display = "block"));
        [...elem].map((e) => (e.style.display = "none"));
      });
    };
    gameWon = () => {
      monsterBody.style.display = "none";
      const gameWonBtn = document.querySelector(".monsters__game-won-btn");
      gameWonBtn.style.display = "flex";
      monsterBody.classList.add("monsters__game-won");

      gameWonBtn.addEventListener("mousedown", () => {
        gameWonBtn.classList.add("mouse__down");
      });
      gameWonBtn.addEventListener("mouseup", () => {
        gameWonBtn.classList.remove("mouse__down");
      });
      gameWonBtn.addEventListener("click", () => {
        monsterBody.style.display = "grid";
        gameWonBtn.style.display = "none";
        monsters = [
          "/img/monsters/socks.svg",
          "/img/monsters/monster01.svg",
          "/img/monsters/monster02.svg",
          "/img/monsters/monster03.svg",
          "/img/monsters/monster04.svg",
          "/img/monsters/monster05.svg",
          "/img/monsters/monster06.svg",
          "/img/monsters/monster07.svg",
        ];

        [...door].map((e) => (e.style.display = "block"));
        [...elem].map((e) => (e.style.display = "none"));
      });
    };

    if (randomMonster === "/img/monsters/socks.svg") {
      imgElem[i].style.background = "rgba(254, 47, 0, 0.441)";
      setTimeout(gameOver, 200);
    } else {
      if (monsters.length !== 1)
        imgElem[i].style.background = "rgba(32, 255, 32, 0.241)";
      else gameWon();
    }
  });
}
