const github = "https://github.com";
const proxy = "https://gh-proxy.com/";
const desktop = github + "/shellsec/lx-music-desktop-auto-source";
const mobile = github + "/shellsec/lx-music-mobile-auto-source";
const server = github + "/shellsec/boleserver";
const tv = github + "/bmizhou/lx-music-tv";
const eink = github + "/shellsec/lx-music-eink";
const lxpy = github + "/shellsec/lxpy";
const tvVersion = "2.9.202610241701";
const einkVersion = "1.9.3-eink.1";
const platforms = ["全部设备", "电脑", "安卓", "电视", "墨水屏", "游戏机", "苹果与鸿蒙"];

const resources = [
  {
    name: "洛雪桌面增强版", icon: "▣", color: "lilac", platforms: ["电脑"], meta: "Windows / macOS · 2.12.6",
    intro: "桌面听歌，支持订阅清单和播放失败自动切换。",
    detail: "Windows 可选安装包或绿色版。加速下载由第三方提供，也可在 GitHub 发行页下载。",
    repo: desktop,
    links: [
      ["Windows 安装包（加速）", proxy + desktop + "/releases/download/v2.12.6/lx-music-desktop-v2.12.6-x64-Setup.exe"],
      ["Windows 绿色版（加速）", proxy + desktop + "/releases/download/v2.12.6/lx-music-desktop-v2.12.6-win_x64-green.7z"],
      ["macOS ARM64（加速）", proxy + desktop + "/releases/download/v2.12.6/lx-music-desktop-2.12.6-arm64.dmg"],
      ["GitHub 发行页", desktop + "/releases"]
    ]
  },
  {
    name: "洛雪安卓增强版", icon: "▯", color: "peach", platforms: ["安卓"], meta: "Android · 1.9.2",
    intro: "支持扫码、从图片识别或粘贴地址来添加音源。",
    detail: "在设置中打开「快速添加自定义源」，选择导入单个源或添加订阅清单。加速下载由第三方提供，也可在 GitHub 发行页下载。",
    repo: mobile,
    links: [
      ...["arm64-v8a", "armeabi-v7a", "universal"].map(arch =>
        [arch + "（加速）", proxy + mobile + "/releases/download/v1.9.2/lx-music-mobile-v1.9.2-" + arch + ".apk"]),
      ["GitHub 发行页", mobile + "/releases"]
    ]
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
    links: [
      ["下载 universal APK", tv + "/releases/download/" + tvVersion + "/LXTV-" + tvVersion + "-universal-release.apk"],
      ["下载 arm64-v8a APK", tv + "/releases/download/" + tvVersion + "/LXTV-" + tvVersion + "-arm64-v8a-release.apk"],
      ["GitHub 发行页", tv + "/releases"]
    ]
  },
  {
    name: "洛雪墨水屏增强版", icon: "▧", color: "lilac", platforms: ["墨水屏", "安卓"], meta: "Android · 墨水屏设备",
    intro: "针对墨水屏优化，支持自定义源和订阅更新。",
    detail: "按设备架构选择 APK。口袋阅一代选 armeabi-v7a，64 位设备可选 arm64-v8a。",
    repo: eink,
    links: [
      ...["arm64-v8a", "armeabi-v7a", "universal"].map(arch =>
        ["下载 " + arch + " APK", eink + "/releases/download/v" + einkVersion + "/lx-music-mobile-v" + einkVersion + "-" + arch + ".apk"]),
      ["GitHub 发行页", eink + "/releases"]
    ]
  },
  {
    name: "LXPy 手机遥控", icon: "⌁", color: "peach", platforms: ["电脑"], meta: "洛雪桌面端 · 局域网",
    intro: "手机和电脑连同一个 Wi-Fi，在手机网页遥控桌面播放。",
    detail: "在洛雪桌面端的「设置 → 开放 API」启用开放 API 服务，再按 LXPy 说明运行启动脚本。",
    repo: lxpy, links: [["下载源码 ZIP", lxpy + "/archive/HEAD.zip"]]
  },
  {
    name: "BoleServer 网页播放", icon: "◎", color: "mint", platforms: ["苹果与鸿蒙", "电脑"], meta: "iOS / iPadOS / HarmonyOS NEXT",
    intro: "在电脑或 NAS 自建服务，再用设备浏览器打开播放器。",
    detail: "搭建服务并在管理界面设置密码与音源。播放设备与服务在同一局域网时，可直接打开服务地址。",
    repo: server,
    links: [
      ["Windows x64 便携版", server + "/releases/download/v2.1.3-bole.1/BoleServer.2.1.3.x64.Portable.exe"],
      ["macOS ARM64 安装包", server + "/releases/download/v2.1.3-bole.1/BoleServer.2.1.3.arm64.dmg"],
      ["GitHub 发行页", server + "/releases/latest"],
      ["查看搭建方式", "#server"]
    ]
  },
  {
    name: "第三方苹果与鸿蒙客户端", icon: "◇", color: "pink", platforms: ["苹果与鸿蒙"], meta: "iOS / HarmonyOS NEXT",
    intro: "已有社区项目和讨论帖，安装条件随设备和发行渠道而异。",
    detail: "鸿蒙项目的 GitHub Releases 暂无安装包，可下载源码并参照仓库说明用 DevEco Studio 构建。iOS 社区版本的获取与签名条件见原帖。",
    repo: github + "/Adamaik/lxmusic-harmony",
    links: [
      ["下载鸿蒙源码 ZIP", github + "/Adamaik/lxmusic-harmony/archive/HEAD.zip"],
      ["iOS 社区原帖", "https://www.52pojie.cn/thread-2089652-1-7.html"]
    ]
  },
  {
    name: "汽水音乐", icon: "♪", color: "mint", platforms: ["电脑", "安卓", "苹果与鸿蒙"],
    meta: "Windows / macOS / Android / iOS",
    intro: "抖音出品的音乐客户端，可从官网选择适合设备的版本。",
    detail: "电脑端在官方下载页选择 Windows 或 macOS 版本，手机端可从官网进入 Android 或 iOS 下载入口。",
    activity: "在汽水音乐 App 内，可按活动页面提示观看广告或完成签到任务，领取免费听歌权益。具体任务和权益以 App 内显示为准。",
    links: [
      ["汽水音乐官网", "https://www.qishui.com/"],
      ["官方下载", "https://www.qishui.com/download"]
    ]
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
  const entries = [...(resource.links || [])];
  if (resource.repo) entries.push(["项目仓库", resource.repo]);
  for (const [label, address] of entries) {
    const link = element("a", "", label);
    link.href = address;
    links.append(link);
  }
  details.append(element("summary", "", "安装与链接"), element("p", "", resource.detail));
  if (resource.activity) {
    const activity = element("p", "");
    activity.append(element("strong", "", "免费听歌活动"), document.createElement("br"), resource.activity);
    details.append(activity);
  }
  details.append(links);
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
