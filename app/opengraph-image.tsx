import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Магазин оружия и снаряжения';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        background: '#1976d2',
        color: '#ffffff',
        fontSize: 72,
        fontWeight: 700,
      }}
    >
      <div>Магазин</div>
      <div style={{ fontSize: 32, fontWeight: 400 }}>Лучшие товары по доступным ценам</div>
    </div>,
    size
  );
}
