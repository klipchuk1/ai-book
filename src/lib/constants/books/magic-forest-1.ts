import type { BookTemplate } from "@/types/catalog";

export const magicForest1: BookTemplate = {
  id: "magic-forest-1",
  seriesId: "magic-forest",
  seriesPosition: 1,
  title: "Приключения {name} в Волшебном Лесу",
  subtitle: "Книга 1: Первые шаги",
  description:
    "Волшебный лес полон загадок и удивительных существ. {name} отправляется в невероятное путешествие, где встретит говорящих зверей, найдёт верных друзей и узнает, что настоящая смелость — это доброе сердце.",
  ageGroups: ["5-7", "8-12"],
  priceRub: 1690,
  coverPromptMale:
    "A beautiful children's book cover. A brave boy standing at the entrance of a magical enchanted forest. Glowing trees, fairy lights, a winding golden path leading into the forest. The boy looks excited and curious, wearing a small adventurer's backpack. Title area at the top. Warm sunrise light. Style: premium watercolor illustration for a luxury children's book.",
  coverPromptFemale:
    "A beautiful children's book cover. A brave girl standing at the entrance of a magical enchanted forest. Glowing trees, fairy lights, a winding golden path leading into the forest. The girl looks excited and curious, wearing a small adventurer's backpack. Title area at the top. Warm sunrise light. Style: premium watercolor illustration for a luxury children's book.",
  nextBookTeaser:
    "За Серебряным водопадом скрывается тайна, которую ещё никто не разгадал. Что найдёт {name} по ту сторону? Узнай в Книге 2: «Тайна Серебряного водопада»!",
  chapters: [
    {
      id: "chapter-1",
      title: "Глава 1. Таинственная тропинка",
      pages: [
        {
          type: "illustration",
          promptMale:
            "A boy discovering a hidden glowing path in a park, covered with golden leaves. The path leads to a mysterious old wooden gate covered in ivy. Morning light, magical sparkles in the air. Style: beautiful watercolor illustration for a premium children's book.",
          promptFemale:
            "A girl discovering a hidden glowing path in a park, covered with golden leaves. The path leads to a mysterious old wooden gate covered in ivy. Morning light, magical sparkles in the air. Style: beautiful watercolor illustration for a premium children's book.",
          faceRequired: true,
        },
        {
          type: "text",
          text: "Однажды утром {name} гулял{a} в парке рядом с домом. Всё было как обычно — деревья, скамейки, голуби. Но вдруг {he_she} заметил{a} что-то странное: среди кустов блестела узкая тропинка, которой раньше никогда не было.\n\nТропинка была усыпана золотыми листьями, хотя на дворе стояло лето! {name} огляделся — никого. Сердце забилось быстрее.",
          faceRequired: false,
        },
        {
          type: "text",
          text: "«Идти или не идти?» — подумал{a} {name}. Любопытство победило. {He_She} сделал{a} первый шаг на золотую тропинку — и листья под ногами тихо зазвенели, словно маленькие колокольчики.\n\nС каждым шагом парк менялся. Деревья становились выше, стволы — толще, а воздух наполнялся запахом мёда и земляники. Впереди показались старые деревянные ворота, увитые плющом.",
          faceRequired: false,
        },
        {
          type: "illustration",
          promptMale:
            "A boy pushing open ancient wooden gates covered in glowing ivy, stepping into a magical enchanted forest. Beyond the gates — enormous trees with luminous leaves, floating fireflies, a sparkling stream. The boy looks amazed. Style: beautiful watercolor illustration for a premium children's book.",
          promptFemale:
            "A girl pushing open ancient wooden gates covered in glowing ivy, stepping into a magical enchanted forest. Beyond the gates — enormous trees with luminous leaves, floating fireflies, a sparkling stream. The girl looks amazed. Style: beautiful watercolor illustration for a premium children's book.",
          faceRequired: true,
        },
        {
          type: "text",
          text: "{name} толкнул{a} ворота — и они открылись с тихим скрипом. За ними начинался настоящий Волшебный Лес! Деревья были такими огромными, что их верхушки терялись в облаках. Листья светились мягким зелёным светом, а в воздухе летали крошечные огоньки.\n\n«Вот это да...» — прошептал{a} {name} и шагнул{a} вперёд.",
          faceRequired: false,
        },
      ],
    },
    {
      id: "chapter-2",
      title: "Глава 2. Говорящий ёжик",
      pages: [
        {
          type: "illustration",
          promptMale:
            "A boy meeting a small talking hedgehog wearing tiny round glasses, standing on a mushroom in an enchanted forest. The hedgehog is holding a tiny map. Warm forest light, magical atmosphere. Style: beautiful watercolor illustration for a premium children's book.",
          promptFemale:
            "A girl meeting a small talking hedgehog wearing tiny round glasses, standing on a mushroom in an enchanted forest. The hedgehog is holding a tiny map. Warm forest light, magical atmosphere. Style: beautiful watercolor illustration for a premium children's book.",
          faceRequired: true,
        },
        {
          type: "text",
          text: "Не успел{a} {name} пройти и десяти шагов, как из-за гриба выглянул маленький ёжик в круглых очках. И — вот чудо! — он заговорил:\n\n«Привет! Ты, наверное, из Большого мира? Я — Шуршик. Давно жду кого-нибудь храброго!»\n\n{name} от удивления сел{a} прямо на траву: «Ты... ты умеешь говорить?!»",
          faceRequired: false,
        },
        {
          type: "text",
          text: "«Конечно! — засмеялся Шуршик. — Здесь все умеют говорить. И деревья, и камни, и даже лужи. Просто не все хотят».\n\nШуршик достал из-за спины крошечную карту, нарисованную на берёзовой коре.\n\n«У нас беда, — серьёзно сказал он. — Старый Фонарь на Лесной поляне погас. Без него лес погрузится во тьму. Мне нужен помощник. Поможешь?»",
          faceRequired: false,
        },
        {
          type: "illustration",
          promptMale:
            "A boy and a small hedgehog with glasses walking together through a magical forest path. The boy is looking at a tiny bark map. Glowing mushrooms along the path, fireflies lighting the way. Adventure atmosphere. Style: beautiful watercolor illustration for a premium children's book.",
          promptFemale:
            "A girl and a small hedgehog with glasses walking together through a magical forest path. The girl is looking at a tiny bark map. Glowing mushrooms along the path, fireflies lighting the way. Adventure atmosphere. Style: beautiful watercolor illustration for a premium children's book.",
          faceRequired: true,
        },
        {
          type: "text",
          text: "{name} посмотрел{a} на карту. На ней были нарисованы деревья, речка, горы и большая звезда посередине — Лесная поляна.\n\n«Я помогу!» — решительно сказал{a} {name}.\n\nШуршик радостно подпрыгнул, и они отправились в путь. Впереди ждало много приключений, но {name} почему-то совсем не боял{a}ся.",
          faceRequired: false,
        },
      ],
    },
    {
      id: "chapter-3",
      title: "Глава 3. Мост через Шёпотную реку",
      pages: [
        {
          type: "illustration",
          promptMale:
            "A magical river with crystal-clear water that seems to whisper. An old broken wooden bridge crosses it. A boy and a hedgehog stand at the bridge's edge looking worried. Willow trees hang over the water. Soft afternoon light. Style: beautiful watercolor illustration for a premium children's book.",
          promptFemale:
            "A magical river with crystal-clear water that seems to whisper. An old broken wooden bridge crosses it. A girl and a hedgehog stand at the bridge's edge looking worried. Willow trees hang over the water. Soft afternoon light. Style: beautiful watercolor illustration for a premium children's book.",
          faceRequired: true,
        },
        {
          type: "text",
          text: "Вскоре путь преградила река. Вода в ней была такой прозрачной, что видны были разноцветные камушки на дне. А ещё река тихонько шептала — словно рассказывала кому-то секреты.\n\n«Это Шёпотная река, — объяснил Шуршик. — Она шепчет мудрые советы тем, кто умеет слушать. Но мост... мост сломан».",
          faceRequired: false,
        },
        {
          type: "text",
          text: "Действительно, деревянный мост был разрушен посередине. Перебраться на ту сторону казалось невозможным.\n\n{name} наклонил{a}ся к воде и прислушал{a}ся. Река прошептала: «Попроси помощи у того, кто живёт под мостом...»\n\n«Под мостом кто-то живёт?» — удивил{a}ся {name}.",
          faceRequired: false,
        },
        {
          type: "illustration",
          promptMale:
            "A friendly large turtle emerging from under an old bridge in a magical river. A boy is talking to the turtle. The turtle has kind eyes and moss growing on its shell. Magical river with glowing pebbles. Style: beautiful watercolor illustration for a premium children's book.",
          promptFemale:
            "A friendly large turtle emerging from under an old bridge in a magical river. A girl is talking to the turtle. The turtle has kind eyes and moss growing on its shell. Magical river with glowing pebbles. Style: beautiful watercolor illustration for a premium children's book.",
          faceRequired: true,
        },
        {
          type: "text",
          text: "Из-под моста медленно выплыла огромная черепаха. На её панцире рос мох и маленькие цветочки.\n\n«Меня зовут Тихоня, — сказала черепаха. — Я могу перевезти вас, но только если вы ответите на мой вопрос: что важнее — быть быстрым или быть надёжным?»\n\n{name} задумал{a}ся и ответил{a}: «Быть надёжным. Потому что на быстрого не всегда можно положиться, а на надёжного — всегда».\n\nТихоня улыбнулась: «Правильный ответ. Садитесь!»",
          faceRequired: false,
        },
      ],
    },
    {
      id: "chapter-4",
      title: "Глава 4. Поляна забытых игрушек",
      pages: [
        {
          type: "illustration",
          promptMale:
            "A magical meadow covered with old forgotten toys — worn teddy bears, wooden rocking horses, rag dolls, deflated balls. Some toys look sad with tiny tears. Soft melancholic light filtering through the trees. No people. Style: beautiful watercolor illustration for a premium children's book.",
          promptFemale:
            "A magical meadow covered with old forgotten toys — worn teddy bears, wooden rocking horses, rag dolls, deflated balls. Some toys look sad with tiny tears. Soft melancholic light filtering through the trees. No people. Style: beautiful watercolor illustration for a premium children's book.",
          faceRequired: false,
        },
        {
          type: "text",
          text: "За рекой тропинка привела {name} и Шуршика на необычную поляну. Она была усеяна старыми игрушками: плюшевыми медведями, деревянными лошадками, куклами и мячиками.\n\n«Это Поляна забытых игрушек, — тихо сказал Шуршик. — Сюда попадают игрушки, о которых забыли дети. Они грустят здесь одни».",
          faceRequired: false,
        },
        {
          type: "illustration",
          promptMale:
            "A boy comforting a sad worn teddy bear on a meadow filled with forgotten toys — old dolls, wooden horses, deflated balls. Some toys have tiny tears. The boy is hugging the teddy bear. Bittersweet but hopeful atmosphere. Soft light. Style: beautiful watercolor illustration for a premium children's book.",
          promptFemale:
            "A girl comforting a sad worn teddy bear on a meadow filled with forgotten toys — old dolls, wooden horses, deflated balls. Some toys have tiny tears. The girl is hugging the teddy bear. Bittersweet but hopeful atmosphere. Soft light. Style: beautiful watercolor illustration for a premium children's book.",
          faceRequired: true,
        },
        {
          type: "text",
          text: "{name} подошёл{a} к маленькому плюшевому мишке. У мишки был оторван один глаз, а шёрстка потёрлась.\n\n«Меня звали Топтыжка, — прошептал мишка. — Раньше я был чьим-то лучшим другом. А потом... потом обо мне забыли».\n\n{name} аккуратно взял{a} Топтыжку на руки: «Не грусти. Я не забуду тебя. Обещаю!»\n\nИ случилось чудо — Топтыжка засветился тёплым светом, а его потёртая шёрстка стала мягкой и пушистой!",
          faceRequired: false,
        },
        {
          type: "text",
          text: "«Вот видишь! — обрадовался Шуршик. — Доброе слово и забота — самое сильное волшебство в нашем лесу!»\n\nТоптыжка спрыгнул на землю и весело закружился. Другие игрушки тоже начали оживать — мячик запрыгал, лошадка заржала, а кукла захлопала в ладоши.\n\n{name} улыбнулся: с ним в лесу становилось всё веселее.",
          faceRequired: false,
        },
      ],
    },
    {
      id: "chapter-5",
      title: "Глава 5. Тёмная чаща",
      pages: [
        {
          type: "illustration",
          promptMale:
            "A boy with a hedgehog and a teddy bear entering a dark, scary part of the forest. Twisted trees with faces, shadows, fog. But the boy holds a small glowing lantern and looks brave. Atmospheric, slightly spooky but not too scary for children. Style: beautiful watercolor illustration for a premium children's book.",
          promptFemale:
            "A girl with a hedgehog and a teddy bear entering a dark, scary part of the forest. Twisted trees with faces, shadows, fog. But the girl holds a small glowing lantern and looks brave. Atmospheric, slightly spooky but not too scary for children. Style: beautiful watercolor illustration for a premium children's book.",
          faceRequired: true,
        },
        {
          type: "text",
          text: "Дальше лес становился всё темнее. Деревья здесь были кривыми и переплетёнными, а на стволах словно проступали хмурые лица.\n\n«Это Тёмная чаща, — прошептал Шуршик и прижался к ноге {name}. — Здесь живёт Ворчун — старый филин, который давно ни с кем не разговаривает. Он охраняет тропу к Лесной поляне».",
          faceRequired: false,
        },
        {
          type: "text",
          text: "{name} было страшновато, но {he_she} вспомнил{a}: храбрость — это не когда не боишься, а когда идёшь вперёд, несмотря на страх.\n\nИз темноты раздался низкий голос: «КТО ПОСМЕЛ ВОЙТИ В МОЮ ЧАЩУ?!»\n\nОгромный филин с жёлтыми глазами сидел на ветке прямо над тропой.",
          faceRequired: false,
        },
        {
          type: "illustration",
          promptMale:
            "A boy bravely looking up at a large grumpy owl with big yellow eyes perched on a twisted branch in a dark forest. The boy is offering something to the owl. The hedgehog and teddy bear hide behind the boy. Dramatic lighting. Style: beautiful watercolor illustration for a premium children's book.",
          promptFemale:
            "A girl bravely looking up at a large grumpy owl with big yellow eyes perched on a twisted branch in a dark forest. The girl is offering something to the owl. The hedgehog and teddy bear hide behind the girl. Dramatic lighting. Style: beautiful watercolor illustration for a premium children's book.",
          faceRequired: true,
        },
        {
          type: "text",
          text: "«Здравствуйте, — вежливо сказал{a} {name}. — Мы идём к Лесной поляне, чтобы зажечь Старый Фонарь. Можно нам пройти?»\n\nВорчун удивлённо моргнул: «Давно никто не говорил со мной вежливо. Все только боялись и убегали. Ладно, проходите. Но будьте осторожны — впереди Каменный лабиринт».\n\nФилин даже подарил {name} светящееся перо — оно указывало путь в темноте.",
          faceRequired: false,
        },
      ],
    },
    {
      id: "chapter-6",
      title: "Глава 6. Каменный лабиринт",
      pages: [
        {
          type: "illustration",
          promptMale:
            "A boy entering a stone maze made of ancient carved rocks covered in glowing runes. The hedgehog sits on the boy's shoulder. A glowing feather in the boy's hand lights the way. Mysterious, atmospheric. Style: beautiful watercolor illustration for a premium children's book.",
          promptFemale:
            "A girl entering a stone maze made of ancient carved rocks covered in glowing runes. The hedgehog sits on the girl's shoulder. A glowing feather in the girl's hand lights the way. Mysterious, atmospheric. Style: beautiful watercolor illustration for a premium children's book.",
          faceRequired: true,
        },
        {
          type: "text",
          text: "Каменный лабиринт был похож на гигантскую головоломку. Стены из старых камней, покрытых светящимися узорами, поднимались выше головы. Тупики поджидали на каждом шагу.\n\n«Я знаю секрет! — вспомнил Шуршик. — Если положить руку на стену и идти, не отрывая её, рано или поздно найдёшь выход!»",
          faceRequired: false,
        },
        {
          type: "text",
          text: "{name} так и сделал{a}. Шаг за шагом, поворот за поворотом. Иногда казалось, что лабиринт бесконечный. Но {name} не сдавал{a}ся.\n\n«Главное — терпение, — приговаривал Шуршик. — Торопливый ёжик всегда натыкается на пень!»\n\nНаконец впереди блеснул свет. Выход! {name} радостно побежал{a} вперёд — и замер{la} от восхищения.",
          faceRequired: false,
        },
        {
          type: "illustration",
          promptMale:
            "A boy emerging from a stone maze onto a magnificent forest clearing. In the center stands an ancient ornate lantern post, currently dark and unlit. The clearing is surrounded by ancient trees. Stars visible in the twilight sky. Majestic atmosphere. Style: beautiful watercolor illustration for a premium children's book.",
          promptFemale:
            "A girl emerging from a stone maze onto a magnificent forest clearing. In the center stands an ancient ornate lantern post, currently dark and unlit. The clearing is surrounded by ancient trees. Stars visible in the twilight sky. Majestic atmosphere. Style: beautiful watercolor illustration for a premium children's book.",
          faceRequired: true,
        },
        {
          type: "text",
          text: "Перед {name} раскинулась Лесная поляна. Она была огромной и прекрасной — мягкая трава, цветы, светлячки. А в самом центре стоял Старый Фонарь — высокий, резной, украшенный каменными листьями.\n\nНо он был тёмным. Ни огонька.",
          faceRequired: false,
        },
      ],
    },
    {
      id: "chapter-7",
      title: "Глава 7. Свет Старого Фонаря",
      pages: [
        {
          type: "text",
          text: "«Как же его зажечь?» — спросил{a} {name}.\n\nШуршик почесал лапкой за ухом: «Легенда гласит, что Фонарь зажигается только от света доброго сердца. Но я не знаю, что это значит...»\n\n{name} задумал{a}ся. Свет доброго сердца... {He_She} вспомнил{a} всё, что произошло сегодня: как помог{la} Топтыжке на Поляне забытых игрушек, как вежливо поговорил{a} с Ворчуном, как терпеливо прошёл{Blank} лабиринт.",
          faceRequired: false,
        },
        {
          type: "illustration",
          promptMale:
            "A boy placing both hands on an ancient ornate lantern post in a forest clearing. Golden light begins to emanate from his chest (heart area) and flows into the lantern. The hedgehog and teddy bear watch in amazement. Magical particles swirling. Style: beautiful watercolor illustration for a premium children's book.",
          promptFemale:
            "A girl placing both hands on an ancient ornate lantern post in a forest clearing. Golden light begins to emanate from her chest (heart area) and flows into the lantern. The hedgehog and teddy bear watch in amazement. Magical particles swirling. Style: beautiful watercolor illustration for a premium children's book.",
          faceRequired: true,
        },
        {
          type: "text",
          text: "{name} подошёл{a} к Фонарю и положил{a} на него ладони. Закрыл{a} глаза и подумал{a} обо всех, кому помог{la} сегодня.\n\nИ тут — из самого сердца {name} полился тёплый золотой свет! Он потёк по рукам, через ладони — прямо в Фонарь. Старый Фонарь вспыхнул так ярко, что осветил весь лес!",
          faceRequired: false,
        },
        {
          type: "illustration",
          promptMale:
            "A magnificent scene: a grand ornate lantern blazing with warm golden light in the center of a forest clearing. A boy stands next to it, arms raised in triumph. All forest creatures — hedgehog, owl, turtle, teddy bear, rabbits, foxes — gathered around celebrating. The entire forest is now illuminated. Stars sparkling overhead. Triumphant, magical, heartwarming. Style: beautiful watercolor illustration for a premium children's book.",
          promptFemale:
            "A magnificent scene: a grand ornate lantern blazing with warm golden light in the center of a forest clearing. A girl stands next to it, arms raised in triumph. All forest creatures — hedgehog, owl, turtle, teddy bear, rabbits, foxes — gathered around celebrating. The entire forest is now illuminated. Stars sparkling overhead. Triumphant, magical, heartwarming. Style: beautiful watercolor illustration for a premium children's book.",
          faceRequired: true,
        },
        {
          type: "text",
          text: "Лес ожил! Тёмная чаща стала светлой и приветливой. Ворчун-филин прилетел и впервые за долгое время улыбнулся. Тихоня-черепаха вылезла на берег полюбоваться. Даже забытые игрушки прибежали на поляну.\n\n«Ты сделал{a} это! — радостно закричал Шуршик. — Ты зажёг{la} Фонарь! Настоящий герой Волшебного Леса!»",
          faceRequired: false,
        },
        {
          type: "text",
          text: "{name} улыбнулся. {He_She} понял{a} важную вещь: свет доброго сердца — это когда ты помогаешь другим не ради награды, а просто потому, что так правильно.\n\nВечером {name} вернулся домой через волшебные ворота. В кармане лежало светящееся перо Ворчуна — напоминание о Волшебном Лесе.\n\nНо {name} знал{a}: это только начало. За Серебряным водопадом скрывается новая тайна...",
          faceRequired: false,
        },
      ],
    },
  ],
};
