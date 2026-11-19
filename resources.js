const github = "https://github.com";
const desktop = github + "/shellsec/lx-music-desktop-auto-source";
const mobile = github + "/shellsec/lx-music-mobile-auto-source";
const server = github + "/shellsec/boleserver";
const tv = github + "/bmizhou/lx-music-tv";
const eink = github + "/shellsec/lx-music-eink";
const lxpy = github + "/shellsec/lxpy";
const platforms = ["全部设备", "电脑", "安卓", "电视", "墨水屏", "游戏机", "苹果与鸿蒙"];

const resources = [
  {
    name: "洛雪桌面增强版", icon: "▣", color: "lilac", platforms: ["电脑"], meta: "Windows / macOS · 2.12.6",
    intro: "桌面听歌，支持订阅清单和播放失败自动切换。",
    detail: "Windows 可选安装包或绿色版。安装历史版本前可先查看仓库的发行说明。",
    repo: desktop,
    links: [["GitHub 发行页", desktop + "/releases"]]
  },
  {
    name: "洛雪安卓增强版", icon: "▯", color: "peach", platforms: ["安卓"], meta: "Android · 1.9.2",
    intro: "支持扫码、从图片识别或粘贴地址来添加音源。",
    detail: "在设置中打开「快速添加自定义源」，选择导入单个源或添加订阅清单。二维码应包含完整 HTTP 或 HTTPS 地址。",
    repo: mobile,
    links: [["GitHub 发行页", mobile + "/releases"]]
  },
  {
    name: "波乐音乐", icon: "♫", color: "pink", platforms: ["游戏机", "电脑", "安卓", "电视"], meta: "游戏机 / 桌面 / Android · 1.1.0",
    intro: "覆盖 Switch、PS4、PS5、Vita、Xbox 和 Linux 掌机。",
    detail: "也包含 Windows、macOS、Linux、Android 和 Android TV。各平台安装方式及包体以项目说明为准。",
    repo: github + "/shellsec/bolemusic"
  },
  {
    name: "LX Music TV", icon: "▤", color: "mint", platforms: ["电视"], meta: "Android TV · 小米电视 / 极米投影",
    intro: "适合遥控器操作，支持大屏歌词和手机扫码填源。",
    detail: "电视和平板架构不确定时选 universal。通过 U 盘或传文件安装后，打开设置扫码导入 JS 音源。",
    repo: tv,
    links: [["GitHub 发行页", tv + "/releases"]]
  },
  {
    name: "洛雪墨水屏增强版", icon: "▧", color: "lilac", platforms: ["墨水屏", "安卓"], meta: "Android · 墨水屏设备",
    intro: "针对墨水屏优化，支持自定义源和订阅更新。",
    detail: "按设备架构选择 APK。口袋阅一代选 armeabi-v7a，64 位设备可选 arm64-v8a。",
    repo: eink,
    links: [["GitHub 发行页", eink + "/releases"]]
  },
  {
    name: "LXPy 手机遥控", icon: "⌁", color: "peach", platforms: ["电脑"], meta: "洛雪桌面端 · 局域网",
    intro: "手机和电脑连同一个 Wi-Fi，在手机网页遥控桌面播放。",
    detail: "在洛雪桌面端的「设置 → 开放 API」启用开放 API 服务，再按 LXPy 说明运行启动脚本。",
    repo: lxpy
  },
  {
    name: "BoleServer 网页播放", icon: "◎", color: "mint", platforms: ["苹果与鸿蒙", "电脑"], meta: "iOS / iPadOS / HarmonyOS NEXT",
    intro: "在电脑或 NAS 自建服务，再用设备浏览器打开播放器。",
    detail: "搭建服务并在管理界面设置密码与音源。播放设备与服务在同一局域网时，可直接打开服务地址。",
    repo: server,
    links: [
      ["GitHub 发行页", server + "/releases/latest"],
      ["查看搭建方式", "#server"]
    ]
  },
  {
    name: "鸿蒙社区客户端", icon: "◇", color: "pink", platforms: ["苹果与鸿蒙"], meta: "HarmonyOS NEXT",
    intro: "社区维护的鸿蒙原生客户端。",
    detail: "源码与 DevEco Studio 构建步骤见项目仓库。",
    repo: github + "/Adamaik/lxmusic-harmony"
  }
];

const filterBar = document.querySelector("#filters");
const resourceGrid = document.querySelector("#resources");
const filterStatus = document.querySelector("#filter-status");

function element(tag, className, content) {
  const node = document.createElement(tag);
  node.className = className;
  if (content) node.textContent = content;
  return node;
}

function resourceCard(resource) {
  const card = element("article", "card");
  const head = element("div", "card-head");
  const icon = element("span", "icon " + resource.color, resource.icon);
  icon.setAttribute("aria-hidden", "true");
  head.append(icon, element("span", "meta", resource.meta));
  const details = element("details", "card-details");
  const links = element("div", "links");
  for (const [label, address] of [...(resource.links || []), ["项目仓库", resource.repo]]) {
    const link = element("a", "", label);
    link.href = address;
    links.append(link);
  }
  details.append(element("summary", "", "安装与链接"), element("p", "", resource.detail), links);
  card.append(head, element("h3", "", resource.name), element("p", "", resource.intro), details);
  return card;
}

function showPlatform(platform) {
  const visible = platform === platforms[0] ? resources : resources.filter(resource => resource.platforms.includes(platform));
  for (const button of filterBar.children) button.setAttribute("aria-pressed", String(button.textContent === platform));
  resourceGrid.replaceChildren(...visible.map(resourceCard));
  filterStatus.textContent = platform + "，共 " + visible.length + " 个入口";
}

for (const platform of platforms) {
  const button = element("button", "filter", platform);
  button.type = "button";
  button.addEventListener("click", () => showPlatform(platform));
  filterBar.append(button);
}
showPlatform(platforms[0]);
