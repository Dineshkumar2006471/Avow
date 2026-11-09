"""
Hindi numeral lexicons, romanisation mappings, multipliers and fractions.
Supports both Devanagari script and Latin romanised forms (as output by Prisma transliterate).
"""

# Hindi 0-99 standard table
HINDI_NUMBERS: dict[str, int] = {
    # 0 - 9
    "shunya": 0, "shoonya": 0, "zero": 0, "शून्य": 0, "०": 0,
    "ek": 1, "एक": 1, "१": 1,
    "do": 2, "दो": 2, "२": 2,
    "teen": 3, "tin": 3, "तीन": 3, "३": 3,
    "chaar": 4, "char": 4, "चार": 4, "४": 4,
    "paanch": 5, "panch": 5, "paach": 5, "पांच": 5, "पाँच": 5, "५": 5,
    "chhah": 6, "chhe": 6, "che": 6, "छह": 6, "छः": 6, "६": 6,
    "saat": 7, "सात": 7, "७": 7,
    "aath": 8, "ath": 8, "आठ": 8, "८": 8,
    "nau": 9, "no": 9, "नौ": 9, "९": 9,

    # 10 - 19
    "das": 10, "dus": 10, "दस": 10,
    "gyaarah": 11, "gyarah": 11, "ग्यारह": 11,
    "baarah": 12, "barah": 12, "बारह": 12,
    "terah": 13, "तेरह": 13,
    "chaudah": 14, "chauda": 14, "चौदह": 14,
    "pandrah": 15, "pandra": 15, "पंद्रह": 15,
    "solah": 16, "sola": 16, "सोलह": 16,
    "satrah": 17, "satra": 17, "सत्रह": 17,
    "atharah": 18, "athara": 18, "अठारह": 18,
    "unnis": 19, "unnees": 19, "उन्नीस": 19,

    # 20 - 29
    "bees": 20, "bis": 20, "बीस": 20,
    "ikkis": 21, "ikkees": 21, "इक्कीस": 21,
    "baais": 22, "baees": 22, "बाईस": 22,
    "teis": 23, "teees": 23, "तेईस": 23,
    "chaubis": 24, "chaubees": 24, "चौबीस": 24,
    "pachchis": 25, "pachchees": 25, "पच्चीस": 25,
    "chhabbis": 26, "chhabbees": 26, "छब्बीस": 26,
    "sattais": 27, "sattaees": 27, "सत्ताईस": 27,
    "atthaais": 28, "atthaees": 28, "अट्ठाईस": 28,
    "unatis": 29, "untees": 29, "उनतीस": 29,

    # 30 - 39
    "tees": 30, "tis": 30, "तीस": 30,
    "ikattis": 31, "iktis": 31, "इकत्तीस": 31,
    "battis": 32, "बत्तीस": 32,
    "tentis": 33, "tentees": 33, "तैंतीस": 33,
    "chauntis": 34, "chauntees": 34, "चौंतीस": 34,
    "paintis": 35, "paintees": 35, "पैंतीस": 35,
    "chhattis": 36, "छत्तीस": 36,
    "saintis": 37, "saintees": 37, "सैंतीस": 37,
    "adhtis": 38, "adhtees": 38, "अड़तीस": 38,
    "untalis": 39, "untalees": 39, "उनतालीस": 39,

    # 40 - 49
    "chaalis": 40, "chalis": 40, "चालीस": 40,
    "iktalis": 41, "iktalees": 41, "इकतालीस": 41,
    "bayalis": 42, "bayalees": 42, "बयालीस": 42,
    "taitalis": 43, "taitalees": 43, "तैंतालीस": 43,
    "chavalis": 44, "chavalees": 44, "चवालीस": 44,
    "paentalis": 45, "paintalis": 45, "पैंतालीस": 45,
    "chhiyalis": 46, "chhiyalees": 46, "छियालीस": 46,
    "saentalis": 47, "saintalis": 47, "सैंतालीस": 47,
    "adtalis": 48, "adtalees": 48, "अड़तालीस": 48,
    "unchaas": 49, "unchas": 49, "उनचास": 49,

    # 50 - 59
    "pachaas": 50, "pachas": 50, "पचास": 50,
    "ikkyavan": 51, "ikyavan": 51, "इक्यावन": 51,
    "baavan": 52, "bavan": 52, "बावन": 52,
    "tirpan": 53, "तिरेपन": 53, "तिरपन": 53,
    "chauvan": 54, "चौवन": 54,
    "pachpan": 55, "पचपन": 55,
    "chhappan": 56, "छप्पन": 56,
    "sattavan": 57, "सत्तावन": 57,
    "atthavan": 58, "अट्ठावन": 58,
    "unsath": 59, "उनसठ": 59,

    # 60 - 69
    "saath": 60, "sath": 60, "साठ": 60,
    "iksath": 61, "इकसठ": 61,
    "baasath": 62, "basath": 62, "बासठ": 62,
    "tirsath": 63, "तिरसठ": 63,
    "chaunsath": 64, "चौंसठ": 64,
    "painsath": 65, "पैंसठ": 65,
    "chhiyasath": 66, "छियासठ": 66,
    "sadsath": 67, "सरसठ": 67,
    "adsath": 68, "अड़सठ": 68,
    "unhattar": 69, "उनहत्तर": 69,

    # 70 - 79
    "sattar": 70, "सत्तर": 70,
    "ikhattar": 71, "इकहत्तर": 71,
    "bahattar": 72, "बहत्तर": 72,
    "tihattar": 73, "तिहत्तर": 73,
    "chauhattar": 74, "चौहत्तर": 74,
    "pachhattar": 75, "पचहत्तर": 75,
    "chhihattar": 76, "छिहत्तर": 76,
    "sathattar": 77, "सतहत्तर": 77,
    "athahattar": 78, "अठहत्तर": 78,
    "unasi": 79, "unasee": 79, "उनासी": 79,

    # 80 - 89
    "assi": 80, "अस्सी": 80,
    "ikyasi": 81, "ikyaasee": 81, "इक्यासी": 81,
    "byasi": 82, "biyasi": 82, "बयासी": 82,
    "tirasi": 83, "tiraasee": 83, "तिरासी": 83,
    "chaurasi": 84, "chouraasee": 84, "चौरासी": 84,
    "pachasi": 85, "pachaasee": 85, "पचासी": 85,
    "chhiyasi": 86, "chhiyaasee": 86, "छियासी": 86,
    "sattasi": 87, "sattaasee": 87, "सतासी": 87,
    "atthasi": 88, "atthaasee": 88, "अठासी": 88,
    "navasi": 89, "navaasee": 89, "नवासी": 89,

    # 90 - 99
    "nabbe": 90, "nave": 90, "नब्बे": 90,
    "ikyanve": 91, "इक्यानवे": 91,
    "banve": 92, "बानवे": 92,
    "tiranve": 93, "तिरानवे": 93,
    "chauranve": 94, "चौरानवे": 94,
    "pachanve": 95, "पचानवे": 95,
    "chhiyanve": 96, "छियानवे": 96,
    "sattanve": 97, "सत्तानवे": 97,
    "atthanve": 98, "अट्ठानवे": 98,
    "ninyanve": 99, "ninyaanve": 99, "निन्यानवे": 99,

    # English numerals (also common in Hinglish)
    "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
    "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
    "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14,
    "fifteen": 15, "sixteen": 16, "seventeen": 17, "eighteen": 18,
    "nineteen": 19, "twenty": 20, "thirty": 30, "forty": 40,
    "fifty": 50, "sixty": 60, "seventy": 70, "eighty": 80, "ninety": 90,
}

