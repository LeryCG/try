// Interacción de ejemplo
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {});
});
console.log("Glassmorphism + Parallax activo ✨");
// Feedback táctil extra al click
document.querySelectorAll(".interactive, button").forEach((el) => {
  el.addEventListener("mousedown", () => {
    el.style.transform += " scale(0.97)";
  });

  el.addEventListener("mouseup", () => {
    el.style.transform = "";
  });
});
// Feedback táctil extra al click
document.querySelectorAll(".interactive, button").forEach((el) => {
  el.addEventListener("mousedown", () => {
    el.style.transform += " scale(0.97)";
  });

  el.addEventListener("mouseup", () => {
    el.style.transform = "";
  });
});

const toggle = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggle.checked = true;
}

// Toggle theme
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");

  // Save preference
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});
/* ===== BUTTON INTERACTIONS ===== */
document.querySelectorAll("button").forEach((btn) => {
  // Mouse position for glow
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty("--x", `${e.clientX - rect.left}px`);
    btn.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });

  // Click actions
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;

    switch (action) {
      case "scroll-about":
        document
          .querySelector("#about")
          ?.scrollIntoView({ behavior: "smooth" });
        break;

      case "scroll-projects":
        document
          .querySelector("#projects")
          ?.scrollIntoView({ behavior: "smooth" });
        break;

      case "contact":
        document
          .querySelector("#support")
          ?.scrollIntoView({ behavior: "smooth" });
        break;
    }
  });
});
// Staggered container reveals (e.g., skill grids, project cards)
document.querySelectorAll("[data-reveal-stagger]").forEach((el) => {
  staggerObserver.observe(el);
});
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("open");
  });
});
// =========================
// TOGGLE DARK MODE
// =========================
consttoggle = document.getElementById("theme-toggle");

// Cargar tema guardado en localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggle.checked = true;
}

// Cambiar tema al hacer click
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

  // compute modal size based on largest project content
  computeModalSize();
  window.addEventListener("resize", computeModalSize);

  // Attach click handlers directly to project cards as a robust fallback
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      // ignore clicks on interactive elements inside the card
      if (e.target.closest("a, button, input, textarea, select")) return;

      // try to find a hidden .card-back inside this card
      const contentEl = card.querySelector(".card-back") || null;
      if (contentEl) {
        e.preventDefault();
        console.log("Opening modal from card click (direct):", card);
        openProjectModal(contentEl, card);
        return;
      }

      // fallback: try to resolve by data-project-id on the card
      const id =
        card.getAttribute("data-project-id") ||
        card.querySelector(".see-more")?.getAttribute("data-project-id");
      if (id) {
        const el = document.getElementById(`project-${id}`);
        if (el) {
          e.preventDefault();
          console.log("Opening modal from card click (fallback id):", id);
          openProjectModal(el, card);
        }
      }
    });
  });

// Extra fallback: direct card click handler that searches for a .card-back inside the card
// This helps when DOM structure is customized or data attributes are missing.
document.addEventListener("click", (e) => {
  const card = e.target.closest && e.target.closest(".project-card");
  if (!card) return;
  if (e.target.closest("a, button, input, textarea, select")) return;

  // If an existing handler already opened the modal, don't double-handle
  const modalOpen =
    document.getElementById("project-modal")?.getAttribute("aria-hidden") ===
    "false";
  if (modalOpen) return;

  // Look for a .card-back element inside the card (hidden source)
  const embeddedBack = card.querySelector(".card-back");
  if (embeddedBack) {
    e.preventDefault();
    console.debug("Opening modal from embedded .card-back inside card");
    openProjectModal(embeddedBack, card);
    return;
  }

  // Fallback: try to find a project id on card or inside and open matching #project-id
  const id =
    card.getAttribute("data-project-id") ||
    card.querySelector(".see-more")?.getAttribute("data-project-id");
  if (id) {
    const contentEl = document.getElementById(`project-${id}`);
    if (contentEl) {
      e.preventDefault();
      console.debug("Opening modal from fallback id:", id);
      openProjectModal(contentEl, card);
    }
  }
});

