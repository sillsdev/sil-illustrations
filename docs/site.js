// Simple JavaScript for navigation and page management
class SiteManager {
  constructor() {
    this.pages = new Map();
    this.currentPage = "";
    this.init();
    // Make toggleForm available globally
    window.toggleForm = this.toggleForm.bind(this);
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
        illustrations: "Illustrations",
        maps: "MAPS & DIAGRAMS",
        "maps-intro": "MAPS & DIAGRAMS > INTRODUCTION",
        "map-samples": "MAPS & DIAGRAMS > SAMPLES",
        "map-editions": "MAPS & DIAGRAMS > EDITIONS",
        "accessing-repo": "MAPS & DIAGRAMS > ACCESSING THE REPOSITORY",
        "permission-rules": "MAPS & DIAGRAMS > PERMISSION RULES",
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
    const sidebar = document.getElementById("maps-nav");
    const contentWrapper = document.querySelector(".sil-content-wrapper");

    const learnPages = [
      "maps-intro",
      "map-samples",
      "map-editions",
      "accessing-repo",
      "permission-rules",
      "map-varieties",
      "map-creator-maps",
      "indesign-maps",
      "map-monkey",
    ];

    if (pageId === "maps" || learnPages.includes(pageId)) {
      sidebar.style.display = "block";
      contentWrapper.classList.add("with-sidebar");
      this.setupLearnSidebar(pageId);
    } else {
      sidebar.style.display = "none";
      contentWrapper.classList.remove("with-sidebar");
    }
  }

