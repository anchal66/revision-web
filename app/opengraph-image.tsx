import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Interview Revision - Master Your Tech Interview';
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
                    background: 'linear-gradient(to bottom right, #ffffff, #f3f4f6)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        padding: '20px',
                        borderRadius: '20px',
                        background: 'rgba(99, 102, 241, 0.1)', // Indigo/Primary tint
                    }}
                >
                    {/* Simple Logo Representation */}
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    </svg>
                </div>

                <div
                    style={{
                        fontSize: 80,
                        fontWeight: 800,
                        background: 'linear-gradient(to right, #0f172a, #334155)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        marginBottom: 20,
                        letterSpacing: '-2px',
                    }}
                >
                    Interview Revision
                </div>

                <div
                    style={{
                        fontSize: 32,
                        color: '#64748b',
                        textAlign: 'center',
                        maxWidth: '80%',
                        fontWeight: 500,
                    }}
                >
                    Data Structures • Algorithms • System Design • Career Paths
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: 40,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <div style={{ fontSize: 24, color: '#6366f1', fontWeight: 600 }}>interview-revision.vercel.app</div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