function computeModalSize() {
  const panel = document.querySelector(".project-modal-panel");
  if (!panel) return;

  // find all .card-back-inner elements and measure their natural sizes
  const backs = Array.from(
    document.querySelectorAll(".card-back .card-back-inner")
  );
  let maxW = 0;
  let maxH = 0;
  backs.forEach((b) => {
    // clone to measure off-DOM if necessary
    const clone = b.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "-9999px";
    clone.style.visibility = "hidden";
    document.body.appendChild(clone);
    const rect = clone.getBoundingClientRect();
    maxW = Math.max(maxW, rect.width);
    maxH = Math.max(maxH, rect.height);
    clone.remove();
  });

  // apply min dimensions (with some padding)
  const maxPanelW = Math.min(820, Math.floor(window.innerWidth * 0.92));
  if (maxW > 0) panel.style.minWidth = Math.min(maxW + 64, maxPanelW) + "px";
  if (maxH > 0)
    panel.style.minHeight = Math.min(maxH + 64, window.innerHeight - 80) + "px";
}
/* ------------------------------------------------------------------
   Project modal interaction
   - Opens modal centered with content cloned from hidden .card-back
   - Accessible: sets aria-hidden, focuses panel, restores focus on close
   - Close via: backdrop click, close button, ESC key
   ------------------------------------------------------------------ */
const projectModal = document.getElementById("project-modal");
const modalContent = projectModal?.querySelector(".project-modal-content");
let lastFocusedTrigger = null;
let galleryState = {
  images: [],
  index: 0,
};
let projectList = [];
let currentProjectIndex = -1;

function openProjectModal(contentEl, trigger) {
  // Debugging: log presence of key DOM refs and incoming trigger
  console.debug("openProjectModal invoked", {
    projectModal: !!projectModal,
    modalContent: !!modalContent,
    trigger,
  });
  if (!projectModal || !modalContent) {
    console.error(
      "openProjectModal: missing projectModal or modalContent; aborting open."
    );
    return;
  }
  // remember where focus came from
  lastFocusedTrigger = trigger || document.activeElement;

  // clone the node so we can show it in modal
  modalContent.innerHTML = "";
  const clone = contentEl.cloneNode(true);
  clone.removeAttribute("hidden");
  // If there's a .card-back-inner, append its children directly so the
  // .project-modal-content grid can lay out gallery and meta as direct children
  const inner = clone.querySelector(".card-back-inner");
  if (inner) {
    Array.from(inner.children).forEach((child) => {
      modalContent.appendChild(child.cloneNode(true));
    });
  } else {
    modalContent.appendChild(clone);
  }

  projectModal.setAttribute("aria-hidden", "false");

  // prevent background scroll and hide main from assistive tech
  document.body.classList.add("modal-open");
  const mainEl = document.querySelector("main");
  if (mainEl) mainEl.setAttribute("aria-hidden", "true");

  // set focus to modal content for accessibility
  const focusTarget = modalContent.querySelector("[tabindex]") || modalContent;
  focusTarget.focus();

  // initialize gallery if present
  const gallery = modalContent.querySelector("[data-gallery]");
  if (gallery) {
    initModalGallery(gallery);
  }

  // Resolve currentProjectIndex: prefer data-project-id on trigger, fallback to contentEl id
  let resolvedId = null;
  if (trigger && trigger.getAttribute)
    resolvedId = trigger.getAttribute("data-project-id");
  if (!resolvedId && contentEl && contentEl.id) {
    resolvedId = contentEl.id.replace(/^project-/, "");
  }
  if (resolvedId) {
    currentProjectIndex = projectList.indexOf(resolvedId);
  }
  console.debug(
    "openProjectModal resolved currentProjectIndex=",
    currentProjectIndex,
    "resolvedId=",
    resolvedId
  );

  // listen for ESC key
  document.addEventListener("keydown", handleModalKeydown);
}

