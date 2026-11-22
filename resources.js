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

const qrDialog = document.querySelector("#qr-dialog");
const qrTitle = document.querySelector("#qr-title");
const qrHelp = document.querySelector("#qr-help");
const qrRoute = document.querySelector("#qr-route");
const qrRouteRow = document.querySelector("#qr-route-row");
const qrLine = document.querySelector("#qr-line");
const qrImage = document.querySelector("#qr-image");
const qrTarget = document.querySelector("#qr-target");
const subscriptionQr = document.querySelector("#subscription-qr");

function renderQr(url, lineLabel) {
  const code = qrcode(0, "M");
  code.addData(url);
  code.make();
  qrImage.src = code.createDataURL(4, 16);
  qrImage.alt = qrTitle.textContent + "，" + lineLabel;
  qrLine.textContent = lineLabel;
}

function renderDownloadQr() {
  renderQr(qrRoute.value, qrRoute.selectedOptions[0].textContent);
  qrTarget.href = qrRoute.value;
}

if (typeof qrcode === "function" && typeof qrDialog.showModal === "function") {
  subscriptionQr.hidden = false;
  subscriptionQr.addEventListener("click", () => {
    qrTitle.textContent = "音源订阅二维码";
    qrHelp.textContent = "打开洛雪安卓版的「快速添加自定义源 → 扫一扫」，识别后选择「添加订阅清单」。";
    qrRouteRow.hidden = true;
    qrTarget.hidden = true;
    qrTarget.removeAttribute("href");
    renderQr(sourceRoute.value, sourceRoute.selectedOptions[0].textContent);
    qrDialog.showModal();
  });

  qrRoute.addEventListener("change", renderDownloadQr);
  for (const group of document.querySelectorAll("[data-android-download]")) {
    const links = [...group.querySelectorAll("a[href]")];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button secondary qr-download";
    button.textContent = "手机扫码下载";
    button.setAttribute("aria-label", "手机扫码下载 " + group.dataset.androidDownload);
    button.addEventListener("click", () => {
      qrTitle.textContent = group.dataset.androidDownload + " 安装包二维码";
      qrHelp.textContent = "用手机相机或浏览器扫码，打开所选线路的 APK 下载链接。";
      qrRouteRow.hidden = false;
      qrTarget.hidden = false;
      qrRoute.replaceChildren(...links.map(link => new Option(link.textContent, link.href)));
      renderDownloadQr();
      qrDialog.showModal();
    });
    links.at(-1).parentElement.append(button);
  }
}
