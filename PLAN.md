# LampBotics Website Redesign Plan

## Project Overview
**Goal:** Migrate lampbotics.com from Wix to self-hosted on the current VPS, with a modern, agent-centric design that reflects the company's evolved identity around translational research-to-products.

**Founded by:** Weiai (Wayne) Xu, Associate Professor at University of Massachusetts Amherst

**Source Material to Reference:**
- Current Wix site: https://www.lampbotics.com/
- AgentAcademy: https://agentacademy.lampbotics.com/
- Vibe-Infoveil: https://vibe-infoveil.lampbotics.com/trading-floor
- VineAnalyst: https://vineanalyst.lampbotics.com/
- LinkedIn Data: `/root/lampbotics-website/data/linkedin-*.json`

## Key Decisions (Confirmed)
| Item | Decision |
|------|----------|
| Newsletter | Substack: https://substack.com/@lampbotics |
| Analytics | Google Analytics (keep existing) |
| Contact | Display `lampbotics [at] gmail` (no form/mailto) |
| Social | LinkedIn: https://www.linkedin.com/company/107227953 |
| VineAnalyst | Link to https://vineanalyst.lampbotics.com/ |
| Legacy projects | Link to podcast episodes |
| Agent logs | Tagline only ("Built by agents. Approved by humans.") |
| Logo | User will provide in `assets/images/` |

---

## Design Philosophy

### Core Principles
1. **Human Stewardship** — AI as co-intelligence, not replacement. Humans retain control; agents handle execution.
2. **Multi-Model Accountability** — CommDAAF approach: no single model has authority. Validation through epistemic diversity (Claude + Kimi + GLM), transparent disagreement, and adversarial review.
3. **Research → Product** — Academic rigor meets practical application.
4. **All-Agentic Team** — Every project is built and operated by agentic systems, not just "AI-enabled."

### Visual Direction
- **Dark theme** (matching existing AgentAcademy vibe)
- **Sea/sand color palette** — Deep navy (`#0a1628`) to teal/aqua accents (`#22d3ee`), with warm sand highlights
- **Clean typography** — Sans-serif, modern, readable
- **Subtle motion** — CSS animations, no heavy JS frameworks
- **Hero videos** — Two YouTube videos embedded as GIF-like loops (autoplay, muted, loop) instead of static AVIF images

---

## Site Structure

```
/
├── index.html              # Homepage
├── about.html              # Philosophy + Team (agents)
├── products/               # Product detail pages
│   ├── agentacademy/
│   ├── vibe-infoveil/
│   ├── vineanalyst/
│   ├── lamppath/          # FaithTech project
│   └── faithtime/         # Social media FaithTech
├── projects/              # Older/legacy projects
│   ├── lamptales/
│   ├── synthetic-history/
│   └── mirage-alley/
├── manifesto/             # CommDAAF principles, design philosophy
├── contact.html
└── assets/
    ├── css/
    ├── js/
    ├── images/            # Logo + any additional graphics
    └── fonts/
```

---

## Homepage Sections (in order)

### 1. Hero
- **Tagline:** "Research Agents for a World That Moves Fast"
- **Subline:** "Translating computational social science into tools you can use."
- **Two CTAs:** "Explore Products" | "Read Our Manifesto"
- **Background:** Embedded YouTube Short playing as GIF-like loop (autoplay, muted, loop, no controls)
  - Video URL: `https://youtube.com/shorts/zOhcTDzn52A` (Video ID: `zOhcTDzn52A`)
  - Implementation: YouTube embed with `autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=zOhcTDzn52A`
  - Embed URL: `https://www.youtube.com/embed/zOhcTDzn52A?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=zOhcTDzn52A&playsinline=1`
  - Fallback: Dark gradient for browsers that block autoplay
- Subtle gradient overlay on top of video for text readability

### 2. Featured Products (The Two Pillars)
Two large cards side-by-side (stack on mobile):

**AgentAcademy** — "Training Ground for Research Agents"
- Multi-model autonomous studies (Claude + Kimi + GLM)
- Peer-reviewed agent outputs with transparent retractions
- "Intuitionist" agent: develops academic intuition from journal insights
- Published studies: AI chatbot bias, voter behavior, congressional hearings, Wikipedia dynamics
- Link: agentacademy.lampbotics.com

**Vibe-Infoveil** — "Prediction Markets Meet Social Intelligence"
- Real-time Polymarket/Kalshi aggregation
- Multi-agent debate and synthesis
- Live Trading Floor view
- Link: vibe-infoveil.lampbotics.com

### 3. Active Projects
Smaller cards, 3-column grid:
- **VineAnalyst** — "Social media intelligence for researchers" → https://vineanalyst.lampbotics.com/
- **LampPath** — "AI companions for spiritual formation" (FaithTech, link to project page)
- **FaithTime** — "Daily devotionals at the speed of now" (FaithTech on Instagram/TikTok)

### 4. Philosophy Strip
Full-width section:
- **Headline:** "Designed by Agents, Stewarded by Humans"
- **Three pillars:**
  1. **No Black Boxes** — Every decision traceable, every output reviewable
  2. **Multi-Model Consensus** — Single-model hallucinations die in committee
  3. **Academic Rigor, Product Speed** — CommDAAF methodology meets ship-it culture
- Link to `/manifesto.html` for full CommDAAF principles

### 5. Archive / Legacy Projects
Collapsible or below-the-fold section:
- LampTales — Narrative experiments
- Synthetic History Podcast — AI-generated deep dives
- The Mirage Alley Podcast — Fiction and atmosphere

### 6. CTA / Newsletter
- "See what agents built this week"
- Link to Substack: https://substack.com/@lampbotics

