import { Template } from './Homepage';
import { useInView } from 'react-intersection-observer';
import { BrowserRouter } from 'react-router-dom';

const fakeData = {
    pages: [
        {
            data: [
                {
                    company: 'Arcadis',
                    scname: '',
                    website: 'https://jobs.arcadis.com/careers?location=Romania&',
                    description:
                        'At Arcadis, our purpose is improving quality of life. We do this by creating livable places where people and communities can thrive. We enhance mobility, so that we can sustainably move in and between our cities. And we work to protect the environment and natural resources for future generations. We focus on finding innovative and lasting solutions to the world’s biggest challenges.',
                    logo: [
                        'https://cdn.phenompeople.com/CareerConnectResources/ARCAGLOBAL/images/header-1679586076111.svg',
                    ],
                    jobsCount: 64,
                },
                {
                    company: 'Astrazeneca',
                    scname: '',
                    website: 'https://careers.astrazeneca.com/search-jobs/Romani',
                    description:
                        'We are AstraZeneca, one of the world’s most forward-thinking and connected BioPharmaceutical companies. With a strong purpose, an even stronger bond between each of our people and a science-led, patient-first attitude, we’re changing the future of medicine and the impact it can have on lives across the globe. Are you ready for a challenge?',
                    logo: [
                        'https://tbcdn.talentbrew.com/company/7684/img/logo/logo-14641-17887.png',
                    ],
                    jobsCount: 9,
                },
                {
                    company: 'Atlascopco',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://www.atlascopco.com/etc.clientlibs/settings/wcm/designs/accommons/design-system/clientlib-assets/resources/icons/logo.svg',
                    ],
                    jobsCount: 5,
                },
                {
                    company: 'Atos',
                    scname: '',
                    website: 'https://jobs.atos.net/go/Jobs-in-Romania/3686501/0',
                    description:
                        'Atos is a global leader in digital transformation with c. 95,000 employees and annual revenue of c. € 11 billion. European number one in cybersecurity, cloud and high-performance computing, the Group provides tailored end-to-end solutions for all industries in 69 countries. A pioneer in decarbonization services and products, Atos is committed to a secure and decarbonized digital for its clients. Atos is a SE (Societas Europaea), and listed on Euronext Paris.\r\n\r\nThe purpose of Atos is to help design the future of the information space. Its expertise and services support the development of knowledge, education and research in a multicultural approach and contribute to the development of scientific and technological excellence. Across the world, the Group enables its customers and employees, and members of societies at large to live, work and develop sustainably, in a safe and secure information space.',
                    logo: [
                        'https://rmkcdn.successfactors.com/a7d5dbb6/c9ab6ccb-b086-47f2-b25b-2.png',
                    ],
                    jobsCount: 26,
                },
                {
                    company: 'Auchan',
                    scname: '',
                    website: 'https://cariere.auchan.ro/jobs?per_page=1000',
                    description:
                        'Auchan este specialistul alimentar cu cele mai largi game și prețuri mici, prin care susține puterea de cumpărare a românilor și afirmă rolul de a selecționa și a concepe cele mai bune game de produse, conform nevoilor clienților și tendințelor de consum.\r\n\r\nAuchan este un retailer cu tradiție, din 1961, care se adaptează într-o lume aflată în schimbare și care vine în întâmpinarea consumatorilor tot mai interesați de o alimentație sănătoasă. Auchan are ambiția de a le schimba viața.\r\n\r\nEste un comerciant care își cunoaște clienții și care îmbină avantajele digitalului cu cele ale magazinelor fizice, pentru a propune o experiență unică. Auchan își transformă spațiile în zone de experiențe pentru clienți, astfel încât fiecare vizită să fie facilă și surprinzătoare.\r\n\r\nAuchan România este un actor responsabil care realizează o serie de acțiuni importante pentru promovarea activităților de responsabilitate socială şi integrare a tinerilor, dar şi programe pentru protejarea mediului înconjurător care au drept scop gestionarea deşeurilor, economisirea resurselor etc.\r\n\r\nPeste tot în lume, angajații Auchan Retail sunt încurajați să își dezvolte pasiunea pentru meserie și împărtășesc viziunea unui comerț în care atenția pentru om și mediu primează față de orice altceva.\r\n\r\nÎn România din 2006, Auchan Retail România are în portofoliu 33 de hipermarketuri, 5 supermarketuri și o rețea de 148 magazine de proximitate MyAuchan, dintre care 140* în stațiile Petrom. Cu peste 280.000 m2 suprafaţa netă de vânzare, o cifră de afaceri cu taxe de peste 1,2 miliarde de Euro, Auchan propune celor circa 5 milioane de locuitori din orașele în care sunt prezente magazinele sale un comerţ modern, de calitate, cu cele mai largi game de produse şi un concept de discount responsabil, cu toate preţurile mici, permanent.',
                    logo: [
                        'https://res.cloudinary.com/smartdreamers/image/upload/v1685443347/company_logos/82780f0401d4b4b2097c8f79d13fa468.svg',
                    ],
                    jobsCount: 103,
                },
                {
                    company: 'Autoliv',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://images.teamtailor-cdn.com/images/s3/teamtailor-production/logotype-v3/image_uploads/d7b6d876-3ad3-4051-81a2-e6293d1694ec/original.png',
                    ],
                    jobsCount: 34,
                },
                {
                    company: 'Autonom',
                    scname: '',
                    website: '',
                    description: '',
                    logo: ['https://www.autonom.ro/assets/uploads/autonom_logo-high-res.png'],
                    jobsCount: 11,
                },
                {
                    company: 'Avangardesoftware',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://avangarde-software.com/wp-content/uploads/2020/03/Avangarde-Software-Logo-1.png',
                    ],
                    jobsCount: 5,
                },
                {
                    company: 'Bancatransilvania',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://www.bancatransilvania.ro/themes/bancatransilvania/assets/images/logos/bt-cariere.svg',
                    ],
                    jobsCount: 16,
                },
                {
                    company: 'Bat',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://cdn.radancy.eu/company/1045/v2_0/img/temporary/shared/bat-logo.svg',
                    ],
                    jobsCount: 46,
                },
                {
                    company: 'Bcr',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://rmkcdn.successfactors.com/d1204926/7da4385b-5dfa-431c-9772-9.png',
                    ],
                    jobsCount: 19,
                },
                {
                    company: 'Bearingpoint',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/BearingPoint_201x_logo.svg/800px-BearingPoint_201x_logo.svg.png?20161218212116',
                    ],
                    jobsCount: 20,
                },
                {
                    company: 'Betfair',
                    scname: '',
                    website: '',
                    description: '',
                    logo: ['https://www.betfairromania.ro/images/logo.svg?v1.1'],
                    jobsCount: 72,
                },
                {
                    company: 'Biofarm',
                    scname: '',
                    website: '',
                    description: '',
                    logo: ['https://www.biofarm.ro/wp-content/uploads/2019/10/logo.png'],
                    jobsCount: 13,
                },
                {
                    company: 'Bolt',
                    scname: '',
                    website: '',
                    description: '',
                    logo: ['https://bolt.eu/bolt-logo-original-on-white.png'],
                    jobsCount: 24,
                },
                {
                    company: 'Borgwarner',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://www.tyrepress.com/wp-content/uploads/2023/06/borgwarner-logo-550x191.png',
                    ],
                    jobsCount: 6,
                },
                {
                    company: 'Brd',
                    scname: '',
                    website: '',
                    description: '',
                    logo: ['https://www.brd.ro/sites/all/themes/brd/img/logo-mic.png'],
                    jobsCount: 38,
                },
                {
                    company: 'Brightantity',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://i0.wp.com/brightantity.com/wp-content/uploads/2020/08/1123Asset-2-1.png?resize=768%2C265&ssl=1',
                    ],
                    jobsCount: 16,
                },
                {
                    company: 'Brinks',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://ro.brinks.com/o/brinks-website-theme/images/logos/brinks/brinks-logo-blue.png',
                    ],
                    jobsCount: 6,
                },
                {
                    company: 'Capgemini',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://prod.ucwe.capgemini.com/ro-en/wp-content/themes/capgemini2020/assets/images/logo.svg',
                    ],
                    jobsCount: 75,
                },
            ],
            nextId: 3,
            count: 0,
        },
        {
            data: [
                {
                    company: 'Cargill',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://tbcdn.talentbrew.com/company/23251/18994/content/logo-full.png',
                    ],
                    jobsCount: 3,
                },
                {
                    company: 'Cegeka',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://www.cegeka.com/hubfs/Cegeka%20Website%20-%202017/Logo/cegeka-logo-color.png',
                    ],
                    jobsCount: 12,
                },
                {
                    company: 'Celestica',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://rmkcdn.successfactors.com/bcf7807a/f4737f7e-31d4-4348-963c-8.png',
                    ],
                    jobsCount: 9,
                },
                {
                    company: 'Cocacolahbc',
                    scname: '',
                    website: '',
                    description: '',
                    logo: ['https://careers.coca-colahellenic.com/portal/5/images/logo.svg'],
                    jobsCount: 50,
                },
                {
                    company: 'Cognizantsoftvision',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://www.cognizantsoftvision.com/react-images/logos/logo-header.png',
                    ],
                    jobsCount: 18,
                },
                {
                    company: 'Conarg',
                    scname: '',
                    website: '',
                    description: '',
                    logo: ['http://www.conarg.co/images/logo/logo.svg'],
                    jobsCount: 4,
                },
                {
                    company: 'Continental',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://cdn.continental.com/fileadmin/_processed_/3/b/csm_continental_20logo-1920x1080_247d99d89e.png',
                    ],
                    jobsCount: 139,
                },
                {
                    company: 'Crowdstrike',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://crowdstrike.wd5.myworkdayjobs.com/crowdstrikecareers/assets/logo',
                    ],
                    jobsCount: 21,
                },
                {
                    company: 'Crowe',
                    scname: '',
                    website: '',
                    description: '',
                    logo: ['https://i.ytimg.com/vi/dTmm3WNIpnc/maxresdefault.jpg'],
                    jobsCount: 22,
                },
                {
                    company: 'Cummins',
                    scname: '',
                    website: '',
                    description: '',
                    logo: ['https://dn9tckvz2rpxv.cloudfront.net/cummins/img4/logo.svg'],
                    jobsCount: 2,
                },
                {
                    company: 'Danone',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://upload.wikimedia.org/wikipedia/commons/1/13/DANONE_LOGO_VERTICAL.png',
                    ],
                    jobsCount: 11,
                },
                {
                    company: 'Ddroidd',
                    scname: '',
                    website: '',
                    description: '',
                    logo: ['https://www.ddroidd.com/img/header-logo.svg'],
                    jobsCount: 7,
                },
                {
                    company: 'Decathlon',
                    scname: '',
                    website: '',
                    description: '',
                    logo: ['https://workablehr.s3.amazonaws.com/uploads/account/logo/404273/logo'],
                    jobsCount: 80,
                },
                {
                    company: 'Decorfloor',
                    scname: '',
                    website: '',
                    description: '',
                    logo: ['https://decorfloor.ro/wp-content/uploads/2015/08/logo.png'],
                    jobsCount: 3,
                },
                {
                    company: 'Dedeman',
                    scname: '',
                    website: '',
                    description: '',
                    logo: ['https://i.dedeman.ro/dedereact/design/images/logo.svg'],
                    jobsCount: 82,
                },
                {
                    company: 'Dell',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://tbcdn.talentbrew.com/company/375/v4_0/img/logos/delltech_logo_prm_blue_rgb.jpg',
                    ],
                    jobsCount: 30,
                },
                {
                    company: 'Delonghi',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://logos-world.net/wp-content/uploads/2020/12/DeLonghi-Logo-700x394.png',
                    ],
                    jobsCount: 5,
                },
                {
                    company: 'Deutschebank',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://fontslogo.com/wp-content/uploads/2019/01/Deutsche-Bank-Logo-Font.jpg',
                    ],
                    jobsCount: 162,
                },
                {
                    company: 'Docker',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png',
                    ],
                    jobsCount: 3,
                },
                {
                    company: 'Draxlmaier',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://rmkcdn.successfactors.com/0141de78/80376284-e029-4c8c-8f6f-6.png',
                    ],
                    jobsCount: 61,
                },
            ],
            nextId: 4,
            count: 0,
        },
    ],
};

