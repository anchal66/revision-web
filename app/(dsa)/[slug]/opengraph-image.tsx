import { ImageResponse } from 'next/og';
import { topics } from '@/data/topics';

export const runtime = 'edge';

export const alt = 'Topic Detail - Interview Revision';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
    const topic = topics.find((t) => t.slug === params.slug);
    const title = topic?.title || 'Topic Detail';
    const category = topic?.category || 'Interview Topic';

    // Determine color based on category
    const isDSA = category === 'DSA';
    const accentColor = isDSA ? '#10b981' : '#3b82f6'; // Emerald or Blue

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #ffffff, #f8fafc)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                {/* Decorative Grid Background (Simulated) */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8px', background: accentColor, opacity: 0.8 }} />

                {/* Category Badge */}
                <div
                    style={{
                        background: `${accentColor}15`, // Low opacity bg
                        color: accentColor,
                        padding: '10px 24px',
                        borderRadius: '50px',
                        fontSize: 24,
                        fontWeight: 600,
                        marginBottom: 30,
                        border: `2px solid ${accentColor}30`
                    }}
                >
                    {category}
                </div>

                <div
                    style={{
                        fontSize: 70,
                        fontWeight: 800,
                        color: '#0f172a',
                        textAlign: 'center',
                        maxWidth: '85%',
                        lineHeight: 1.1,
                        marginBottom: 20,
                        letterSpacing: '-1px',
                    }}
                >
                    {title}
                </div>

                <div
                    style={{
                        fontSize: 28,
                        color: '#64748b',
                        marginTop: 20,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <span style={{ fontWeight: 400 }}>Read on </span>
                    <span style={{ fontWeight: 700, marginLeft: 8, color: '#0f172a' }}>Interview Revision</span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
