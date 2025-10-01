export interface Article {
  slug: string;
  title: string;
  author: string;
  publishDate: string;
  summary: string;
  image: string;
  content: string;
}

export const articles: Article[] = [
  {
    slug: "5-tips-to-maximize-jaw-crusher-throughput",
    title: "5 Tips to Maximize Jaw Crusher Throughput",
    author: "VTech Makkers Experts, Ahmedabad",
    publishDate: "June 10, 2025",
    summary: "Learn how proper feeding, maintenance, and operational adjustments can significantly increase the output and efficiency of your primary crushing circuit.",
    image: "/images/articles/jaw-crusher-throughput.jpg",
    content: `
      <h2>1. Ensure Consistent and Regulated Feeding</h2>
      <p>Surge loading and trickling feed can both harm efficiency. Use a vibrating grizzly feeder to provide a steady, controlled flow of material into the crusher. This prevents choking and ensures optimal utilization of the crushing chamber volume. Proper feeding distribution across the full width of the chamber is essential for balanced wear and maximum throughput.</p>
      
      <h2>2. Optimize the Closed Side Setting (CSS)</h2>
      <p>The CSS is the most critical factor in determining product size and throughput. Adjusting it properly for your desired output is key to achieving optimal performance. A wider setting increases throughput but produces coarser material, while a tighter setting reduces capacity but creates finer products. Monitor wear and adjust accordingly to maintain consistent output specifications.</p>
      
      <h2>3. Maintain Proper Eccentric Speed</h2>
      <p>Operating at the manufacturer's recommended eccentric speed ensures optimal crushing action. Too high a speed can cause excessive wear and power consumption, while too low a speed reduces throughput. The ideal speed varies with material hardness and desired product size, typically ranging from 250-400 RPM for most jaw crushers.</p>
      
      <h2>4. Implement Preventive Maintenance</h2>
      <p>Regular inspection and maintenance of jaw plates, toggle plates, and bearings prevents unexpected downtime and maintains peak performance. Monitor jaw plate wear patterns to identify feeding issues or misalignment. Replace worn components before they fail to avoid damage to other crusher parts and maintain consistent product quality.</p>
      
      <h2>5. Optimize Material Properties and Preparation</h2>
      <p>Pre-screening oversized material and removing fines before crushing improves efficiency. Controlling moisture content, especially in clay-bearing materials, prevents clogging and improves material flow. Consider pre-crushing of extremely hard materials to reduce stress on the primary crusher and improve overall circuit performance.</p>
      
      <p><strong>Conclusion:</strong> By implementing these five strategies, operations can typically achieve 15-25% improvement in jaw crusher throughput while extending equipment life and reducing operating costs. Regular monitoring and adjustment based on material characteristics and operational conditions is essential for sustained performance gains.</p>
    `
  }
];