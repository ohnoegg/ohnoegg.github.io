// 프로젝트 주소는 이곳에서 관리합니다. 확인된 실제 주소를 입력하면 링크가 표시됩니다.
// 주소가 없으면 null을 유지합니다. 미등록 항목은 클릭할 수 없는 상태로 표시됩니다.
const PROJECT_LINKS = {
  modudoctor: {
    demo: null,
    repository: null,
  },
  "commerce-vision": {
    demo: null,
    repository: null,
  },
  kkotdongnae: {
    demo: null,
    repository: null,
  },
};

const LINK_LABELS = {
  demo: "서비스 방문",
  repository: "GitHub repository",
};

// 외부 웹 주소만 허용하고, 미등록·잘못된 주소는 기본 안내 문구를 유지합니다.
function getWebAddress(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const address = new URL(value);
    if (!["https:", "http:"].includes(address.protocol)) return null;
    if (address.username || address.password) return null;
    return address.href;
  } catch {
    return null;
  }
}

document.querySelectorAll("[data-project-links]").forEach((group) => {
  const project = PROJECT_LINKS[group.dataset.projectLinks];
  if (!project) return;

  group.querySelectorAll("[data-link]").forEach((placeholder) => {
    const type = placeholder.dataset.link;
    const address = getWebAddress(project[type]);
    if (!address) return;

    const link = document.createElement("a");
    link.className = "project-link";
    link.href = address;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const icon = placeholder.querySelector("svg");
    if (icon) link.append(icon.cloneNode(true));
    link.append(document.createTextNode(LINK_LABELS[type]));

    const description = document.createElement("span");
    description.className = "sr-only";
    const title = group.closest("article").querySelector("h1, h2, h3").textContent;
    description.textContent = ` (${title}, 새 탭)`;
    link.append(description);
    placeholder.replaceWith(link);
  });
});