const templateData = {
    pages: [
        {
            data: [
                {
                    company: '1And1',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://cdn.website-editor.net/b236a61347464e4b904f5e6b661c2af9/dms3rep/multi/1and1-logo.svg',
                    ],
                    jobsCount: 19,
                },
                {
                    company: '3Pillarglobal',
                    scname: '',
                    website: 'https://www.3pillarglobal.com/career-opportunities',
                    description:
                        '3Pillar Global is more than a digital product development and innovation company. We’re the power behind the brands you know.',
                    logo: ['https://i.imgur.com/SM5d3eE.png'],
                    jobsCount: 8,
                },
                {
                    company: '888Sparkware',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://888sparkware.ro/wp-content/uploads/2020/06/Sparkware_black_horizontal.png',
                    ],
                    jobsCount: 18,
                },
                {
                    company: '8X8',
                    scname: '',
                    website: 'https://8x8inc.wd5.myworkdayjobs.com/8x8_External_',
                    description:
                        'We empower workforces worldwide to connect individuals and teams so they can collaborate faster and work smarter.',
                    logo: [
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/8x8_square_logo.svg/220px-8x8_square_logo.svg.png',
                    ],
                    jobsCount: 2,
                },
                {
                    company: 'Abbvie',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://tbcdn.talentbrew.com/company/14/v2_0/img/abbvie-logo-color.svg',
                    ],
                    jobsCount: 5,
                },
                {
                    company: 'Acrom',
                    scname: '',
                    website: 'https://acrom.mingle.ro/ro/apply',
                    description:
                        'ACROM este o companie romaneasca specializata in furnizarea de solutii si servicii IT profesionale catre mediul de business local si international. Fondata in anul 2004, compania detine experienta solida in gestionarea intregului proces de derulare a proiectelor IT, de la concept, faza de proiectare, dezvoltare, implementare,\r\nintegrare si configurare, la punere in functiune, administrare si asistenta tehnica. \r\n \r\nObiectivul companiei este acela de a livra clientilor sai rezultate tangibile, la cel mai inalt nivel de calitate. Inovatie, munca de echipa, atitudine pozitiva, orientarea spre client si profesionalism sunt valore pe care noi le cautam in fecare membru al ACROM. Daca te regasesti in in descrierea facuta, te invit sa ni te alaturi!',
                    logo: ['https://www.acrom.ro/wp-content/uploads/2022/05/1-Acrom-logo-main.png'],
                    jobsCount: 15,
                },
                {
                    company: 'Adi',
                    scname: '',
                    website: 'https://analogdevices.wd1.myworkdayjobs.com/en-US/',
                    description:
                        'Analog Devices, Inc. (ADI) empowers the Intelligent Edge with the most innovative analog, digital, and software solutions, accelerating breakthroughs that benefit society and the planet.',
                    logo: [
                        'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-original-577x577/s3/072011/analog-logo.ai_.png?itok=RM5-oQ34',
                    ],
                    jobsCount: 1,
                },
                {
                    company: 'Adobe',
                    scname: '',
                    website: 'https://careers.adobe.com/us/en/search-results',
                    description:
                        'Fondată în urmă cu 40 de ani pe ideea simplă de a crea produse inovatoare care să schimbe lumea, Adobe oferă tehnologii revoluționare care ajută oameni de pretutindeni să conceapă, să creeze și să aducă la viață orice experiență digitală.',
                    logo: [
                        'https://cdn.phenompeople.com/CareerConnectResources/ADOBUS/images/Header-1649064948136.png',
                    ],
                    jobsCount: 18,
                },
                {
                    company: 'Adp',
                    scname: '',
                    website: 'https://tech.adp.com/en/jobs/',
                    description:
                        "At ADP, what we do is about people. Although we have a strong history of providing solutions for human resource challenges, we strive to do more than that. We challenge ourselves to anticipate, think forward and take action in a way that empowers us to shape the changing world of work.\r\n\r\nFor over 75 years, we’ve led the way in defining the future of business solutions. ADP is proud to be named the 2023 Fortune® World's Most Admired Companies™ list again for 17 consecutive years*.\r\n\r\nWe are a comprehensive global provider of cloud-based human capital management (HCM) solutions that unite HR, payroll, talent, time, tax and benefits administration, and a leader in business outsourcing services, analytics and compliance expertise. Our unmatched experience, deep insights and cutting-edge technology have transformed human resources from a back-office administrative function to a strategic business advantage.",
                    logo: [
                        'https://cdn-static.findly.com/wp-content/uploads/sites/794/2019/03/NewADP-redlogo.png',
                    ],
                    jobsCount: 19,
                },
                {
                    company: 'Aera',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://lever-client-logos.s3.amazonaws.com/dfa07fbc-23b8-4677-9df5-6bb3d39f07db-1511999864878.png',
                    ],
                    jobsCount: 5,
                },
                {
                    company: 'Agricover',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://agricover.ro/Files/Images/AgricoverCorporate/logo/svg/logo-positive.svg',
                    ],
                    jobsCount: 13,
                },
                {
                    company: 'Airbus',
                    scname: '',
                    website: '',
                    description: '',
                    logo: ['https://ag.wd3.myworkdayjobs.com/Airbus/assets/logo'],
                    jobsCount: 8,
                },
                {
                    company: 'Allianz',
                    scname: '',
                    website: 'https://careers.allianz.com/search/?searchby=locat',
                    description:
                        'The Allianz Group is one of the leading integrated financial services providers worldwide. Here you find the company profile, the Allianz fact sheet and further information on business operations.',
                    logo: [
                        'https://rmkcdn.successfactors.com/cdd11cc7/5d49b267-5aa1-4363-8155-d.svg',
                    ],
                    jobsCount: 110,
                },
                {
                    company: 'Allianztiriac',
                    scname: '',
                    website: 'https://www.allianztiriac.ro/ro_RO/cariere/cariere',
                    description:
                        'Allianz-Tiriac nu este doar despre noi. Este despre tine si despre cum peste 4.000 de profesionisti te pot ajuta sa iti construiesti viitorul financiar pe care ti-l doresti. Este despre cum poti sa ramai tot timpul stapan pe situatie si despre a-ti da libertate, lasand in seama noastra tot ceea ce conteaza pentru tine',
                    logo: [
                        'https://www.allianztiriac.ro/content/dam/onemarketing/cee/azro/media/logo_azt/allianz_tiriac_logo.png',
                    ],
                    jobsCount: 16,
                },
                {
                    company: 'Alstom',
                    scname: '',
                    website: '',
                    description: '',
                    logo: [
                        'https://rmkcdn.successfactors.com/44ea18da/ff6f3396-32e1-421d-915a-5.jpg',
                    ],
                    jobsCount: 111,
                },
                {
                    company: 'Alten',
                    scname: '',
                    website: '',
                    description: '',
                    logo: ['https://careers.altenromania.ro/assets/img/svgs/logo.svg'],
                    jobsCount: 143,
                },
                {
                    company: 'Altom',
                    scname: '',
                    website: 'https://altom.com/jobs/',
                    description:
                        'Altom is a software testing company founded in 2008, in Cluj-Napoca, by a group of senior test consultants: Oana Casapu, Ru Cindrea and Alexandru Rotaru.\r\n\r\nFrom the beginning, our main goal was to start a company that would provide specialised software testing services for an advanced evaluation of the clients’ software.\r\n\r\nWe believe in intellectually rich and structured testing, with focus on testers’ advanced skills. This is reflected in the name Altom, that translates as “a different/ a new person”, echoing an old Romanian saying: ma simt alt om (I feel like a new person). We are trying to promote and support a different attitude to testing and help our clients and employees enjoy the benefits of this change.\r\n\r\nWe are guided by excellence, as our focus is solely on Software Testing. This guarantees high quality services and consultancy.\r\n\r\nWe offer a model of business centred on working together with our clients. We ask for feedback and adapt our style to best suit the project.\r\n\r\nWe take pride in our honesty and loyalty, by being committed to our engagements and building long-term relationships.\r\n\r\nWe truly think transparency is the key. By keeping the information flow simple, clear and relevant, we ease communication with clients, partners and employees.\r\n\r\nWe will never stop improving. Our testing skills and knowledge base are constantly expanding in order to provide up-to-date services.',
                    logo: [
                        'https://altom.com/app/themes/altom-sage-theme/dist/images/logo-altom_60516779.png',
                    ],
                    jobsCount: 1,
                },
                {
                    company: 'Amazon',
                    scname: '',
                    website: 'https://www.amazon.jobs/en/locations/bucharest-rom',
                    description:
                        'Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. Amazon strives to be Earth’s most customer-centric company, Earth’s best employer, and Earth’s safest place to work. Customer reviews, 1-Click shopping, personalized recommendations, Prime, Fulfillment by Amazon, AWS, Kindle Direct Publishing, Kindle, Career Choice, Fire tablets, Fire TV, Amazon Echo, Alexa, Just Walk Out technology, Amazon Studios, and The Climate Pledge are some of the things pioneered by Amazon.',
                    logo: [
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png',
                    ],
                    jobsCount: 86,
                },
                {
                    company: 'Amd',
                    scname: '',
                    website: 'https://careers.amd.com/careers-home/jobs?stretchU',
                    description:
                        'AMD is the high performance and adaptive computing leader, powering the products and services that help solve the world’s most important challenges. Our technologies advance the future of the data center, embedded, gaming and PC markets.\r\n\r\nFounded in 1969 as a Silicon Valley start-up, the AMD journey began with dozens of employees who were passionate about creating leading-edge semiconductor products. AMD has grown into a global company setting the standard for modern computing, with many important industry firsts and major technological achievements along the way.',
                    logo: ['https://1000logos.net/wp-content/uploads/2020/05/AMD-Logo.png'],
                    jobsCount: 12,
                },
                {
                    company: 'Arabesque',
                    scname: '',
                    website: 'https://cariere.arabesque.ro/',
                    description:
                        'Arabesque, cel mai mare distribuitor de materiale de constructii si finisaje din Romania, inoveaza in permanenta si dezvolta activ serviciile oferite clientilor sai din sfera constructiilor. Compania Arabesque, se afla pe piata din 1994 si are o prezenta regionala in Moldova, Ucraina, Bulgaria. Fondată în Galați, in 1994, de catre omul de afaceri Cezar Rapotan, Arabesque detine 38 de centre comerciale, dintre care 23 in Romania. Echipa din Romania numara peste 3200 de oameni iar forta logistica este asigurata de cele peste 1000 de camioane specializate.',
                    logo: [
                        'https://cariere.arabesque.ro/wp-content/uploads/2016/09/cropped-logo-blog.png',
                    ],
                    jobsCount: 60,
                },
            ],
            nextId: 2,
            count: 0,
        },
    ],
};