  setupLearnSidebar(currentPageId) {
    const sidebar = document.getElementById("maps-nav");
    sidebar.innerHTML = `
            <div class="sil-sidebar-header">
                <img src="images/logo.png" alt="SIL Map & Illustration Repository" class="sil-sidebar-logo">
            </div>
            <ul class="sil-sidebar-nav">
                <li><a href="#maps" data-page="maps" class="${currentPageId === "maps" ? "active" : ""}">Overview</a></li>
                <li><strong>Basics</strong></li>
                <li><a href="#maps-intro" data-page="maps-intro" class="${currentPageId === "maps-intro" ? "active" : ""}">Introduction</a></li>
                <li><a href="#map-samples" data-page="map-samples" class="${currentPageId === "map-samples" ? "active" : ""}">Samples</a></li>
                <li><a href="#map-editions" data-page="map-editions" class="${currentPageId === "map-editions" ? "active" : ""}">Editions</a></li>
                <li><a href="#accessing-repo" data-page="accessing-repo" class="${currentPageId === "accessing-repo" ? "active" : ""}">Accessing the Repository</a></li>
                <li><a href="#permission-rules" data-page="permission-rules" class="${currentPageId === "permission-rules" ? "active" : ""}">Permission Rules</a></li>
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

  displayPage(pageId) {
    const mainContent = document.querySelector(".sil-content");

    switch (pageId) {
      case "home":
        mainContent.innerHTML = this.getHomePage();
        break;
      case "illustrations":
        mainContent.innerHTML = this.getIllustrationsPage();
        break;
      case "maps":
        mainContent.innerHTML = this.getMapsOverviewPage();
        break;
      case "maps-intro":
        mainContent.innerHTML = this.getMapsIntroPage();
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
      case "permission-rules":
        mainContent.innerHTML = this.getPermissionRulesPage();
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

  getMapsIntroPage() {
    return `
            <div class="page-header">
                <h1 class="page-title">Introduction</h1>
                <p class="page-subtitle"><i>About our Maps, and Why You Need a Labeler</i></p>
            </div>
            <br>
            <div class="content-section">
                
                <div class="info-card">
                <p>The SIL Map Repository is a collection of maps and diagrams that may be helpful in Scripture publications. Most of the maps currently contained in the repository are owned by SIL Global, with attribution rules that credit Wycliffe Bible Translators, Inc., and where applicable, the artists. </p>
<p>There is also a supplementary collection of 3 maps/diagrams based on artwork by Horace Knowles, owned by the British and Foreign Bible Societies. Our current licensing agreement only allows us to distribute these for use on SIL-supported projects.</p>
<p>All of our maps and diagrams are enabled for use with data merge files. These data merge files should contain the map labels configured from your Paratext project data. While it is possible to copy and paste label text into any of our map files, this is strongly discouraged. Place-names are notorious for being spelled inconsistently in minority language Scripture projects, because they are typically transliterations, and there are always multiple ways that Hebrew or Greek terms could be transliterated into any given language. </p>
<p>The solution is to use either the <a href="https://sites.google.com/sil.org/scripture-map-labeler/home" target="blank">Scripture Map Labeler</a> plugin for Paratext, or its successor, the <a href="https://tiny.cc/labeler" target="blank">Paratext Diagram Labeler</a>.
Both of these can generate data merge files for Adobe InDesign (IDML maps) and for Map Creator (MAPX maps). </p>
<p><strong>InDesign Maps</strong></p>
<p><i>Important Note:</i> If you will be using other writing systems, other digit systems, or just other fonts, be sure to read the instructions on the best way to set this up. See <a href="#map-varieties">How to Use the Maps</a> for more details.</p>
<p><strong>Map Creator</strong><br />
  Several (but not yet all) of our IDML maps are also  available in MAPX format. In addition, a custom version of the Bible maps that  are built into Map Creator are available here. Use these copies rather than the  built-in templates with Paratext Diagram Labeler.</p>

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
                <p>Samples of all maps are available at <a href="https://tiny.cc/samplemaps" target="_blank">tiny.cc/samplemaps</a>. See <a href="https://docs.google.com/document/d/1zUMQK1CoSTT1FPKTAukK4M3IXS-7jAB0NgE85AnAu-g/edit?usp=sharing" target="_blank">Tips for Using the Sample Maps</a>. Translation teams will generally only need to download this folder of samples. This is the same folder included within the <strong>SIL Map Repository</strong> folder as <strong>!All Map Samples</strong>.</p>
                </div>
            </div>
        `;
  }

  getMapEditionsPage() {
    return `
            <div class="page-header">
                <h1 class="page-title">Editions of the Map Repository</h1>
            </div>
            
            <div class="content-section">
                <div class="info-card">
                <p>The map repository comes in two English editions, due to some unresolved uncertainty:</p>
<ul type="disc">
  <li><strong>Compact Edition: (570 MB) </strong>All the maps are directly in the &ldquo;SIL Map Repository&rdquo; folder (or the &ldquo;HK Supplementary Maps&rdquo; folder, if applicable).&nbsp;</li>
  <li><strong>Expanded Edition: (930 MB) </strong>All the maps are in sub-folders under the &ldquo;SIL Map Repository&rdquo; folder (or under the &ldquo;HK Supplementary Maps&rdquo; folder, if applicable). <br />
    Those sub-folders also contain:</li>
  <ul type="circle">
    <li>An additional version of the IDML file that has been merged with English labels, and so is no longer mergeable. English labels contain &ldquo;<strong>@en</strong>&rdquo; in the file name. E.g. <strong>065wbt - Ruth @en.idml</strong>&nbsp; This is provided as a backup for users who prefer to copy and paste labels in rather than using the data merge feature.&nbsp;</li>
    <ul type="square">
      <li>Note: There is some uncertainty on whether it is ever possible for the mergeable maps to feel different to the copy/paste user, such as by showing a field&rsquo;s name, for example, <strong>&lt;&lt;jerusalem_nt&gt;&gt;</strong>, without the user having explicitly specified a data merge file to use. The repository manager would request that, if possible, even copy/paste users first try the mergeable files, not the <strong>@en</strong> files, and then alert the <a href="mailto:maps-illustrationsrepository_intl@sil.org">Repository Manager</a> if any such problems occur, before resorting to using the <strong>@en</strong> files. This will help us to resolve the question of whether it&rsquo;s worth continuing to provide such files in the longer term. Thank you!</li>
    </ul>
    <li>An additional copy of the English data merge source file. (Also available in the <strong>DataMergeFiles</strong> folder.)</li>
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
            </div>
        `;
  }

  getPermissionRulesPage() {
    return `
            <div class="page-header">
                <h1 class="page-title">Permission and Attribution Rules</h1>
            </div>
            
            <div class="content-section">
                <div class="info-card">
                <p>The <strong>!Permission and Attribution Rules.docx</strong> file can be found in the <a href="https://tiny.cc/samplemaps" target="_blank"><strong>!All Map Samples</strong></a> folder in the repository.</p>
                </div>
            </div>
        `;
  }

  // Page content methods will be implemented as we build each page
  getIllustrationsPage() {
    return `
            <div class="page-header">
                <h1 class="page-title">Illustrations</h1>
            </div>
            
            <div class="content-section">
                <div class="info-card">
                    <h3>Illustration Sets</h3>
                    <p>The SIL Illustration repository contains illustration sets from various owners, each with different rules regarding who may use them, in which kind of publications they may be used, what kind of attribution is required, and who SIL may share the master copies with.</p>
                    <p>Make sure to read and understand the usage and attribution rules for each illustration set before selecting them for use.</p>
                </div>
            </div>
            <div class="content-section">
                <div class="info-card">
                    <h3>Sample Illustrations</h3>
                    <p>Translation teams can find low-resolution, watermarked samples of all illustrations available in the SIL Map & Illustration Repository at <a href="https://tiny.cc/sampleimages" target="_blank">tiny.cc/sampleimages</a>.
                    (They are available with search tags in English, Spanish, French, Bahasa Indonesia, Hindi, and Swahili.)</p>
                    <p>See <a href="https://lingtran.net/How+to+directly+insert+images%2C+illustrations%2C+and+figures+into+a+Paratext+project+from+a+searchable+database?highlight=illustrations" target="_blank">How to directly insert images, illustrations, and figures into a Paratext project from a searchable database</a>.</p>
                </div>
            </div>
            <div class="content-section">
                <div class="info-card">
                    <h3>Master Illustrations</h3>
                    <p>Typesetters may obtain copies of the Master Illustrations by submitting a request at <a href="https://tiny.cc/requestimages" target="_blank">tiny.cc/requestimages</a>.</p>
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
                <p>Similar maps are grouped with the same chronology number, such as "185" for maps relating to Philip's travels. 
                (Scripture Map Labeler, the predecessor to Paratext Diagram Labeler, required users to build sets of map labels in a Paratext "extra" book such as XXA, 
                using chapters and verses, and this grouping number was the "chapter" number for all maps in that set.)</p>
                <p>In the SIL Map Repository (SMR), there are three separate IDML files for <code>185wbt - Philips Travels</code>:</p>
                
                <table style="width: 100%; margin: 1rem 0; border-collapse: collapse;">
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;"><code>185wbt - Philips Travels.idml</code></td>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;">Full page color map</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;"><code>185wbt - Philips Travels [sm].idml</code></td>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;">Shorter, more square color map</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;"><code>185wbt - Philips Travels [sm-bw].idml</code></td>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;">Black & white version of the shorter map</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="content-section">
                <h2 class="section-title">Internal Map Options</h2>
                <p>Many maps have multiple options for display all within one IDML file. As you browse through the map samples, the internal options used are indicated within parentheses. For example, options on two varieties of the World map are (bbf, riv) and (fcr):</p>
                
                <table style="width: 100%; margin: 1rem 0; border-collapse: collapse;">
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;"><code>265wbt - World [1pg] (bbf riv) @en.jpg</code></td>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;">Black & Blue, showing rivers</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;"><code>265wbt - World [2pg-flipped] (fcr) @en.jpg</code></td>
                            <td style="border: 1px solid #ddd; padding: 0.5rem;">Full color relief</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="info-card">
                    <h3>Filename Conventions</h3>
                    <p>Please familiarize yourself with our maps' filename conventions described <a href="https://docs.google.com/spreadsheets/d/19xkEnd3x17eFAqChwzT6i9CmDxCJplLr/edit?gid=1704341479#gid=1704341479">here</a>.</p>
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
                                please contact the repository manager via the <a href="#contact">Contact page</a> to offer to contribute it to the repository.</li>
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
                    <h3>More about Map Creator</h3>
                    
                    <div class="content-section">
                        <ul>
                            <li><strong>Home Page:</strong> <a href="https://fmosoft.com/map-creator">https://fmosoft.com/map-creator</a></li>
                            <li><strong>Intro Video:</strong> <a href="https://vimeo.com/59357958">https://vimeo.com/59357958</a></li>
                            <li><strong>Support:</strong> <a href="mailto:help@fmosoft.com">help@fmosoft.com</a></li>
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
                <p class="page-subtitle"><i>Selecting options within IDML maps</i></p>
            </div>
            <br>
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
                            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScGc_jhYmu2KrVzlX8oL0-Iw32-0UY6kzD6j_wm5j-VD6RsAw/viewform?embedded=true" width="100%" height="1500" frameborder="0" marginheight="0" marginwidth="0" style="border-radius: 8px; background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">Loading…</iframe>
                        </div>
                    </div>
                    
                    <div class="collapsible-form">
                        <h3 onclick="toggleForm('form2')" style="cursor: pointer; user-select: none;">
                            <span id="form2-icon" style="display: inline-block; width: 20px;">+</span> To request access to master copies of maps or illustrations:
                        </h3>
                        <div id="form2" style="display: none; margin-top: 10px;">
                            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScCAOsNhonkU8H9msz7eUncVVme4MvtJ7Tnzjgl9s-KAtL3oA/viewform?embedded=true" width="100%" height="1500" frameborder="0" marginheight="0" marginwidth="0" style="border-radius: 8px; background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">Loading…</iframe>
                        </div>
                    </div>
                    
                    <div class="collapsible-form">
                        <h3 onclick="toggleForm('form3')" style="cursor: pointer; user-select: none;">
                            <span id="form3-icon" style="display: inline-block; width: 20px;">+</span> For all other inquiries:
                        </h3>
                        <div id="form3" style="display: none; margin-top: 10px;">
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
                <p>Create maps and diagrams to engage readers in the Scriptures.</p>

                <h2>Basics</h2>
                <div class="feature-grid">
                    <div class="feature-card">
                        <h3><span style="font-size: 36px; margin-right: 8px;">🗺️</span><a href="#maps-intro" data-page="maps-intro">Introduction</a></h3>
                        <p>About our Maps, and Why You Need a Labeler</p>
                    </div>
                    <div class="feature-card">
                        <h3><span style="font-size: 36px; margin-right: 8px;">🖼️</span><a href="#map-samples" data-page="map-samples">Samples</a></h3>
                        <p>View and download sample maps for your projects</p>
                    </div>
                    <div class="feature-card">
                        <h3><span style="font-size: 36px; margin-right: 8px;">📦</span><a href="#map-editions" data-page="map-editions">Editions</a></h3>
                        <p>Learn about Compact and Expanded editions</p>
                    </div>
                    <div class="feature-card">
                        <h3><span style="font-size: 36px; margin-right: 8px;">⬇️</span><a href="#accessing-repo" data-page="accessing-repo">Accessing the Repository</a></h3>
                        <p>Download links and access instructions</p>
                    </div>
                    <div class="feature-card">
                        <h3><span style="font-size: 36px; margin-right: 8px;">📄</span><a href="#permission-rules" data-page="permission-rules">Permission Rules</a></h3>
                        <p>Usage rights and attribution requirements</p>
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
