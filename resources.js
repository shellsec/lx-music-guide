const platforms = ["全部设备","电脑","安卓","电视","墨水屏","游戏机","苹果与鸿蒙"];
const filterBar = document.querySelector("#filters");
const cards = [...document.querySelectorAll("#resources .card")];
const filterStatus = document.querySelector("#filter-status");

function showPlatform(platform) {
  for (const button of filterBar.children) {
    button.setAttribute("aria-pressed", String(button.textContent === platform));
  }
  for (const card of cards) {
    card.hidden = platform !== platforms[0] && !card.dataset.platforms.split(" ").includes(platform);
  }
  const count = cards.filter(card => !card.hidden).length;
  filterStatus.textContent = platform + "，共 " + count + " 个入口";
}

for (const platform of platforms) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "filter";
  button.textContent = platform;
  button.addEventListener("click", () => showPlatform(platform));
  filterBar.append(button);
}
showPlatform(platforms[0]);

const sourceRoute = document.querySelector("#source-route");
const sourceUrl = document.querySelector("#source-url");
const copyStatus = document.querySelector("#copy-status");

function updateSourceUrl() {
  sourceUrl.value = sourceRoute.value;
  copyStatus.textContent = "";
}

sourceRoute.addEventListener("change", updateSourceUrl);
updateSourceUrl();

document.querySelector("[data-copy]").addEventListener("click", async event => {
  const field = document.getElementById(event.currentTarget.dataset.copy);
  const status = document.querySelector("#copy-status");
  try {
    await navigator.clipboard.writeText(field.value);
    status.textContent = "已复制订阅地址";
  } catch {
    field.focus();
    field.select();
    status.textContent = document.execCommand("copy") ? "已复制订阅地址" : "地址已选中，请手动复制";
  }
});
