import { POI } from '../types';

export const CAMPUS_POIS: POI[] = [
  {
    id: 'dept-ist',
    name: 'Department of Information Science and Technology',
    category: 'Academic',
    description: 'IST Department - Home to MCA, B.Tech IT, and M.Tech IT programs',
    longDescription: 'Welcome to the Department of Information Science and Technology, open 8:30 AM to 4:30 PM. This 4-floor building houses classes for MCA, B.Tech IT, and M.Tech IT courses. The department has 3 computing laboratories and over 25 faculty members. The ground floor features the Ada Lovelace Auditorium with a capacity of 200 to 300 people for technical events and conferences.',
    academicDetails: {
      "working_hours": "8:30 AM - 4:30 PM",
      "building_info": { "total_floors": 4, "total_faculty": 25, "total_labs": 3 },
      "courses": ["MCA", "B.Tech IT", "M.Tech IT"],
      "hod": "Dr. P Yogesh"
    },
    facilities: ['Ada Lovelace Auditorium', '3 Computing Labs', 'Department Library', 'Conference Hall'],
    location: { latitude: 13.012957716848089, longitude: 80.23586126109605 },
    imageUrl: '/images/dept-ist.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'ceg-viv-auditorium',
    name: 'Vivekananda Auditorium',
    category: 'Facility',
    description: 'Main auditorium for university events and cultural programs',
    longDescription: 'Welcome to Vivekananda Auditorium, open 8:30 AM to 4:30 PM. This is the primary venue for major university events, cultural fests, and graduation ceremonies. The auditorium hosts the prestigious Kurukshetra technical symposium and has state-of-the-art acoustics with large seating capacity.',
    academicDetails: {
      "working_hours": "8:30 AM - 4:30 PM",
      "events": "Kurukshetra technical symposium, International conferences, Graduation ceremonies"
    },
    facilities: ['Central Stage', 'A/V Room', 'VIP Lounge', 'Large Seating'],
    location: { latitude: 13.011553944518562, longitude: 80.23635167534394 },
    imageUrl: '/images/vivekananda-auditorium.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'knowledge-park',
    name: 'Knowledge Park',
    category: 'Academic',
    description: 'Modern research and innovation center',
    longDescription: 'Welcome to Knowledge Park, open 8:30 AM to 4:30 PM. This modern knowledge hub of CEG campus houses advanced research laboratories, innovation labs, and collaborative workspaces for students and faculty engaged in technology development and research.',
    academicDetails: {
      "working_hours": "8:30 AM - 4:30 PM",
      "focus": "Innovation and technology development"
    },
    facilities: ['Research Labs', 'Innovation Center', 'Collaborative Spaces', 'Digital Library'],
    location: { latitude: 13.013314770820369, longitude: 80.23575708807347 },
    imageUrl: '/images/knowledge-park.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'central-library',
    name: 'Anna University Central Library',
    category: 'Facility',
    description: 'Main university library with extensive collection',
    longDescription: 'Welcome to Anna University Central Library. Open weekdays 8:30 AM to 8:30 PM and Saturdays 8:30 AM to 4:30 PM. This 3-floor library houses over 2 lakh books and 1000 plus journals. Each floor has department-specific books and a reading hall. Students must keep bags in racks at the entrance and scan ID cards or sign the logbook. Entry is for registered university students only. Books can be borrowed for 10 days using student ID, with a fine of 1 rupee per day for late returns.',
    academicDetails: {
      "working_hours": "Weekdays: 8:30 AM - 8:30 PM, Saturday: 8:30 AM - 4:30 PM",
      "floors": 3,
      "collection": "Over 2 lakh books and 1000+ journals",
      "lending_period": "10 days",
      "late_fee": "1 rupee per day",
      "entry_requirements": "Student ID card or logbook entry, bags must be kept in racks"
    },
    facilities: ['3 Reading Halls', 'Bag Racks', 'Digital Library', 'Restrooms on Each Floor'],
    location: { latitude: 13.010665803907767, longitude: 80.23781088033925 },
    imageUrl: '/images/central-library.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'rcc',
    name: 'Ramanujan Computing Centre',
    category: 'Academic',
    description: 'Central computing facility and network infrastructure',
    longDescription: 'Welcome to Ramanujan Computing Centre, open 8:30 AM to 6:30 PM. This is the central network infrastructure hub for Anna University. RCC manages WiFi services for all registered students. The ground floor has a help desk for WiFi-related issues and signal problems. The first floor houses the office room for official purposes and a computing lab.',
    academicDetails: {
      "working_hours": "8:30 AM - 6:30 PM",
      "services": "WiFi registration and support, Network infrastructure",
      "help_desk": "Ground floor entrance for WiFi issues"
    },
    facilities: ['Help Desk', 'Office Room (1st Floor)', 'Computing Lab (1st Floor)', 'Network Operations'],
    location: { latitude: 13.010661468642237, longitude: 80.23719517435678 },
    imageUrl: '/images/rcc.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'sports-board',
    name: 'Sports Board',
    category: 'Facility',
    description: 'Sports administration and facilities management',
    longDescription: 'Welcome to the Sports Board office, open 8:30 AM to 6:30 PM. This facility manages all sports activities, tournaments, and athletic programs for the university. The office handles permissions for ground usage and all sports-related activities. Students can register for sports events and coordinate ground bookings here.',
    academicDetails: {
      "working_hours": "8:30 AM - 6:30 PM",
      "services": "Ground usage permissions, Sports event registration, Tournament coordination"
    },
    facilities: ['Administrative Office', 'Sports Registration', 'Ground Booking'],
    location: { latitude: 13.010490088301278, longitude: 80.23830281706725 },
    imageUrl: '/images/sports-board.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'tennis-court',
    name: 'Tennis Court',
    category: 'Facility',
    description: 'University tennis courts for students',
    longDescription: 'Welcome to the Tennis Courts, open 8:30 AM to 4:30 PM. These well-maintained courts are available for students and staff for practice and tournaments. The facility supports both recreational play and competitive training.',
    academicDetails: {
      "working_hours": "8:30 AM - 4:30 PM",
      "usage": "Practice and inter-college tournaments"
    },
    facilities: ['Multiple Courts', 'Seating Area', 'Equipment Storage'],
    location: { latitude: 13.010607183000403, longitude: 80.23863038320907 },
    imageUrl: '/images/tennis-court.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'ceg-square',
    name: 'CEG Square',
    category: 'Facility',
    description: 'Newly constructed multi-purpose building',
    longDescription: 'Welcome to CEG Square, open 8:30 AM to 5:30 PM. This newly constructed building features a ground floor canteen and restroom facilities. The first floor houses Gurunath, an all-in-one store open 8:30 AM to 7:30 PM, where students can purchase snacks, stationery, and various other items.',
    academicDetails: {
      "working_hours": "8:30 AM - 5:30 PM",
      "gurunath_hours": "8:30 AM - 7:30 PM (1st Floor)"
    },
    facilities: ['Canteen (Ground Floor)', 'Gurunath Store (1st Floor)', 'Restrooms (Ground Floor)'],
    location: { latitude: 13.010453327937034, longitude: 80.23645307756988 },
    imageUrl: '/images/ceg-square.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'yrc-control',
    name: 'YRC Control Room',
    category: 'Administrative',
    description: 'Youth Red Cross control and coordination center',
    longDescription: 'Welcome to the Youth Red Cross Control Room, open 8:30 AM to 4:30 PM. This facility coordinates YRC activities, blood donation camps, health awareness programs, and emergency response services for the campus community.',
    academicDetails: {
      "working_hours": "8:30 AM - 4:30 PM",
      "services": "Blood donation camps, Health awareness, Emergency response"
    },
    facilities: ['Control Room', 'Medical Supplies', 'Coordination Center'],
    location: { latitude: 13.01138612693417, longitude: 80.23616492682618 },
    imageUrl: '/images/yrc.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'scst-cell',
    name: 'SC/ST Cell',
    category: 'Administrative',
    description: 'Support services for SC/ST students',
    longDescription: 'Welcome to the SC ST Cell, open 8:30 AM to 4:30 PM. This office provides support services, scholarships, and guidance for SC and ST category students. The cell ensures equal opportunities and addresses grievances.',
    academicDetails: {
      "working_hours": "8:30 AM - 4:30 PM",
      "services": "Scholarships, Student welfare, Grievance redressal"
    },
    facilities: ['Administrative Office', 'Counseling Services', 'Documentation'],
    location: { latitude: 13.011362522497297, longitude: 80.23571945244257 },
    imageUrl: '/images/scst-cell.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'dept-maths',
    name: 'Department of Mathematics',
    category: 'Academic',
    description: 'Mathematics department offering UG and PG programs',
    longDescription: 'Welcome to the Department of Mathematics, open 8:30 AM to 4:30 PM. This department offers undergraduate and postgraduate programs in mathematics and provides foundational math courses for all engineering students.',
    academicDetails: {
      "working_hours": "8:30 AM - 4:30 PM",
      "focus": "Core mathematics education for all engineering branches"
    },
    facilities: ['Classrooms', 'Faculty Offices', 'Research Labs'],
    location: { latitude: 13.01143961614552, longitude: 80.23549615855535 },
    imageUrl: '/images/dept-maths.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'college-society',
    name: 'College Society',
    category: 'Administrative',
    description: 'Student stationery store with reduced prices',
    longDescription: 'Welcome to the College Society, open 8:30 AM to 4:30 PM. This is a student-friendly stationery store that provides stationery products at slightly reduced costs compared to market prices, making it affordable for students.',
    academicDetails: {
      "working_hours": "8:30 AM - 4:30 PM",
      "services": "Stationery products at reduced costs"
    },
    facilities: ['Stationery Store', 'Student Discounts'],
    location: { latitude: 13.011450244694371, longitude: 80.23517054545155 },
    imageUrl: '/images/college-society.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'swimming-pool',
    name: 'Anna University Swimming Pool',
    category: 'Facility',
    description: 'University swimming pool with strict regulations',
    longDescription: 'Welcome to Anna University Swimming Pool. Timings: Monday-Friday 6-8 AM and 4-8 PM. Saturday, Sunday, and holidays: 6-9 AM, 9-10 AM (ladies only), and 4-8 PM. Shower before entry is mandatory. Only proper swimming costumes and caps allowed. Guests must know swimming. No entry for persons with skin diseases or epilepsy history. Swimming is for health purposes only. Valuables must be handed to reception. Membership cards required. No smoking, drinking, eating, or photography allowed.',
    academicDetails: {
      "weekday_hours": "6-8 AM, 4-8 PM",
      "weekend_hours": "6-9 AM, 9-10 AM (ladies only), 4-8 PM",
      "rules": "Shower mandatory, Swimming costume and cap required, No skin diseases or epilepsy, Membership card required"
    },
    facilities: ['Olympic Pool', 'Changing Rooms', 'Reception Counter', 'Safety Equipment'],
    location: { latitude: 13.011739101988786, longitude: 80.23488231439134 },
    imageUrl: '/images/swimming-pool.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'cac',
    name: 'Centre for Academic Courses',
    category: 'Academic',
    description: 'Student academic services and course registration',
    longDescription: 'Welcome to the Centre for Academic Courses, open 8:30 AM to 4:30 PM. This center handles student course registration and all course-related operations. Students can complete their academic registrations and resolve course-related queries here.',
    academicDetails: {
      "working_hours": "8:30 AM - 4:30 PM",
      "services": "Course registration, Academic operations, Student queries"
    },
    facilities: ['Administrative Office', 'Course Registration', 'Student Services'],
    location: { latitude: 13.010215751806083, longitude: 80.23325142726225 },
    imageUrl: '/images/cac.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'coe-additional',
    name: 'Additional Controller of Examinations',
    category: 'Administrative',
    description: 'Examination services and student support',
    longDescription: 'Welcome to the Additional Controller of Examinations office, open 8:20 AM to 4:30 PM. This office handles all examination-related functions including hall tickets, examinations, arrears, and results. A help desk is located at the ground floor entrance where students can resolve problems and queries regarding these services.',
    academicDetails: {
      "working_hours": "8:20 AM - 4:30 PM",
      "services": "Hall tickets, Examinations, Arrears, Results",
      "help_desk": "Ground floor entrance"
    },
    facilities: ['Help Desk', 'Administrative Office', 'Result Processing'],
    location: { latitude: 13.010061066604154, longitude: 80.23348018368803 },
    imageUrl: '/images/coe.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'estate-office',
    name: 'Estate Office',
    category: 'Administrative',
    description: 'Event permissions and campus facility management',
    longDescription: 'Welcome to the Estate Office, open 8:30 AM to 4:30 PM. This office handles permissions for events and campus usage outside departments, including vehicle passes, event permission letters, and banner permission letters. All campus facility bookings and permissions are processed here.',
    academicDetails: {
      "working_hours": "8:30 AM - 4:30 PM",
      "services": "Event permissions, Vehicle passes, Banner permissions, Campus facility bookings"
    },
    facilities: ['Administrative Office', 'Permission Processing', 'Campus Management'],
    location: { latitude: 13.010088635369991, longitude: 80.23380962151957 },
    imageUrl: '/images/estate-office.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'cai',
    name: 'Centre for Affiliation of Institutions',
    category: 'Administrative',
    description: 'Affiliated colleges coordination center',
    longDescription: 'Welcome to the Centre for Affiliation of Institutions, open 8:30 AM to 4:30 PM. This center manages the affiliation process for colleges under Anna University and coordinates academic standards across affiliated institutions.',
    academicDetails: {
      "working_hours": "8:30 AM - 4:30 PM",
      "services": "College affiliations, Academic standards coordination"
    },
    facilities: ['Administrative Office', 'Documentation Center', 'Coordination Services'],
    location: { latitude: 13.00905586173784, longitude: 80.23350730096104 },
    imageUrl: '/images/cai.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'hv-lab',
    name: 'High Voltage Laboratory',
    category: 'Academic',
    description: 'Electrical engineering high voltage testing facility',
    longDescription: 'Welcome to the High Voltage Laboratory, open 8:30 AM to 4:30 PM. This specialized facility is used for high voltage testing, electrical insulation research, and power systems experiments for electrical engineering students.',
    academicDetails: {
      "working_hours": "8:30 AM - 4:30 PM",
      "focus": "Advanced electrical engineering research"
    },
    facilities: ['Testing Equipment', 'Safety Systems', 'Research Lab'],
    location: { latitude: 13.010834395468814, longitude: 80.2342889413253 },
    imageUrl: '/images/hv-lab.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'dept-chemistry',
    name: 'Department of Applied Chemistry',
    category: 'Academic',
    description: 'Chemistry department with research facilities',
    longDescription: 'Welcome to the Department of Applied Chemistry, open 8:30 AM to 4:30 PM. This department offers chemistry courses for all engineering students and conducts research in applied chemistry, materials science, and chemical engineering.',
    academicDetails: {
      "working_hours": "8:30 AM - 4:30 PM",
      "focus": "Core chemistry education and research"
    },
    facilities: ['Chemistry Labs', 'Research Facilities', 'Faculty Offices'],
    location: { latitude: 13.012052288353274, longitude: 80.23616647422108 },
    imageUrl: '/images/dept-chemistry.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'dept-mba',
    name: 'Department of Management Studies',
    category: 'Academic',
    description: 'MBA Department offering Management Studies programs',
    longDescription: 'Welcome to the Department of Management Studies, open 8:30 AM to 4:30 PM. This 3-floor building houses the MBA program with computing facilities, an ERP lab, conference hall, classrooms, and a department library. The ground floor has the Chairman office, HOD office, computing facilities, and library. The first floor has classrooms and the ERP lab. The second floor has a conference hall and classrooms.',
    academicDetails: {
      "working_hours": "8:30 AM - 4:30 PM",
      "ground_floor": {
        "right_side": "Chairman Office, HOD Office, Dr. T Padmavathi",
        "left_side": "Computing Facilities, Library, Gents Toilet",
        "left_faculty": ["Dr. E Thendral", "Dr. Jayanth Jacob", "Dr. A K Sheik Manzoor", "Dr. N Senthil Kumar", "Dr. R Magesh"]
      },
      "first_floor": {
        "right_wing": "Classroom 102",
        "right_faculty": ["Dr. S Krishnakumar", "Dr. J Rajesh", "Dr. A Thiruchelvi"],
        "left_wing": "ERP Lab",
        "left_faculty": ["Dr. S Meenakumari"]
      },
      "second_floor": {
        "right_wing": "Conference Hall, Classroom 203",
        "left_wing": "Classroom 202, Classroom 204"
      }
    },
    facilities: ['Chairman Office', 'HOD Office', 'Computing Facilities', 'ERP Lab', 'Department Library', 'Conference Hall', 'Classrooms'],
    location: { latitude: 13.01228632095963, longitude: 80.23629182270584 },
    imageUrl: '/images/dept-mba.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'alumni-association',
    name: 'Alumni Association of CEG',
    category: 'Administrative',
    description: 'CEG alumni network and event facilities',
    longDescription: 'Welcome to the Alumni Association of CEG, open 9:30 AM to 4:00 PM. This office maintains connections with CEG alumni worldwide and organizes alumni meets. The facility features an AC dining hall (rental: 2000 rupees for 4 hours), presentation halls, and conference halls. All facilities can be booked at the help desk on the ground floor.',
    academicDetails: {
      "working_hours": "9:30 AM - 4:00 PM",
      "dining_hall_rental": "2000 rupees for 4 hours",
      "booking": "Help desk on ground floor"
    },
    facilities: ['AC Dining Hall', 'Presentation Halls', 'Conference Hall', 'Help Desk'],
    location: { latitude: 13.012705908237708, longitude: 80.23647516926965 },
    imageUrl: '/images/alumni.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'dept-cse',
    name: 'Department of Computer Science and Engineering',
    category: 'Academic',
    description: 'CSE Department offering B.E, M.E and Ph.D programs in Computer Science',
    longDescription: 'Welcome to the Department of Computer Science and Engineering, open 8:30 AM to 4:30 PM. This multi-floor building houses computing labs, lecture halls, and faculty cabins. The ground floor has a help desk at the far left of the entrance, computing labs, and Turing Hall. The first floor has the department office, HOD cabin, and Software Engineering Laboratory. Upper floors house research labs, GPU workstations, and faculty cabins.',
    academicDetails: {
      "working_hours": "8:30 AM - 4:30 PM",
      "hod": "Dr. V Mary Anita Rajam",
      "ground_floor": {
        "left_of_entrance": "Help Desk",
        "straight": "Turing Hall, Lecture Hall R1",
        "faculty": ["Dr. V Gopal", "Dr. S Valli", "Dr. P Uma Maheswari", "Dr. P Geetha"],
        "labs": ["Computing and Digital Systems Laboratory"]
      },
      "first_floor": {
        "rooms": "Office Room, Lecture Hall R2",
        "faculty": ["Dr. V Mary Anita Rajam (HOD)", "Dr. R Baskaran", "Dr. S Chitrakala", "Dr. C Valliyammai"],
        "labs": ["Software Engineering Laboratory"],
        "facilities": "Drinking water facility"
      },
      "second_floor": {
        "faculty": ["Dr. V VetriSelvi", "Dr. G S Mahalakshmi", "Dr. K Selvamani", "Dr. S Renugadevi"],
        "rooms": "Faculty Cabins 1 and 2 (around 15 cabins)"
      },
      "third_floor": {
        "faculty": ["Dr. M Shanmugapriya", "Dr. Arockia Xavier Annie R", "Dr. S Bose", "Dr. S Sudha", "Dr. T Sree Sharmila"],
        "labs": ["Research Lab", "Operating Systems and Networks Laboratory", "GPU Workstations Laboratory"],
        "rooms": "Lecture Hall R4"
      }
    },
    facilities: ['Help Desk', 'Turing Hall', 'Computing and Digital Systems Lab', 'Software Engineering Lab', 'GPU Workstations Lab', 'OS and Networks Lab', 'Research Lab', 'Lecture Halls'],
    location: { latitude: 13.012485621014125, longitude: 80.23579931126696 },
    imageUrl: '/images/dept-cse.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'dept-ece',
    name: 'Department of Electronics and Communication Engineering',
    category: 'Academic',
    description: 'ECE Department offering B.E, M.E and Ph.D programs in Electronics and Communication',
    longDescription: 'Welcome to the Department of Electronics and Communication Engineering, open 8:30 AM to 4:30 PM. The building has a T-shaped pathway on each floor. The ground floor has the Motivation Hall, satellite labs, and fabrication lab. The first floor houses the HOD office, department office, communication labs, and DSP and VLSI lab. The second floor has PG labs, research labs, and a mini auditorium. The third floor has electronics and semiconductor labs.',
    academicDetails: {
      "working_hours": "8:30 AM - 4:30 PM",
      "hod": "Dr. M A Bhagyaveni",
      "ground_floor": {
        "straight": "Motivation Hall, Dr. C M Sujatha, Dr. R Sittalatchoumy, Dr. S Ewina Pon Pushpa, Dr. K Praveen",
        "left": "Dr. P V Ramakrishna, Dr. J Durga Devi, Integrated Systems Lab for Small Satellite 1, Integrated Systems Lab for Small Satellite 2, Electronic System Design and Fabrication Lab",
        "far_left": "Lecture Hall LH1, Maxwell Auditorium, Ladies Restroom"
      },
      "first_floor": {
        "straight_opposite_office": "Microwave and Optical Communication Laboratory, Fiber Optical Communication Laboratory, Wireless Communication and Networking Lab",
        "right": "HOD Office, Department Office, Store Keeper Technical, Senior Technical Assistant (Mr. K R Vimal), Lecture Hall 1, Lecture Hall 2, Library and Conference Hall, DSP and VLSI Lab, Computing and Simulation Lab, Computing Facility for Research Scholars",
        "right_faculty": ["Dr. T Sridarshini", "Dr. Nandhini S", "Dr. S Karthiga", "Dr. A Rijuvana Begum", "Dr. S Sangeetha", "Dr. S R Sriram"],
        "left": "Communication System Lab, Dept. Stores, Gents Toilet",
        "left_faculty": ["Mrs. V Pushpalatha", "Mrs. R Ann Caroline", "Dr. M A Bhagyaveni (HOD)"]
      },
      "second_floor": {
        "right": "PG VLSI Design Laboratory, Lecture Hall LH3, Communication Systems Research Laboratory, EMI/EMC Testing and Antenna Measurement Lab",
        "right_faculty": ["Dr. V Jeyalakshmi", "Dr. P Nirmal Kumar", "Dr. J Kamala", "Dr. O Uma Maheshwari"],
        "opposite_lh3": "Dr. S Muttan, Dr. T Manimekalai, Mrs. V Pushpalatha, Dr. V Jawahar Senthil Kumar, Dr. P Sakthivel, Dr. T Laxmikandan, Dr. M Gulam Nabi Alsath",
        "left": "Mini Auditorium, Applied Electronics Lab (Dr. D Sridharan, Dr. N Ramadass), Gents Toilet"
      },
      "third_floor": {
        "right": "Integrated Electronics Laboratory, Electronic Circuits Lab, Semiconductor Devices Lab"
      }
    },
    facilities: ['Motivation Hall', 'Maxwell Auditorium', 'Mini Auditorium', 'Satellite Labs', 'DSP and VLSI Lab', 'Communication Labs', 'Research Labs', 'Library and Conference Hall'],
    location: { latitude: 13.012504026272051, longitude: 80.23533816048328 },
    imageUrl: '/images/dept-ece.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'science-humanities',
    name: 'Science and Humanities Block',
    category: 'Academic',
    description: 'Block housing Physics, Chemistry, and English departments',
    longDescription: 'Welcome to the Science and Humanities Block, open 8:30 AM to 4:30 PM. This block houses three departments: Physics (right wing), Chemistry (left wing), and English (third floor). The ground floor has physics labs and chemistry research labs. The first floor has the Physics HOD office, chemistry research labs, and a seminar hall. The third floor is dedicated to the English department with classrooms, a language lab, and faculty cabins.',
    academicDetails: {
      "working_hours": "8:30 AM - 4:30 PM",
      "departments": ["Physics", "Chemistry", "English"],
      "ground_floor": {
        "right_wing_physics": {
          "faculty": ["Dr. A Mahalingam", "Dr. K Murali", "Dr. G Velraj", "Dr. Y Vidhyalakshmi"],
          "labs": ["High Pressure and Nano Science Lab", "Materials Characterization Laboratory", "Sophisticated Instrumentation Laboratory", "BE/BTech Physics Laboratory", "Solid State Ionics Laboratory"]
        },
        "left_wing_chemistry": {
          "hod": "Dr. M Dharmendira Kumar",
          "faculty": ["Dr. A R Suresh Babu", "Dr. K Muralirajan"],
          "labs": ["Research Labs 1-4", "PG Lab (M.Sc and M.Tech)", "UG Lab (B.E and B.Tech)", "Chemical Stores", "Scanning Electron Microscope Lab (Dr. Keerthi)"],
          "research_labs": {
            "lab1": "Nanocatalysis Lab - Prof. A Pandurangan",
            "lab2": "Advanced Nano Materials and Energy Storage Research Lab (Dr. A Pandurangan), Catalysis and Photopolymer Lab (Dr. K Subramanian), Room 112A - Prof. N Rajendran (Chairman, Faculty of Science and Humanities)",
            "lab3": "Bio Materials and Corrosion Laboratory (Prof. N Rajendran), SAIF - Sophisticated Analytical Instrumentation Facility (Dr. P Hemalatha, Mr. N S Palani)",
            "lab4": "Electrospinning Laboratory - Dr. R Y Sheeja"
          }
        }
      },
      "first_floor": {
        "left_wing_physics": {
          "hod": "Dr. G Kalpana",
          "faculty": ["Dr. K Vishista", "Dr. M Gunasekaran", "Dr. R Rajkumar"],
          "labs": ["Applied Chaos Laboratory", "Computational Physics Laboratory", "Crystal Research Laboratory", "Laser Laboratory (M.Tech)", "PG Laboratory", "Computer Laboratory", "Optics Lab"],
          "rooms": "Physics Auditorium, Classrooms 125, 128, 129, Department Library, Gents Toilet"
        },
        "right_wing_chemistry": {
          "faculty": ["Dr. P Nagaraj", "Dr. P Hemalatha", "Dr. P Baskaralingam", "Dr. S Revathi", "Dr. Keerthi", "Dr. S Angayarkanny"],
          "labs": [
            "Research Lab 5: Thermally Stable Polymers Lab (Prof. M Sarojadevi), Catalysis and Nanomaterials Fabrication Lab (Dr. S Revathi), Bio-Polymer Coatings Lab (Dr. S Ananda Kumar), Surface Science and Drug Delivery Lab (Dr. S Angayarkanny)",
            "Research Lab 6: Surface Chemistry and Catalysis Lab (Prof. K Shanthi), Nanomaterials and Biopolymeric Films Lab (Dr. G R Rajarajeshwari), Green Energy and Catalysis Lab (Dr. P Hemalatha)",
            "Research Lab 7 (Room 121): Environmental Lab (Dr. P Baskaralingam), Corrosion Composites and Catalysis Lab (Dr. M J Umapathy), Sustainable Organic Material Lab (Dr. P Nagaraj), Energy and Environmental Research Lab (Dr. Keerthi)"
          ],
          "rooms": "Classroom 122, Ladies Toilet",
          "faculty_cabins": "Room 118: Dr. M J Umapathy, Dr. G R Rajarajeswari, Dr. S Ananda Kumar, Dr. R Y Sheeja, Dr. P Sangeetha, Dr. P Muthu Mareeswaran. Room 117: Dr. A Pandurangan. Room 116: Mr. K Balraj, Dr. S Devika, Dr. J Prabha, Mrs. D Sasirekha",
          "classrooms": "Room 115 (1st Year M.Sc), Room 114 (2nd Year M.Sc), Library 113A and 113B, Seminar Hall (Hall of 1960)"
        }
      },
      "third_floor_english": {
        "hod": "Dr. S Soundiraraj (Professor and Head)",
        "faculty": ["Mrs. T Shrimathy Venkatalakshmi", "Mrs. A Benita", "Dr. Veena Selvam", "Dr. P R Sujatha Priyadharsini", "Ms. Gitanjali M S", "Dr. C Lakshmi", "Dr. P Lakshmi Priya", "Dr. P Ramakrishnan", "Dr. Reena Salil", "Dr. J Kalyani Pricilla", "Dr. S Kavita Singh", "Ms. A Meera"],
        "right_wing": "Classrooms 201, 202, 203, 206, 208, 209, English Department Library",
        "left_wing": "Faculty Cabin 1 (Dr. P Ramakrishnan, Dr. Veena Selvam, Dr. Reena Salil, Dr. P Lakshmi Priya, Dr. Kalyani Pricilla, Dr. S Soundiraraj, Ms. Gitanjali M S, Dr. P R Sujatha Priyadarshini), Room 211 Faculty Cabin 2 (Dr. S Kavita Singh, Mrs. A Meera), Room 212 Language Laboratory, Classroom 213",
        "physics_wing": "Room 214 (M.Tech Physics 2nd Year), Room 215 (Advanced Materials Synthesis Lab), Room 216 (BE/BTech Physics Lab 2), Room 217 (BE/BTech Physics Lab 3)"
      }
    },
    facilities: ['Physics Labs', 'Chemistry Research Labs', 'English Language Lab', 'Physics Auditorium', 'Seminar Hall (Hall of 1960)', 'Department Libraries', 'SAIF Facility'],
    location: { latitude: 13.01226594591913, longitude: 80.23561537707216 },
    imageUrl: '/images/science-humanities.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  },
  {
    id: 'au-gym',
    name: 'Anna University GYM',
    category: 'Facility',
    description: 'University gymnasium below sports gallery',
    longDescription: 'Welcome to Anna University Gymnasium, open 7:00 AM to 7:00 PM. Located below the sports gallery on the ground floor, this modern fitness center is accessible to all university students. The gym is equipped with cardio machines, weight training equipment, and provides comprehensive fitness programs.',
    academicDetails: {
      "working_hours": "7:00 AM - 7:00 PM",
      "location": "Below sports gallery, ground floor",
      "access": "All university students"
    },
    facilities: ['Cardio Equipment', 'Weight Training', 'Fitness Programs', 'Changing Rooms'],
    location: { latitude: 13.012489525389453, longitude: 80.23708803611441 },
    imageUrl: '/images/gym.jpg',
    languageSupport: ['English', 'Tamil', 'Hindi']
  }
];