let status = 'success';
let isFetchingNextPage = false;
let hasNextPage = false;

const fakeFetchNextPage = () => {
    isFetchingNextPage = true;
    setTimeout(() => {
        if (templateData.pages.length <= fakeData.pages.length) {
            templateData.pages.push(fakeData.pages[templateData.pages.length - 1]);
        }

        status = 'success';
        hasNextPage = templateData.pages.length < 3;
        console.log(templateData.pages.length < 3);
    }, 1000);

    isFetchingNextPage = false;
};

export default {
    title: 'Pages/Home',
    component: Template,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        data: templateData,
        status: status,
        error: { message: 'A aparut o eroare' },
        isFetchingNextPage: isFetchingNextPage,
        fetchNextPage: fakeFetchNextPage,
        hasNextPage: hasNextPage,
    },
    decorators: [
        (Story) => (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        ),
    ],
};

export const Default = (args) => <Template {...args} />;
export const onLoading = (args) => <Template {...args} />;
onLoading.args = {
    status: 'pending',
};
export const onError = (args) => <Template {...args} />;
onError.args = {
    status: 'error',
};
export const onFetchingNextPage = (args) => <Template {...args} />;
onFetchingNextPage.args = {
    isFetchingNextPage: true,
};
export const onNoNextPage = (args) => <Template {...args} />;
onNoNextPage.args = {
    hasNextPage: false,
};
export const onFetchingNextPageError = (args) => <Template {...args} />;
onFetchingNextPageError.args = {
    status: 'error',
    error: { message: 'A aparut o eroare' },
};
export const onFetchingNextPageSuccess = (args) => <Template {...args} />;
onFetchingNextPageSuccess.args = {
    status: 'success',
    hasNextPage: true,
};
export const onFetchingNextPageSuccessNoNextPage = (args) => <Template {...args} />;
onFetchingNextPageSuccessNoNextPage.args = {
    status: 'success',
    hasNextPage: false,
};
