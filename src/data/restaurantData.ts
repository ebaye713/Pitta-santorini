import heroGyrosImg from '../assets/images/hero_gyros_pitta_1794602685435.jpg';
import portionBoxImg from '../assets/images/gallery_portion_box_1794602684667.jpg';
import halloumiMezeImg from '../assets/images/gallery_halloumi_meze_1794602686277.jpg';
import saladSkewersImg from '../assets/images/gallery_greek_salad_skewers_1794602687268.jpg';
import freddoCoffeeImg from '../assets/images/gallery_freddo_coffee_1794602687357.jpg';

export const RESTAURANT_INFO = {
  name: 'Pitta Santorini',
  streetAddress: '72 Longbridge Road',
  city: 'Barking',
  postcode: 'IG11 8SF',
  fullAddress: '72 Longbridge Road, Barking, IG11 8SF',
  country: 'United Kingdom',
  deliverooUrl: 'https://deliveroo.co.uk/menu/london/mayesbrook/pitta-santorini',
  googleMapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=Pitta+Santorini+72+Longbridge+Road+Barking+IG11+8SF',
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=72+Longbridge+Road,+Barking+IG11+8SF,+UK',
  defaultCoordinates: {
    lat: 51.5413,
    lng: 0.0846,
  },
  reportedRating: 4.7,
} as const;

export interface OpeningHourEntry {
  dayIndex: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  day: string;
  shortDay: string;
  displayHours: string;
  openMinutes: number | null;
  closeMinutes: number | null;
  isClosed: boolean;
}

export const OPENING_HOURS: OpeningHourEntry[] = [
  {
    dayIndex: 1,
    day: 'Monday',
    shortDay: 'Mon',
    displayHours: '4:00pm – 10:00pm',
    openMinutes: 16 * 60,
    closeMinutes: 22 * 60,
    isClosed: false,
  },
  {
    dayIndex: 2,
    day: 'Tuesday',
    shortDay: 'Tue',
    displayHours: '4:00pm – 10:00pm',
    openMinutes: 16 * 60,
    closeMinutes: 22 * 60,
    isClosed: false,
  },
  {
    dayIndex: 3,
    day: 'Wednesday',
    shortDay: 'Wed',
    displayHours: 'Closed',
    openMinutes: null,
    closeMinutes: null,
    isClosed: true,
  },
  {
    dayIndex: 4,
    day: 'Thursday',
    shortDay: 'Thu',
    displayHours: '4:00pm – 10:00pm',
    openMinutes: 16 * 60,
    closeMinutes: 22 * 60,
    isClosed: false,
  },
  {
    dayIndex: 5,
    day: 'Friday',
    shortDay: 'Fri',
    displayHours: '11:00am – 10:00pm',
    openMinutes: 11 * 60,
    closeMinutes: 22 * 60,
    isClosed: false,
  },
  {
    dayIndex: 6,
    day: 'Saturday',
    shortDay: 'Sat',
    displayHours: '11:00am – 10:00pm',
    openMinutes: 11 * 60,
    closeMinutes: 22 * 60,
    isClosed: false,
  },
  {
    dayIndex: 0,
    day: 'Sunday',
    shortDay: 'Sun',
    displayHours: '11:00am – 10:00pm',
    openMinutes: 11 * 60,
    closeMinutes: 22 * 60,
    isClosed: false,
  },
];

export function getLondonOpenStatus(now: Date = new Date()): {
  isOpenNow: boolean;
  todayEntry: OpeningHourEntry;
  statusText: string;
} {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const weekdayStr = parts.find((p) => p.type === 'weekday')?.value ?? 'Monday';
  const hourNum = Number(parts.find((p) => p.type === 'hour')?.value ?? '12');
  const minNum = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');
  const currentMinutes = (hourNum === 24 ? 0 : hourNum) * 60 + minNum;

  const todayEntry =
    OPENING_HOURS.find((entry) => entry.day === weekdayStr) ?? OPENING_HOURS[0];

  if (
    todayEntry.isClosed ||
    todayEntry.openMinutes === null ||
    todayEntry.closeMinutes === null
  ) {
    return {
      isOpenNow: false,
      todayEntry,
      statusText: 'Closed on Wednesdays · Opens Thursday 4:00pm',
    };
  }

  if (
    currentMinutes >= todayEntry.openMinutes &&
    currentMinutes < todayEntry.closeMinutes
  ) {
    return {
      isOpenNow: true,
      todayEntry,
      statusText: `Open now until 10:00pm`,
    };
  }

  if (currentMinutes < todayEntry.openMinutes) {
    const openLabel =
      todayEntry.openMinutes === 11 * 60 ? '11:00am' : '4:00pm';
    return {
      isOpenNow: false,
      todayEntry,
      statusText: `Opens today at ${openLabel}`,
    };
  }

  const currentIdxInSchedule = OPENING_HOURS.findIndex(
    (entry) => entry.day === todayEntry.day
  );
  const tomorrow =
    OPENING_HOURS[(currentIdxInSchedule + 1) % OPENING_HOURS.length];
  if (tomorrow.isClosed) {
    return {
      isOpenNow: false,
      todayEntry,
      statusText: 'Closed now · Opens Thursday at 4:00pm',
    };
  }
  const nextOpenLabel =
    tomorrow.openMinutes === 11 * 60 ? '11:00am' : '4:00pm';
  return {
    isOpenNow: false,
    todayEntry,
    statusText: `Closed now · Opens ${tomorrow.day} at ${nextOpenLabel}`,
  };
}

