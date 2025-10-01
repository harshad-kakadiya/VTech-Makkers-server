// FINAL, COMPLETE, AND AUTHORITATIVE DATA SOURCE FOR /data/products.ts
export const products = [
    {
        id: 1,
        slug: "double-toggle-jaw-crusher",
        name: "Double Toggle Jaw Crusher",
        category: "Crushers",
        image: "/images/products/double-toggle-jaw-crusher.jpg",
        description: "Engineered for the most demanding primary crushing applications, the Double Toggle Jaw Crusher provides maximum leverage to crush the hardest materials with minimal wear.",
        benefits: ["Superior performance on abrasive rock", "Reduced wear on jaw plates", "Consistent product shape", "Extremely robust and reliable"],
        applications: ["Primary crushing for Granite & Basalt", "Mining Operations (Iron, Bauxite)", "High-capacity Quarries"],
        spec_models: [
            { Model: "VTDT1", "Size (inches)": "16x09", "Size (mm)": "400x225", "Max Feed Size (mm)": 175, "CSS Range (mm)": "12-20", "Power (HP)": "20-30", "Capacity (TPH)": "12-20", "Toggle Type": "Double", RPM: 375 },
            { Model: "VTDT2", "Size (inches)": "20x12", "Size (mm)": "500x300", "Max Feed Size (mm)": 250, "CSS Range (mm)": "16-40", "Power (HP)": "25-40", "Capacity (TPH)": "16-40", "Toggle Type": "Double", RPM: 350 },
            { Model: "VTDT3", "Size (inches)": "24x12", "Size (mm)": "600x300", "Max Feed Size (mm)": 300, "CSS Range (mm)": "20-60", "Power (HP)": "30-45", "Capacity (TPH)": "25-60", "Toggle Type": "Double", RPM: 330 },
            { Model: "VTDT4", "Size (inches)": "30x15", "Size (mm)": "750x375", "Max Feed Size (mm)": 325, "CSS Range (mm)": "28-85", "Power (HP)": "35-50", "Capacity (TPH)": "28-85", "Toggle Type": "Double", RPM: 325 },
            { Model: "VTDT5", "Size (inches)": "36x24", "Size (mm)": "900x600", "Max Feed Size (mm)": 500, "CSS Range (mm)": "35-125", "Power (HP)": "80-100", "Capacity (TPH)": "35-125", "Toggle Type": "Double", RPM: 250 }
        ],
        faqs: [
            {
                question: "Is the higher initial cost of a Double Toggle worth it?",
                answer: "Yes, for abrasive rock like granite, its reduced wear on jaw plates delivers a significantly lower total cost of ownership."
            },
            {
                question: "What capacity and feed size can I expect?",
                answer: "The VTDT handles feed up to 500 mm and crushes 12–125 tph (tons per hour), depending on setting and material hardness."
            },
            {
                question: "How easy is routine maintenance?",
                answer: "Grease points are externally located and accessible; jaw-plate change-outs take under 2 hours with standard tools."
            }
        ]
    },
    {
        id: 2,
        slug: "single-toggle-jaw-crusher",
        name: "Single Toggle Jaw Crusher",
        category: "Crushers",
        image: "/images/products/single-toggle-jaw-crusher.jpg",
        description: "Our Single Toggle Jaw Crusher is a versatile and cost-effective solution for primary crushing, offering high throughput and a simple, robust design for easy maintenance.",
        benefits: ["High throughput and efficiency", "Simple design for easy maintenance", "Versatile for various applications", "Cost-effective crushing"],
        applications: ["Contract Crushing", "Recycling (Concrete, Asphalt)", "Small to Medium Quarries"],
        spec_models: [
            { Model: "VTST1", "Size (inches)": "16x10", "Size (mm)": "400x250", "Max Feed Size (mm)": 200, "CSS Range (mm)": "20-60", "Power (HP)": "25-30", "Capacity (TPH)": "20-55" },
            { Model: "VTST2", "Size (inches)": "20x12", "Size (mm)": "500x300", "Max Feed Size (mm)": 250, "CSS Range (mm)": "25-75", "Power (HP)": "30-40", "Capacity (TPH)": "30-70" },
            { Model: "VTST3", "Size (inches)": "24x15", "Size (mm)": "600x375", "Max Feed Size (mm)": 300, "CSS Range (mm)": "30-100", "Power (HP)": "40-50", "Capacity (TPH)": "40-90" },
            { Model: "VTST4", "Size (inches)": "30x20", "Size (mm)": "750x500", "Max Feed Size (mm)": 400, "CSS Range (mm)": "40-125", "Power (HP)": "60-75", "Capacity (TPH)": "60-150" },
            { Model: "VTST5", "Size (inches)": "36x24", "Size (mm)": "900x600", "Max Feed Size (mm)": 500, "CSS Range (mm)": "50-150", "Power (HP)": "80-100", "Capacity (TPH)": "80-180" },
            { Model: "VTST6", "Size (inches)": "42x32", "Size (mm)": "1050x800", "Max Feed Size (mm)": 700, "CSS Range (mm)": "60-180", "Power (HP)": "100-125", "Capacity (TPH)": "120-250" },
            { Model: "VTST7", "Size (inches)": "48x36", "Size (mm)": "1200x900", "Max Feed Size (mm)": 800, "CSS Range (mm)": "75-200", "Power (HP)": "125-150", "Capacity (TPH)": "180-350" }
        ],
        faqs: [
            {
                question: "How easy is it to change the output size?",
                answer: "You can quickly adjust the crusher's gap in minutes using the built-in hydraulic or manual toggle adjustment system."
            },
            {
                question: "Can I integrate this crusher into my existing plant?",
                answer: "Absolutely, its modular mounting feet and help of our experts make retrofit seamless."
            },
            {
                question: "Can it handle hard rock?",
                answer: "Yes, the VTST handles most stone types (granite, limestone, basalt), crushing up to 350 tph without trouble."
            }
        ]
    },
    {
        id: 3,
        slug: "hsi-impactors",
        name: "HSI Impactors",
        category: "Crushers",
        image: "/images/products/hsi-impactors.jpg",
        description: "High-performance horizontal shaft impact crushers for secondary and tertiary crushing, producing superior cubical product shape.",
        benefits: ["Excellent product shape", "High reduction ratio", "Adjustable crushing chamber", "Efficient for recycled materials"],
        applications: ["Secondary aggregate crushing", "Concrete & asphalt recycling", "Limestone crushing"],
        spec_models: [
            { Model: "VTHI1", "Opening (mm)": "600 x 600", "Feed Size (mm)": 200, "Power (hp)": "110-130", "Throughput (TPH)": "60-100", "Blow Bars": 3 },
            { Model: "VTHI2", "Opening (mm)": "800 x 1000", "Feed Size (mm)": 250, "Power (hp)": "160-190", "Throughput (TPH)": "90-150", "Blow Bars": 3 },
            { Model: "VTHI3", "Opening (mm)": "1200 x 1000", "Feed Size (mm)": 350, "Power (hp)": "230-280", "Throughput (TPH)": "160-250", "Blow Bars": 4 }
        ],
        faqs: [
            {
                question: "When should I choose an HSI over a Jaw Crusher?",
                answer: "Choose an HSI for less abrasive material like limestone or when you require a superior cubical product shape in a single pass."
            },
            {
                question: "How do I extend wear part life?",
                answer: "Use the correct alloy blow bars for your material (hard vs. soft), maintain proper feed distribution, and inspect liners every 300 hours for rotation and rebalance."
            },
            {
                question: "Can it handle recycled concrete and asphalt?",
                answer: "Yes, our impact crusher is optimized for \"clean\" demolition debris, producing high-quality aggregates with minimal fines when operated at recommended RPMs."
            }
        ]
    },
    {
        id: 4,
        slug: "inclined-vibrating-screens",
        name: "Inclined Vibrating Screens",
        category: "Screening",
        image: "/images/products/inclined-vibrating-screens.jpg",
        description: "Heavy-duty inclined vibrating screens designed for efficient classification and sizing of various materials in demanding environments.",
        benefits: ["High screening efficiency", "Robust construction", "Low maintenance", "Versatile screen media options"],
        applications: ["Aggregate sizing", "Coal screening", "Sand and gravel processing", "Ore screening"],
        spec_models: [
            { Model: "VTECH1", "Deck Size (mm)": "1200x3000", "No. of Decks": "2, 3, or 4", "Capacity (TPH)": "60–170", "Motor Power (kW)": 11 },
            { Model: "VTECH2", "Deck Size (mm)": "1500x4000", "No. of Decks": "2, 3, or 4", "Capacity (TPH)": "100–280", "Motor Power (kW)": 15 },
            { Model: "VTECH3", "Deck Size (mm)": "1800x4800", "No. of Decks": "2, 3, or 4", "Capacity (TPH)": "150–350", "Motor Power (kW)": 22 }
        ],
        faqs: [
            {
                question: "Which screen media options do you offer?",
                answer: "Choose woven wire, polyurethane or punch-plate decks in 10–100 mm apertures to suit scalping, sizing or dewatering."
            },
            {
                question: "How difficult is it to change the screen media (mesh or panels)?",
                answer: "Screen media changes are straightforward. Our design features side-tensioning rails that provide easy access and allow for quick replacement to minimize downtime."
            },
            {
                question: "What materials can I sort with it?",
                answer: "Sand, gravel, crushed stone—even recycled concrete—you name it. Choose the right mesh size, and you'll separate fines, mids, and overs in one pass."
            },
            {
                question: "Will it handle clay and dirt?",
                answer: "Yes—an optional spray-bar system keeps the mesh clear, so even damp or slightly sticky material passes cleanly."
            }
        ]
    },
    {
        id: 5,
        slug: "conveyor-systems",
        name: "Conveyor Systems",
        category: "Material Handling",
        image: "/images/products/Conveyor Systems.jpeg",
        description: "Heavy-duty belt conveyor systems for efficient material transport in mining and aggregate operations. Designed for continuous operation in harsh environments.",
        benefits: ["High capacity transport", "Reliable continuous operation", "Modular design", "Low operating costs"],
        applications: ["Material transport", "Plant integration", "Stockpile feeding"],
        spec_models: [
            { Model: "VTBC1", "Belt Width (mm)": 650, "Max Capacity (TPH)": 400, "Drive Power (kW)": 45, "Max Length (m)": 800 },
            { Model: "VTBC2", "Belt Width (mm)": 800, "Max Capacity (TPH)": 630, "Drive Power (kW)": 75, "Max Length (m)": 1000 },
            { Model: "VTBC3", "Belt Width (mm)": 1000, "Max Capacity (TPH)": 1000, "Drive Power (kW)": 110, "Max Length (m)": 1200 }
        ],
        faqs: [
            {
                question: "Do you provide standard-sized conveyors or custom-engineered solutions?",
                answer: "We specialize in designing and manufacturing custom conveyor systems tailored to the specific layout, material, and throughput requirements of your quarry or plant."
            },
            {
                question: "What conveyor layout is best for my quarry?",
                answer: "We'll design everything from fixed overland belts to mobile radial conveyors to fit your pit geometry and material flow."
            },
            {
                question: "How do I integrate custom conveyor solutions with existing plant equipment?",
                answer: "Modular frames and standard drives let you bolt new conveyor runs onto feeders, crushers, screens or stockpiles with minimal welding."
            },
            {
                question: "Can you design a complete plant-wide conveyor network?",
                answer: "Absolutely; we can engineer a fully integrated network to efficiently transfer material between every stage of your circuit, from the primary crusher to the final stockpiles."
            }
        ]
    },
    {
        id: 6,
        slug: "feeder",
        name: "Vibrating Feeders",
        category: "Feeders",
        image: "/images/products/Vibrating Feeders.png",
        description: "Robust vibrating feeders designed to ensure a regulated and continuous flow of material to primary crushers and other processing equipment.",
        benefits: ["Regulated material flow", "Reduces surge loads on crushers", "Low maintenance grizzly bars", "High operational reliability"],
        applications: ["Feeding primary jaw crushers", "Controlling flow to screening plants", "Scalping oversized rock"],
        spec_models: [
            { Model: "VTFD1", "Size (mm)": "750x2500", "Size (ft)": "2.5x8.2", "Capacity (TPH)": "50-100", "Motor Power (HP)": 10 },
            { Model: "VTFD2", "Size (mm)": "900x3000", "Size (ft)": "3.0x10.0", "Capacity (TPH)": "100-180", "Motor Power (HP)": 15 },
            { Model: "VTFD3", "Size (mm)": "1100x4200", "Size (ft)": "3.6x13.8", "Capacity (TPH)": "180-250", "Motor Power (HP)": 20 }
        ],
        faqs: [
            {
                question: "What materials can I feed with a combined grizzly and pan feeder?",
                answer: "From large rocks and aggregates to fine sand, the grizzly removes oversize while the pan feeder meters the rest for even processing."
            },
            {
                question: "How do I adjust feed rate and separation size?",
                answer: "Simple stroke and amplitude controls let you dial in exactly how much material passes and what size bypasses the grizzly."
            },
            {
                question: "Can this handle abrasive ores and wet clay?",
                answer: "Yes, rugged liners and optional spray bars keep both grizzly bars and the pan surface clear in tough, sticky conditions."
            }
        ]
    },
    {
        id: 7,
        slug: "hydrocyclone-sand-classifiers",
        name: "Hydrocyclone Sand Classifiers",
        category: "Washing",
        image: "/images/products/Hydrocyclone Sand Classifiers.png",
        description: "High-efficiency hydrocyclone classifiers utilizing centrifugal force for precise fine particle separation with minimal energy use.",
        benefits: ["Precise particle separation", "High efficiency", "Compact design", "Maintenance-free"],
        applications: ["Fine particle classification", "Slurry thickening", "Industrial water treatment"],
        spec_models: [
            { Model: "VTHC1", "Hydrocyclone Ø (mm)": 325, "Slurry Pump (in)": "3x2", "Dewatering Screen (mm)": "1200x2400", "Capacity (TPH)": "25–60", "Power (kW / HP)": "22–30 / 30–40" },
            { Model: "VTHC2", "Hydrocyclone Ø (mm)": 400, "Slurry Pump (in)": "6x4", "Dewatering Screen (mm)": "1800x2700", "Capacity (TPH)": "60–100", "Power (kW / HP)": "37–55 / 50–75" },
            { Model: "VTHC3", "Hydrocyclone Ø (mm)": 500, "Slurry Pump (in)": "8x6", "Dewatering Screen (mm)": "1800x4200", "Capacity (TPH)": "100–180", "Power (kW / HP)": "75–90 / 100–120" }
        ],
        faqs: [
            {
                question: "What is the primary advantage of a Hydrocyclone over a traditional screw classifier?",
                answer: "A Hydrocyclone offers much finer and more precise particle separation, making it ideal for recovering fine sand and removing silt with higher efficiency."
            },
            {
                question: "Does this system require a lot of water to operate effectively?",
                answer: "While it uses water, the system is designed to be highly efficient. It works in a closed circuit with the dewatering screen, which recovers a majority of the water for immediate reuse."
            },
            {
                question: "How does the dewatering screen ensure the final sand product is not too wet?",
                answer: "The high-frequency vibrations of the screen separate the water from the sand particles, delivering a properly dewatered final product."
            }
        ]
    },
    {
        id: 8,
        slug: "bucket-sand-classifiers",
        name: "Bucket Sand Classifiers",
        category: "Washing",
        image: "/images/products/bucket-elevators.jpg",
        description: "Advanced bucket wheel sand classifiers designed to maximize fine sand recovery while providing excellent dewatering performance.",
        benefits: ["High fine sand recovery rates", "Excellent dewatering", "Automated controls", "Reduced maintenance"],
        applications: ["Fine sand recovery", "Sand classification and dewatering", "Tailings management"],
        spec_models: [
            { Model: "VTBS1", "Wheel Diameter (m)": 2.5, "Bucket Width (mm)": 600, "Capacity (TPH)": "30-60", "Power (kW)": 5.5 },
            { Model: "VTBS2", "Wheel Diameter (m)": 3.0, "Bucket Width (mm)": 800, "Capacity (TPH)": "60-100", "Power (kW)": 7.5 },
            { Model: "VTBS3", "Wheel Diameter (m)": 3.5, "Bucket Width (mm)": 1000, "Capacity (TPH)": "100-150", "Power (kW)": 11 }
        ],
        faqs: [
            {
                question: "What makes bucket classifiers superior to other sand recovery methods?",
                answer: "Bucket classifiers provide the highest fine sand recovery rates while simultaneously dewatering, combining two critical processes in one efficient machine."
            },
            {
                question: "How much fine sand can I recover with this system?",
                answer: "Our bucket classifiers typically recover 95%+ of fine sand that would otherwise be lost in traditional washing processes."
            },
            {
                question: "What maintenance is required for bucket wheel classifiers?",
                answer: "Minimal maintenance is required - mainly periodic inspection of buckets and bearings, with automated controls reducing operational oversight."
            }
        ]
    },
    {
        id: 9,
        slug: "vsi-cubisand-sand-maker",
        name: "VSI (CubiSand) Sand Maker",
        category: "Crushers",
        image: "/images/products/vsi-cubisand-sand-maker.jpg",
        description: "The Vertical Shaft Impactor (CubiSand) is an advanced tertiary stage crusher designed to produce high-quality, cubical manufactured sand (M-Sand) with superior shape and consistency.",
        benefits: ["Superior product shape and cubicity", "High product yield and reduction ratio", "Creates high-quality manufactured sand", "Gradation control for consistent product"],
        applications: ["Manufactured sand production", "Sand shape improvement", "Concrete and plaster sand preparation"],
        spec_models: [
            { Model: "VTVSI1", "Diameter": 700, "Throughput (TPH)": "50-80", "Power (hp / kW)": "100-120 hp / 75-90 kW", "Feed Size (mm)": 25 },
            { Model: "VTVSI2", "Diameter": 850, "Throughput (TPH)": "80-120", "Power (hp / kW)": "150-180 hp / 112-134 kW", "Feed Size (mm)": 30 },
            { Model: "VTVSI3", "Diameter": 950, "Throughput (TPH)": "120-160", "Power (hp / kW)": "2X 200-240 hp / 2X 149-179 kW", "Feed Size (mm)": 35 }
        ],
        faqs: [
            {
                question: "What materials work best with the VSI Sand Maker?",
                answer: "The VSI excels with moderately hard materials like limestone, granite, and basalt for manufactured sand production, delivering superior cubical shape."
            },
            {
                question: "How does the VSI compare to traditional cone crushers for sand making?",
                answer: "The VSI produces far superior sand shape with better cubicity and fewer elongated particles, making it ideal for high-spec concrete applications."
            },
            {
                question: "What maintenance is required for optimal performance?",
                answer: "Regular inspection of wear parts, proper rotor balancing, and maintaining correct feed distribution ensure maximum efficiency and part life."
            }
        ]
    },
    {
        id: 10,
        slug: "screw-sand-washers",
        name: "Screw Sand Washers",
        category: "Washing",
        image: "/images/products/Screw Sand Washers.jpeg",
        description: "Efficient screw sand washers for cleaning and dewatering sand and fine aggregates, featuring spiral classifier technology.",
        benefits: ["Excellent washing efficiency", "Low water consumption", "Minimal fine material loss", "Robust construction"],
        applications: ["Sand washing in aggregate plants", "Silica sand processing", "Construction sand production"],
        spec_models: [
            { Model: "VTSW1", Type: "Single Screw", "Diameter (mm)": 600, "Capacity (TPH)": "30-60", "Power (kW)": 11 },
            { Model: "VTSW2", Type: "Single Screw", "Diameter (mm)": 900, "Capacity (TPH)": "60-100", "Power (kW)": 15 },
            { Model: "VTSW3", Type: "Double Screw", "Diameter (mm)": "2x900", "Capacity (TPH)": "100-180", "Power (kW)": 22 }
        ],
        faqs: [
            {
                question: "What is the primary job of a Screw Sand Washer?",
                answer: "It efficiently scrubs, washes, and dewaters sand to remove unwanted clay, silt, and other fine impurities."
            },
            {
                question: "How does this machine prevent the loss of valuable fine sand?",
                answer: "The long screw and upward flow of water create a calm settling pool that allows fine sand to be retained while washing away lighter contaminants."
            },
            {
                question: "What is the difference between a single screw and a double screw model?",
                answer: "A double screw model can process a much higher volume of material in the same footprint, making it ideal for large-scale operations."
            }
        ]
    },
    {
        id: 11,
        slug: "mobile-crushing-plant",
        name: "Mobile Crushing Plant",
        category: "Mobile",
        image: "/images/products/mobile-crushing-plant.jpg",
        description: "Complete mobile crushing and screening solution for on-site material processing. Combines primary crusher, screen, and conveyor systems on a single chassis.",
        benefits: ["Complete mobility", "Quick setup time", "Integrated systems", "Reduced transport costs"],
        applications: ["Construction sites", "Quarry operations", "Recycling applications"],
        spec_models: [
            { Model: "VTMP1", "Primary Crusher": "Jaw 24x15", "Screen Size (mm)": "1500x4000", "Capacity (TPH)": "80-120", "Power (kW)": 200 },
            { Model: "VTMP2", "Primary Crusher": "Jaw 30x20", "Screen Size (mm)": "1800x4800", "Capacity (TPH)": "120-200", "Power (kW)": 300 },
            { Model: "VTMP3", "Primary Crusher": "Jaw 36x24", "Screen Size (mm)": "2100x5000", "Capacity (TPH)": "200-300", "Power (kW)": 400 }
        ],
        faqs: [
            {
                question: "How quickly can it move between jobs?",
                answer: "Fully self-contained on tracks or wheels, it can roll onto the next site and be up and running in under an hour."
            },
            {
                question: "How quickly can a mobile plant be set up and begin operation on-site?",
                answer: "Our pre-integrated mobile units are designed for rapid deployment and can typically be commissioned and operational within a few hours of arriving at your site."
            },
            {
                question: "Can I customize the configuration for different applications?",
                answer: "Yes. Modular designs let you combine jaw, cone, HSI, VSI, and screens in any order—just bolt the modules together."
            }
        ]
    }
];
