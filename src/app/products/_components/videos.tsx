import { IVideo } from '@/types/IProduct'
import React from 'react'

// Declare YouTube IFrame API types
interface YTPlayerEvent {
    data: number;
}

interface YTPlayerConfig {
    events?: {
        onStateChange?: (event: YTPlayerEvent) => void;
    };
}

interface YTPlayer {
    destroy: () => void;
}

declare global {
    interface Window {
        YT: {
            Player: new (element: HTMLIFrameElement, config: YTPlayerConfig) => YTPlayer;
        };
        onYouTubeIframeAPIReady: () => void;
    }
}

export default function Videos({ videos, productName }: { videos: IVideo[], productName: string }) {
    if (videos.length === 0) {
        return null;
    }
    return (
        <div className="">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold  mb-8 text-slate-900 dark:text-slate-100 max-w-xl">
                Step Wise Guidance
            </h2>

            <section className='grid sm:grid-cols-2 items-center  lg:gap-8 flex-wrap gap-8  w-full mx-auto '>
                {videos.map((video) => (
                    <React.Fragment key={video.id} >
                        <ToggleVideo key={video.id} videoId={video.youtubeVideoId} />
                    </React.Fragment>
                ))}
            </section>
        </div>
    )
}


function ToggleVideo({ videoId }: { videoId: string }) {
    "use client";
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [showVideo, setShowVideo] = React.useState(false);
    const iframeRef = React.useRef<HTMLIFrameElement>(null);
    const playerRef = React.useRef<YTPlayer | null>(null);

    React.useEffect(() => {
        // Load YouTube IFrame API
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }

        // Initialize player when API is ready
        const initPlayer = () => {
            if (iframeRef.current && window.YT && !playerRef.current) {
                playerRef.current = new window.YT.Player(iframeRef.current, {
                    events: {
                        'onStateChange': (event: YTPlayerEvent) => {
                            // YouTube Player States:
                            // -1 (unstarted)
                            // 0 (ended)
                            // 1 (playing)
                            // 2 (paused)
                            // 3 (buffering)
                            // 5 (video cued)
                            if (event.data === 2) {
                                // Video paused
                                setShowVideo(false);
                                setIsPlaying(false);
                            } else if (event.data === 0) {
                                // Video ended
                                setShowVideo(false);
                                setIsPlaying(false);
                            }
                        }
                    }
                });
            }
        };

        if (window.YT && window.YT.Player) {
            initPlayer();
        } else {
            window.onYouTubeIframeAPIReady = initPlayer;
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [showVideo]);



    const handlePlayClick = () => {
        setIsPlaying(true);
        setShowVideo(true);
    };

    return (
        <div className="relative w-full  aspect-video overflow-hidden rounded-lg shadow-lg group cursor-pointer">
            {!showVideo ? (
                <div
                    onClick={handlePlayClick}
                    className="relative w-full h-full"
                >
                    <img
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                        <div className="size-12 flex items-center justify-center bg-red-600 rounded-full group-hover:bg-red-700 transition-colors">
                            <svg
                                className="size-6 text-white/80 hover:text-white ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            ) : (
                <iframe
                    ref={iframeRef}
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                ></iframe>
            )}
        </div>
    );
}