/**
 * This file is emulating Certification data coming from a database (or firebase). It is read by
 * the data repository.
 * Note: This contains characters/strings that should really be HTML entities, such as "@reg;"
 *       instead of "®", but I couldn't get the application to render them properly, so I'm leaving
 *       them for now.
 *
 * @type {*[]}
 */
var certificationJson = [
  {
    "name": "FAIRTRADE® Certification Mark and FAIRTRADE® Program Mark",
    "headingUrl": "https://www.fairtrade.net/",
    "paragraphs": [
      "The FAIRTRADE® Certification Mark from Fairtrade International is the oldest and appears on about 80% of the world’s fair trade products. Products with the label have 20% or more fair trade content; in addition, all ingredients that can be sourced on fair trade terms must be. Single ingredient products with the label must have 100% fair trade content. Along with food and drink items, Fairtrade International certifies fair trade cotton, flowers, gold and sports balls.",
      "Fairtrade International has a FAIRTRADE® Program Mark for cocoa, sugar and cotton. The cocoa, sugar and cotton programs enable companies who don’t have certified composite products to still commit to buying slavery- free cocoa, sugar or cotton. These display the FAIRTRADE Cocoa Program™, FAIRTRADE Sugar Program™ or FAIRTRADE Cotton Program™ labels."
    ],
    "images": [
      "https://s3.amazonaws.com/infogram-themes/10951/logo.png",
      "https://images.fairtrade.net/article/FM_RGB_100H.png",
      "https://images.fairtrade.net/article/FSPMarks_ThreeUp_fromWord.png"
    ]
  },
  {
    "name": "Fair Trade Certified™",
    "paragraphs": [
      "Fair Trade Certified™ products from Fair Trade USA℠ have at least 20% fair trade ingredients; however, unlike Fairtrade International, there’s no requirement to source all available fair trade ingredients. In addition to packaged food and fresh produce, Fair Trade USA℠ certifies drinks, cotton, apparel, body care, home goods and plant products as well as sewing, factories and fisheries."
    ],
    "images": [
      "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/9/1/0/9/2699019-1-eng-GB/Host-of-brands-go-Fair-Trade-USA-certified_wrbm_small.png"
    ]
  },
  {
    "name": "Fair for Life®",
    "paragraphs": [
      "Composite products with the Fair for Life® label must have at least 80% fair trade content. Single ingredient products must be 100% fair trade. Fair for Life® certifies food, plant, cosmetic, textiles, small scale mining and artisanal products as well as tourist services."
    ],
    "images": [
      "https://pbs.twimg.com/profile_images/1933081029/IMO_Logo_400x400.jpg",
      "https://www.pukkaherbs.de/media/76570209/ffl-logo.jpg?width=227&height=219"
    ]
  },
    {
      "name": "Sustainable Development",
      "paragraphs": [
        "Other than fair trade labels, there are sustainable development labels that address slave labor and environmental concerns. In general, these labels indicate that raw ingredients can be traced back to their sources. Traceability enables inspectors to audit supply chains and find suppliers that may be using slave labor. For the most part, sustainable development labels focus on the environmental impact and the long-term availability of resources. Environmental concern, in turn, leads to the development of sustainable farming programs and trainings for workers."
      ],
      "images": []
    },
    {
      "name": "Rainforest Alliance Certified™",
      "paragraphs": [
        "Products that are Rainforest Alliance Certified™ must have at least 30% of a main ingredient sourced under Rainforest Alliance Certified™ terms."
      ],
      "images": [
        "https://www.rainforest-alliance.org/business/wp-content/uploads/2018/10/rainforest-alliance-certified-seal-lg-300x266.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjNFH3j2c9nddMP3LJZoqx417bXyCGt-jmAWcKPyCVPFEonm377w&s",
        "https://initiative20x20.org/sites/default/files/styles/1_3_width/public/2018-05/1_16.png?itok=69LJajQf"
      ]
    },
    {
      "name": "UTZ Certified™",
      "paragraphs": [
        "UTZ Certified™ products must have more than 90% UTZ Certified™ cocoa content. Roundtable on Sustainable Palm Oil (RSPOTM), which provides a certification for sustainably sourced palm oil, contracts UTZ Certified™ for its traceability services."
      ],
      "images": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Utz_certified_logo.svg/1200px-Utz_certified_logo.svg.png",
        "https://certifications.controlunion.com/storage/configurations/certificationspetersoncontrolunioncomaccnakijkennl/images/logo/utz.png",
        "https://c7.uihere.com/files/501/148/972/coffee-utz-certified-cocoa-bean-chocolate-certification-coffee-thumb.jpg"
      ]
    },
    {
      "name": "Brought to you by the community of Certified B Corporations℠",
      "paragraphs": [
        "B Lab certifies for-profit companies that implement and enforce strict social, environmental, accountability and transparency standards. These companies receive the Brought to you by the community of Certified B Corporations℠ label."
      ],
      "images": [
        "https://www.delawareinc.com/blog/images/img/_middle/B%20Corp%20logo.png"
      ]
    },
    {
      "name": "Fair Labor Association®",
      "paragraphs": [
        "Suppliers and companies that commit to the Fair Labor Association® Code of Conduct have agreed to implement and enforce standards that prohibit forced and child labor, while also ensuring fair labor practices and humane working conditions. Affiliation with the Fair Labor Association® is voluntary and participants are 100% responsible for their supply chains and are subject to random assessments by the Fair Labor Association®."
      ],
      "images": [
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Fair_Labor_Association_logo.svg/1200px-Fair_Labor_Association_logo.svg.png"
      ]
    },
    {
      "name": "Fair Trade Federation℠",
      "paragraphs": [
        "Fair Trade Federation℠ is a non-profit trade association that supports fair trade businesses in North America. Members adhere to a Code of Practice, and the Fair Trade Federation℠ logo indicates that at least 85% of their products are sourced according to the Fair Trade Federation℠ Principles, which includes no use of slave labor. The other 15% of inventory may be eco-friendly products, made by local artisans or educational materials related to fair trade. In addition, this latter 15% must be produced in conditions that do not harm people, the environment or other cultures."
      ],
      "images": [
        "https://i.pinimg.com/originals/24/8b/50/248b50026e04550084326dfa8e85f0f4.png"
      ]
    },
    {
      "name": "World Fair Trade Organization",
      "paragraphs": [
        "Over 300 fair trade organizations are members of the World Fair Trade Organization. Members comply with the 10 Principles of Fair Trade which are based on the International Labor Organization’s conventions, including no child or forced labor and ensuring good working conditions. The World Fair Trade Organization Guarantee System is an assurance that members have implemented the 10 Principles of Fair Trade in their supply chains and practices. The WFTO Product Label indicates that an item is made and traded by Guaranteed Fair Trade Organizations."
      ],
      "images": [
        "https://upload.wikimedia.org/wikipedia/en/d/dd/Ftomark.png"
      ]
    },
    {
      "name": "GoodWeave®",
      "paragraphs": [
        "Companies and brands with the GoodWeave® label disclose a fully traceable supply chain for all production processes and are subject to unannounced inspections by GoodWeave® approved personnel. These verification visits ensure that child labor isn’t used and that adult workers aren’t abused."
      ],
      "images": [
        "https://goodweave.org/wp-content/uploads/2017/02/GW-label.png"
      ]
    },
    {
      "name": "Electronic Industry Citizenship Coalition®",
      "headingUrl": "http://www.responsiblebusiness.org/about/members",
      "paragraphs": [
        "Electronic Industry Citizenship Coalition® is a non-profit made up of electronics companies who have signed onto and are held accountable to a Code of Conduct that prohibits forced labor, bonded labor, involuntary prison labor, child labor, slavery and trafficking."
      ],
      "images": [
        "https://www.responsiblebusiness.org/media/docs/EICClogo.jpg"
      ]
    },
    {
      "name": "Global Sustainability Initiative®",
      "headingUrl": "http://gesi.org",
      "paragraphs": [
        "Global Sustainability Initiative® members disseminate information, resources and best practices to promote social and environmental sustainability."
      ],
      "images": [
        "https://www.nicepng.com/png/detail/274-2743963_eicc-logo-gesi-logo-global-e-sustainability-initiative.png"
      ]
    },
    {
      "name": "Conflict-Free Sourcing Initiative®",
      "paragraphs": [
        "Members of the Electronic Industry Citizenship Coalition® and the Global Sustainability Initiative® founded the Conflict-Free Sourcing Initiative® which runs the Conflict- Free Smelter Program that confirms which smelters and refiners follow global standards and which ones can be claimed “conflict-free.”"
      ],
      "images": [
        "https://3blaws.s3.amazonaws.com/images/CFSI_RGB_150_MX.png"
      ]
    },
    {
      "name": "Solutions for Hope",
      "paragraphs": [
        "Solutions for Hope works with governments, companies, civil society and local refineries to provide sourcing opportunities for artisanal scale miners and cooperatives that meet conflict-free standards."
      ],
      "images": [
        "https://www.resolve.ngo/sitecm/i/final_text_on_right_for_webv4.jpg?Width=-1"
      ]
    },
    {
      "name": "RESOLVE’s Public-Private Alliance for Responsible Minerals Trade",
      "headingUrl": "https://www.resolve.ngo/site-ppa/default.htm",
      "paragraphs": [
        "RESOLVE’s Public-Private Alliance for Responsible Minerals Trade provides funding and coordination support for those working in the Democratic Republic of the Congo and the Great Lakes Region of Central Africa to identify conflict- free supply chains."
      ],
      "images": [
        "https://www.responsiblemines.org/wp-content/uploads/2018/09/resolve-1-300x225.png"
      ]
  }
]
;