export type MenuCategoryId =
  | 'featured'
  | 'wraps'
  | 'boxes'
  | 'deals'
  | 'sides'
  | 'salads'
  | 'drinks'
  | 'all';

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  subtitle: string;
}

export interface MenuItem {
  id: string;
  category: Exclude<MenuCategoryId, 'all' | 'featured'>;
  name: string;
  description: string;
  price: number;
  dietary?: string;
  featured?: boolean;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'featured',
    label: 'Signature Favourites',
    subtitle: 'Most ordered gyros, portion boxes & Greek coffee in Barking',
  },
  {
    id: 'wraps',
    label: 'Pitta Wraps',
    subtitle: 'Warm handmade Greek pitta stuffed to order',
  },
  {
    id: 'boxes',
    label: 'Portion Boxes',
    subtitle: 'Served with fries, Greek salad, pitta & sauces',
  },
  {
    id: 'deals',
    label: 'Meal Deals',
    subtitle: 'Wrap or box pairings with sides & drinks',
  },
  {
    id: 'sides',
    label: 'Sides & Dips',
    subtitle: 'Chargrilled skewers, Cypriot halloumi & house dips',
  },
  {
    id: 'salads',
    label: 'Greek Salads',
    subtitle: 'Crisp village horiatiki & olive oil dressings',
  },
  {
    id: 'drinks',
    label: 'Greek Coffee & Drinks',
    subtitle: 'Authentic Freddo Espresso, Frappe & cold drinks',
  },
  {
    id: 'all',
    label: 'Full Menu',
    subtitle: 'Every item prepared for Barking shop collection',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // Pitta Wraps
  {
    id: 'wrap-chicken-gyros',
    category: 'wraps',
    name: 'Chicken Gyros Pitta Wrap',
    description:
      'Marinated rotisserie chicken shaved to order in warm Greek pitta with vine tomato, red onion, crispy fries, and house tzatziki.',
    price: 9.99,
    featured: true,
  },
  {
    id: 'wrap-pork-gyros',
    category: 'wraps',
    name: 'Pork Gyros Pitta Wrap',
    description:
      'Slow-roasted seasoned pork gyros wrapped in soft grilled pitta with tomato, red onion, paprika fries, and creamy tzatziki.',
    price: 9.99,
    featured: true,
  },
  {
    id: 'wrap-mixed-gyros',
    category: 'wraps',
    name: 'Mixed Gyros Pitta Wrap',
    description:
      'Double rotation of chicken and pork gyros with fresh salad, hand-cut fries, tzatziki, and signature mustard-mayo.',
    price: 10.49,
  },
  {
    id: 'wrap-chicken-souvlaki',
    category: 'wraps',
    name: 'Chicken Souvlaki Skewer Pitta',
    description:
      'Chargrilled oregano & lemon chicken breast skewer wrapped with fresh tomato, red onion, fries, and mustard-mayo sauce.',
    price: 9.99,
  },
  {
    id: 'wrap-pork-souvlaki',
    category: 'wraps',
    name: 'Pork Souvlaki Skewer Pitta',
    description:
      'Flame-grilled pork neck souvlaki in pillowy Greek pitta with sliced onion, ripe tomato, crispy fries, and tzatziki.',
    price: 9.99,
  },
  {
    id: 'wrap-lamb-kebab',
    category: 'wraps',
    name: 'Lamb & Beef Kebab Pitta Wrap',
    description:
      'Spiced minced lamb & beef skewer grilled over high heat with tomato, red onion, fries, and cool cucumber tzatziki.',
    price: 10.49,
  },
  {
    id: 'wrap-halloumi',
    category: 'wraps',
    name: 'Grilled Halloumi Pitta Wrap',
    description:
      'Thick slices of chargrilled Cypriot halloumi cheese, tomato, red onion, crispy oregano fries, and house tzatziki.',
    price: 9.49,
    dietary: 'Vegetarian',
    featured: true,
  },
  {
    id: 'wrap-cheeseburger',
    category: 'wraps',
    name: 'Greek Cheeseburger Pitta Wrap',
    description:
      'Street-food fusion grilled beef patty with melted cheddar, crisp fries, salad, and signature mustard-mayo in warm pitta.',
    price: 9.99,
  },

  // Portion Boxes
  {
    id: 'box-chicken-gyros',
    category: 'boxes',
    name: 'Chicken Gyros Portion Box',
    description:
      'Generous serving of shaved chicken gyros with crispy oregano fries, fresh Greek salad, warm sliced pitta, tzatziki, and mustard-mayo.',
    price: 16.99,
    featured: true,
  },
  {
    id: 'box-pork-gyros',
    category: 'boxes',
    name: 'Pork Gyros Portion Box',
    description:
      'Authentic pork gyros feast plated with seasoned fries, tomato-feta Greek salad, warm pitta wedges, tzatziki, and house sauce.',
    price: 16.99,
  },
  {
    id: 'box-mixed-gyros',
    category: 'boxes',
    name: 'Mixed Meat Portion Box',
    description:
      'Our hearty combination of chicken and pork gyros with oregano fries, Greek salad, warm pitta, tzatziki, and signature sauce.',
    price: 17.99,
    featured: true,
  },
  {
    id: 'box-halloumi',
    category: 'boxes',
    name: 'Grilled Halloumi Portion Box',
    description:
      'Golden chargrilled Cypriot halloumi served alongside crispy fries, village Greek salad, warm pitta, and two house dips.',
    price: 15.99,
    dietary: 'Vegetarian',
  },
  {
    id: 'box-lamb-kebab',
    category: 'boxes',
    name: 'Lamb & Beef Kebab Portion Box',
    description:
      'Two flame-grilled lamb & beef kebab skewers with oregano fries, Greek salad, warm pitta bread, and house tzatziki.',
    price: 17.99,
  },

  // Meal Deals
  {
    id: 'deal-wrap-meal',
    category: 'deals',
    name: 'Greek Wrap Meal Deal',
    description:
      'Your choice of any signature Greek pitta wrap paired with seasoned oregano fries or grilled halloumi side and a cold drink.',
    price: 16.99,
    featured: true,
  },
  {
    id: 'deal-two-person',
    category: 'deals',
    name: 'Santorini Sharing Feast for Two',
    description:
      'Any two Greek pitta wraps, large feta & oregano fries, two house dips (tzatziki & tirokafteri), and two cold drinks.',
    price: 31.99,
  },

  // Sides, Skewers & Dips
  {
    id: 'side-chicken-skewer',
    category: 'sides',
    name: 'Chicken Breast Skewer',
    description:
      'Single marinated Greek chicken souvlaki skewer grilled with Mediterranean oregano and lemon.',
    price: 3.99,
  },
  {
    id: 'side-pork-skewer',
    category: 'sides',
    name: 'Pork Neck Skewer',
    description:
      'Single traditional charcoal-kissed pork neck souvlaki skewer seasoned with sea salt and wild herbs.',
    price: 3.99,
  },
  {
    id: 'side-halloumi',
    category: 'sides',
    name: 'Grilled Cypriot Halloumi',
    description:
      'Three thick slices of golden grilled halloumi finished with Greek olive oil and dried oregano.',
    price: 5.49,
    dietary: 'Vegetarian',
  },
  {
    id: 'side-feta-fries',
    category: 'sides',
    name: 'Feta & Oregano Fries',
    description:
      'Large portion of crisp golden fries tossed with sea salt, sweet paprika, oregano, and crumbled Greek feta.',
    price: 5.99,
    dietary: 'Vegetarian',
  },
  {
    id: 'side-large-fries',
    category: 'sides',
    name: 'Large Greek Oregano Fries',
    description:
      'Crispy skin-on fries seasoned in the Athenian style with wild oregano and sea salt.',
    price: 4.49,
    dietary: 'Vegan',
  },
  {
    id: 'side-dolmades',
    category: 'sides',
    name: 'Dolmades (Stuffed Vine Leaves)',
    description:
      'Tender vine leaves hand-rolled around fragrant herb rice, lemon juice, and olive oil.',
    price: 4.99,
    dietary: 'Vegan',
  },
  {
    id: 'dip-tzatziki',
    category: 'sides',
    name: 'House Tzatziki Dip',
    description:
      'Strained Greek yogurt folded with grated cucumber, fresh dill, garlic, and extra virgin olive oil.',
    price: 3.99,
    dietary: 'Vegetarian',
  },
  {
    id: 'dip-tirokafteri',
    category: 'sides',
    name: 'Spicy Feta Dip (Tirokafteri)',
    description:
      'Whipped Cycladic feta cheese blended with roasted red chilli peppers and cold-pressed olive oil.',
    price: 3.99,
    dietary: 'Vegetarian',
  },
  {
    id: 'dip-hummus',
    category: 'sides',
    name: 'Classic Olive Oil Hummus',
    description:
      'Velvety chickpea and tahini purée finished with lemon, paprika, and Greek olive oil.',
    price: 3.99,
    dietary: 'Vegan',
  },
  {
    id: 'side-pitta',
    category: 'sides',
    name: 'Warm Handmade Greek Pitta',
    description: 'Brushed with olive oil and oregano, toasted on the flat grill.',
    price: 1.99,
    dietary: 'Vegan',
  },

  // Salads
  {
    id: 'salad-greek',
    category: 'salads',
    name: 'Traditional Greek Horiatiki Salad',
    description:
      'Ripe vine tomatoes, crisp cucumber, red onion, Kalamata olives, and a slab of authentic Greek feta with oregano and extra virgin olive oil.',
    price: 7.99,
    dietary: 'Vegetarian',
  },

  // Greek Coffee & Drinks
  {
    id: 'drink-freddo-espresso',
    category: 'drinks',
    name: 'Freddo Espresso',
    description:
      'Double shot of rich dark espresso frothed cold and poured over ice — Athens’ signature iced coffee.',
    price: 3.8,
    dietary: 'Vegan',
  },
  {
    id: 'drink-freddo-cappuccino',
    category: 'drinks',
    name: 'Freddo Cappuccino',
    description:
      'Iced double espresso crowned with thick, velvety cold milk micro-foam and a dusting of cinnamon.',
    price: 4.2,
    dietary: 'Vegetarian',
    featured: true,
  },
  {
    id: 'drink-frappe',
    category: 'drinks',
    name: 'Classic Greek Frappe',
    description:
      'Traditional whipped iced coffee shaken until thick and frothy, served sweet, medium, or black.',
    price: 3.8,
    dietary: 'Vegetarian',
  },
  {
    id: 'drink-orange-juice',
    category: 'drinks',
    name: 'Freshly Squeezed Orange Juice',
    description: 'Pressed daily to order for bright Mediterranean freshness.',
    price: 4.2,
    dietary: 'Vegan',
  },
  {
    id: 'drink-soft-can',
    category: 'drinks',
    name: 'Chilled Soft Drinks (330ml)',
    description: 'Coca-Cola, Diet Coke, Fanta Orange, Sprite, or Loux Greek sodas.',
    price: 1.8,
    dietary: 'Vegan',
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
  aspect: 'wide' | 'square';
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-hero',
    title: 'Handmade Chicken & Pork Gyros Pittas',
    caption:
      'Warm fluffy Greek pitta stuffed with rotisserie gyros, vine tomatoes, red onion, oregano fries, and cool tzatziki.',
    src: heroGyrosImg,
    alt: 'Two authentic Greek chicken and pork gyros wrapped in warm pitta bread with tzatziki and crispy oregano fries',
    aspect: 'wide',
  },
  {
    id: 'gal-box',
    title: 'The Barking Gyros Portion Box',
    caption:
      'Shaved chicken and pork gyros plated alongside hand-cut oregano fries, village Greek salad, warm pitta triangles, and signature sauces.',
    src: portionBoxImg,
    alt: 'Greek gyros portion box with shaved chicken and pork, fries, Greek salad, warm pitta, tzatziki, and mustard-mayo',
    aspect: 'square',
  },
  {
    id: 'gal-halloumi',
    title: 'Grilled Halloumi & House Meze Dips',
    caption:
      'Chargrilled Cypriot halloumi with blistered pitta bread, cucumber-dill tzatziki, olive oil hummus, and spicy whipped feta tirokafteri.',
    src: halloumiMezeImg,
    alt: 'Chargrilled Cypriot halloumi with warm pitta and blue-and-white bowls of tzatziki, hummus, and spicy feta dip',
    aspect: 'square',
  },
  {
    id: 'gal-souvlaki',
    title: 'Athenian Souvlaki & Horiatiki Salad',
    caption:
      'Marinated chicken and pork neck skewers charred on the grill alongside crisp tomatoes, cucumber, Kalamata olives, and oregano-dusted feta.',
    src: saladSkewersImg,
    alt: 'Grilled Greek souvlaki skewers next to a fresh Greek horiatiki salad topped with a slab of feta cheese and olive oil',
    aspect: 'square',
  },
  {
    id: 'gal-coffee',
    title: 'Freddo Espresso & Freddo Cappuccino',
    caption:
      'Authentic Greek iced coffees whipped cold with rich crema, served all day Friday through Sunday and evenings Monday, Tuesday & Thursday.',
    src: freddoCoffeeImg,
    alt: 'Tall glasses of Greek iced Freddo Espresso and Freddo Cappuccino with velvety cold foam on a Santorini blue table',
    aspect: 'square',
  },
];

export const HERO_IMAGE = heroGyrosImg;
export const ABOUT_IMAGE = halloumiMezeImg;
