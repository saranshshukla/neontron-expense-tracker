import React from 'react';

export default function Investments() {
  const articles = [
    {
      title: 'Benjamin Graham’s Margin of Safety',
      body: `Benjamin Graham, often hailed as the father of value investing, introduced the principle of a “margin of safety” to safeguard capital against market fluctuations. Rather than chasing lofty price targets, Graham insisted on purchasing securities at a significant discount to their intrinsic worth, determined by analyzing tangible assets, earnings history, and competitive positioning. By enforcing this buffer—the gap between purchase price and estimated true value—an investor gains protection if estimates prove overly optimistic or unexpected setbacks occur.

In practice, acquiring shares at a 30-50% discount forces a conservative discipline: only the most underpriced opportunities pass muster. This approach discourages speculating on future growth assumptions and emphasizes stress-testing scenarios. Should earnings slump or economic conditions deteriorate, the margin of safety cushions downside risk. Over the decades, Graham’s protégés, including Warren Buffett, have demonstrated that patiently waiting for such favorable entry points builds portfolio resilience. Modern markets, with their rapid information flows, may narrow these discounts, yet the underlying principle remains timeless: prioritize capital preservation through conservative valuations before chasing growth.`
    },
    {
      title: 'Warren Buffett’s Economic Moat',
      body: `Warren Buffett revolutionized investing by blending Graham’s value tenets with a qualitative lens: the “economic moat.” An economic moat refers to a company’s durable competitive advantage—be it entrenched brand loyalty, patented technology, cost advantages, or network effects—which shields its profits from rivals. Instead of fleeting arbitrage plays, Buffett allocates capital to exceptional businesses that can compound earnings over decades.

Buffett meticulously evaluates whether a firm can sustain high returns on invested capital. Coca-Cola’s iconic brand, for instance, commands customer allegiance worldwide, while See’s Candies enjoys pricing power in niche markets. Once identified, such businesses can be held indefinitely, benefitting from reinvested dividends and rising intrinsic value. This patient, moat-centric strategy helps investors sidestep speculative froth, focusing instead on enduring prosperity. By marrying quantitative margins of safety with qualitative moats, Buffett’s framework has produced some of the highest risk-adjusted returns in modern finance.`
    },
    {
      title: 'Peter Lynch’s “Invest in What You Know”',
      body: `Peter Lynch, legendary manager of the Fidelity Magellan Fund, advocated discovering investment ideas through everyday observations. Before spreadsheet screens lit up Wall Street, Lynch scoured malls, grocery aisles, and service centers for burgeoning concepts that corporate analysts overlooked. This “invest in what you know” ethos empowers individual investors to leverage firsthand experience.

If a new café chain draws long lunchtime lines, or a smartphone accessory becomes ubiquitous among peers, these grassroots insights may presage broader market uptake. Lynch stressed validating trends with diligent company research—reviewing financial statements, management track records, and competitive dynamics—before committing capital. This blend of bottom-up curiosity and disciplined analysis helped Lynch identify winners like Dunkin’ Brands and Taco Bell, which were once modest local chains.

By tapping into living, breathing markets rather than complex econometric models, investors can gain a head start on institutional flows. Lynch’s accessible, boots-on-the-ground approach reminds us that valuable insights often lie outside financial newsfeeds.`
    },
    {
      title: 'Charlie Munger’s Multidisciplinary Perspective',
      body: `Charlie Munger, vice chairman of Berkshire Hathaway, credited his investment acumen to a broad mental toolkit drawing from psychology, economics, engineering, and history. Rejecting narrow financial doctrines, Munger championed “worldly wisdom”—integrating diverse frameworks to spot mispriced assets and avoid behavioral pitfalls.

Central to Munger’s repertoire is understanding cognitive biases: anchoring, confirmation bias, and social proof, which can lead investors astray. By studying psychology, one learns to counteract herd instincts and overconfidence. Engineering teaches stress-testing structural resilience; history offers parallels for economic cycles and policy shifts. Munger urged building a latticework of mental models, so that when evaluating a firm’s prospects, one can assess not only the numbers but also human motivations and systemic forces.

This holistic stance elevates investing from rote calculations to an art of synthesizing disparate insights. Rather than seeking a single silver-bullet metric, Munger’s approach equips investors to adapt to complex, evolving markets with intellectual curiosity and humility.`
    },
    {
      title: 'John Templeton’s Global Diversification',
      body: `Sir John Templeton pioneered global diversification long before it became mainstream. In the years following World War II, Templeton scoured undervalued markets across Europe, Asia, and Latin America, buying low when others hesitated. His willingness to look beyond domestic borders—and currency fluctuations—captured growth in overlooked economies at bargain prices.

Templeton’s mantra, “Buy when there’s blood in the streets,” underscored his contrarian courage in distressed environments. He assembled a robust, geographically diverse portfolio of equities and bonds, mitigating concentration risk from any single region or sector. This global lens also unlocked secular growth trends that domestic investors missed.

While modern platforms make global investing effortless, Templeton’s principle remains relevant: diversify across countries, industries, and asset classes to smooth returns and seize opportunities where valuations are most attractive. By expanding one’s investable universe globally, investors can enhance risk-adjusted performance over rolling market cycles.`
    }
  ];

  return (
    <section className="pt-24 px-6 animate-fade-up">
      <h2 className="text-4xl neon-glow mb-6">Investment Techniques</h2>
      <div className="space-y-12">
        {articles.map((a, i) => (
          <div key={i} className="glass-card p-6">
            <h3 className="text-2xl mb-4 neon-glow">{a.title}</h3>
            {a.body.split('\n\n').map((para, idx) => (
              <p key={idx} className="opacity-75 mb-4">{para}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
