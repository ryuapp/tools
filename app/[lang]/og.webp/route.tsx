import { ImageResponse } from 'next/og';

export function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'ja' },
  ];
}

export async function GET(_: Request, { params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang
  const text = lang === 'ja' ? 'ツールズ' : 'Tools';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          fontSize: 120,
          fontWeight: 700,
          color: 'white',
        }}
      >
        <div>
          {text}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}