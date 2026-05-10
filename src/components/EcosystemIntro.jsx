import StackedCarousel from './StackedCarousel';

const nodes = [
  {
    num: "01",
    name: "Ace Clubhouse Pickleball Field",
    images: ['/media/ACE CLUBHOUSE PICKLEBALL/z7796167560419_aae07d9670f46f7071004041bb4855f5.jpg', '/media/ACE CLUBHOUSE PICKLEBALL/z7796171333698_46067a763a747e76009f7a75dd310794.jpg']
  },
  {
    num: "02",
    name: "Ace Squad Pickleball Social Club",
    images: ['/media/ACE SQUAD PICKLEBALL/ACE Squad Pickleball - Black.png', '/media/ACE SQUAD PICKLEBALL/ACE Squad Pickleball.png']
  },
  {
    num: "03",
    name: "Ace Recovery & Wellness Center",
    desc: "Floating therapy · Ice bath · Sauna · Swimming pool · Personal massage",
    images: ['/media/Ace Recovery/1.jpg', '/media/Ace Recovery/2.jpg']
  },
  {
    num: "04",
    name: "Ace Điện Giải",
    desc: "Electrolyte effervescent product",
    images: ['/media/ACE ĐIỆN GIẢI/z7243177252298_f166eac3ab86090ccc161388ee42cd4d (2).jpg']
  },
  {
    num: "05",
    name: "Hyperdot",
    desc: "Pickleball ball brand",
    images: ['/media/Hyperdot/1.jpg', '/media/Hyperdot/2.jpg']
  },
];

export default function EcosystemIntro() {
  return (
    <section className="ecosystem-intro-section" id="ecosystem-intro">
      <div className="container">

        <div className="section-header">
          <p className="section-label">KRULER-OWNED &amp; OPERATED</p>
          <h2 className="section-title">Sports &amp; Wellness<br />Ecosystem</h2>
          <p className="section-subtitle">
            The Ace ecosystem — Kruler's owned sports-and-wellness universe, anchored by the Ace Clubhouse property. Every node is fully Kruler-owned and operated.
          </p>
        </div>

        {/* ── Stacked Nodes Carousel ── */}
        <StackedCarousel items={nodes} type="node" />

        <div className="cta-cluster">
          <a href="#contact" className="btn-round primary"><span>Explore Opportunities</span></a>
          <a href="#properties" className="btn-round"><span>View Portfolio</span></a>
          <a href="#sports-wellness" className="btn-round"><span>Enter Sports &amp; Wellness Ecosystem</span></a>
        </div>

      </div>
    </section>
  );
}
