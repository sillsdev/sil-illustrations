// Simple JavaScript for navigation and page management
class SiteManager {
  constructor() {
    this.pages = new Map();
    this.currentPage = "";
    this.init();
    // Make toggleForm available globally
    window.toggleForm = this.toggleForm.bind(this);
    // Make toggleSection available globally
    window.toggleSection = this.toggleSection.bind(this);
  }

  init() {
    // Initialize navigation
    this.setupNavigation();

    // Load initial page
    const hash = window.location.hash.slice(1) || "home";
    this.loadPage(hash);

    // Handle hash changes
    window.addEventListener("hashchange", () => {
      const page = window.location.hash.slice(1) || "home";
      this.loadPage(page);
    });
  }

  setupNavigation() {
    const navLinks = document.querySelectorAll(".sil-nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.getAttribute("data-page");
        if (page) {
          window.location.hash = page;
        }
      });
    });

    // Setup footer navigation
    const footerLinks = document.querySelectorAll(".sil-footer a[data-page]");
    footerLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.getAttribute("data-page");
        if (page) {
          window.location.hash = page;
        }
      });
    });
  }

  loadPage(pageId) {
    // Remove active class from all nav links
    document.querySelectorAll(".sil-nav-link").forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to current page link
    const currentLink = document.querySelector(`[data-page="${pageId}"]`);
    if (currentLink) {
      currentLink.classList.add("active");
    }

    // Handle home page vs other pages display
    this.handlePageLayout(pageId);

    // Handle Maps & Diagrams page sidebar
    this.handleLearnNavigation(pageId);

    // Load page content
    this.displayPage(pageId);
    this.currentPage = pageId;
  }

  handlePageLayout(pageId) {
    const languageTechStrip = document.getElementById("language-tech-strip");
    const breadcrumbStrip = document.getElementById("breadcrumb-strip");
    const bannerSection = document.getElementById("banner-section");
    const currentPageTitle = document.getElementById("current-page-title");

    if (pageId === "home") {
      // Show home page elements
      languageTechStrip.style.display = "block";
      bannerSection.style.display = "block";
      breadcrumbStrip.style.display = "none";
    } else {
      // Show non-home page elements
      languageTechStrip.style.display = "none";
      bannerSection.style.display = "none";
      breadcrumbStrip.style.display = "block";

      // Update breadcrumb text
      const pageTitles = {
        illustrations: "ILLUSTRATIONS",
        "illustration-sets": "ILLUSTRATIONS > ILLUSTRATION SETS",
        "sample-illustrations": "ILLUSTRATIONS > SAMPLE ILLUSTRATIONS",
        "using-illustrations": "ILLUSTRATIONS > INSERTING BY KEYWORDS",
        "master-illustrations": "ILLUSTRATIONS > MASTER ILLUSTRATIONS",
        rules: "USAGE, PERMISSION & ATTRIBUTION RULES",
        maps: "MAPS & DIAGRAMS",
        "maps-intro": "MAPS & DIAGRAMS > INTRODUCTION",
        "map-labeler": "MAPS & DIAGRAMS > LABELER",
        "map-samples": "MAPS & DIAGRAMS > SAMPLES",
        "map-editions": "MAPS & DIAGRAMS > EDITIONS",
        "accessing-repo": "MAPS & DIAGRAMS > ACCESSING THE REPOSITORY",
        "map-varieties": "MAPS & DIAGRAMS > MAP VARIETIES",
        "map-creator-maps": "MAPS & DIAGRAMS > MAP CREATOR MAPS",
        "indesign-maps": "MAPS & DIAGRAMS > INDESIGN MAPS",
        "map-monkey": "MAPS & DIAGRAMS > MAP MONKEY",
        contact: "CONTACT",
      };

      currentPageTitle.textContent = pageTitles[pageId] || pageId.toUpperCase();
    }
  }

  handleLearnNavigation(pageId) {
    const mapsSidebar = document.getElementById("maps-nav");
    const illustrationsSidebar = document.getElementById("illustrations-nav");
    const contentWrapper = document.querySelector(".sil-content-wrapper");

    const mapsPages = [
      "maps-intro",
      "map-labeler",
      "map-samples",
      "map-editions",
      "accessing-repo",
      "map-varieties",
      "map-creator-maps",
      "indesign-maps",
      "map-monkey",
    ];

    const illustrationsPages = [
      "illustration-sets",
      "sample-illustrations",
      "using-illustrations",
      "master-illustrations",
    ];

    if (pageId === "maps" || mapsPages.includes(pageId)) {
      mapsSidebar.style.display = "block";
      illustrationsSidebar.style.display = "none";
      contentWrapper.classList.add("with-sidebar");
      this.setupLearnSidebar(pageId);
    } else if (pageId === "illustrations" || illustrationsPages.includes(pageId)) {
      mapsSidebar.style.display = "none";
      illustrationsSidebar.style.display = "block";
      contentWrapper.classList.add("with-sidebar");
      this.setupIllustrationsSidebar(pageId);
    } else {
      mapsSidebar.style.display = "none";
      illustrationsSidebar.style.display = "none";
      contentWrapper.classList.remove("with-sidebar");
    }
  }

  setupLearnSidebar(currentPageId) {
    const sidebar = document.getElementById("maps-nav");
    sidebar.innerHTML = `
            <div class="sil-sidebar-header">
                <h3><span style="font-size: 48px; text-align: center;">🗺️</span></h3>
            </div>
            <ul class="sil-sidebar-nav">
                <li><a href="#maps" data-page="maps" class="${currentPageId === "maps" ? "active" : ""}">Overview</a></li>
                <li><strong>Basics</strong></li>
                <li><a href="#maps-intro" data-page="maps-intro" class="${currentPageId === "maps-intro" ? "active" : ""}">Introduction</a></li>
                <li><a href="#map-labeler" data-page="map-labeler" class="${currentPageId === "map-labeler" ? "active" : ""}">Why You Need a Labeler</a></li>
                <li><a href="#map-samples" data-page="map-samples" class="${currentPageId === "map-samples" ? "active" : ""}">Samples</a></li>
                <li><a href="#map-editions" data-page="map-editions" class="${currentPageId === "map-editions" ? "active" : ""}">Editions</a></li>
                <li><a href="#accessing-repo" data-page="accessing-repo" class="${currentPageId === "accessing-repo" ? "active" : ""}">Accessing the Repository</a></li>
                <li><strong>How to Use the Maps</strong></li>
                <li><a href="#map-varieties" data-page="map-varieties" class="${currentPageId === "map-varieties" ? "active" : ""}">Map Varieties</a></li>
                <li><a href="#map-creator-maps" data-page="map-creator-maps" class="${currentPageId === "map-creator-maps" ? "active" : ""}">Map Creator Maps</a></li>
                <li><a href="#indesign-maps" data-page="indesign-maps" class="${currentPageId === "indesign-maps" ? "active" : ""}">InDesign Maps</a></li>
                <li><a href="#map-monkey" data-page="map-monkey" class="${currentPageId === "map-monkey" ? "active" : ""}">MapMonkey for InDesign</a></li>
            </ul>
        `;  // add class="nav-subsection" to <li> for subsections

    // Setup sidebar navigation
    const sidebarLinks = sidebar.querySelectorAll("a[data-page]");
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.getAttribute("data-page");
        if (page) {
          window.location.hash = page;
        }
      });
    });
  }

  setupIllustrationsSidebar(currentPageId) {
    const sidebar = document.getElementById("illustrations-nav");
    sidebar.innerHTML = `
            <div class="sil-sidebar-header">
                <h3><span style="font-size: 48px; text-align: center;">🗺️</span></h3>
            </div>
            <ul class="sil-sidebar-nav">
                <li><a href="#illustrations" data-page="illustrations" class="${currentPageId === "illustrations" ? "active" : ""}">Overview</a></li>
                <li><strong>Topics</strong></li>
                <li><a href="#illustration-sets" data-page="illustration-sets" class="${currentPageId === "illustration-sets" ? "active" : ""}">Illustration Sets</a></li>
                <li><a href="#sample-illustrations" data-page="sample-illustrations" class="${currentPageId === "sample-illustrations" ? "active" : ""}">Sample Illustrations</a></li>
                <li><a href="#using-illustrations" data-page="using-illustrations" class="${currentPageId === "using-illustrations" ? "active" : ""}">Inserting by Keywords</a></li>
                <li><a href="#master-illustrations" data-page="master-illustrations" class="${currentPageId === "master-illustrations" ? "active" : ""}">Master Illustrations</a></li>
            </ul>
        `;

    // Setup sidebar navigation
    const sidebarLinks = sidebar.querySelectorAll("a[data-page]");
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.getAttribute("data-page");
        if (page) {
          window.location.hash = page;
        }
      });
    });
  }

  displayPage(pageId) {
    const mainContent = document.querySelector(".sil-content");

    switch (pageId) {
      case "home":
        mainContent.innerHTML = this.getHomePage();
        break;
      case "rules":
        mainContent.innerHTML = this.getRulesPage();
        break;
      case "illustrations":
        mainContent.innerHTML = this.getIllustrationsOverviewPage();
        break;
      case "illustration-sets":
        mainContent.innerHTML = this.getIllustrationSetsPage();
        break;
      case "sample-illustrations":
        mainContent.innerHTML = this.getSampleIllustrationsPage();
        break;
      case "using-illustrations":
        mainContent.innerHTML = this.getUsingIllustrationsPage();
        break;
      case "master-illustrations":
        mainContent.innerHTML = this.getMasterIllustrationsPage();
        break;
      case "maps":
        mainContent.innerHTML = this.getMapsOverviewPage();
        break;
      case "maps-intro":
        mainContent.innerHTML = this.getMapsIntroPage();
        break;
      case "map-labeler":
        mainContent.innerHTML = this.getMapLabelerPage();
        break;
      case "map-samples":
        mainContent.innerHTML = this.getMapSamplesPage();
        break;
      case "map-editions":
        mainContent.innerHTML = this.getMapEditionsPage();
        break;
      case "accessing-repo":
        mainContent.innerHTML = this.getAccessingRepoPage();
        break;
      case "map-varieties":
        mainContent.innerHTML = this.getMapVarietiesPage();
        break;
      case "map-creator-maps":
        mainContent.innerHTML = this.getMapCreatorMapsPage();
        break;
      case "indesign-maps":
        mainContent.innerHTML = this.getInDesignMapsPage();
        break;
      case "map-monkey":
        mainContent.innerHTML = this.getMapMonkeyPage();
        break;
      case "contact":
        mainContent.innerHTML = this.getContactPage();
        break;
      default:
        mainContent.innerHTML = this.getHomePage();
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }

  toggleForm(formId) {
    const form = document.getElementById(formId);
    const icon = document.getElementById(formId + '-icon');
    
    if (form && icon) {
      if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
        icon.textContent = '−';
      } else {
        form.style.display = 'none';
        icon.textContent = '+';
      }
    }
  }

  toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const icon = document.getElementById(sectionId + '-icon');
    
    if (section && icon) {
      if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'block';
        icon.textContent = '−';
      } else {
        section.style.display = 'none';
        icon.textContent = '+';
      }
    }
  }

  getHomePage() {
    return `

            <div class="content-section">
                <h2 class="section-title">Welcome to the SIL Map & Illustration Repository!</h2>
                <p>This repository is a collection of maps, diagrams, and other Scripture illustrations.</p>
                <p>Use the navigation links above to explore the resources and documentation, or to contact us.</p>
            </div>

            <div class="info-card warning-card">
                <h3>🚧 Under Construction</h3>
                <p>This site is still under construction as we pull in documentation from various sources and attempt to update it.</p>
                <p>Thank you for your patience!</p>
            </div>
        `;
  }

  getRulesPage() {
    return `
            <div class="page-header">
                <h1 class="page-title">Usage, Permission, and Attribution Rules</h1>
                <p class="page-subtitle">for Items in the SIL Map & Illustration Repository</p>
            </div>
            <p>All illustrations in the repository—including maps and diagrams—have an "rules code" that indicates the set of usage and permissions rules that apply.
            For example, every map and diagram in the repository has a map ID that is comprised of three digits (grouping similar maps) and a two- or three-letter rules code.
            (e.g. 143gt) 
            Normal, unlabeled illustrations, on the other hand, have illustration IDs that are comprised of a two-letter rules code plus a 5-digit sequence number.
            (e.g. gt00127)</p>
            <p>In either case, you can use the rules code to look up the specific usage, permission, and attribution rules that apply to that item.</p>
            
            <div class="content-section">
                <div class="info-card">
                    <div id="maps-section" style="display: none;">
                        <p>Every map and diagram in the repository has a map ID that is comprised of three digits (grouping similar maps) and a two- or three-letter code that indicates the usage and attribution rules. In some cases, similar maps that have the same usage and permission rules share a map ID. For example, the map ID "095wbt" refers to a set of maps that depict the kingdoms of Israel and Judah, and to which the "WBT" set of usage and permission rules apply.</p>
                        
                    </div>
                </div>
                
                <p>Every illustration in the SIL repository has an illustration ID that begins with a two-letter code indicating ownership, and the usage and attribution rules. Here are the rules for each code:</p>
                
                <div style="margin-left: 20px; margin-top: 20px;">
                    
                    <h3 onclick="toggleSection('ba')" style="cursor: pointer; user-select: none; color: var(--sil-medium-blue); margin-top: 20px;">
                        <span id="ba-icon" style="display: inline-block; width: 20px;">+</span> BA (Louise Bass — Color & Halftone Bible Illustrations)
                    </h3>
                    <div id="ba" style="display: none; margin-left: 20px; margin-top: 10px;">
                        <h4>Attribution</h4>
                        <p>On the verso page, credit as follows:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Color [and/or halftone] illustrations [on pages ___] are used by permission of Louise Bass.
                        </p>
                        
                        <h4>Usage Restrictions</h4>
                        <p>The halftone illustrations are only permitted to be used in print publications. (Of course, digital publications are better off using the color versions anyway.)</p>
                        
                        <h4>Permission Requests</h4>
                        <p>It is not necessary to request permission to use Bass color & halftone illustrations in SIL or Wycliffe publications. For all other publications, permission must be requested at <a href="https://tiny.cc/requestpermissions" target="_blank">tiny.cc/requestpermissions</a>.</p>
                    </div>

                    <h3 onclick="toggleSection('co-cn')" style="cursor: pointer; user-select: none; color: var(--sil-medium-blue); margin-top: 20px;">
                        <span id="co-cn-icon" style="display: inline-block; width: 20px;">+</span> CO or CN (David C. Cook — B&W Bible Illustrations)
                    </h3>
                    <div id="co-cn" style="display: none; margin-left: 20px; margin-top: 10px;">
                        <p>Each illustration must be individually credited where used:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            © 1996 David C. Cook.
                        </p>
                        <p>In addition, if desired, a credit of all Cook illustrations can be added to the verso page:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Illustrations © 1996 David C Cook. Used by permission.
                        </p>
                        
                        <p>In sensitive locations the credits on each picture and on the verso page may be replaced with:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            © DCC.
                        </p>
                        
                        <p>For permission to use Cook illustrations in publications of Wycliffe or SIL-supported projects, use this form:<br>
                        <a href="https://tiny.cc/requestpermissions" target="_blank">https://tiny.cc/requestpermissions</a></p>
                        
                        <p>For permission to use Cook illustrations in other publications, use the form on the David C. Cook website:<br>
                        <a href="https://davidccook.org/permissions/" target="_blank">https://davidccook.org/permissions/</a></p>
                        
                        <p>Note that reprints and revisions are required to have a new request for permission to use these illustrations.</p>
                    </div>
                    
                    <h3 onclick="toggleSection('dh')" style="cursor: pointer; user-select: none; color: var(--sil-medium-blue); margin-top: 20px;">
                        <span id="dh-icon" style="display: inline-block; width: 20px;">+</span> DH (David Healey — B&W Bible Illustrations)
                    </h3>
                    <div id="dh" style="display: none; margin-left: 20px; margin-top: 10px;">
                        <h4>Attribution</h4>
                        <p>On the verso page of a print publication, the following copyright statement should appear:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Illustrations by David Healey, © 2012 Wycliffe Bible Translators, Inc.
                        </p>
                        
                        <p>In a digital publication, this should be followed by the license information:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Works by David Healey are licensed under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License: <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">https://creativecommons.org/licenses/by-nc-nd/4.0/</a>.
                        </p>
                        
                        <h4>Attribution in Sensitive Areas</h4>
                        <p>To use these illustrations in sensitive areas where Wycliffe Bible Translators should not be named, the following copyright statement may be used instead:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Illustrations on pages ___ used with permission. All rights reserved worldwide.
                        </p>
                        <p>Practically, this will mean anyone wanting to use the illustrations will need to contact the named copyright holder of the publication in which the illustration(s) appear, and they will in turn, contact the SIL illustration repository manager.</p>
                        
                        <h4>Usage Restrictions</h4>
                        <p>In both print and digital publications you may crop and resize these illustrations, but not modify the images for your new work. Images may be rotated or flipped horizontally, provided this does not contradict historical fact or violate cultural norms.</p>
                    </div>
                    
                    <h3 onclick="toggleSection('dn')" style="cursor: pointer; user-select: none; color: var(--sil-medium-blue); margin-top: 20px;">
                        <span id="dn-icon" style="display: inline-block; width: 20px;">+</span> DN (Darwin Dunham — B&W Bible Illustrations)
                    </h3>
                    <div id="dn" style="display: none; margin-left: 20px; margin-top: 10px;">
                        <p><strong>These illustrations may not be used in digital publications.</strong></p>
                        
                        <p>On the verso page credit</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Illustrations by Darwin Dunham, © United Bible Societies, 1989.
                        </p>
                        
                        <p>Permission is not needed to use Dunham illustrations in SIL publications.</p>
                        
                        <p>For permission to use Dunham illustrations in non-SIL publications contact:<br>
                        <a href="mailto:igalliani@biblesocieties.org">igalliani@biblesocieties.org</a></p>
                        
                        <p>Permission is requested via e-mail. Reprints and revisions are required to have a new request for permission to use these illustrations. The request for the use of these pictures must include the following:</p>
                        <ul>
                            <li>The name of the organization, entity or group.</li>
                            <li>The country, language and Ethnologue code.</li>
                            <li>The title of the book in the vernacular.</li>
                            <li>The type of book in English, e.g., New Testament, Bible, portion.</li>
                            <li>The number of books to be printed.</li>
                            <li>The number of illustrations and specific filename(s) of the illustration(s)/picture(s).</li>
                        </ul>
                    </div>
                    
                    <h3 onclick="toggleSection('dy')" style="cursor: pointer; user-select: none; color: var(--sil-medium-blue); margin-top: 20px;">
                        <span id="dy-icon" style="display: inline-block; width: 20px;">+</span> DY (Carolyn Dyk — Color Bible Illustrations)
                    </h3>
                    <div id="dy" style="display: none; margin-left: 20px; margin-top: 10px;">
                        <h4>Attribution</h4>
                        <p>On the verso page of a print publication, the following copyright statement should appear:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Illustrations by Carolyn Dyk, © 2001 Wycliffe Bible Translators, Inc.
                        </p>
                        
                        <p>In a digital publication, this should be followed by the license information:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Works by Carolyn Dyk are licensed under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License: <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">https://creativecommons.org/licenses/by-nc-nd/4.0/</a>.
                        </p>
                        
                        <h4>Permission Requests</h4>
                        <p>To use these illustrations in sensitive areas where Wycliffe Bible Translators should not be named, submit a request at <a href="https://tiny.cc/requestpermissions" target="_blank">tiny.cc/requestpermissions</a>, and indicate that your request is for a sensitive publication. Otherwise, it is not necessary to request permission to use these illustrations.</p>
                        
                        <h4>Usage Restrictions</h4>
                        <p>In both print and digital publications you may crop and resize these illustrations, but not modify the images for your new work. Images may be rotated or flipped horizontally, provided this does not contradict historical fact or violate cultural norms.</p>
                    </div>
                    
                    <h3 onclick="toggleSection('fmo-maps')" style="cursor: pointer; user-select: none; color: var(--sil-medium-blue); margin-top: 20px;">
                        <span id="fmo-maps-icon" style="display: inline-block; width: 20px;">+</span> FMO 
                        (fmosoft.com — Adapted from Map Creator's built-in maps)
                    </h3>
                    <div id="fmo-maps" style="display: none; margin-left: 20px; margin-top: 10px;">
                        <h4>Owner</h4>
                        <p>The rights-holder of FMO-coded masters is fmosoft.com.</p>
                        
                        <h4>Attribution Rules</h4>
                        <p>Publications that include material disseminated by Map Creator or produced using Map Creator 
                        must include this credit:</p>

                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            "Maps [and diagrams and charts] [on pages ___] are produced with Map Creator software from 
                            fmosoft.com. Used by permission. All rights reserved."
                        </p>
                    </div>
                    
                    <h3 onclick="toggleSection('gt-maps')" style="cursor: pointer; user-select: none; color: var(--sil-medium-blue); margin-top: 20px;">
                        <span id="gt-maps-icon" style="display: inline-block; width: 20px;">+</span> GT (Gordon Thompson — Maps & Diagrams)
                    </h3>
                    <div id="gt-maps" style="display: none; margin-left: 20px; margin-top: 10px;">
                        <h4>Owner</h4>
                        <p>The rights-holder of GT-coded masters is SIL Global, which has attribution agreements with Gordon Thompson and Wycliffe Bible Translators as reflected below.</p>
                        
                        <h4>Permission Rules</h4>
                        <p>Permission is granted for maps derived from GT-coded masters to be used in any Scripture publication that follows the translation standards of the Forum of Bible Agencies International.</p>
                        
                        <h4>Attribution Rules</h4>
                        <p>In non-sensitive areas, they should be credited as follows:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Maps [and diagrams] [on pages ___] are derived from works of Gordon Thompson, © 2012 Wycliffe Bible Translators, Inc. Used with permission. All rights reserved worldwide.
                        </p>
                        
                        <p>In sensitive areas, where the association of this publication with Wycliffe could be problematic either for Wycliffe or for the publication, a representative of the publication's named copyright holder should submit a permissions request at <a href="https://tiny.cc/requestpermissions" target="_blank">tiny.cc/requestpermissions</a>, specifying that this is a request for a sensitive area. Once permission is granted, the following attribution is required:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Maps and diagrams [on pages ___] used with permission. All rights reserved worldwide.
                        </p>
                    </div>
                    
                    <h3 onclick="toggleSection('gt-ill')" style="cursor: pointer; user-select: none; color: var(--sil-medium-blue); margin-top: 20px;">
                        <span id="gt-ill-icon" style="display: inline-block; width: 20px;">+</span> GT (Gordon Thompson — B&W Bible Illustrations)
                    </h3>
                    <div id="gt-ill" style="display: none; margin-left: 20px; margin-top: 10px;">
                        <h4>Attribution</h4>
                        <p>On the verso page of a print publication, the following copyright statement should appear:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Illustrations on pages ___ by Gordon Thompson, © 2012 Wycliffe Bible Translators, Inc.
                        </p>
                        
                        <p>In a digital publication, this should be followed by the license information:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Works by Gordon Thompson are licensed under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License: <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">https://creativecommons.org/licenses/by-nc-nd/4.0/</a>.
                        </p>
                        
                        <h4>Attribution in Sensitive Areas</h4>
                        <p>To use these illustrations in sensitive areas where Wycliffe Bible Translators should not be named, the owner has agreed that the following copyright statement may be used instead:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Illustrations on pages ___ used with permission. All rights reserved worldwide.
                        </p>
                        <p>Practically, this will mean anyone wanting to use the illustrations will need to contact the named copyright holder of the publication in which the illustration(s) appear, and they will in turn, contact the SIL illustration repository manager.</p>
                        
                        <h4>Usage Restrictions</h4>
                        <p>In both print and digital publications you may crop and resize these illustrations, but not modify the images for your new work. Images may be rotated or flipped horizontally, provided this does not contradict historical fact or violate cultural norms.</p>
                    </div>
                    
                    <h3 onclick="toggleSection('hk-maps')" style="cursor: pointer; user-select: none; color: var(--sil-medium-blue); margin-top: 20px;">
                        <span id="hk-maps-icon" style="display: inline-block; width: 20px;">+</span> HK (Horace Knowles — Maps & Diagrams)
                    </h3>
                    <div id="hk-maps" style="display: none; margin-left: 20px; margin-top: 10px;">
                        <h4>Permission Rules</h4>
                        <p>Permission is not needed to use HK-coded maps or diagrams in SIL-supported print publications.</p>
                        
                        <p>For permission to use Knowles/Bass illustrations in non-SIL or digital publications, see the current instructions at:<br>
                        <a href="https://www.biblesociety.org.uk/copyright-and-permissions#knowles%20and%20bass">biblesociety.org.uk/copyright-and-permissions</a></p>
                        
                        <h4>Attribution Rules</h4>
                        <p>In non-sensitive areas, they should be credited as follows:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Maps [and diagrams] on pages ___ by Horace Knowles, © The British & Foreign Bible Society, 1954, 1967, 1972, 1995.
                        </p>
                        
                        <p>In sensitive areas, they may be credited as follows:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Maps [and diagrams] on pages ___ © BFBS, 1954, 1967, 1972, 1995.
                        </p>
                    </div>

                    <h3 onclick="toggleSection('hk-lb-bk')" style="cursor: pointer; user-select: none; color: var(--sil-medium-blue); margin-top: 20px;">
                        <span id="hk-lb-bk-icon" style="display: inline-block; width: 20px;">+</span> HK, LB, or BK (Horace Knowles and Louise Bass — B&W Bible Illustrations)
                    </h3>
                    <div id="hk-lb-bk" style="display: none; margin-left: 20px; margin-top: 10px;">
                        <p><strong>These illustrations may not be used in digital publications.</strong></p>
                        
                        <p><strong>Horace Knowles black and white illustrations (filenames beginning with HK):</strong><br>
                        On the verso page credit</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Illustrations by Horace Knowles, © The British & Foreign Bible Society, 1954, 1967, 1972, 1995.
                        </p>
                        
                        <p><strong>Knowles and Bass black and white illustrations (filenames beginning with BK):</strong><br>
                        On the verso page credit</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Illustrations by Horace Knowles revised by Louise Bass, © The British & Foreign Bible Society, 1994.
                        </p>
                        
                        <p><strong>Louise Bass black and white illustrations (filenames beginning with LB):</strong><br>
                        On the verso page credit</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Illustrations by Louise Bass, © The British & Foreign Bible Society, 1994.
                        </p>
                        
                        <p>Permission is not needed to use Knowles/Bass illustrations in SIL publications.</p>
                        
                        <p>For permission to use Knowles/Bass illustrations in non-SIL publications, see the current instructions at:<br>
                        <a href="https://www.biblesociety.org.uk/copyright-and-permissions#knowles%20and%20bass">biblesociety.org.uk/copyright-and-permissions</a></p>
                    </div>
                    
                    <h3 onclick="toggleSection('ib')" style="cursor: pointer; user-select: none; color: var(--sil-medium-blue); margin-top: 20px;">
                        <span id="ib-icon" style="display: inline-block; width: 20px;">+</span> IB (Biblica/IBS-ME — Faadil Color Bible Illustrations)
                    </h3>
                    <div id="ib" style="display: none; margin-left: 20px; margin-top: 10px;">
                        <p><strong>These illustrations may not be used in digital publications.</strong><br>
                        They are also not for use in the Middle East or North Africa without written permission.</p>
                        
                        <p>On the verso page credit:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Color illustrations by Farid Faadil. © Biblica, Inc. Used with permission. All rights reserved worldwide.
                        </p>
                        
                        <p>And, if space allows (also on the verso page):</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            "Biblica", "International Bible Society" and the Biblica Logo are trademarks registered in the United States Patent and Trademark Office by Biblica, Inc. Used with permission.
                        </p>
                        <p>(The trademark notice may be set one point smaller than the copyright statement.)</p>
                        
                        <p>Permission is not needed to use the Faadil illustrations in SIL publications outside the Middle East and North Africa.</p>
                        
                        <p>To use the Biblica/IBS Faadil illustrations in the Middle East or North Africa, or in non-SIL publications, the Rights & Permissions General Contact Form on the following page should initially be completed:<br>
                        <a href="https://www.biblica.com/permissions/contact/" target="_blank">https://www.biblica.com/permissions/contact/</a></p>
                        <p>A more detailed Permission Request Form can be found here:<br>
                        <a href="https://www.surveymonkey.com/r/XWH6Q9J" target="_blank">https://www.surveymonkey.com/r/XWH6Q9J</a></p>
                        
                        <p>Please also note the following statement in the Memorandum of Agreement with Biblica:</p>
                        <p style="margin-left: 20px; font-style: italic; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-light-blue);">
                            "Adaptations may be made to these Illustrations, where necessary, to make them culturally appropriate for the target reader group. Such modifications might include, for example, the removing or adding of head coverings, changes in length of hair styles, adaptation of clothing, and alterations required to render the Illustrations culturally appropriate, and to remove items that might be culturally offensive. These modifications will be relatively minor and should not impact the message provided by each Illustration."
                        </p>
                    </div>
                    
                    <h3 onclick="toggleSection('mh-maps')" style="cursor: pointer; user-select: none; color: var(--sil-medium-blue); margin-top: 20px;">
                        <span id="mh-maps-icon" style="display: inline-block; width: 20px;">+</span> MH (Michael Harrar — Maps & Diagrams)
                    </h3>
                    <div id="mh-maps" style="display: none; margin-left: 20px; margin-top: 10px;">
                        <h4>Owner</h4>
                        <p>The rights-holder of MH-coded masters is SIL Global, which has attribution agreements with Michael Harrar and Wycliffe Bible Translators as reflected below.</p>
                        
                        <h4>Permission Rules</h4>
                        <p>Permission is granted for maps derived from MH-coded masters to be used in any Scripture publication that follows the translation standards of the Forum of Bible Agencies International.</p>
                        
                        <h4>Attribution Rules</h4>
                        <p>In non-sensitive areas, they should be credited as follows:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Maps [and diagrams] [on pages ___] are derived from works of Michael Harrar, © 2012 Wycliffe Bible Translators, Inc. Used with permission. All rights reserved worldwide.
                        </p>
                        
                        <p>In sensitive areas, where the association of this publication with Wycliffe could be problematic either for Wycliffe or for the publication, a representative of the publication's named copyright holder should submit a permissions request at <a href="https://tiny.cc/requestpermissions" target="_blank">tiny.cc/requestpermissions</a>, specifying that this is a request for a sensitive area. Once permission is granted, the following attribution is required:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Maps and diagrams [on pages ___] used with permission. All rights reserved worldwide.
                        </p>
                    </div>
                    
                    <h3 onclick="toggleSection('mh-ill')" style="cursor: pointer; user-select: none; color: var(--sil-medium-blue); margin-top: 20px;">
                        <span id="mh-ill-icon" style="display: inline-block; width: 20px;">+</span> MH (Michael Harrar — B&W Bible Illustrations)
                    </h3>
                    <div id="mh-ill" style="display: none; margin-left: 20px; margin-top: 10px;">
                        <h4>Attribution</h4>
                        <p>On the verso page of a print publication, the following copyright statement should appear:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Illustrations by Michael Harrar, © 2012 Wycliffe Bible Translators, Inc.
                        </p>
                        
                        <p>In a digital publication, this should be followed by the license information:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Works by Michael Harrar are licensed under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License: <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">https://creativecommons.org/licenses/by-nc-nd/4.0/</a>.
                        </p>
                        
                        <h4>Attribution in Sensitive Areas</h4>
                        <p>To use these illustrations in sensitive areas where Wycliffe Bible Translators should not be named, the following copyright statement may be used instead:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Illustrations on pages ___ used with permission. All rights reserved worldwide.
                        </p>
                        <p>Practically, this will mean anyone wanting to use the illustrations will need to contact the named copyright holder of the publication in which the illustration(s) appear, and they will in turn, contact the SIL illustration repository manager.</p>
                        
                        <h4>Usage Restrictions</h4>
                        <p>In both print and digital publications you may crop and resize these illustrations, but not modify the images for your new work. Images may be rotated or flipped horizontally, provided this does not contradict historical fact or violate cultural norms.</p>
                    </div>
                    
                    <h3 onclick="toggleSection('mn')" style="cursor: pointer; user-select: none; color: var(--sil-medium-blue); margin-top: 20px;">
                        <span id="mn-icon" style="display: inline-block; width: 20px;">+</span> MN (Muze Tshilombo — Color Bible Illustrations)
                    </h3>
                    <div id="mn" style="display: none; margin-left: 20px; margin-top: 10px;">
                        <h4>Attribution</h4>
                        <p>On the verso page of a print publication, the following copyright statement should appear:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Illustrations by Muze Tshilombo, © 1997 Wycliffe Bible Translators, Inc.
                        </p>
                        
                        <p>In a digital publication, this should be followed by the license information:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Works by Muze Tshilombo are licensed under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License: <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">https://creativecommons.org/licenses/by-nc-nd/4.0/</a>.
                        </p>
                        
                        <h4>Permission Requests</h4>
                        <p>To use these illustrations in sensitive areas where Wycliffe Bible Translators should not be named, submit a request at <a href="https://tiny.cc/requestpermissions" target="_blank">tiny.cc/requestpermissions</a>, and indicate that your request is for a sensitive publication. Otherwise, it is not necessary to request permission to use these illustrations.</p>
                        
                        <h4>Usage Restrictions</h4>
                        <p>In both print and digital publications you may crop and resize these illustrations, but not modify the images for your new work. Images may be rotated or flipped horizontally, provided this does not contradict historical fact or violate cultural norms.</p>
                    </div>
                    
                    <h3 onclick="toggleSection('wa')" style="cursor: pointer; user-select: none; color: var(--sil-medium-blue); margin-top: 20px;">
                        <span id="wa-icon" style="display: inline-block; width: 20px;">+</span> WA (Graham Wade — B&W Bible Illustrations)
                    </h3>
                    <div id="wa" style="display: none; margin-left: 20px; margin-top: 10px;">
                        <p><strong>These illustrations may not be used in digital publications.</strong></p>
                        
                        <p>On the verso page credit:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Illustrations by Graham Wade, © United Bible Societies, 1989.
                        </p>
                        
                        <p>Permission is not needed to use Wade illustrations in SIL publications.</p>
                        
                        <p>For permission to use Wade illustrations in non-SIL publications contact:<br>
                        <a href="mailto:igalliani@biblesocieties.org">igalliani@biblesocieties.org</a></p>
                        
                        <p>Permission is requested via e-mail. Reprints and revisions are required to have a new request for permission to use these illustrations. The request for the use of these pictures must include the following:</p>
                        <ul>
                            <li>The name of the organization, entity or group.</li>
                            <li>The country, language and Ethnologue code.</li>
                            <li>The title of the book in the vernacular.</li>
                            <li>The type of book in English, e.g., New Testament, Bible, portion.</li>
                            <li>The number of books to be printed.</li>
                            <li>The number of illustrations and specific filename(s) of the illustration(s)/picture(s).</li>
                        </ul>
                    </div>

                    <h3 onclick="toggleSection('wbt-maps')" style="cursor: pointer; user-select: none; color: var(--sil-medium-blue); margin-top: 20px;">
                        <span id="wbt-maps-icon" style="display: inline-block; width: 20px;">+</span> WBT (Wycliffe Bible Translators — Maps & Diagrams)
                    </h3>
                    <div id="wbt-maps" style="display: none; margin-left: 20px; margin-top: 10px;">
                        <h4>Owner</h4>
                        <p>The rights-holder of WBT-coded masters is SIL Global, which has an attribution agreement with Wycliffe Bible Translators as reflected below.</p>
                        
                        <h4>Permission Rules</h4>
                        <p>Permission is granted for maps derived from WBT-coded masters to be used in any Scripture publication that follows the translation standards of the Forum of Bible Agencies International.</p>
                        
                        <h4>Attribution Rules</h4>
                        <p>If a publication is copyrighted by Wycliffe Bible Translators, then maps derived from WBT-coded masters do not need to be credited, because they are covered by the copyright statement relating to the publication as a whole.</p>
                        
                        <p>Otherwise, in non-sensitive areas, they should be credited as follows:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Maps [and diagrams] [on pages ___] © 20## Wycliffe Bible Translators, Inc.
                        </p>
                        <p>where "20##" corresponds to the publication year of the volume as a whole.</p>
                        <p>For reprints or revisions where the map(s) have not been changed, the year of publication would be that of the original publication.</p>
                        
                        <p>In sensitive areas, where the association of this publication with Wycliffe could be problematic either for Wycliffe or for the publication, a representative of the publication's named copyright holder should submit a permissions request at <a href="https://tiny.cc/requestpermissions" target="_blank">tiny.cc/requestpermissions</a>, specifying that this is a request for a sensitive area. Once permission is granted, the following attribution is required:</p>
                        <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                            Maps [and diagrams] [on pages ___] used with permission. All rights reserved worldwide.
                        </p>
                    </div>



                </div>
            </div>
        `;
  }

  getMapsIntroPage() {
    return `
        <div class="page-header">
            <h1 class="page-title">Introduction</h1>
            <p class="page-subtitle">About our Maps</p>
        </div>
        <div class="content-section">
            
            <div class="info-card">
                <p>The SIL Map Repository is a collection of maps and diagrams that may be helpful in Scripture publications. Most of the maps currently contained in the repository are owned by SIL Global, with attribution rules that credit Wycliffe Bible Translators, Inc., and where applicable, the artists. </p>
                <p>There is also a supplementary collection of 3 maps/diagrams based on artwork by Horace Knowles, owned by the British and Foreign Bible Societies. Our current licensing agreement only allows us to distribute these for use on SIL-supported projects.</p>
                <p><strong>InDesign Maps</strong></p>
                <p><i>Important Note:</i> If you will be using other writing systems, other digit systems, or just other fonts, be sure to read the instructions on the best way to 
                set this up. See <a href="#map-varieties">How to Use the Maps</a> for more details.</p>
                <p><strong>Map Creator</strong><br />
                Several (but not yet all) of our IDML maps are also  available in MAPX format. In addition, a custom version of the Bible maps that are built into Map Creator 
                are available in this map repository. Use these copies rather than the built-in templates with Paratext Diagram Labeler.</p>
            </div>
        </div>
    `;
  }
  getMapLabelerPage() {
    return `
        <div class="page-header">
            <h1 class="page-title">Why You Need a Labeler</h1>
            <p class="page-subtitle">Why the Translation Team Should Not Just Come Up with a List of Place-Names</p>
        </div>
        <div class="content-section">
            
            <div class="info-card">
                <p>It used to be a common practice for typesetters to simply ask the translation team to provide a list of place-names for labeling maps.
                There were multiple problems with this approach, stemming from the fact that place-names are notorious for being spelled inconsistently in 
                minority-language Scripture projects, because place-names are typically transliterations, and there are always multiple ways that Hebrew or 
                Greek terms could be transliterated into any given language:</p>
                <ul>
                  <li>Sometimes the provided place-name doesn't match the approved rendering in the Paratext project's Biblical Terms.</li>
                  <li>Other times, it matches the rendering, but that rendering isn't consistently used throughout the Scripture text.</li>
                  <li>In yet other cases, the rendering used in the Old Testament doesn't match the rendering used in the New Testament when it should. 
                  (E.g., if the place that Abram first moved to is spelled "Haran" in the Old Testament but spelled "Harran" in the New Testament.)</li>
                </ul>
                <p>The solution is to use a tool that can extract the approved place-names directly from the Paratext project's term renderings data, 
                and from it, create data merge files that can be used with our IDML and MAPX maps. 
                All of our maps and diagrams are enabled for use with such data merge files. 
                (While it is possible to copy and paste label text into any of our map files, this is strongly discouraged.) 
                </p>
                <p>We have two main tools for this purpose. Both are free to download and use:</p>
                  <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
                    <div style="flex: 1 1 300px; min-width: 300px; padding: 15px;">
                      <h3 style="text-align: center; margin-bottom: 15px;">Scripture Map Labeler</h3>
                      <p style="margin-bottom: 20px;">This is the original plugin that is integrated into Paratext 9 (or 8). 
                      Map labels are entered as verses in the chapters of a Paratext Extra book, such as XXA.
                      This works in conjunction with a Paratext resource (SMP1 or SMP1es) that defines which labels
                      are associated with which chapters and verses.</p>
                      <div style="text-align: center;">
                        <a href="https://sites.google.com/sil.org/scripture-map-labeler/home" target="_blank" class="btn" style="display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0;">
                          🔗 Get Scripture Map Labeler
                        </a>
                      </div>
                    </div>
                    <div style="flex: 1 1 300px; min-width: 300px; padding: 15px;">
                      <h3 style="text-align: center; margin-bottom: 15px;">Paratext Diagram Labeler</h3>
                      <p style="margin-bottom: 20px;">This is the successor to Scripture Map Labeler. A beta version is 
                      currently available as a standalone application for Paratext 9. (This will in due course be integrated into Paratext 10 as an extension.) 
                      Map labels are entered in either a graphical or tabular layout, with additional context provided for translation.
                      It also provides a view on where the terms are found or missing in the Scripture text, similar to the familiar Biblical Terms Tool.</p>
                      <div style="text-align: center;">
                        <a href="https://tiny.cc/labeler" target="_blank" class="btn" style="display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0;">
                          🔗 Get Paratext Diagram Labeler
                        </a>
                      </div>
                    </div>
                  </div>
            </div>
        </div>
    `;
  }

  getMapSamplesPage() {
    return `
        <div class="page-header">
            <h1 class="page-title">Samples</h1>
        </div>
        
        <div class="content-section">
            <div class="info-card">
            <p>Samples of all maps are available at:</p>
            <p><a href="https://tiny.cc/samplemaps" target="_blank" class="btn" style="display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0;">
                🔗 tiny.cc/samplemaps
            </a></p>

            <p>Translation teams will generally only need to download this folder of samples. This is the same folder included within the
            <strong>SIL Map Repository</strong> folder as <strong>!All Map Samples</strong>.</p>
            <p>Typesetters: See also <a href="https://docs.google.com/document/d/1zUMQK1CoSTT1FPKTAukK4M3IXS-7jAB0NgE85AnAu-g/edit?usp=sharing" target="_blank">
            Tips for Using the Sample Maps</a>.</p> 

            </div>
        </div>
    `;
  }

  getMapEditionsPage() {
    return `
            <div class="page-header">
                <h1 class="page-title">Editions of the Map Repository</h1>
                <p class="page-subtitle">Why are there Compact and Expanded Editions?</p>
            </div>
            
            <div class="content-section">
                <div class="info-card">
                <p>In addition to a compact Spanish edition, the map repository also comes in two English editions, due to some unresolved uncertainty:</p>
<ul type="disc">
  <li><strong>Compact Edition: (570 MB) </strong><br />All the maps are directly in the &ldquo;SIL Map Repository&rdquo; folder (or the &ldquo;HK Supplementary Maps&rdquo; folder, if applicable).&nbsp;</li>
  <li><strong>Expanded Edition: (930 MB)</strong> <i>(Note: This edition does not contain the FMOSoft maps. See <a href="#accessing-repo">next page</a> for details.)</i>
  <br />All the included maps are in sub-folders under the &ldquo;SIL Map Repository&rdquo; folder (or under the &ldquo;HK Supplementary Maps&rdquo; folder, if applicable). <br />
    Those sub-folders also contain:</li>
  <ul type="circle">
    <li>An additional copy of the English data merge source file. (Also available in the <strong>DataMergeFiles</strong> folder.)</li>
    <li>An additional version of the IDML file that has been merged with English labels, and so is no longer mergeable. 
    English labels contain &ldquo;<strong>@en</strong>&rdquo; in the file name. E.g. <strong>065wbt - Ruth @en.idml</strong>&nbsp; 
    <br><br>Although we strongly recommend using the data merge feature, these "@en" files are provided for users who are not up for learning how to use data merge, 
    and who instead copy and paste labels in. 
    Not that they couldn't copy and paste into the merge-enabled files, but there is some uncertainty on whether it is ever possible 
    for the mergeable maps to feel different to the copy/paste user, 
    such as by showing a field&rsquo;s name, for example, <strong>&lt;&lt;jerusalem_nt&gt;&gt;</strong>, without the user having explicitly 
    specified a data merge file to use. The repository manager would request that, if possible, even copy/paste users first try the mergeable files, 
    not the <strong>@en</strong> files, and then alert the Repository Manager via the <a href="#contact">Contact page</a>
    if any such problems occur, before resorting to using the <strong>@en</strong> files. This will help us to resolve the question of whether it&rsquo;s 
    worth continuing to provide such files in the longer term. (So far, since the launch of the "SMP1" release in April 2025, we have not received any such 
    problem reports.) Thank you!</li>
    </ul>
  </ul>
</ul>
                </div>
            </div>
        `;
  }

  getAccessingRepoPage() {
    return `
            <div class="page-header">
                <h1 class="page-title">Accessing the Map Repository</h1>
            </div>
            
            <div class="content-section">
                <div class="info-card">
                <p>If all you need is the main SIL Map Repository (without the supplementary maps), you can download it here:</p>
                    <ul type="disc">
                    <li>SIL Map Repository Compact (English): <a href="https://tiny.cc/sil-map-repo" target="_blank">tiny.cc/sil-map-repo</a></li>
                    <li>SIL Map Repository Expanded (English): <a href="https://tiny.cc/sil-map-repo-red" target="_blank">tiny.cc/sil-map-repo-red</a></li>
                    <li>SIL Map Repository Compact (Spanish): <a href="http://tiny.cc/sil-map-repo-es" target="_blank">tiny.cc/sil-map-repo-es</a></li>
                    </ul>
                    <p>If you&rsquo;re a bonafide typesetter also needing access to the three HK maps for SIL-supported projects, please submit your request for access to the &ldquo;full repository&rdquo; at <a href="https://tiny.cc/requestimages" target="_blank">tiny.cc/requestimages</a>. (Maps cannot yet be requested by map ID, as you can do with Scripture illustrations.)</p>
                </div>
                <div class="info-card">
                    <p>If you are using Paratext Diagram Labeler to prepare labels for Map Creator's built-in maps, the Compact editions of the repository contain
                    our own edition of several of these maps and diagrams. Use these instead of the built-in ones, for better consistency and alignment with the Labeler terms.
                    They are identified by the rules code "fmo" for FMOSoft.</p>
                </div>
            </div>
        `;
  }

  // Page content methods will be implemented as we build each page
  getIllustrationsOverviewPage() {
    return `
            <div class="content-section">
                <h1 class="page-title">Illustrations</h1>
                <p class="page-subtitle">Select illustrations to engage readers in the Scriptures.</p>

                <h2>Topics</h2>
                <div class="feature-grid">
                    <div class="feature-card">
                        <h3><span style="font-size: 36px; margin-right: 8px;">📚</span><a href="#illustration-sets" data-page="illustration-sets">Illustration Sets</a></h3>
                        <p>Learn about the illustration sets with different owners and permissions</p>
                    </div>
                    <div class="feature-card">
                        <h3><span style="font-size: 36px; margin-right: 8px;">🖼️</span><a href="#sample-illustrations" data-page="sample-illustrations">Sample Illustrations</a></h3>
                        <p>View and download sample illustrations with multilingual keywords</p>
                    </div>
                    <div class="feature-card">
                        <h3><span style="font-size: 36px; margin-right: 8px;">🔍</span><a href="#using-illustrations" data-page="using-illustrations">Inserting by Keywords</a></h3>
                        <p>Insert into Paratext using multilingual keyword searching</p>
                    </div>
                    <div class="feature-card">
                        <h3><span style="font-size: 36px; margin-right: 8px;">⬇️</span><a href="#master-illustrations" data-page="master-illustrations">Master Illustrations</a></h3>
                        <p>Request high-resolution master illustrations for typesetting and publishing</p>
                    </div>
                </div>
            </div>
        `;
  }

  getIllustrationSetsPage() {
    return `
            <div class="page-header">
                <h1 class="page-title">Illustration Sets</h1>
                <p class="page-subtitle">Understanding the different illustration collections</p>
            </div>
            <div class="content-section">
                <div class="info-card">
                    <p>The SIL Illustration repository contains illustration sets from various owners, each with different rules regarding who may use them, in which kind of publications they may be used, what kind of attribution is required, and who SIL may share the master copies with.</p>
                    <p>Make sure to read and understand the <a href="#rules">usage and attribution rules</a> for each illustration set before selecting them for use.</p>
                </div>
            </div>
        `;
  }

  getSampleIllustrationsPage() {
    return `
            <div class="page-header">
                <h1 class="page-title">Sample Illustrations</h1>
                <p class="page-subtitle">Browse and download sample illustrations</p>
            </div>
            <div class="content-section">
                <div class="info-card">
                    <p>Translation teams can find low-resolution, watermarked samples of all illustrations available in the SIL Map & Illustration Repository at 
                    the link below.
                    (They are available with search tags in English, Spanish, French, Bahasa Indonesia, Hindi, and Swahili.)</p>
                    <p><a href="https://tiny.cc/sampleimages" target="_blank" class="btn" style="display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0;">
                        🔗 tiny.cc/sampleimages
                    </a></p>
                </div>
            </div>
        `;
  }

  getUsingIllustrationsPage() {
    return `
            <div class="page-header">
                <h1 class="page-title">Inserting Illustrations using Multilinguial Keywords</h1>
                <p class="page-subtitle">The easy way to find and insert illustrations in your Paratext project</p>
            </div>
            <div class="content-section">
                <div class="info-card">
                    <h3></h3>
                    <p>The best way to insert illustrations into your Paratext project is to insert the sample illustrations as 
                    placeholders, as you can search for appropriate illustrations using keywords, directly from Paratext's 
                    <b>Insert Figure</b> dialog.</p>
                </div>
                <div class="info-card">
<div dir="ltr">
<div>
    <iframe src="https://player.vimeo.com/video/371311463" width="800" height="450" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
</div>

<div>&nbsp;</div>

<div><span style="background-color: transparent; font-size: 1em;">The SIL Repository provides over 2800 black and white or color illustrations. Finding the best image among so many can be a challenge. The best approach is to do an image search from within Paratext, searching by chapter reference or by keyword in multiple languages. Here&#39;s how:</span></div>

<div>&nbsp;</div>

<h2>Download and Unzip Image Files and Folders</h2>

<p><span><span style="background-color: transparent;">Visit the SIL Illustration Samples folder as per the instructions at the&nbsp;</span></span><span><a href="#sample-illustrations" style="background-color: transparent; font-size: 1em;">Sample Illustrations page</a><span style="background-color: transparent;">.&nbsp;</span></span></p>

<ul>
	<li><span><span style="background-color: transparent;">Either browse within the appropriate language folder for the sets of images you want, and download those&nbsp;OR​​​​</span></span></li>
	<li><span><span style="background-color: transparent;">Download all images by right-clicking on the language folder and selecting Download.</span></span></li>
	<li><span><span style="background-color: transparent;">Note that these are low-resolution watermarked images.</span></span>
	<ul>
		<li><span><span style="background-color: transparent;">In all cases except for WBT image sets licensed under CC, the full-resolution originals are available only for bona fide typesetters, who will automatically substitute them for your sample images at typesetting time.</span></span></li>
	</ul>
	</li>
</ul>

<p>Unzip this collection to a folder within your Pictures folder.</p>

<ul>
	<li>This will ensure that the images are included in Windows&rsquo; search index.</li>
	<li><span>If you&rsquo;d rather store these files in another location, add that folder to Windows&rsquo; search indexing. <a href="https://winaero.com/blog/add-folders-search-index-windows-10/" rel="nofollow" style="background-color: transparent; font-size: 1em;" target="_blank"><u>Here&rsquo;s</u></a><span style="background-color: transparent;"> how to add it.</span></span></li>
	<li>Troubleshooting: On some systems, the Windows Search Index might be able to return results for filenames but not for key terms, such as &quot;sheep&quot; or &quot;LUK02&quot;. This may be because it&#39;s been somehow corrupted or misconfigured.
	<ul>
		<li>If you are unable to diagnose and correct the problem, one workaround is to open the File Explorer App, click on the &quot;3 dots&quot; menu (for More menu items), then click on Options to open the Folder Options dialog. Next, click on the Search tab. Finally, under the heading &quot;When searching in non-indexed locations&quot;, check the option for &quot;Always search file names and contents&quot;.</li>
		<li>Alternatively, you can explicitly search for key terms by prefixing them with &quot;tags:&quot;. For example, &quot;tags:sheep AND tags:LUK02&quot;</li>
	</ul>
	</li>
</ul>

<h2>Find and Insert Images in Paratext</h2>

<ol>
	<li>In Paratext, position the cursor in the passage where you want to insert a picture.</li>
	<li><span>Go to the <strong>Project menu &gt; </strong><b>Insert </b>&gt; <b>Figure</b>...</span></li>
	<li><span>Click the <b>Browse </b>button:<br />
	<br />
    <img src="images/figure-properties-browse-button.png" alt="Insert Figure Browse Button" style="width: 100%; max-width: 600px;" /><br />
	</span><br />
	&nbsp;</li>
	<li>Navigate to the folder where you unzipped your collection.&nbsp;</li>
	<li><span><span style="background-color: transparent; vertical-align: baseline;">Click in the SEARCH box in the top right corner:</span></span><br />
	<img src="images/search-for-image.png" alt="Insert Figure Search Box" style="width: 100%; max-width: 600px;" /></li>
	<li><span><span style="background-color: transparent; vertical-align: baseline;">Enter one or more terms to search for.</span></span></li>
</ol>

<ul>
	<li><span><span style="background-color: transparent; vertical-align: baseline;">For example: </span><span style="background-color: transparent; font-weight: 700; vertical-align: baseline;">baptism </span><span style="background-color: transparent; vertical-align: baseline;">or </span><span style="background-color: transparent; font-weight: 700; vertical-align: baseline;">dove</span>:</span><br />
	&nbsp;</li>
</ul>

<p><span>
<img src="images/search-for-image-dove.png" alt="Search for Image Example" style="width: 100%; max-width: 600px;" /><br />
</span></p>

	<p>There are a number of search terms/filters you can use:
	<table border="1" cellpadding="1" cellspacing="1" style="width: 1000px;">
		<thead>
			<tr>
				<th scope="col">Search Term/Filter</th>
				<th scope="col">Description</th>
				<th scope="col">Example(s)</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>{keyword}</td>
				<td>Search for an image by&nbsp;<strong>keyword</strong>.</td>
				<td>dove<br />
				baptism<br />
				altar</td>
			</tr>
			<tr>
				<td>Bible book</td>
				<td>Search for a book&nbsp;using the <strong>3-letter Paratext book code</strong>.</td>
				<td>GEN<br />
				MRK<br />
				LUK</td>
			</tr>
			<tr>
				<td>Chapter reference</td>
				<td>Search for a chapter using the <strong>3-letter book code plus the 2-digit chapter number</strong>.</td>
				<td>GEN03<br />
				MRK01<br />
				JHN10</td>
			</tr>
			<tr>
				<td>OR search</td>
				<td>OR will include images with <strong>any of the search terms.</strong><br />
				<em>Example: Find images of a <strong>sheep</strong> or <strong>lamb</strong></em></td>
				<td>sheep OR lamb</td>
			</tr>
			<tr>
				<td>digital</td>
				<td>
				<p><strong>digital</strong> will include images with permission to use in a Scripture app.<br />
				<em>Example: Find images of a <strong>lamb </strong>that can be used in a <strong>Scripture app</strong></em></p>
				</td>
				<td>
				<p>sheep digital</p>
				</td>
			</tr>
			<tr>
				<td>minus {term}</td>
				<td>Using the minus sign in front of a term will exclude the term from the search.<br />
				<em>Example: Find images of a <strong>sheep</strong>&nbsp;that are NOT pictures of a <strong>lamb</strong></em></td>
				<td>sheep -lamb</td>
			</tr>
			<tr>
				<td>color</td>
				<td>The <strong>color</strong>&nbsp;keyword will include color images (excluding black and white images).<br />
				<em>Example: Find <strong>color </strong>images of a <strong>sheep</strong></em></td>
				<td>sheep color</td>
			</tr>
			<tr>
				<td>black</td>
				<td>
				<p>The <strong>black</strong> keyword will include black and white images (excluding color images).<br />
				<em>Example: Find <strong>black and white</strong> images of a <strong>sheep</strong></em></p>
				</td>
				<td>sheep black</td>
			</tr>
		</tbody>
	</table>
	</p>
	<p>You can also combine these filters with parenthesis and additional terms.</p>

<ul>
	<li>For example: Find images of sheep or lambs that can be used in a Scripture app:&nbsp;<span><strong>(lamb OR sheep) digital</strong></span></li>
</ul>

<h3>Adjust Display Settings</h3>

	<p>Typically, the first time you do a search, you&#39;ll need to adjust the display settings for the results.</p>
	<p>If your search results are not displayed with extra large icons:</p>

<ul>
	<li><span>
        In the upper-right corner, click the drop-down arrow to open the view options:
    </span></li>
    <p><img src="images/drop-down-more-options.png" alt="Dropdown View Options" style="width: 100%; max-width: 600px;" /></p>

    <li><span>
        Select &ldquo;Extra large icons&rdquo;:
    </span></li>
    <p><img src="images/extra-large.png" style="border: medium none;" /></p>

    <h4>Optional View Settings:</h4>
    <ul>
        <li><span>To make space for even more images, you may want to hide the navigation pane: go to&nbsp;<strong>Organize &gt; Layout </strong>and uncheck <strong>Navigation pane</strong>.</span></li>
        <li>You can resize this window to fit more images by dragging a corner or edge, or by double-clicking on the title bar to maximize it.</li>
    </ul>
    <li>Double-click on an image from the search results to select it.</li>
</ul>

<h3>Enter Caption and Location</h3>
<ul>
	<li>Enter a Caption:<br />
	<img src="images/enter-a-caption.png" alt="Enter a Caption" style="width: 100%; max-width: 600px;" />
    
	<li><span><em>Best Practice: </em>If you only want this illustration to be used in print publications or you don&#39;t expect to receive permission to use it in app or Web, enter &ldquo;p&rdquo; for Location.</span></li>
	<li><span><span style="background-color: transparent; vertical-align: baseline;">See <a href="https://lingtran.net/How+to+tell+Paratext+which+images+are+for+print+and+which+are+for+electronic+outputs" target="_blank"><u>How to tell Paratext which images are for print and which are for electronic outputs</u></a>.</span></span></li>
	<li><span><span style="color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline;">Click <strong>OK</strong>.</span></span></li>
</ul>
</div>

<p style="line-height: 1.2; font-size: 13.33px; margin-top: 0pt; margin-bottom: 0pt; margin-left: 36pt;">&nbsp;</p>
<p style="line-height: 1.2; font-size: 13.33px; margin-top: 0pt; margin-bottom: 0pt; margin-left: 36pt;">&nbsp;</p>

<h2>&nbsp;</h2>

<p style="line-height: 1.2; font-size: 13.33px; margin-top: 0pt; margin-bottom: 0pt; margin-left: 36pt;">&nbsp;</p>
                </div>
            </div>
        `;
  }

  getMasterIllustrationsPage() {
    return `
            <div class="page-header">
                <h1 class="page-title">Master Illustrations</h1>
                <p class="page-subtitle">Access high-resolution illustrations for publishing</p>
            </div>
            <div class="content-section">
                <div class="info-card">
                    <p>Typesetters may obtain copies of the Master Illustrations by submitting a request below.</p>
                <div class="info-card">
                            <p style="text-align: center;">To open this form in a new tab, visit <a href="https://tiny.cc/requestimages" target="_blank">tiny.cc/requestimages</a>.</p>
                            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScCAOsNhonkU8H9msz7eUncVVme4MvtJ7Tnzjgl9s-KAtL3oA/viewform?embedded=true" width="100%" height="1500" frameborder="0" marginheight="0" marginwidth="0" style="border-radius: 8px; background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">Loading…</iframe>
                        </div>
            </div>
        `;
  }

  getMapsAndDiagramsPage() {
    return `
            <div class="page-header">
                <h1 class="page-title">Maps & Diagrams</h1>
                <p class="page-subtitle">Get the latest version of SIL Map & Illustration Repository</p>
            </div>
            
            <div class="content-section">
                <div class="info-card">
                    <a href="https://github.com/sillsdev/paratext-diagram-labeler/releases" target="_blank" class="btn" style="display: inline-block; padding: 12px 24px; background: #28a745; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0;">
                        📥 Download from GitHub Releases
                    </a>
                    <p style="margin-top: 10px;"><small><em>Opens in a new tab</em></small></p>
                </div>
                
                <div class="info-card">
                    <h3>Installation Instructions</h3>
                    <ol>
                        <li>Download the <strong>SIL Map & Illustration Repository Setup</strong> program for your operating system</li>
                        <li>Run the installer with administrator privileges if required</li>
                        <li>Follow the setup wizard instructions</li>
                        <li>The application will appear in your Start menu (Windows) or Applications folder (Mac)</li>
                    </ol>
                </div>
            </div>
            
            <div class="content-section">
                <h2 class="section-title">System Requirements</h2>
                <div class="info-card">
                    <ul>
                        <li><strong>Windows:</strong> Windows 10 or later (primary supported platform)</li>
                        <li><strong>Linux:</strong> Modern Linux distributions (less tested)</li>
                        <li><strong>Mac:</strong> macOS 10.14 or later (less tested)</li>
                    </ul>
                    <p><em>Note: Mac and Linux versions are relatively untested. We'd appreciate help testing them out.</em></p>
                </div>
            </div>
        `;
  }

  getMapVarietiesPage() {
    return `
            <div class="page-header">
                <h1 class="page-title">Understanding Map Varieties</h1>
                <p class="page-subtitle">SIL Map Repository filename conventions and options</p>
            </div>
            
            <div class="content-section">
                <h2 class="section-title">Map Grouping System</h2>
                <p>Similar maps are grouped with the same topic number, such as "185" for maps relating to Philip's travels. 
                This is followed by a two- or three-letter code indicating the usage and attribution rules that apply, such as "wbt".</p>
                <p>Multiple maps may be grouped by such codes. For example, in the SIL Map Repository (SMR) contains three separate 
                IDML files for <code>185wbt - Philips Travels</code>:</p>
                
                <table style="width: 100%; margin: 1rem 0; border-collapse: collapse;">
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;"><code>185wbt - Philips Travels.idml</code></td>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;">Full page map, with color and other options</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;"><code>185wbt - Philips Travels [sm].idml</code></td>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;">Shorter, more square map, with color and other options</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;"><code>185wbt - Philips Travels [sm-bw].idml</code></td>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;">A different short map, in only black & white</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="content-section">
                <h2 class="section-title">Options that are Internal to a Map File</h2>
                <p>Many maps have multiple options for display all within one IDML file. As you browse through the map samples, the 
                internal options used are indicated within parentheses. For example, options on two varieties of the World map 
                are (bbf, riv) and (fcr):</p>
                
                <table style="width: 100%; margin: 1rem 0; border-collapse: collapse;">
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;"><code>smr_265wbt - World [1pg] (bbf riv) @en.jpg</code></td>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;">Black & Blue, showing rivers</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;"><code>smr_265wbt - World [2pg-flipped] (fcr) @en.jpg</code></td>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;">Full color relief</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="info-card">
                    <h3>Filename Conventions for Map Samples</h3>

                    <p>The filename of map samples may be comprised of the following elements:</p>
                        <table xmlns="http://www.w3.org/1999/xhtml" cellspacing="0" cellpadding="4" dir="ltr" border="1" data-sheets-root="1" data-sheets-baot="1" style="border-collapse: collapse; width: 100%; font-size:8pt;">
                        <thead>
                            <tr style="background-color: #e8e8e8; font-weight: bold;">
                            <td style="border: 1px solid #999; padding: 8px; border-bottom: 2px solid #666;">Coll ID</td>
                            <td style="border: 1px solid #999; padding: 8px; border-bottom: 2px solid #666;">Map ID</td>
                            <td style="border: 1px solid #999; padding: 8px; border-bottom: 2px solid #666;">Map Title</td>
                            <td style="border: 1px solid #999; padding: 8px; border-bottom: 2px solid #666;">[File-variant]</td>
                            <td style="border: 1px solid #999; padding: 8px; border-bottom: 2px solid #666;">(options)</td>
                            <td style="border: 1px solid #999; padding: 8px; border-bottom: 2px solid #666;">@lang</td>
                            <td style="border: 1px solid #999; padding: 8px; background-color: #ffffff;"></td>
                            <td style="border: 1px solid #999; padding: 8px; border-bottom: 2px solid #666;">Joined</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                            <td style="border: 1px solid #ccc; padding: 6px; border-left: 2px solid #666;">smr_</td>
                            <td style="border: 1px solid #ccc; padding: 6px;">265wbt</td>
                            <td style="border: 1px solid #ccc; padding: 6px;"> - World</td>
                            <td style="border: 1px solid #ccc; padding: 6px;"> [1pg]</td>
                            <td style="border: 1px solid #ccc; padding: 6px;"> (bbf riv)</td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-right: 2px solid #666;"> @en</td>
                            <td style="border: 1px solid #ccc; padding: 6px; background-color: #ffffff;"></td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-right: 2px solid #666; border-left: 2px solid #666;">smr_265wbt - World [1pg] (bbf riv) @en</td>
                            </tr>
                            <tr>
                            <td style="border: 1px solid #ccc; padding: 6px; border-left: 2px solid #666; border-bottom: 2px solid #666;">smr_</td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-bottom: 2px solid #666;">265wbt</td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-bottom: 2px solid #666;"> - World</td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-bottom: 2px solid #666;"> [2pg-flipped]</td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-bottom: 2px solid #666;"> (fcr)</td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-bottom: 2px solid #666; border-right: 2px solid #666;"> @en</td>
                            <td style="border: 1px solid #ccc; padding: 6px; background-color: #ffffff;"></td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-bottom: 2px solid #666;  border-right: 2px solid #666; border-left: 2px solid #666;">smr_265wbt - World [2pg-flipped] (fcr) @en</td>
                            </tr>
                            <tr>
                            <td style="border: 1px solid #ccc; padding: 6px; border-left: 2px solid #666;">smr_</td>
                            <td style="border: 1px solid #ccc; padding: 6px;">185wbt</td>
                            <td style="border: 1px solid #ccc; padding: 6px;"> - Philips Travels</td>
                            <td style="border: 1px solid #ccc; padding: 6px;"></td>
                            <td style="border: 1px solid #ccc; padding: 6px;"> (fcr)</td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-right: 2px solid #666;"> @en</td>
                            <td style="border: 1px solid #ccc; padding: 6px; background-color: #ffffff;"></td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-right: 2px solid #666; border-left: 2px solid #666;">smr_185wbt - Philips Travels (fcr) @en</td>
                            </tr>
                            <tr>
                            <td style="border: 1px solid #ccc; padding: 6px; border-left: 2px solid #666;">smr_</td>
                            <td style="border: 1px solid #ccc; padding: 6px;">185wbt</td>
                            <td style="border: 1px solid #ccc; padding: 6px;"> - Philips Travels</td>
                            <td style="border: 1px solid #ccc; padding: 6px;"> [sm]</td>
                            <td style="border: 1px solid #ccc; padding: 6px;"> (bbr)</td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-right: 2px solid #666;"> @en</td>
                            <td style="border: 1px solid #ccc; padding: 6px; background-color: #ffffff;"></td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-right: 2px solid #666; border-left: 2px solid #666;">smr_185wbt - Philips Travels [sm] (bbr) @en</td>
                            </tr>
                            <tr>
                            <td style="border: 1px solid #ccc; padding: 6px; border-left: 2px solid #666; border-bottom: 2px solid #666;">smr_</td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-bottom: 2px solid #666;">185wbt</td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-bottom: 2px solid #666;"> - Philips Travels</td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-bottom: 2px solid #666;"> [sm-bw]</td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-bottom: 2px solid #666;"></td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-right: 2px solid #666; border-bottom: 2px solid #666;"> @en</td>
                            <td style="border: 1px solid #ccc; padding: 6px; background-color: #ffffff;"></td>
                            <td style="border: 1px solid #ccc; padding: 6px;  border-bottom: 2px solid #666; border-right: 2px solid #666; border-left: 2px solid #666;">smr_185wbt - Philips Travels [sm-bw] @en</td>
                            </tr>
                            <tr>
                            <td style="border: 1px solid #ccc; padding: 6px; border-left: 2px solid #666;">smr_</td>
                            <td style="border: 1px solid #ccc; padding: 6px;">195wbt</td>
                            <td style="border: 1px solid #ccc; padding: 6px;"> - Paul journey 1</td>
                            <td style="border: 1px solid #ccc; padding: 6px;"> [bwr]</td>
                            <td style="border: 1px solid #ccc; padding: 6px;"></td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-right: 2px solid #666;"> @en</td>
                            <td style="border: 1px solid #ccc; padding: 6px; background-color: #ffffff;"></td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-right: 2px solid #666; border-left: 2px solid #666;">smr_195wbt - Paul journey 1 [bwr] @en</td>
                            </tr>
                            <tr>
                            <td style="border: 1px solid #ccc; padding: 6px; border-left: 2px solid #666; border-bottom: 2px solid #666;">smr_</td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-bottom: 2px solid #666;">195wbt</td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-bottom: 2px solid #666;"> - Paul journey 1</td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-bottom: 2px solid #666;"> [bw-dark]</td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-bottom: 2px solid #666;"></td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-right: 2px solid #666; border-bottom: 2px solid #666;"> @en</td>
                            <td style="border: 1px solid #ccc; padding: 6px; background-color: #ffffff;"></td>
                            <td style="border: 1px solid #ccc; padding: 6px; border-right: 2px solid #666; border-left: 2px solid #666; border-bottom: 2px solid #666;">smr_195wbt - Paul journey 1 [bw-dark] @en</td>
                            </tr>
                        </tbody>
                    </table>
                    <br>
                    <p>The elements are defined as follows:</p>
                    <table xmlns="http://www.w3.org/1999/xhtml" cellspacing="4" cellpadding="4" dir="ltr" border="0" data-sheets-root="1" data-sheets-baot="1" style="font-size:9pt;">
                    <colgroup>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td><b>Coll ID:</b></td>
                        <td><div>
                            <div>Collection ID. All samples from the SIL Map Repository have a collection ID of &quot;smr&quot;.</div>
                        </div></td>
                        </tr>
                        <tr>
                            <td><b>Map ID:</b></td>
                        <td><div>
                            <div>Topic number (grouping similar maps) plus 2- or 3-character code indicating the set of usage &amp; permissions rules that apply.</div>
                        </div></td>
                        </tr>
                        <tr>
                            <td><b>Map Title:</b></td>
                        <td><div>
                            <div>A title for the map, in English</div>
                        </div></td>
                        </tr>
                        <tr>
                            <td><b>File variant:</b></td>
                        <td><div>
                            <div>Distinguishes a particular variant of the master file among other (possible) master files.</div>
                        </div></td>
                        </tr>
                        <tr>
                            <td><b>Options:</b></td>
                        <td><div>
                            <div>Any file-internal options utilized in producing a particular sample of the map.</div>
                        </div></td>
                        </tr>
                        <tr>
                            <td><b>Lang:</b></td>
                        <td><div>
                            <div>The language code of the language used in the map.</div>
                        </div></td>
                        </tr>
                    </tbody>
                    </table>
                    <br>
                    <p>The following map types may be indicated in the options field:</p>
                        <table cellspacing="8" cellpadding="4" dir="ltr" border="0" data-sheets-root="1" data-sheets-baot="1" style="font-size:9pt;">
                            <tbody>
                                <tr>
                                    <td><b>BWR</b></td>
                                    <td>black & white, relief</td>
                                </tr>
                                <tr>
                                    <td><b>BWF</b></td>
                                    <td>black & white, flat</td>
                                </tr>
                                <tr>
                                    <td><b>BBR</b></td>
                                    <td>blue & brown, relief</td>
                                </tr>
                                <tr>
                                    <td><b>BBF</b></td>
                                    <td>blue & brown, flat</td>
                                </tr>
                                <tr>
                                    <td><b>FCR</b></td>
                                    <td>full color, relief</td>
                                </tr>
                                <tr>
                                    <td><b>FCF</b></td>
                                    <td>full color, flat</td>
                                </tr>
                                <tr>
                                    <td><b>MCR</b></td>
                                    <td>muted color, relief</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
            </div>
        `;
  }

  getInDesignMapsPage() {
    return `
            <div class="page-header">
                <h1 class="page-title">Working with InDesign Maps</h1>
                <p class="page-subtitle">Complete guide for typesetting with IDML files</p>
            </div>
            
            <div class="content-section">
                <div class="info-card">
                    <h3>Using InDesign Data Merge - Create the InDesign file</h3>
                    
                    <ol>
                        <li>For the map you wish to typeset, open the corresponding InDesign file. (If you downloaded the expanded edition of the repository, open the version that does NOT have "@en" or other language code as part of the filename.)</li>
                    </ol>

                    <p><i>Note:</i> All maps are distributed as .idml files instead of the usual .indd because this format is supported back to CS4.
                    <br>All artwork is embedded directly in the .idml file.</p>
                    
                    <ol start="2">
                        <li>If your maps use a Roman-based writing system, all you'll need to do is ensure that the <a href="https://software.sil.org/charis/download/">Charis SIL</a> and <a href="https://software.sil.org/andika/download/">Andika</a> fonts are installed on your system. If you receive a message that you have missing fonts, simply install the versions of these fonts that can be found in the "Document fonts" subfolder in the top level of "SIL Maps Repository".</li>
                        
                        <li>Many of these InDesign maps support multiple options within one IDML file, most often the map type (such as "full color relief" or "black & white flat") and sometimes other variations (such as "complex routes" vs "simple routes" on the Exodus map). You can manually toggle layers to get the variation you're wanting. Note that some paragraph styles like "Ocean" and "Region" use color swatches named "Water color" and "Region color", and if you're wanting a black & white map, you'll need to change these paragraph styles to use the swatches named "Water BW" and "Region BW" instead. 
                        <br>However, there's a better option: You can install the <b>MapMonkey</b> script, and run this whenever you want to "monkey" with the map options, either before or after the data merge. For example, you might want a black & white map for your print publication, but the color version of it for your Scripture app. For more information, see the <a href="#map-monkey">MapMonkey for InDesign</a> page.</li>
                        
                        <li>If your maps use a non-Roman writing system, you will need to ensure that the definitions of the <code>font1</code> and <code>font2</code> paragraphs styles specify the font and any other properties that are required for proper rendering. All styles used for labels inherit the writing system properties from these two styles.
                            <ul>
                                <li>Example: For a map that uses Devanagari script and Western digits, in the <code>font1</code> and <code>font2</code> paragraph styles, set the font to <a href="https://software.sil.org/annapurna/download/">Annapurna SIL</a>, set the justification to "Adobe World-Ready Paragraph Composer", and set the language to "Hindi".
                                    
                                    <br>Alternatively, for this particular case, you may simply <a href="https://www.google.com/search?q=how+to+import+all+text+styles+in+indesign">import these paragraph definitions</a> from the <code>Deva_AnnapurnaSIL_WesternDigits.indd</code> file which can be found in the <code>!Styles</code> folder at the root of the map repository.
                                    
                                </li>
                                <li>If the fonts that you are using do not have native bold and/or italic faces, you will need to edit the respective paragraphs styles (e.g. <code>font1 bold italic</code>) to fake the face appropriately, such as by adding a very slight outer stroke to fake bold, and/or skew for italics.</li>
                                <li>The <code>Regions</code> paragraph style typically employs expanded tracking in Roman-script projects, but the amount of expansion may be inappropriate in other writing systems. For this reason, you can modify the <code>expanded</code> character style to set an appropriate tracking property.</li>
                                <li>If your writing system uses a numeral system supported natively by InDesign, (that is, Bengali, Burmese, Devanagari, Farsi, Full Farsi, Gujarati, Gurmukhi, Eastern Arabic ["Hindi"], Kannada, Khmer, Lao, Malayalam, Oriya, Tamil, Telugu, Thai, or Tibetan), it will not be necessary to manually replace the Western digits on the map (such as for the scale) with local digits. InDesign can render the normal digit characters (codepoints U+0030 to U+0039) as if they were in various other numeral systems, without needing to replace the actual numerical characters. The <code>!AllDigitStyles.indd</code> file (which can likewise be found in the <code>!Styles</code> folder) contains a paragraph style for each of these numeral systems. By loading a style from that document into your map, and basing a style in that document on this style, you can control the digit system that InDesign uses to render normal digits.
                                    <ul>
                                        <li>For example, for a map that uses Devanagari script and Devanagari digits, import the <code>devanagari digits</code> paragraph style into your map from the <code>!AllDigitStyles.indd</code> file, and then base the definition of <code>font1</code> and <code>font2</code> on this paragraph style.
                                        <br><br>Alternatively, for this particular case, you could import all paragraph styles from the <code>Deva_AnnapurnaSIL_DevaDigits.indd</code> file into your map.
                                        </li>
                                    </ul>
                                </li>
                                <li>Once you have set up your <code>font1</code> and <code>font2</code> styles appropriately for your writing system, 
                                save a copy of this document to be used as the import source for all maps. 
                                If it could be helpful for other typesetters who may use the same writing system, 
                                please contact the repository manager via the <a href="#contact">Contact page</a>, and provide a sharing link to the file you'd like to contribute to the repository. Thank you!</li>
                            </ul>
                        </li>
                    </ol>
                    
                    <ol start="5">
                        <li>If you have all the needed fonts installed on your computer but you are still seeing a pink highlight behind your text, that is an indication that your font is still missing. Check to make sure there are no Character Styles applied. Removing them should fix your issue.</li>
                        <li>Open the Layers panel (Windows/Layers). This panel provides a number of customization possibilities, so explore it thoroughly. There is often a layer titled "Map Choices". Click the > symbol to the left to view the variations. Toggle the layer's visibility by clicking on the eyeball symbol.</li>
                        <li>If you choose a map that has a black & white layer available, you can either apply the bw version of the styles to the appropriate layers 
                        or redefine the "<code>Regions</code>", "<code>Water</code>", "<code>Ocean</code>", and "<code>Seas</code>" paragraph styles to use the "BW" 
                        versions of the color swatches. (e.g. Edit the style, and under Character Color, instead of the "Region color" swatch, select the "Region BW" 
                        swatch.) Better yet, use the <a href="#map-monkey">MapMonkey</a> tool to automate this process.</li>
                    </ol>
                </div>
                
                <div class="info-card">
                    <h3>Using InDesign Merge - Data Merging</h3>
                    
                    <ol>
                        <li>Open the repository map (.idml), and save a copy to work from in .indd format. We recommend saving the file in the project \\local\\figures directory and 
                        adding the project name to the filename. The traditional option is to prefix the project name to the filename. (e.g. <code>zezi_155wbt - Holy Land.indd</code>) 
                        Alternatively, you can append it after an "@" symbol (e.g. <code>155wbt - Holy Land @Zezi.idml</code>). 
                        As this matches the pattern of the samples map filenames, this can simplify automatic substitution of sample placeholders with the actual map file at typesetting time 
                        using a changes.txt rule. </li>
                        
                        <li>Go to the InDesign menu item "Window" and navigate to "Utilities". Choose "Data Merge" from the fly-out menu. 
                        Go to the Panel Menu icon (stacked horizontal lines in the upper right corner of the Data Merge panel) 
                        <img src="images/image_B10.png" alt="Panel Menu Icon" style="vertical-align: middle; max-height: 20px;"> and choose "Select Data Source."</li>
                        
                    <div class="info-card">
                        <img src="images/image_B3.png" alt="Data Merge Process" style="max-width: 70%; margin: 1rem 0; align: center;">
                    </div>
                    
                        <li>InDesign may warn you, "Changing to a new data source may make the inserted data fields invalid. You may have to insert the placeholders again." Click "OK" to proceed.</li>
                        <li>If you (or the translation team) used Paratext Diagram Labeler and exported the data merge files to the default location, you'll find them in Paratext Project's 
                        \\shared\\labeler folder. For example, <code>155wbt - Holy Land @Zezi.idml.txt</code> The list should populate the Data Merge panel. 
                        (If you used Scripture Map Labeler instead, see its accompanying documentation for details on data merge filenames and locations.)</li>
                    </ol>
                    
                    
                    <div style="display: flex; align-items: flex-start; margin: 1rem 0;">
                        <img src="images/image_B5.png" alt="Data Merge Panel" style="max-width: 200px; margin-right: 1rem;">
                        <div>
                            <p>Enable "Preview" mode by checking the box in the lower left corner of the Data Merge panel.  
                            Then you should see the labels in your language rather than the original English labels or the field names enclosed in &lt;&lt;angle brackets&gt;&gt;. 
                        </div>
                    </div>
                    
                            <ol start="4">
                                <li><strong>Continuing to work in preview mode</strong>, adjust your map as follows:</li>
                            </ol>
                            
                            <p>First of all, especially if you are using a non-Roman writing system, check that everything is rendering correctly. 
                            On your first map, you may need to make the changes to the <code>font1</code> and <code>font2</code> paragraph styles as described above in step 4 of "Using InDesign Data Merge - Create the InDesign file".
                            On successive maps, you should be able to simply import these paragraph styles from your first map file. (From the Paragraph Styles panel, 
                            click the menu icon in the upper right corner and choose "Load All Text Styles...")</p>

                            <p>Next, select the map options you want. This is the time to call on the <a href="#map-monkey">MapMonkey</a> if you have it installed.</p>

                            <p>After this, check for overset text. This is text that does not fit within its text box. Most text frames are set to "Auto Size" appropriately,
                            but some labels may need to be resized. Overset text boxes are indicated with a red "+" symbol in the lower right corner of the text box.</p>
                            <p>Using the Selection tool (top arrow in the toolbox), any such text frames can be selected and resized as needed. 
                            You can also check for overset text by looking at the Preflight Panel indicator at the bottom of your InDesign window:</p>
                            
                            <img src="images/image_B2.png" alt="Preflight Panel Indicator" style="max-width: 100%; margin: 0.5rem 0;">
                    <p>Reposition any text boxes as needed. You can adjust the font size of an individual entry or change the paragraph style so that you 
                    adjust the size of all of the "cities", for example. Either can be appropriate at different times.</p>
                    
                    <p>Any fields that contain only dashes/hyphens (or filled with the word "OMIT") are fields that the translators intend to be omitted. Hide these labels, 
                    so that they don't appear in the final output, by un-ticking the eyeball for that item in the Layers panel. Likewise, hide any corresponding information 
                    (like the Mile scale) by un-ticking that layer. 
                    Removing dots for deliberately omitted cities is easy, as there is a separate InDesign object for each dot.</p>
</p>
                    
                    <p>Now is the time - still in preview mode - to make any other cosmetic changes to the map, as needed by the current project. 
                    Bear in mind that you may need two different versions of the map: a black and white one for print and a color one for digital use.</p>
                    
                    <p>The cosmetic changes in mind are changing the visibility of various layers, changing style attributes, and/or moving text labels. 
                    You should not make changes directly to the preview text, not even inserting a line break to wrap long text, as such changes will not be preserved when 
                    doing the data merge. Rather, if you need a long label to be wrapped, you should change the dimensions and/or other properties of the text frame 
                    and/or paragraph. E.g. Change the text frame's object style to "multiline". (Note that the paragraph's "Balance Ragged Lines" setting, which affects 
                    wrapping, is turned on, as inherited from the <code>font1</code> style.) 
                    It is recommended that you keep the Data Merge panel open so that InDesign will prevent you from mistakingly editing the preview text. 
                    Unless the Data Merge panel is open, the document will behave just like an already-merged document, with editable labels. 
                    (It will be possible AFTER step 6 in Repeating the Merge Cycle to edit the text and preserve the change, but it is hoped that little of that will be needed.)</p>
                    
                    <p>Note that it is NOT necessary to use the Merge button and create a second, merged InDesign file at this point. 
                    If you save and export to jpg or to pdf with Preview mode turned on, the files will be quite usable at this point. 
                    We do recommend doing the final merge step and saving that file after you are certain the team will make no more label changes. 
                    (See Repeating the Merge Cycle below).</p>
                    
                    <div class="info-card">
                        <img src="images/image_B6.jpg" alt="InDesign Map Preview" style="max-width: 100%; margin: 1rem 0;">
                    </div>
                </div>
                
                <div class="info-card">
                    <h3>Saving your InDesign map file</h3>
                    
                    <p>Save the .indd file as described above.</p>
                    
                    <p>If the Paratext project does not already contain a \\fig field for this map/diagram, such as by doing "Insert Figure" with a sample image,
                    or by the USFM representation of a diagram used by Paratext Diagram Labeler, you will need to create one now. First, export the map to a jpg file, 
                    and then use this file to insert \\fig information into the Paratext Project at the appropriate locations. 
                    If you have editing privileges to the project, you can do this yourself or else share it with the team for them to do so. 
                    This will give you two map files in your project IDENTICALLY NAMED except for their extensions. 
                    First - a master copy file (.indd) containing all your edits and the original merge keys, which you will re-use for subsequent merges. 
                    Second, a (.jpg) file placed into the Paratext project.</p>
                </div>
                
                <div class="info-card">
                    <h3>Repeating the Merge Cycle</h3>

                    <p>After each round of team proofing, there may be text and spelling changes that need to be re-merged into the project maps:</p>

                    <ol>
                        <li>Re-export the data merge files.</li>
                        <li>For each affected map, open the master file copy (.indd) and "Update data source" on the Merge Tool menu.</li>
                        <li>Save each revised map according to "Export Map Merge Files", replacing the previous vernacular (.indd) file.</li>
                        <li>When the team has fully approved the maps and no more map label changes are expected, you can complete the final step of "Merging" 
                            the document and creating a second InDesign file with the labels actually embedded in the file.</li>
                        <li>Choose "Create Merged Document" from either the Panel Menu or the "Merge Data" icon located just below the Panel Options icon.</li>
                        <li>The Create Merged Document dialogue box will open. The default settings will suffice; click OK when prompted. 
                        Note: While performing the Merge task, your merged data will appear to revert back to the generic data fields, but it is still there. 
                        Once the Data Merge is completed, a new InDesign file with a "-1" added to the name will be generated. 
                        <strong>We recommend your saving this file as an .idml file and removing the -1</strong>. 
                        That way the files are identically named and you have not overwritten your mergeable .indd file. 
                        The merged .idml file will preserve the data more safely for long term archiving.</li>
                    </ol>
                </div>
                
                <div class="info-card">
                    <h3>Bringing an InDesign map into Scripture Publications</h3>
                    
                    <ol>
                        <li>InDesign maps (.indd files) should be placed directly into InDesign Scripture documents. 
                        Publishing Assistant should automatically place any map which has been formatted in Paratext using the \\fig markup and is located in the 
                        Paratext project's local/figures folder. Occasionally, you may still see the jpg being placed instead of your .indd. 
                        The best way to fix this is to ascertain the exact location of the \\fig markup in Paratext and go to that location in the InDesign file. 
                        Edit the fig markup and change the filename to have the .indd extension. In PA6 jobs, you can find it using the Text Editor (ctrl-y). 
                        In PA7 jobs, figure markup is found in the Conditional Text Panel Menu. Make the "Hidden Illustration" text visible by clicking in the first 
                        column on that line, edit the markup, and turn off visibility again. In both cases, carefully verify that the hidden attributes apply to your new edits. 
                        Then use PubAssist to place the picture again.</li>
                        <li>When maps are placed directly in the Scripture text, they should have the title layer turned off and the title should be included instead in the 
                        caption and reference sections of the Paratext markup as appropriate. Revisit all the maps after final validation to make sure they (and the gutter rule) 
                        still look ok.</li>
                        <li>You may export the merged map to the jpg and PDF formats after final validation. The PDF is useful for archiving.</li>
                        <li>When archiving the final publication files, make sure to archive the local/figures and shared/labeler folders as well.</li>
                    </ol>
                </div>
            </div>
        `;
  }

  getMapCreatorMapsPage() {
    return `
            <div class="page-header">
                <h1 class="page-title">Working with Map Creator Maps</h1>
                <p class="page-subtitle">Complete guide for working with MAPX files</p>
            </div>
            
            <div class="content-section">
                <div class="info-card">
                    <h3>Create the localized Map Creator file</h3>
                    
                    <ol>
                        <li>Find the appropriate downloaded .mapx file for the map(s) you wish to prepare.</li>
                        <li>Copy the file to the project's \\local\\figures folder. We recommend following the naming convention of the generated merge files. If the original was named e.g. <code>245wbt -Seven Churches.mapx</code>, and your Paratext project was e.g. <code>Zezi</code>, your map file would be <code>245wbt - Seven Churches @Zezi.mapx</code>.</li>
                        <li>Open the .mapx file with Map Creator.</li>
                        <li>Go to File > Import > Translation Data. Browse to the .txt file that was exported from the SIL Map & Illustration Repository.</li>
                    </ol>
                    
                    <div class="info-card">
                        <img src="images/image_B8.png" alt="Map Creator Import Process" style="max-width: 100%; margin: 1rem 0;">
                    </div>
                    
                    <ol start="5">
                        <li>On the "Ready to import translations" just click Finish.</li>
                        <li>If all goes well, you will see "Import complete." The import process does, however, show conflicts with any previously imported translations for your project language. These will have to be resolved in consultation with your team.</li>
                        <li>Finalize your translated map.
                            <ol>
                                <li>Don't be surprised that your map will look exactly the same after the import! Go to the Language drop down under Map Options and choose your project language. Only then will your translated map appear.</li>
                            </ol>
                        </li>
                    </ol>
                    
                    <div style="display: flex; align-items: flex-start; margin: 1rem 0;">
                        <img src="images/image_B7.png" alt="Map Creator Language Selection" style="max-width: 250px; margin-right: 1rem;">
                        <div>
                            <ol start="2" style="list-style-type: lower-alpha;">
                                <li>Adjust location and other properties of text fields. There are many options! (Typesetters unfamiliar with Map Creator can profit from an excellent tutorial video <a href="https://vimeo.com/59357958">here</a>. For excellent support, email <a href="mailto:help@fmosoft.org">help@fmosoft.org</a>.) Any fields still displaying English within parentheses indicate missing translations, i.e. a blank verse in the corresponding Paratext XX Book chapter. (Note: It could also indicate a mismatch between the English name expected on the map and the English name in the translation data file, in which case, please report it to <a href="mailto:maps-illustrationsrepository_intl@sil.org">maps-illustrationsrepository_intl@sil.org</a>.)</li>
                            </ol>
                        </div>
                    </div>
                    
                    <div class="info-card">
                        <img src="images/image_B4.png" alt="Map Creator Adjustments" style="max-width: 100%; margin: 1rem 0;">
                    </div>
                    
                    <ol start="3" style="list-style-type: lower-alpha;">
                        <li>For any label that says "OMIT" or contains only dashes, select it and uncheck the "Visible" checkbox. This should hide both the label and any associated city dot.</li>
                    </ol>
                </div>
                
                <div class="info-card">
                    <h3>Bringing a Map Creator map into a Scripture publication</h3>
                    
                    <ol>
                        <li>PDFs and jpegs can be created in Map Creator via File > Export</li>
                        <li>PDFs of Map Creator maps should be placed directly into InDesign Scripture documents. Publishing Assistant should automatically place any map which has been formatted in Paratext using the \\fig markup and is located in the Paratext project's local/figures folder. Occasionally, you may still see the jpg being placed instead of your .pdf. The best way to fix this is to use the Text Editor in InDesign (ctrl-y) to edit the fig markup and change the filename to have the .pdf extension. Then use PubAssist to place the picture again.</li>
                        <li>When pictures are placed directly in the Scripture text, they should have the title field turned off (un-tick visible) and the title should be included instead in the caption and reference sections of the Paratext markup as appropriate. Revisit all the maps after final validation to make sure they (and the gutter rule) still look ok.</li>
                    </ol>
                </div>
                
                <div class="info-card">
                    <h3>Attribution Required for Using Map Creator</h3>
                    
                    <div class="content-section">
                        <p>Note that if you use Map Creator even with maps/diagrams that did not originate from Map Creator,
                        you are required to follow the attribution rules below, <i>in addition</i> to any attribution rules that 
                        may apply to the source of the maps/diagrams.</p>
                        
                                <h4>Attribution Rules</h4>
                                <p>Publications that include material disseminated by Map Creator or produced using Map Creator 
                                must include this credit:</p>

                                <p style="margin-left: 20px; font-family: monospace; background: #f5f5f5; padding: 10px; border-left: 3px solid var(--sil-medium-blue);">
                                    "Maps [and diagrams and charts] [on pages ___] are produced with Map Creator software from 
                                    fmosoft.com. Used by permission. All rights reserved."
                                </p>

                        <h4>More Information</h4>
                        <ul>
                            <li><strong>Home Page:</strong> <a href="https://fmosoft.com/map-creator">https://fmosoft.com/map-creator</a></li>
                            <li><strong>Intro Video:</strong> <a href="https://vimeo.com/59357958">https://vimeo.com/59357958</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
  }

  getMapMonkeyPage() {
    return `
            <div class="page-header">
                <h1 class="page-title">MapMonkey</h1>
                <p class="page-subtitle">Selecting options within IDML maps</p>
            </div>
            <div class="content-section">
                <div class="info-card">
                    <div style="text-align: center; margin: 20px 0;">
                        <img src="images/monkey1.jpg" alt="MapMonkey" style="max-width: 40%; border-radius: 6px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                    </div>
                </div>
                <div class="info-card">
                    <p><em>Current Version: 2025-04-09 — See <a href="#version-history-section">Version History</a> below</em></p>
                    
                    <p>MapMonkey is a tool that makes it quick and easy to "monkey" with various map options supported by InDesign maps in the SIL Map Repository:</p>
                    
                    <ul>
                        <li>Many maps support different map types, such as "full color relief" and "black and white flat".</li>
                        <li>A few maps have additional options. For example, the world locator inset on the combined map of Paul's journeys can be flipped to be Pacific-centric.</li>
                    </ul>
                    
                    <p>Manually adjusting the map for these options can require turning multiple layers on or off, and redefining paragraph styles that use blue or brown color swatches to use gray swatches instead.</p>
                    
                    <p>MapMonkey does all this for you through a simple dialog. For example:</p>
                    
                    <div style="text-align: center; margin: 20px 0;">
                        <img src="images/monkey2.png" alt="MapMonkey Dialog" style="max-width: 100%; border-radius: 6px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                    </div>
                    
                    <p><strong>Note:</strong> We anticipate enabling MapMonkey to manage switching a map between different writing system settings, so check back later for that.</p>
                </div>
                
                <div class="info-card">
                    <h3>Download and Installation</h3>
                    
                    <p>To install MapMonkey, first download <a href="https://drive.google.com/file/d/11ce2Qlwj9zYRk8-4wZy2sczGRDfF8qAd/view?usp=drive_link" target="_blank">MapMonkey.jsx</a>.</p>
                    
                    <p>You can find more detailed online guides for installing InDesign scripts, but in a nutshell:</p>
                    
                    <ol>
                        <li>Open the Scripts panel. (Window &gt; Utilities &gt; Scripts)</li>
                        <li>Right-click on the Application folder, and select "Reveal in Explorer".
                            <div style="text-align: center; margin: 15px 0;">
                                <img src="images/monkey3.png" alt="Scripts Panel" style="max-width: 100%; border-radius: 6px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                            </div>
                        </li>
                        <li>Move MapMonkey.jsx from wherever you downloaded it into the "Scripts Panel" folder.</li>
                    </ol>
                    
                    <p>To run the MapMonkey script, simply double-click on the MapMonkey.jsx item that now appears in the Scripts panel.</p>
                    
                    <div style="text-align: center; margin: 20px 0;">
                        <img src="images/monkey4.png" alt="Run MapMonkey" style="max-width: 100%; border-radius: 6px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                    </div>
                    
                    <p><strong>Have fun monkeying!</strong></p>
                </div>
                
                <div class="info-card" id="version-history-section">
                    <h3>Version History</h3>
                    
                    <table style="width: 100%; margin: 1rem 0; border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 0.5rem; font-weight: bold;">2025-04-09</td>
                                <td style="border: 1px solid #ddd; padding: 0.5rem;">Added support for versions of InDesign back to CS5</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 0.5rem; font-weight: bold;">2025-04-04</td>
                                <td style="border: 1px solid #ddd; padding: 0.5rem;">Added support for MCR map types</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 0.5rem; font-weight: bold;">2025-03-14</td>
                                <td style="border: 1px solid #ddd; padding: 0.5rem;">Initial release</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
  }

  getContactPage() {
    return `
            <div class="page-header">
                <h1 class="page-title">Contact</h1>
            </div>
            
            <div class="content-section">
                <div class="info-card">
                    <p>Please use the appropriate form below to contact us:</p>
                    
                    <div class="collapsible-form">
                        <h3 onclick="toggleForm('form1')" style="cursor: pointer; user-select: none;">
                            <span id="form1-icon" style="display: inline-block; width: 20px;">+</span> To request permissions to use maps or illustrations in publications:
                        </h3>
                        <div id="form1" style="display: none; margin-top: 10px;">
                            <p style="text-align: center;">To open this form in a new tab, visit <a href="https://tiny.cc/requestpermissions" target="_blank">tiny.cc/requestpermissions</a>.</p>
                            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScGc_jhYmu2KrVzlX8oL0-Iw32-0UY6kzD6j_wm5j-VD6RsAw/viewform?embedded=true" width="100%" height="1500" frameborder="0" marginheight="0" marginwidth="0" style="border-radius: 8px; background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">Loading…</iframe>
                        </div>
                    </div>
                    
                    <div class="collapsible-form">
                        <h3 onclick="toggleForm('form2')" style="cursor: pointer; user-select: none;">
                            <span id="form2-icon" style="display: inline-block; width: 20px;">+</span> To request access to master copies of maps or illustrations:
                        </h3>
                        <div id="form2" style="display: none; margin-top: 10px;">
                            <p style="text-align: center;">To open this form in a new tab, visit <a href="https://tiny.cc/requestimages" target="_blank">tiny.cc/requestimages</a>.</p>
                            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScCAOsNhonkU8H9msz7eUncVVme4MvtJ7Tnzjgl9s-KAtL3oA/viewform?embedded=true" width="100%" height="1500" frameborder="0" marginheight="0" marginwidth="0" style="border-radius: 8px; background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">Loading…</iframe>
                        </div>
                    </div>
                    
                    <div class="collapsible-form">
                        <h3 onclick="toggleForm('form3')" style="cursor: pointer; user-select: none;">
                            <span id="form3-icon" style="display: inline-block; width: 20px;">+</span> For all other inquiries:
                        </h3>
                        <div id="form3" style="display: none; margin-top: 10px;">
                            <p style="text-align: center;">To open this form in a new tab, <a href="https://docs.google.com/forms/d/e/1FAIpQLSedIIw87Qr1_nTgBfPG75Z7XRZdqxrCtxwT_oqTdaqNEmCStw/viewform" target="_blank">click here</a>.</p>
                            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSedIIw87Qr1_nTgBfPG75Z7XRZdqxrCtxwT_oqTdaqNEmCStw/viewform?embedded=true" width="100%" height="1200" frameborder="0" marginheight="0" marginwidth="0" style="border-radius: 8px; background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">Loading…</iframe>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  getMapsOverviewPage() {
    return `
            <div class="content-section">
                <h1 class="page-title">Maps & Diagrams</h1>
                <p class="page-subtitle">Create maps and diagrams to engage readers in the Scriptures.</p>

                <h2>Basics</h2>
                <div class="feature-grid">
                    <div class="feature-card">
                        <h3><span style="font-size: 36px; margin-right: 8px;">🗺️</span><a href="#maps-intro" data-page="maps-intro">Introduction</a></h3>
                        <p>About our Maps</p>
                    </div>
                    <div class="feature-card">
                        <h3><span style="font-size: 36px; margin-right: 8px;">🏷️</span><a href="#map-labeler" data-page="map-labeler">Why You Need a Labeler</a></h3>
                        <p>and  where to get it</p>
                    </div>
                    <div class="feature-card">
                        <h3><span style="font-size: 36px; margin-right: 8px;">🖼️</span><a href="#map-samples" data-page="map-samples">Sample Maps</a></h3>
                        <p>View and download sample maps/diagrams</p>
                    </div>
                    <div class="feature-card">
                        <h3><span style="font-size: 36px; margin-right: 8px;">📦</span><a href="#map-editions" data-page="map-editions">Editions</a></h3>
                        <p>Why are there Compact and Expanded editions?</p>
                    </div>
                    <div class="feature-card">
                        <h3><span style="font-size: 36px; margin-right: 8px;">⬇️</span><a href="#accessing-repo" data-page="accessing-repo">Accessing the Repository</a></h3>
                        <p>Download links and access instructions</p>
                    </div>
                </div>

                <h2>How to Use the Maps</h2>
                <div class="feature-grid">
                    <div class="feature-card">
                        <h3><span style="font-size: 36px; margin-right: 8px;">📂</span><a href="#map-varieties" data-page="map-varieties">Map Varieties</a></h3>
                        <p>Understand Map Varieties in the SIL Map Repository.</p>
                    </div>
                    <div class="feature-card">
                        <h3><img src="images/mapx.ico" alt="Map Creator" style="width: 36px; height: 36px; margin-right: 8px; vertical-align: middle;"><a href="#map-creator-maps" data-page="map-creator-maps">Map Creator Maps</a></h3>
                        <p>Importing *.mapx.txt data merge files, and more!</p>
                    </div>
                    <div class="feature-card">
                        <h3><img src="images/idml.ico" alt="InDesign" style="width: 36px; height: 36px; margin-right: 8px; vertical-align: middle;"><a href="#indesign-maps" data-page="indesign-maps">InDesign Maps</a></h3>
                        <p>Data-merging *.idml.txt files, and more!</p>
                    </div>
                    <div class="feature-card">
                        <h3><span style="font-size: 36px; margin-right: 8px;">🐵</span><a href="#map-monkey" data-page="map-monkey">MapMonkey for InDesign</a></h3>
                        <p>Selecting options within IDML maps</p>
                    </div>
                </div>
            </div>
        `;
  }
}

// Initialize the site when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new SiteManager();
});
