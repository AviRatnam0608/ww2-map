// ─── data/cityMarkers.js ────────────────────────
const CITY_MARKERS = [
  { id: "warsaw", name: "Warsaw", lat: 52.2297, lng: 21.0122,
    notablePeople: ["Witold Pilecki", "Mordechai Anielewicz", "Tadeusz Bór-Komorowski"],
    events: [
    { title: "Siege of Warsaw", date: "Sep 8\u201328, 1939", text: "The Luftwaffe bombed Warsaw relentlessly while German ground forces besieged the city. After 20 days of resistance and devastating civilian casualties, the garrison surrendered.", wikiArticle: "Siege_of_Warsaw_(1939)", casualties: "~40,000 civilian dead" },
    { title: "Warsaw Ghetto Uprising", date: "Apr\u2013May 1943", text: "Jewish fighters led by Mordechai Anielewicz mounted an armed revolt against deportations to Treblinka. The Germans leveled the ghetto block by block over four weeks.", wikiArticle: "Warsaw_Ghetto_Uprising", casualties: "~13,000 killed" },
    { title: "Warsaw Uprising", date: "Aug 1\u2013Oct 2, 1944", text: "The Polish Home Army under General Bór-Komorowski rose against the German occupation. The Soviets halted across the Vistula as the uprising was crushed after 63 days.", wikiArticle: "Warsaw_Uprising", casualties: "~200,000 civilian dead" },
  ]},
  { id: "london", name: "London", lat: 51.5074, lng: -0.1278,
    notablePeople: ["Winston Churchill", "Hugh Dowding", "Keith Park"],
    events: [
    { title: "The Blitz", date: "Sep 1940\u2013May 1941", text: "The Luftwaffe bombed London for 57 consecutive nights beginning September 7. Over 43,000 civilians were killed across Britain. Churchill's defiant leadership rallied the nation.", wikiArticle: "The_Blitz", casualties: "~43,000 civilian dead" },
    { title: "V-Weapon Attacks", date: "Jun 1944\u2013Mar 1945", text: "Germany launched V-1 flying bombs and V-2 rockets at London. Over 9,000 V-weapons struck Britain, killing nearly 9,000 civilians in the final terror campaign of the war.", wikiArticle: "V-1_flying_bomb", casualties: "~9,000 killed" },
  ]},
  { id: "paris", name: "Paris", lat: 48.8566, lng: 2.3522,
    notablePeople: ["Charles de Gaulle", "Philippe Leclerc", "Dietrich von Choltitz"],
    events: [
    { title: "Fall of Paris", date: "Jun 14, 1940", text: "German forces entered Paris unopposed after the French government declared it an open city. The swastika flew from the Eiffel Tower. France signed an armistice on June 22.", wikiArticle: "Fall_of_France" },
    { title: "Liberation of Paris", date: "Aug 25, 1944", text: "The French 2nd Armored Division under General Leclerc and US 4th Infantry Division liberated Paris. German commander von Choltitz defied Hitler's order to destroy the city.", wikiArticle: "Liberation_of_Paris" },
  ]},
  { id: "stalingrad_city", name: "Stalingrad", lat: 48.708, lng: 44.5133,
    notablePeople: ["Vasily Chuikov", "Friedrich Paulus", "Vasily Zaitsev"],
    events: [
    { title: "Battle of Stalingrad", date: "Aug 1942\u2013Feb 1943", text: "The bloodiest battle in human history. Soviet soldiers fought for every building under General Chuikov's command. The encirclement by Operation Uranus trapped 300,000 Germans. Field Marshal Paulus surrendered on February 2, 1943.", wikiArticle: "Battle_of_Stalingrad", casualties: "~2 million total casualties" },
  ]},
  { id: "berlin", name: "Berlin", lat: 52.52, lng: 13.405,
    notablePeople: ["Georgy Zhukov", "Adolf Hitler", "Helmuth Weidling"],
    events: [
    { title: "Allied Bombing Campaign", date: "1943\u20131945", text: "RAF and USAAF bombing raids devastated Berlin throughout the war. The 'Battle of Berlin' air campaign in 1943\u201344 caused enormous destruction and civilian casualties.", wikiArticle: "Bombing_of_Berlin_in_World_War_II" },
    { title: "Battle of Berlin", date: "Apr 16\u2013May 2, 1945", text: "Marshal Zhukov's forces stormed Berlin with 2.5 million troops. Street-by-street fighting devastated the capital. Hitler took his own life in his bunker on April 30. Germany surrendered on May 8.", wikiArticle: "Battle_of_Berlin", casualties: "~170,000 killed" },
  ]},
  { id: "normandy", name: "Normandy", lat: 49.3438, lng: -0.8687,
    notablePeople: ["Dwight D. Eisenhower", "Bernard Montgomery", "Erwin Rommel", "Theodore Roosevelt Jr."],
    events: [
    { title: "D-Day", date: "Jun 6, 1944", text: "156,000 Allied troops landed on five beaches (Utah, Omaha, Gold, Juno, Sword) in the largest amphibious invasion in history. Despite heavy casualties at Omaha Beach, all five beachheads held by nightfall.", wikiArticle: "Normandy_landings", casualties: "~10,000 Allied casualties on D-Day" },
    { title: "Battle of Normandy", date: "Jun\u2013Aug 1944", text: "The breakout from Normandy culminated in Operation Cobra and the Falaise Pocket, where 50,000 German troops were trapped and destroyed. The road to Paris was open.", wikiArticle: "Battle_of_Normandy", casualties: "~425,000 total casualties" },
  ]},
  { id: "moscow", name: "Moscow", lat: 55.7558, lng: 37.6173,
    notablePeople: ["Joseph Stalin", "Georgy Zhukov", "Ivan Panfilov"],
    events: [
    { title: "Battle of Moscow", date: "Oct 1941\u2013Jan 1942", text: "Operation Typhoon brought German forces within 19 miles of the Kremlin. Panfilov's 28 guardsmen became legendary for their stand at Dubosekovo. Fresh Siberian divisions launched a devastating winter counteroffensive.", wikiArticle: "Battle_of_Moscow", casualties: "~650,000 Soviet, ~250,000 German" },
  ]},
  { id: "kursk_city", name: "Kursk", lat: 51.7304, lng: 36.1926,
    notablePeople: ["Erich von Manstein", "Konstantin Rokossovsky", "Pavel Rotmistrov"],
    events: [
    { title: "Battle of Kursk", date: "Jul 5\u2013Aug 23, 1943", text: "The largest tank battle in history: 6,000 tanks and 2 million soldiers clashed. At Prokhorovka, 600 Soviet tanks charged into 300 German panzers. The decisive Soviet victory ended Germany's offensive capability in the East.", wikiArticle: "Battle_of_Kursk", casualties: "~255,000 German, ~255,000 Soviet casualties" },
  ]},
  { id: "el_alamein", name: "El Alamein", lat: 30.8341, lng: 28.9525,
    notablePeople: ["Bernard Montgomery", "Erwin Rommel"],
    events: [
    { title: "Second Battle of El Alamein", date: "Oct 23\u2013Nov 11, 1942", text: "Montgomery's Eighth Army smashed through Rommel's lines after a massive artillery barrage and 12-day battle. The Axis threat to Egypt and the Suez Canal was permanently ended.", wikiArticle: "Second_Battle_of_El_Alamein", casualties: "~37,000 Axis, ~13,500 Allied" },
  ]},
  { id: "rome", name: "Rome", lat: 41.9028, lng: 12.4964,
    notablePeople: ["Mark Clark", "Benito Mussolini", "Albert Kesselring"],
    events: [
    { title: "Liberation of Rome", date: "Jun 4, 1944", text: "Allied forces captured Rome after the grueling Italian Campaign\u2014the first Axis capital to fall. General Clark controversially diverted forces to enter Rome rather than trap retreating Germans.", wikiArticle: "Battle_of_Rome", casualties: "~44,000 Allied casualties in approach" },
  ]},
  { id: "dunkirk", name: "Dunkirk", lat: 51.0343, lng: 2.3768,
    notablePeople: ["Lord Gort", "Bertram Ramsay"],
    events: [
    { title: "Evacuation of Dunkirk", date: "May 26\u2013Jun 4, 1940", text: "Operation Dynamo rescued 338,000 Allied troops from the beaches by over 800 vessels, including civilian boats. Though a military defeat, it preserved the core of the British Army to fight on.", wikiArticle: "Dunkirk_evacuation", casualties: "~68,000 Allied casualties/captured" },
  ]},
  { id: "leningrad", name: "Leningrad", lat: 59.9343, lng: 30.3351,
    notablePeople: ["Andrei Zhdanov", "Leonid Govorov"],
    events: [
    { title: "Siege of Leningrad", date: "Sep 1941\u2013Jan 1944", text: "The longest siege in modern history: 872 days. German and Finnish forces encircled the city. Over one million civilians died, primarily from starvation during the brutal winters. The city never surrendered.", wikiArticle: "Siege_of_Leningrad", casualties: "~1.5 million dead" },
  ]},
  { id: "tobruk", name: "Tobruk", lat: 32.0764, lng: 23.9538,
    notablePeople: ["Leslie Morshead", "Erwin Rommel"],
    events: [
    { title: "Siege of Tobruk", date: "Apr\u2013Dec 1941", text: "Australian and Allied forces held the Libyan port against Rommel for 241 days, denying the Afrika Korps a critical supply port. The defenders became known as the 'Rats of Tobruk.'", wikiArticle: "Siege_of_Tobruk", casualties: "~3,600 Allied casualties" },
  ]},
  { id: "arnhem", name: "Arnhem", lat: 51.9851, lng: 5.8987,
    notablePeople: ["Roy Urquhart", "John Frost"],
    events: [
    { title: "Battle of Arnhem", date: "Sep 17\u201325, 1944", text: "British 1st Airborne Division landed at Arnhem to capture the Rhine bridge\u2014the final objective of Operation Market Garden. Only 740 men held the north end under Colonel Frost before being overwhelmed.", wikiArticle: "Battle_of_Arnhem", casualties: "~8,000 British casualties" },
  ]},
  { id: "monte_cassino", name: "Monte Cassino", lat: 41.4903, lng: 13.8145,
    notablePeople: ["W\u0142adys\u0142aw Anders", "Harold Alexander"],
    events: [
    { title: "Battles of Monte Cassino", date: "Jan\u2013May 1944", text: "Four massive Allied assaults on the heavily fortified Gustav Line. The ancient Benedictine monastery was controversially destroyed by bombing. Polish II Corps finally captured the summit on May 18.", wikiArticle: "Battle_of_Monte_Cassino", casualties: "~55,000 Allied, ~20,000 German" },
  ]},
  { id: "bastogne", name: "Bastogne", lat: 50.0, lng: 5.7167,
    notablePeople: ["Anthony McAuliffe", "George S. Patton"],
    events: [
    { title: "Siege of Bastogne", date: "Dec 1944", text: "The 101st Airborne Division held Bastogne during the Battle of the Bulge. When asked to surrender, General McAuliffe famously replied 'NUTS!' Patton's Third Army broke through to relieve them.", wikiArticle: "Siege_of_Bastogne", casualties: "~3,000 US casualties" },
  ]},
  { id: "dresden", name: "Dresden", lat: 51.0504, lng: 13.7373,
    notablePeople: ["Arthur 'Bomber' Harris"],
    events: [
    { title: "Bombing of Dresden", date: "Feb 13\u201315, 1945", text: "RAF and USAAF firebombing raids created a massive firestorm that destroyed 1,600 acres of the historic city center. The bombing remains one of the war's most controversial actions.", wikiArticle: "Bombing_of_Dresden_in_World_War_II", casualties: "~25,000 killed" },
  ]},
  { id: "crete", name: "Crete", lat: 35.2401, lng: 24.4709,
    notablePeople: ["Bernard Freyberg", "Kurt Student"],
    events: [
    { title: "Battle of Crete", date: "May 20\u2013Jun 1, 1941", text: "Germany's airborne invasion of Crete was the first mainly airborne operation in history. Despite heavy paratrooper losses, the Germans captured the island. The casualties were so severe Hitler banned future large airborne operations.", wikiArticle: "Battle_of_Crete", casualties: "~6,500 German, ~4,000 Allied killed" },
  ]},
  { id: "midway_inset", name: "Midway (Pacific)", lat: 34.5, lng: -5.0, isInfoOnly: true,
    notablePeople: ["Chester Nimitz", "C. Wade McClusky"],
    events: [
    { title: "Battle of Midway", date: "Jun 4\u20137, 1942", text: "US Navy dive bombers sank four Japanese aircraft carriers in five devastating minutes, turning the tide of the Pacific War. American codebreakers had broken the Japanese naval code, enabling the ambush.", wikiArticle: "Battle_of_Midway", casualties: "~3,000 Japanese, ~300 American" },
  ]},
];
