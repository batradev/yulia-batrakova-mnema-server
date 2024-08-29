exports.seed = async function(knex) {
  
    await knex('professions').del();
  
    await knex('professions').insert([
      { name: 'Medicine and Healthcare' },
      { name: 'Education and Science' },
      { name: 'Information Technology' },
      { name: 'Construction and Architecture' },
      { name: 'Finance and Accounting' },
      { name: 'Sales and Marketing' },
      { name: 'Law and Legal' },
      { name: 'Transport and Logistics' },
      { name: 'Manufacturing and Engineering' },
      { name: 'Hospitality and Tourism' },
      { name: 'Arts and Culture' },
      { name: 'Mass Media and Journalism' },
      { name: 'Retail' },
      { name: 'Management and Administration' },
      { name: 'Sports and Fitness' },
      { name: 'Social Work' },
      { name: 'Agriculture and Agribusiness' },
      { name: 'Science and Research' },
      { name: 'Ecology and Environment' },
      { name: 'Food Service' },
      { name: 'Construction and Repair' },
      { name: 'Energy and Resources' },
      { name: 'Design and Creative Industries' },
      { name: 'Services' },
      { name: 'Security and Protection' },
      { name: 'Psychology and Psychotherapy' },
      { name: 'Logistics and Warehousing' },
      { name: 'Public Speaking and Training' },
      { name: 'Translation and Linguistics' },
      { name: 'Air Transport' },
      { name: 'Maritime Transport' },
      { name: 'Automobile Transport' },
      { name: 'Equipment Maintenance and Repair' },
      { name: 'Banking' },
      { name: 'Investments and Insurance' },
      { name: 'HR and Personnel Management' },
      { name: 'Personnel Accounting' },
      { name: 'Telecommunications and Communication' },
      { name: 'Cosmetology and Aesthetics' },
      { name: 'Hairdressing' },
      { name: 'Food Industry' },
      { name: 'Chemical Industry' },
      { name: 'Mechanical Engineering' },
      { name: 'Metallurgy' },
      { name: 'Forestry' },
      { name: 'Animal Husbandry' },
      { name: 'Crop Production' },
      { name: 'Biotechnology' },
      { name: 'Pharmaceuticals' },
      { name: 'Astronomy' },
      { name: 'Physics' },
      { name: 'Chemistry' },
      { name: 'Biology' },
      { name: 'Mathematics' },
      { name: 'Engineering and Design' },
      { name: 'Robotics' },
      { name: 'Aviation' },
      { name: 'Automotive Industry' },
      { name: 'Shipbuilding' },
      { name: 'Cinema and Television' },
      { name: 'Radio and Podcasts' },
      { name: 'Music Industry' },
      { name: 'Theater' },
      { name: 'Visual Arts' },
      { name: 'Photography' },
      { name: 'Video Production' },
      { name: 'Publishing' },
      { name: 'Literature and Writing' },
      { name: 'Editing and Proofreading' },
      { name: 'Advertising' },
      { name: 'PR and Public Relations' },
      { name: 'Jewelry Making' },
      { name: 'Fashion and Clothing Design' },
      { name: 'Footwear Manufacturing' },
      { name: 'Accessories Production' },
      { name: 'Industrial Design' },
      { name: 'Architecture and Urban Planning' },
      { name: 'Landscape Design' },
      { name: 'Water Supply and Sewage' },
      { name: 'Gas and Electricity Supply' },
      { name: 'Data Analytics' },
      { name: 'Blockchain and Cryptocurrencies' },
      { name: 'Cybersecurity' },
      { name: 'Artificial Intelligence' },
      { name: 'Big Data' },
      { name: 'Internet of Things (IoT)' },
      { name: 'Game Design' },
      { name: 'Mobile App Development' },
      { name: 'Web Design' },
      { name: 'UX/UI Design' },
      { name: 'SEO and Digital Marketing' },
      { name: 'E-commerce' },
      { name: 'Agroecology' },
      { name: 'Waste Management' },
      { name: 'Renewable Energy' },
      { name: 'Geology' },
      { name: 'Hydrology' },
      { name: 'Meteorology' },
      { name: 'Sociology' },
      { name: 'Anthropology' },
    ]);
  };
  