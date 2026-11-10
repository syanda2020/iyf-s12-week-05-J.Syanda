const check = (label, ok) => console.log(`${ok ? "✓" : "✗"} ${label}`);

const h1 = document.querySelector("h1");
const contents = document.querySelectorAll(".content");
const contactForm = document.getElementById("contact-form");
const emailInput = document.querySelector("#contact-form input[type='email']");
const navItems = document.querySelectorAll("nav li");
const firstNavLink = document.querySelector(".nav-link");
const lastParagraph = document.querySelector("article p:last-of-type");
const submitButton = document.querySelector("#contact-form button[type='submit']");
const mainH2s = document.querySelectorAll("main h2");
const footer = document.querySelector("footer");

console.log(h1);
console.log(contents);
console.log(contactForm);
console.log(emailInput);
console.log(navItems);
console.log(firstNavLink);
console.log(lastParagraph);
console.log(submitButton);
console.log(mainH2s);
console.log(footer);

console.log(document.querySelector(".does-not-exist"));

const navTexts = [...navItems].map(li => li.textContent.trim());
console.log(navTexts);

check("h1 found", h1 !== null);
check("form found", contactForm !== null);
check("email input found", emailInput !== null);

const header = document.querySelector("header");
const article = document.querySelector("article");
const navList = document.querySelector(".nav-list");

const navInHeader = header.querySelector("nav");
console.log(navInHeader);

const firstLinkParent = firstNavLink.parentElement;
console.log(firstLinkParent);

const articleNext = article.nextElementSibling;
console.log(articleNext);

const listItems = navList.querySelectorAll(":scope > li");
console.log(listItems);

const footerParent = footer.parentElement;
console.log(footerParent);

const linkHeader = firstNavLink.closest("header");
console.log(linkHeader);

check("nav is inside header", navInHeader !== null);
check("article's next sibling is a section", articleNext.tagName === "SECTION");
check("footer's parent is body", footerParent === document.body);
check("closest() reached the header", linkHeader === header);

h1.textContent = "Syanda's DOM Practice";

firstNavLink.href = "https://developer.mozilla.org";
firstNavLink.target = "_blank";
firstNavLink.rel = "noopener";

console.log(article.dataset.id, article.dataset.category);
article.dataset.status = "reviewed";
check("data-status set", article.dataset.status === "reviewed");

contents[0].classList.add("highlight");
contents[1].classList.toggle("accent");

const userInput = `<img src="x" onerror="alert('hacked!')">`;
document.getElementById("unsafe").innerHTML = userInput;
document.getElementById("safe").textContent = userInput;
// I would use textContent for a user's comment because it shows text as plain text, while innerHTML treats input as live code. This can end up allowing malware to run too.

function addNavItem(text, href) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.className = "nav-link";
  a.href = href;
  a.textContent = text;
  li.append(a);
  navList.append(li);
}

addNavItem("Blog", "#blog");
addNavItem("Portfolio", "#portfolio");

const newParagraph = document.createElement("p");
newParagraph.textContent = "This paragraph was created with JavaScript.";
article.querySelector("p").before(newParagraph);

const clonedItem = navList.firstElementChild.cloneNode(true);
clonedItem.querySelector("a").textContent = "Cloned";
navList.prepend(clonedItem);

footer.remove();
check("footer removed", document.querySelector("footer") === null);