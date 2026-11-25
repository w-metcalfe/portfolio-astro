// Career timeline shown on /about (oldest first).
export interface TimelineEntry {
  label: string;
  paragraphs: string[];
  /** One full-width image or two side by side (file names in src/assets/images) */
  images: string[];
}

export const timeline: TimelineEntry[] = [
  {
    label: 'Junior Designer @ Blackburn Media (2015-2016)',
    paragraphs: [
      'My entry into the industry began as a junior designer at Blackburn Media through a high school co-op program. I worked with the team at the Classic Rock FREE 98.1 radio station, supporting day-to-day creative needs in a fast-paced media environment.',
      'I contributed to a mix of digital and print design, creative writing, and on-site brand ambassador work. That variety helped me build a strong foundation in core design principles and see how creative decisions translate into real-world brand experiences.',
    ],
    images: ['N00uw9HKvrT2Sr2VWvK4qfXUjtM.png', '78JVsKDDiHdzanM4DWWYoL4bQk.jpg'],
  },
  {
    label: 'Interactive Media Design @ Fanshawe College (2016-2018)',
    paragraphs: [
      'After finishing my co-op, I enrolled in the Interactive Media Design program at Fanshawe College to build on my early experience and develop more hands-on skills.',
      'During the program, I worked across both design and development. While I enjoyed learning how things were built, I found myself consistently drawn to design. This is where my interest in solving problems visually and intentionally really took shape.',
    ],
    images: ['DcIM2TPlZxUUWLQKifwDEOqsjJ8.jpg'],
  },
  {
    label: 'UX Designer @ Trillium Gift of Life Network (2017-2018)',
    paragraphs: [
      'During my second year at Fanshawe, I worked with the Trillium Gift of Life Network as a UX designer, collaborating with the BeADonor team on an organ donation awareness initiative.',
      'We delivered a digital strategy that included a landing page and supporting social media campaign, with a strong focus on clarity, empathy, and accessibility. This experience highlighted the importance of understanding user mindset, especially when designing for emotionally sensitive topics.',
    ],
    images: ['OjKJkG9dbop1D2L8lENM0q1twc.jpeg', 'H1BLu8Flopu00ZkDFJEn8sZQClE.jpeg'],
  },
  {
    label: 'User Experience Design @ Wilfrid Laurier University (2018-2023)',
    paragraphs: [
      'After graduating from Fanshawe, I felt confident in my design skills but realized I was missing a deeper understanding of the people behind the interfaces. I wanted to better understand who I was designing for and why certain decisions mattered.',
      'That curiosity led me to enroll in the User Experience Design program at Wilfrid Laurier University. There, I developed a strong foundation in user-centered thinking, research-driven decision making, and outcome-focused design. This period marked a shift from creating outputs to designing with clear intent and purpose.',
    ],
    images: ['6mtu4V2geeP0yQiHYFsnJpdFBAc.jpg', 'DZOEW5gdxGVh7f9B8KF6OrTvjw.jpeg'],
  },
  {
    label: 'UX Researcher @ March of Dimes Canada (2019)',
    paragraphs: [
      'During my first year at Laurier, I took on a four-month contract role as a UX researcher at March of Dimes Canada. This was my first opportunity to apply UX research methods in a real-world setting.',
      'I conducted more than fifteen user interviews focused on improving the application experience and translated those insights into a clear, actionable design strategy. The role reinforced the value of listening closely to users and grounding design decisions in evidence.',
    ],
    images: ['I1qM9kZSYYk9LUyDnnlml3IMCPA.jpg', 'WtnEUux7uz5WHrPrVM8vRFSo0A.jpg'],
  },
  {
    label: 'UX Designer @ Smashing Pixels (2020-2021)',
    paragraphs: [
      'At Smashing Pixels, I began applying my UX skills in a fully professional setting, working on customer-facing digital experiences for local businesses. My work supported launches focused on improving clarity, usability, and conversion performance.',
      'Shortly after I joined, the team transitioned to remote work due to COVID. That shift gave me early experience collaborating asynchronously and communicating design decisions clearly, reinforcing the importance of alignment and documentation.',
    ],
    images: ['v5OkQ4vuU0gSqvCgZzz928xWE.jpg'],
  },
  {
    label: 'Product Designer @ Peekapak (2021-2022)',
    paragraphs: [
      'During my fourth year at Laurier, I joined Peekapak as a product designer through the university’s co-op program. This role marked a move from project-based work to longer-term product ownership.',
      'I focused on shipping product improvements that delivered measurable impact. As part of the middle school learning platform team, our work helped grow the user base from 400k to 700k students in one year. This experience strengthened my ability to connect design decisions to business outcomes at scale.',
    ],
    images: ['5tmX31fcccjCBO8ckTpyuH2Ntc.png'],
  },
  {
    label: 'Lead UX Designer @ William & Mary (2022-2023)',
    paragraphs: [
      'In my final year at Laurier, I partnered with the Institute for Integrative Conservation at William & Mary as part of my capstone project. This was my first opportunity to step into a lead UX role.',
      'I led the design and validation of a browser-based research discovery tool that surfaced relevant conservation research and potential collaborators in real time. The project required balancing complex stakeholder needs with usability and research rigor and was awarded third place in the Scotiabank Capstone Design Awards.',
    ],
    images: ['AOqVH4NN5MFTXzKsPo5mm0LHc.png'],
  },
  {
    label: 'UX Designer @ RBC (2023)',
    paragraphs: [
      'After completing my capstone, I joined RBC as a UX designer on a four-month contract. This role introduced me to designing within a large, highly regulated organization operating at global scale.',
      'I led discovery and workflow design for secure file-sharing experiences in partnership with the Call Center Technology team. Together, we defined how employees collaborate with clients across markets, balancing usability with security and compliance.',
    ],
    images: ['NUTISO2geWjhFKjFkUcsiGg70k.jpeg', 'yZBMNIBM9Hslt7BCFSn1mUbBe0.jpeg'],
  },
  {
    label: 'Lead UX Designer @ GIANT Creative (2024-Now)',
    paragraphs: [
      'This brings me to my current role as a Lead UX designer at GIANT Creative. I own end-to-end UX strategy and execution for data-intensive web platforms across franchise, home services, and non-profit clients.',
      'My work focuses on conversion-driven UX initiatives informed by user behavior analysis, CRO principles, and iterative testing. I collaborate closely with cross-functional teams to improve lead quality and engagement, with a proven track record of delivering strong return on investment. This role brings together everything I have learned so far, from research and strategy to execution and measurement.',
    ],
    images: ['giant-creative-team.webp'],
  },
];
