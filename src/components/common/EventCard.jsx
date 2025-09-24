import React, { useEffect, useRef, useState } from "react";
import EventModal from "./EventModal";
import { Video, Image, Play, Calendar } from "lucide-react";

export default function EventCard({ event }) {
    const [open, setOpen] = useState(false);
    const mediaItems = [...(event.images || []), ...(event.videos || [])];
    const [expanded, setExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const imagesCount = event.images?.length || 0;
    const videosCount = event.videos?.length || 0;
    const descRef = useRef(null)
    console.log(descRef, 'descRef');

    useEffect(() => {
        if (descRef.current) {
            setIsTruncated(descRef.current.scrollHeight > descRef.current.clientHeight);
        }
    }, [])
    return (
        <>
            <div
                className={`
          relative flex flex-col justify-center items-center p-6 rounded-3xl
          shadow-sm hover:shadow-xl dark:shadow-gray-800 transform transition duration-300
          overflow-hidden max-w-md mx-auto h-auto min-h-[400px]
          bg-white dark:bg-gray-900 cursor-pointer
          outline-2 outline-gray-200 dark:outline-gray-700
          group
        `}

            >


                {/* Media Thumbnail */}
                {event.images?.[0] && (
                    <div className="relative overflow-hidden aspect-[16/9] w-full rounded-2xl border border-gray-300 dark:border-gray-700 mb-4 group-hover:scale-105 transition-transform duration-300"
                        onClick={() => setOpen(true)}>
                        <img
                            src={event.images[0]}
                            alt={event.title}
                            className="w-full h-full object-cover object-center"
                        />


                        {/* Media counters */}
                        {(imagesCount > 1 || videosCount > 0) && (
                            <div className="absolute bottom-2 right-2 flex space-x-2 bg-gray-800/60 dark:bg-gray-200/30 rounded-full px-3 py-1 text-white dark:text-gray-900 text-xs font-semibold">
                                {imagesCount > 1 && (
                                    <span className="flex items-center space-x-1 dark:text-white">
                                        <Image className="w-4 h-4" /> <span>{imagesCount}</span>
                                    </span>
                                )}
                                {videosCount > 0 && (
                                    <span className="flex items-center space-x-1 dark:text-white">
                                        <Video className="w-4 h-4 " /> <span>{videosCount}</span>
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Play Icon overlay if there is video */}
                        {videosCount > 0 && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-white/60 dark:bg-gray-800/60 rounded-full p-4 animate-pulse">
                                    <Play className="w-6 h-6 text-gray-900 dark:text-white" />
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {!event.images && event.videos?.[0] && (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                        <Video className="w-12 h-12 text-gray-500" />
                    </div>
                )}
                {/* Title */}
                <h4 className={`text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center truncate ${!event.images && !event.videos && 'mb-4'}`}>
                    {event.title}
                </h4>

                {/* Description */}
                <div className=" flex items-center flex-col overflow-hidden">
                    <p className={`text-sm md:text-base text-gray-600 dark:text-gray-400 text-start ${!expanded && "line-clamp-3"}`}
                        ref={descRef}>
                        {event.description}
                    </p>
                    {isTruncated &&
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-blue-500 text-xs mt-1 hover:underline"
                        >
                            {expanded ? "Read less" : "Read more"}
                        </button>
                    }
                </div>

                {/* Click hint */}
                {/* {event.images && event.videos && (
                    <span className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
                        📅 View Event Details
                    </span>)} */}
            </div>

            {open && (
                <EventModal
                    items={mediaItems}
                    initialIndex={0}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
}