### 7. Footer
- Logo repeat
- Quick links: Products, Projects, Manifesto, Contact
- Social: LinkedIn (https://www.linkedin.com/company/107227953)
- Contact: `lampbotics [at] gmail`
- "Built by agents. Approved by humans."

---

## Technical Spec

### Stack
- **Pure HTML/CSS/JS** — No frameworks (keep it fast, portable)
- **Minimal vanilla JS** for interactions (nav, accordions, animations)
- **Responsive** — Mobile-first CSS Grid/Flexbox
- **SEO-friendly** — Semantic HTML, proper meta tags, structured data

### Assets
- **Two YouTube Shorts** embedded as GIF-like looping background visuals (muted, no controls):
  1. **Hero section:** `https://youtube.com/shorts/zOhcTDzn52A` (ID: `zOhcTDzn52A`)
  2. **Philosophy/About section:** `https://youtube.com/shorts/uzIJWuW6Wto` (ID: `uzIJWuW6Wto`)
  - Embed format: `https://www.youtube.com/embed/{ID}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist={ID}&playsinline=1&modestbranding=1`
  - CSS: `position: absolute; width: 100%; height: 100%; object-fit: cover; pointer-events: none;`
  - Note: YouTube Shorts are vertical (9:16). Will need CSS scaling/cropping to fit horizontal hero sections.
- **Logo:** User will provide in `assets/images/` (SVG preferred)
- Additional graphics: SVG or subtle CSS gradients/patterns

### Hosting Setup
- **Location:** `/var/www/lampbotics/` on current VPS
- **Nginx config:** New site file `lampbotics.com` in `/etc/nginx/sites-available/`
- **SSL:** Certbot for HTTPS (already installed on server)
- **DNS:** Wayne will repoint `lampbotics.com` from Wix to this server's IP after deployment

### Performance Requirements
- First Contentful Paint < 1.5s
- No render-blocking resources
- Lazy load images/iframes below fold
- YouTube embeds loaded with `loading="lazy"` where appropriate

---

## Content Notes

### About the "All-Agentic Team"
This is a key differentiator. Every LampBotics product is:
- Designed, coded, and deployed by AI agents (Claude Code, Cursor, etc.)
- Reviewed by multi-model panels (CommDAAF methodology)
- Stewarded by human judgment for final decisions
- Documented transparently — agent logs available where appropriate

This is not marketing fluff; it's the actual workflow. The site should feel like it was built by precise, rational agents — but with human-curated polish.

### FaithTech Projects (LampPath + FaithTime)
These should be presented as the "human-centered" side of the equation:
- Technology in service of meaning, not engagement metrics
- AI that respects contemplative pace
- Bridge between ancient wisdom and modern interfaces

Don't be preachy; be matter-of-fact.

---

## Migration Checklist

- [ ] Build static HTML site in `/root/lampbotics-website/` (will deploy to `/var/www/lampbotics/`)
- [ ] Embed YouTube Shorts as looping background visuals:
  - [ ] Hero: `zOhcTDzn52A`
  - [ ] Philosophy: `uzIJWuW6Wto`
  - [ ] Handle vertical-to-horizontal scaling/cropping
- [ ] Add logo to `assets/images/` (user to provide)
- [ ] Create nginx config and enable site
- [ ] Test on staging (use `staging.lampbotics.com` or IP directly)
- [ ] Verify SSL cert works
- [ ] Update DNS A record to point from Wix to this VPS
- [ ] Create styled 404 page
- [ ] Verify old URLs redirect appropriately (or 404 gracefully)
- [ ] Smoke test all external product links
- [ ] Add Google Analytics tracking code
- [ ] Add OpenGraph meta tags for social sharing

---

## Deliverables for Wayne

1. **Complete static website** ready to deploy
2. **Nginx configuration** file
3. **Documentation** on how to update content
4. **Optional:** Simple bash deploy script for future updates

---

## Questions / Decisions Needed

| Question | Status |
|----------|--------|
| Logo/Branding | **PENDING** — User will provide logo file in `assets/images/` |
| Newsletter | **RESOLVED** — Substack: https://substack.com/@lampbotics |
| Analytics | **RESOLVED** — Keep Google Analytics |
| Contact | **RESOLVED** — Display `lampbotics [at] gmail` |
| Socials | **RESOLVED** — LinkedIn: https://www.linkedin.com/company/107227953 |
| Hero videos | **RESOLVED** — YouTube Shorts: `zOhcTDzn52A` (hero) + `uzIJWuW6Wto` (philosophy) |
| i18n | English-only for now |

---

## Recent LampBotics Activity (from LinkedIn)

### Research Publications (AgentAcademy)
- **Devil's Advocate Index** — Study measuring asymmetric challenge behavior in AI chatbots (540 conversations, 9 chatbots). Found most chatbots push back more on conservatives; Claude challenges equally.
- **Google Trends Voter Analysis** — 38,000 search records from 13 states. Found Google Trends can't predict elections.
- **Congressional AI Hearings** — 192 hearings analyzed. AI framed as geopolitical competition, not risk management.
- **Wikipedia Editing Wars (Iran)** — Authority based on credentials, not identity.
- **Iranian Protest Virality** — Human-AI research framework case study.
- **Nonprofit Management Study** — First study using "Intuitionist" agent.

### Key Differentiators
- **Multi-model approach:** Claude + Kimi + GLM for validation through epistemic diversity
- **Transparent failures:** AgentAcademy has published retractions when agent analyses were flawed
- **Autonomous execution:** Research conducted by AI agents without human micro-management
- **Academic rigor + speed:** Challenging traditional peer review timelines

---

**Next Step:** All decisions resolved. Ready to build the complete static site in a new Claude Code session. Only pending item: logo file (user to provide in `assets/images/`).