MULTIPLIERS: dict[str, int] = {
    "sau": 100, "so": 100, "hundred": 100, "सौ": 100,
    "hazaar": 1000, "hazar": 1000, "hajar": 1000, "thousand": 1000, "हज़ार": 1000, "हजार": 1000, "k": 1000,
    "lakh": 100_000, "lac": 100_000, "laakh": 100_000, "लाख": 100_000,
    "crore": 10_000_000, "karod": 10_000_000, "koti": 10_000_000, "करोड़": 10_000_000, "करोड": 10_000_000,
}

# Fractional modifiers:
# dedh = 1.5, dhai = 2.5
# sava = +0.25 of next unit (e.g. sava lakh = 1.25 lakh)
# sadhe = +0.5 of next unit (e.g. sadhe saat hazaar = 7.5k, sadhe teen lakh = 3.5 lakh)
# paune = -0.25 of next unit (e.g. paune do lakh = 1.75 lakh)
FRACTION_STANDALONE: dict[str, float] = {
    "dedh": 1.5, "derh": 1.5, "डेढ़": 1.5,
    "dhai": 2.5, "dhaee": 2.5, "ढाई": 2.5,
}

REPEAT_PREFIXES: dict[str, int] = {
    "double": 2, "dabal": 2, "डबल": 2,
    "triple": 3, "tripal": 3, "ट्रिपल": 3,
}

