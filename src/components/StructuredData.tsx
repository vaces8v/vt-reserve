const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vt-reserve.ru';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#organization`,
  name: 'ВТ-Резерв',
  legalName: 'ООО «ВТ-Резерв»',
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  image: `${siteUrl}/opengraph-image`,
  description:
    'Проектирование и производство навигационных систем, информационных указателей и элементов городской инфраструктуры. Более 15 лет опыта, 100+ реализованных объектов по всей России.',
  telephone: '+7 (495) 004-03-81',
  email: 'info@vt-reserve.ru',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Василия Петушкова, д. 3, стр. 1, офис 303',
    addressLocality: 'Москва',
    addressRegion: 'Москва',
    postalCode: '125080',
    addressCountry: 'RU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 55.800,
    longitude: 37.390,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Россия',
  },
  priceRange: '₽₽',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Навигационные системы',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Навигация в медицинских учреждениях',
          description: 'Разработка систем ориентирования для больниц, поликлиник и медицинских центров',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Навигация в жилых комплексах',
          description: 'Адресные таблички, указатели подъездов, схемы территории и въездные стелы для ЖК',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Навигация в парках и общественных пространствах',
          description: 'Карты территории, указатели маршрутов, информационные стенды в антивандальном исполнении',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Навигация в торговых и бизнес-центрах',
          description: 'Подвесные указатели, интерактивные киоски, зонирование пространства для ТЦ и БЦ',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Навигация на парковках',
          description: 'Цветовое зонирование, световые указатели, напольная разметка и знаки безопасности',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Информационные стенды',
          description: 'Уличные и интерьерные конструкции с подсветкой в антивандальном исполнении',
        },
      },
    ],
  },
  sameAs: [siteUrl],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
