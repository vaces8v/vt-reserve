import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'ВТ-Резерв — Навигация и инфраструктура для города будущего';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundColor: '#FFFFFF',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            background: 'linear-gradient(135deg, #FEE2E2 0%, transparent 70%)',
            opacity: 0.5,
          }}
        />
        
        {/* Red accent line */}
        <div
          style={{
            position: 'absolute',
            left: '60px',
            top: '120px',
            width: '4px',
            height: '200px',
            backgroundColor: '#DC2626',
          }}
        />

        {/* Logo */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                color: 'white',
                fontSize: '28px',
                fontWeight: 900,
                letterSpacing: '-1px',
              }}
            >
              ВТ
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                color: '#1F2937',
                fontSize: '24px',
                fontWeight: 700,
                letterSpacing: '-0.5px',
              }}
            >
              ВТ-РЕЗЕРВ
            </span>
            <span
              style={{
                color: '#6B7280',
                fontSize: '12px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
              }}
            >
              Навигация
            </span>
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '800px',
          }}
        >
          <span
            style={{
              fontSize: '72px',
              fontWeight: 900,
              color: '#1F2937',
              lineHeight: 0.95,
              letterSpacing: '-2px',
            }}
          >
            СОЗДАЁМ
          </span>
          <span
            style={{
              fontSize: '42px',
              fontWeight: 300,
              color: '#6B7280',
              letterSpacing: '2px',
            }}
          >
            уникальную
          </span>
          <div style={{ display: 'flex', gap: '0px' }}>
            <span
              style={{
                fontSize: '72px',
                fontWeight: 900,
                color: '#DC2626',
                lineHeight: 0.95,
                letterSpacing: '-2px',
              }}
            >
              НАВ
            </span>
            <span
              style={{
                fontSize: '72px',
                fontWeight: 900,
                color: '#1F2937',
                lineHeight: 0.95,
                letterSpacing: '-2px',
              }}
            >
              И
            </span>
            <span
              style={{
                fontSize: '72px',
                fontWeight: 900,
                color: '#DC2626',
                lineHeight: 0.95,
                letterSpacing: '-2px',
              }}
            >
              ГА
            </span>
            <span
              style={{
                fontSize: '72px',
                fontWeight: 900,
                color: '#1F2937',
                lineHeight: 0.95,
                letterSpacing: '-2px',
              }}
            >
              ЦИЮ
            </span>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            marginTop: '40px',
            paddingTop: '24px',
            borderTop: '2px solid #E5E7EB',
          }}
        >
          {[
            { value: '500+', label: 'Проектов' },
            { value: '15', label: 'Лет опыта' },
            { value: '50+', label: 'Городов' },
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '36px',
                  fontWeight: 900,
                  color: '#1F2937',
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Website URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              color: '#6B7280',
            }}
          >
            vt-reserve.ru
          </span>
        </div>

        {/* Decorative corner */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            right: '60px',
            width: '120px',
            height: '120px',
            border: '4px solid #1F2937',
            opacity: 0.1,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
