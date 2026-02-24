import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика конфиденциальности и обработки персональных данных ООО «ВТ-Резерв».',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[var(--dark-gray)] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            На главную
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            ПОЛИТИКА
            <span className="block text-[var(--primary-red)]">КОНФИДЕНЦИАЛЬНОСТИ</span>
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            Обработка и защита персональных данных
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="prose prose-lg max-w-none text-[var(--dark-gray)]">

          <p className="text-[var(--text-gray)] text-sm mb-8">
            Дата последнего обновления: 24 февраля 2025&nbsp;г.
          </p>

          <h2 className="text-2xl font-black text-[var(--dark-gray)] mt-10 mb-4">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
          <p className="text-[var(--text-gray)] leading-relaxed mb-4">
            Настоящая Политика конфиденциальности (далее&nbsp;— «Политика») определяет порядок обработки
            и защиты персональных данных пользователей сайта <strong>vt-reserve.ru</strong> (далее&nbsp;— «Сайт»),
            принадлежащего ООО&nbsp;«ВТ-Резерв» (ИНН&nbsp;7733411950, КПП&nbsp;773301001,
            адрес: г.&nbsp;Москва, ул.&nbsp;Василия Петушкова, д.&nbsp;3, стр.&nbsp;1), далее&nbsp;— «Оператор».
          </p>
          <p className="text-[var(--text-gray)] leading-relaxed mb-4">
            Политика разработана в соответствии с Федеральным законом от 27.07.2006 №&nbsp;152-ФЗ
            «О&nbsp;персональных данных» и иными нормативными правовыми актами Российской Федерации.
          </p>
          <p className="text-[var(--text-gray)] leading-relaxed mb-4">
            Используя Сайт и/или заполняя формы обратной связи, Пользователь выражает согласие
            с условиями настоящей Политики. Если Пользователь не согласен с условиями Политики,
            он должен прекратить использование Сайта.
          </p>

          <h2 className="text-2xl font-black text-[var(--dark-gray)] mt-10 mb-4">2. ПЕРСОНАЛЬНЫЕ ДАННЫЕ, КОТОРЫЕ МЫ СОБИРАЕМ</h2>
          <p className="text-[var(--text-gray)] leading-relaxed mb-4">
            Оператор может обрабатывать следующие персональные данные Пользователя:
          </p>
          <ul className="list-disc pl-6 text-[var(--text-gray)] space-y-2 mb-4">
            <li>Фамилия, имя, отчество;</li>
            <li>Адрес электронной почты (e-mail);</li>
            <li>Номер телефона;</li>
            <li>Содержание сообщений, направленных через формы обратной связи;</li>
            <li>Данные, автоматически передаваемые при посещении Сайта: IP-адрес,
              информация из cookies, информация о браузере, время доступа,
              адрес запрашиваемой страницы.</li>
          </ul>

          <h2 className="text-2xl font-black text-[var(--dark-gray)] mt-10 mb-4">3. ЦЕЛИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
          <p className="text-[var(--text-gray)] leading-relaxed mb-2">
            Персональные данные Пользователя обрабатываются в следующих целях:
          </p>
          <ul className="list-disc pl-6 text-[var(--text-gray)] space-y-2 mb-4">
            <li>Обработка входящих заявок и запросов от Пользователя;</li>
            <li>Связь с Пользователем, направление ответов на запросы;</li>
            <li>Улучшение качества работы Сайта и его содержания;</li>
            <li>Ведение статистики посещений Сайта (Яндекс.Метрика);</li>
            <li>Исполнение требований законодательства Российской Федерации.</li>
          </ul>

          <h2 className="text-2xl font-black text-[var(--dark-gray)] mt-10 mb-4">4. ПРАВОВЫЕ ОСНОВАНИЯ ОБРАБОТКИ</h2>
          <p className="text-[var(--text-gray)] leading-relaxed mb-4">
            Обработка персональных данных осуществляется на основании:
          </p>
          <ul className="list-disc pl-6 text-[var(--text-gray)] space-y-2 mb-4">
            <li>Согласия субъекта персональных данных (ст.&nbsp;6 п.&nbsp;1 пп.&nbsp;1 ФЗ-152);</li>
            <li>Необходимости исполнения договора, стороной которого является субъект
              персональных данных (ст.&nbsp;6 п.&nbsp;1 пп.&nbsp;5 ФЗ-152);</li>
            <li>Необходимости осуществления прав и законных интересов Оператора
              (ст.&nbsp;6 п.&nbsp;1 пп.&nbsp;7 ФЗ-152).</li>
          </ul>

          <h2 className="text-2xl font-black text-[var(--dark-gray)] mt-10 mb-4">5. ПОРЯДОК ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
          <p className="text-[var(--text-gray)] leading-relaxed mb-4">
            Оператор обеспечивает сохранность персональных данных и принимает все возможные меры,
            исключающие доступ к персональным данным неуполномоченных лиц.
          </p>
          <p className="text-[var(--text-gray)] leading-relaxed mb-4">
            Персональные данные Пользователя никогда, ни при каких условиях не будут переданы
            третьим лицам, за исключением случаев, связанных с исполнением действующего
            законодательства, либо в случае, если субъектом персональных данных дано согласие
            на передачу данных третьему лицу.
          </p>
          <p className="text-[var(--text-gray)] leading-relaxed mb-4">
            Срок обработки персональных данных определяется достижением целей, для которых
            были собраны персональные данные, если иной срок не предусмотрен договором
            или действующим законодательством.
          </p>

          <h2 className="text-2xl font-black text-[var(--dark-gray)] mt-10 mb-4">6. ИСПОЛЬЗОВАНИЕ ФАЙЛОВ COOKIE</h2>
          <p className="text-[var(--text-gray)] leading-relaxed mb-4">
            Сайт использует файлы cookie и сервис Яндекс.Метрика для анализа
            пользовательской активности и улучшения работы Сайта. Собираемые данные
            не являются персональными данными и обрабатываются в обезличенном виде.
          </p>
          <p className="text-[var(--text-gray)] leading-relaxed mb-4">
            Пользователь вправе отключить использование файлов cookie в настройках браузера,
            однако это может повлиять на функциональность Сайта.
          </p>

          <h2 className="text-2xl font-black text-[var(--dark-gray)] mt-10 mb-4">7. ПРАВА СУБЪЕКТА ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
          <p className="text-[var(--text-gray)] leading-relaxed mb-2">
            Пользователь имеет право:
          </p>
          <ul className="list-disc pl-6 text-[var(--text-gray)] space-y-2 mb-4">
            <li>Получить информацию, касающуюся обработки его персональных данных;</li>
            <li>Требовать уточнения, блокирования или уничтожения персональных данных;</li>
            <li>Отозвать согласие на обработку персональных данных, направив письменное
              заявление на адрес электронной почты: <a href="mailto:info@vt-reserve.ru" className="text-[var(--primary-red)] hover:underline">info@vt-reserve.ru</a>;</li>
            <li>Обжаловать действия или бездействие Оператора в уполномоченный орган по защите
              прав субъектов персональных данных (Роскомнадзор) или в судебном порядке.</li>
          </ul>

          <h2 className="text-2xl font-black text-[var(--dark-gray)] mt-10 mb-4">8. ОБЯЗАННОСТИ ОПЕРАТОРА</h2>
          <p className="text-[var(--text-gray)] leading-relaxed mb-2">
            Оператор обязан:
          </p>
          <ul className="list-disc pl-6 text-[var(--text-gray)] space-y-2 mb-4">
            <li>Использовать полученные персональные данные исключительно для целей,
              указанных в настоящей Политике;</li>
            <li>Обеспечить хранение конфиденциальной информации в тайне;</li>
            <li>Принять меры предосторожности для защиты конфиденциальности персональных данных;</li>
            <li>Осуществить блокирование или удаление персональных данных по обращению
              Пользователя или его законного представителя.</li>
          </ul>

          <h2 className="text-2xl font-black text-[var(--dark-gray)] mt-10 mb-4">9. ИЗМЕНЕНИЕ ПОЛИТИКИ</h2>
          <p className="text-[var(--text-gray)] leading-relaxed mb-4">
            Оператор вправе вносить изменения в настоящую Политику конфиденциальности.
            Новая редакция Политики вступает в силу с момента её размещения на Сайте,
            если иное не предусмотрено новой редакцией Политики.
          </p>

          <h2 className="text-2xl font-black text-[var(--dark-gray)] mt-10 mb-4">10. КОНТАКТНАЯ ИНФОРМАЦИЯ</h2>
          <p className="text-[var(--text-gray)] leading-relaxed mb-2">
            По всем вопросам, связанным с обработкой персональных данных, обращайтесь:
          </p>
          <ul className="list-none text-[var(--text-gray)] space-y-1 mb-4">
            <li><strong>Оператор:</strong> ООО «ВТ-Резерв»</li>
            <li><strong>Адрес:</strong> г. Москва, ул. Василия Петушкова, д. 3, стр. 1</li>
            <li><strong>Email:</strong>{' '}
              <a href="mailto:info@vt-reserve.ru" className="text-[var(--primary-red)] hover:underline">
                info@vt-reserve.ru
              </a>
            </li>
          </ul>

        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border-gray)]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--primary-red)] hover:underline font-semibold"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Вернуться на главную
          </Link>
        </div>
      </div>
    </main>
  );
}
