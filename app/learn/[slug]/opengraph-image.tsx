import { ImageResponse } from 'next/og';
import { learningPaths } from '@/data/learning-paths';

export const runtime = 'edge';

export const alt = 'Career Path - Interview Revision';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
    const path = learningPaths.find((p) => p.slug === params.slug);
    const title = path?.title || 'Career Path';
    const stepsCount = path?.steps.length || 0;
    const experience = path?.experienceRange || 'All Levels';

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #1e1b4b, #312e81)', // Dark Indigo theme
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    padding: '80px',
                    color: 'white',
                }}
            >
                <div
                    style={{
                        fontSize: 24,
                        color: '#a5b4fc',
                        fontWeight: 600,
                        marginBottom: 20,
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                    }}
                >
                    Interview Questions Path
                </div>

                <div
                    style={{
                        fontSize: 72,
                        fontWeight: 800,
                        maxWidth: '100%',
                        lineHeight: 1.1,
                        marginBottom: 30,
                        textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    }}
                >
                    {title}
                </div>

                <div style={{ display: 'flex', gap: '20px', marginTop: 10 }}>
                    <div
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            fontSize: 28,
                            fontWeight: 500,
                            border: '1px solid rgba(255,255,255,0.2)',
                        }}
                    >
                        {experience}
                    </div>
                    <div
                        style={{
                            background: '#4f46e5',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            fontSize: 28,
                            fontWeight: 600,
                            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                        }}
                    >
                        {stepsCount} Topics Covered
                    </div>
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: 60,
                        right: 80,
                        fontSize: 32,
                        fontWeight: 700,
                        opacity: 0.8,
                    }}
                >
                    Interview Revision
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