function closeProjectModal() {
  if (!projectModal || !modalContent) return;
  projectModal.setAttribute("aria-hidden", "true");
  modalContent.innerHTML = "";
  document.removeEventListener("keydown", handleModalKeydown);
  // restore background scroll and aria-hidden
  document.body.classList.remove("modal-open");
  const mainEl = document.querySelector("main");
  if (mainEl) mainEl.removeAttribute("aria-hidden");
  // restore focus
  if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === "function") {
    lastFocusedTrigger.focus();
  }

  // cleanup gallery state and controls
  galleryState.images = [];
  galleryState.index = 0;
}

function handleModalKeydown(e) {
  if (e.key === "Escape") {
    closeProjectModal();
  } else if (e.key === "ArrowRight") {
    modalNextImage();
  } else if (e.key === "ArrowLeft") {
    modalPrevImage();
  }
}

// Navigate projects in modal
function openProjectByIndex(idx, trigger) {
  if (!projectList.length) return;
  idx = (idx + projectList.length) % projectList.length;
  const id = projectList[idx];
  console.debug("openProjectByIndex called with idx=", idx, "resolved id=", id);
  const contentEl = document.getElementById(`project-${id}`);
  if (!contentEl) return;
  // find the triggering element (if any) in the grid to restore focus later
  const triggerEl = document.querySelector(
    `.see-more[data-project-id="${id}"]`
  );
  openProjectModal(contentEl, triggerEl || trigger);
}

// modal prev/next handlers
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-modal-prev]")) {
    console.debug(
      "modal prev clicked, currentProjectIndex=",
      currentProjectIndex
    );
    // open previous project
    openProjectByIndex(currentProjectIndex - 1);
  }
  if (e.target.matches("[data-modal-next]")) {
    console.debug(
      "modal next clicked, currentProjectIndex=",
      currentProjectIndex
    );
    openProjectByIndex(currentProjectIndex + 1);
  }
});

// Open modal when clicking on a project card (ignore internal links/buttons)
document.addEventListener("click", (e) => {
  const card = e.target.closest && e.target.closest(".project-card");
  if (!card) return;

  // ignore clicks on interactive elements inside the card
  if (e.target.closest("a, button, input, textarea, select")) return;

  // attempt to find a project id on the card; fallback to nearest .see-more data if present
  let id = card.getAttribute("data-project-id");
  if (!id) {
    const btn = card.querySelector(".see-more[data-project-id]");
    if (btn) id = btn.getAttribute("data-project-id");
  }
  if (!id) return;

  const contentEl = document.getElementById(`project-${id}`);
  if (!contentEl) return;

  openProjectModal(contentEl, card);
});

// Close handlers (backdrop and close button)
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-modal-close]")) {
    closeProjectModal();
  }
});

/* -------------------------
   Modal gallery functions
   ------------------------- */
function initModalGallery(galleryEl) {
  // all images inside source gallery (the cloned gallery is already inside modal)
  const imgs = Array.from(galleryEl.querySelectorAll("img"));
  galleryState.images = imgs;
  galleryState.index = 0;

  // wrap images in container and show only the active one
  imgs.forEach((img, i) => {
    img.dataset.galleryIndex = i;
    img.classList.add("gallery-image");
    // ensure all images are visible in the modal grid
    img.style.display = "block";
  });
}

function showImage(i) {
  const imgs = galleryState.images;
  if (!imgs || imgs.length === 0) return;
  i = (i + imgs.length) % imgs.length;
  imgs.forEach((img, idx) => {
    if (idx === i) img.classList.add("gallery-active");
    else img.classList.remove("gallery-active");
  });
  galleryState.index = i;
}

function modalNextImage() {
  showImage(galleryState.index + 1);
}

function modalPrevImage() {
  showImage(galleryState.index - 1);
}

// Prevent focus from escaping (simple trap): focus the panel when tabbing past
projectModal?.addEventListener("keydown", (e) => {
  if (e.key !== "Tab") return;
  const focusable = projectModal.querySelectorAll(
    "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])"
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!first) return;

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});


